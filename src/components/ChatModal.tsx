"use client"
import { useEffect, useRef , useState } from "react";
import { useSession } from "next-auth/react";
import {io, Socket} from 'socket.io-client';
import axios from "axios";

interface Message{
    sender : string;
    sendername: string;
    avatar:string;
    msg:string;
    timestamp:string;
}

interface Props{
    serviceId: string;
    providerId: string;
    providerName:string;
    onClose: ()=>void;
}
let socket : Socket | null = null;
export default function ChatModal ({serviceId , providerId , providerName , onClose}:Props){
    const {data :session} = useSession();
    const [messages , setMessages] = useState<Message[]>([]);
    const [input , setInput] = useState("");
    const [connected , setConnected] = useState(false);
    const bottomRef = useRef<HTMLDivElement>(null);

    const roomId = [serviceId , session?.user?.id , providerId].sort().join("-");
    console.log(roomId);
    console.log("Session user id: ", session?.user.id);

    useEffect(()=>{
        if(!session?.user?.id)return;
        if(!socket){
            socket = io(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000');
        }
        socket.on("connect" , ()=>setConnected(true));

        socket.emit("join-room" , roomId);

        const loadHistory = async()=>{
            try {
                const {data} = await axios.get(`/api/chat?roomId=${roomId}`);
                if(data.success)setMessages(data.msg);
            } catch (error) {
                console.log("History load error: ", error);  
            }
        }
        loadHistory();
        socket.on("receive-msg", (data:Message)=>{
            setMessages((prev)=>[...prev, data]);
        });

        return ()=>{
            socket?.off("receive-msg");
        };
    }, [roomId , session?.user?.id]);

    useEffect(()=>{
        bottomRef.current?.scrollIntoView({behavior:"smooth"});
    }, [messages]);

    const sendMsg = async()=>{
        if(!input.trim() || !socket || !session)return;

        const msgData : Message ={
            sender:session.user.id,
            sendername: session.user.name || "",
            avatar:session.user.image || "",
            msg: input.trim(),
            timestamp:new Date().toISOString()
        };
        socket.emit("send-msg" , {...msgData , roomId});

        await axios.post("/api/chat"  , {roomId , serviceId , msg:input.trim() , receiverId:providerId});

        setInput("");
    };
    const handleKeyDown = (e:React.KeyboardEvent)=>{
        if(e.key==="Enter" && !e.shiftKey){
            e.preventDefault();
            sendMsg();
        }
    };

    const isMe = (senderId :string) => senderId === session?.user?.id;

 return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-end sm:items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-md h-140 flex flex-col overflow-hidden shadow-2xl animate-modal">

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-sm">
              {providerName?.[0]?.toUpperCase()}
            </div>
            <div>
              <p className="font-bold text-gray-900 text-sm">{providerName}</p>
              <p className="text-xs text-gray-400 flex items-center gap-1">
                <span className={`w-1.5 h-1.5 rounded-full ${connected ? "bg-green-400" : "bg-gray-300"}`} />
                {connected ? "Online" : "Connecting..."}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400 text-xl"
          >
            ×
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3">
          {messages.length === 0 && (
            <div className="flex-1 flex flex-col items-center justify-center text-center py-10">
              <p className="text-2xl mb-2">👋</p>
              <p className="text-sm text-gray-400">
                Start a conversation with {providerName}
              </p>
              <p className="text-xs text-gray-300 mt-1">
                Ask about the service or negotiate the price
              </p>
            </div>
          )}

          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex items-end gap-2 ${isMe(msg.sender) ? "flex-row-reverse" : "flex-row"}`}
            >
              {/* Avatar */}
              <div className="w-6 h-6 rounded-full bg-gray-300 shrink-0 overflow-hidden">
                {msg.avatar ? (
                  <img src={msg.avatar} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-xs font-bold text-white bg-blue-400">
                    {msg.sendername?.[0]?.toUpperCase()}
                  </div>
                )}
              </div>

              {/* Bubble */}
              <div
                className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                  isMe(msg.sender)
                    ? "bg-gray-900 text-white rounded-br-sm"
                    : "bg-gray-100 text-gray-800 rounded-bl-sm"
                }`}
              >
                {msg.msg}
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="px-4 py-3 border-t border-gray-100 flex gap-2 items-end">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            rows={1}
            className="flex-1 resize-none px-4 py-2.5 rounded-2xl border border-gray-200 text-sm outline-none focus:border-gray-400 max-h-24"
          />
          <button
            onClick={sendMsg}
            disabled={!input.trim()}
            className="w-10 h-10 rounded-full bg-gray-900 text-white flex items-center justify-center disabled:opacity-30 hover:bg-gray-700 transition shrink-0"
          >
            ↑
          </button>
        </div>

      </div>
    </div>
  );

};