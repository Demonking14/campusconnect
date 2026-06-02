"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import ChatModal from "@/components/ChatModal";

interface Participant {
  _id: string;
  username: string;
  avatar: string;
  email: string;
}
interface Service {
  _id: string;
  title: string;
  price: number;
}
interface Chat {
  _id: string;
  roomId: string;
  serviceId: Service;
  participants: Participant[];
  msg: {
    sender: string;
    msg: string;
    timestamp: string;
  }[];
  updatedAt: string;
}

interface ActiveChat {
  roomId: string;
  serviceId: string;
  providerId: string;
  providerName: string;
}
export default function InboxPage() {
  const { data: session } = useSession();
  const [chats, setChats] = useState<Chat[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeChat, setActiveChat] = useState<ActiveChat | null>(null);

  useEffect(() => {
    async function fetchInbox() {
      try {
        const { data } = await axios.get("/api/chat/inbox");
        // console.log(data.data);
        if (data.success) {
          setChats(data.data)
        //   console.log("Chat set");
        }
    
      } catch (error) {
        console.error("Inbox fetch error: ", error);
      } finally {
        setLoading(false);
      }
    }
    fetchInbox();
  }, []);

  const getOtherParticipant = (chat: Chat): Participant | null => {
   return chat.participants.find((p) => p.email !== session?.user?.email) || null;
  };

  const getLastMessage = (chat: Chat) => {
    if (chat.msg.length == 0) return "No message yet";
    return chat.msg[chat.msg.length - 1].msg;
  };
  const getTimeAgo = (timestamp: string) => {
    const diff = Date.now() - new Date(timestamp).getTime();
    const mins = Math.floor(diff / 60000);
    const hrs = Math.floor(mins / 60);
    const days = Math.floor(hrs / 24);
    if (days > 0) return `${days}d ago`;
    if (hrs > 0) return `${hrs}h ago`;
    if (mins > 0) return `${mins}m ago`;
    return "Just now";
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-black text-gray-900 tracking-tight">
          Inbox
        </h1>
        <p className="text-gray-400 text-sm mt-1">All your conversations</p>
      </div>

      {/* Chat List */}
      {loading ? (
        <div className="flex flex-col gap-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-4 border border-gray-100 animate-pulse h-20"
            />
          ))}
        </div>
      ) : chats.length === 0 ? (
        <div className="bg-white rounded-2xl p-10 border border-dashed border-gray-200 text-center">
          <p className="text-3xl mb-3">💬</p>
          <p className="text-gray-400 text-sm">No conversations yet</p>
          <p className="text-gray-300 text-xs mt-1">
            When someone contacts you about a service, it'll appear here
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {chats.map((chat) => {
            const other = getOtherParticipant(chat);
            if (!other) return null;

            return (
              <div
                key={chat._id}
                onClick={() =>
                  setActiveChat({
                    roomId: chat.roomId,
                    serviceId: chat.serviceId?._id,
                    providerId: other._id,
                    providerName: other.username,
                  })
                }
                className="bg-white rounded-2xl p-4 border border-gray-100 hover:border-gray-300 hover:shadow-sm transition cursor-pointer flex items-center gap-4"
              >
                {/* Avatar */}
                <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-lg shrink-0 overflow-hidden">
                  {other.avatar ? (
                    <img
                      src={other.avatar}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    other.username?.[0]?.toUpperCase()
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 overflow-hidden">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-bold text-gray-900 text-sm">
                      {other.username}
                    </p>
                    <span className="text-xs text-gray-400">
                      {getTimeAgo(chat.updatedAt)}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 truncate">
                    {chat.serviceId?.title && (
                      <span className="text-blue-400 font-medium mr-1">
                        [{chat.serviceId.title}]
                      </span>
                    )}
                    {getLastMessage(chat)}
                  </p>
                </div>

                {/* Message count */}
                {chat.msg.length > 0 && (
                  <div className="w-5 h-5 rounded-full bg-gray-900 flex items-center justify-center shrink-0">
                    <span className="text-white text-xs font-bold">
                      {chat.msg.length > 9 ? "9+" : chat.msg.length}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Chat Modal */}
      {activeChat && (
        <ChatModal
          serviceId={activeChat.serviceId}
          providerId={activeChat.providerId}
          providerName={activeChat.providerName}
          onClose={() => setActiveChat(null)}
        />
      )}
    </div>
  );
}
