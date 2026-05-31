"use client";
import { useEffect , useState } from "react";
import  Link from 'next/link'
import { useSession } from "next-auth/react";
import axios from "axios";

interface Service{
    _id:string;
    title:string;
    description:string;
    price:number;
    isActive:boolean;
    serviceby:{
        username:string,
        email:string,
        avatar:string
    };
}

export default function ServicePage(){
    const {data: session}= useSession();
    const [services , setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);
    const  [search ,setsearch] = useState("");

    useEffect(()=>{
        const fetchServices = async ()=>{
            try {
                const {data} = await axios.get("/api/services");
                if (data.success)setServices(data.data);
            } catch (error) {
                console.error("Failed to fetch services: ", error);
            }finally{
                setLoading(false);
            }
        };
        fetchServices();
    } , []);

    const filtered = services.filter((s)=>s.title.toLowerCase().includes(search.toLowerCase()) || s.description.toLowerCase().includes(search.toLowerCase()));

    return (
          <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Campus Connect</h1>
          {session && (
            <Link
              href="/services/create"
              className="bg-red-500 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-red-600"
            >
              + Offer a Service
            </Link>
          )}
        </div>
        <input
          type="text"
          placeholder="Search services..."
          value={search}
          onChange={(e) => setsearch(e.target.value)}
          className="w-full max-w-lg px-5 py-3 rounded-full border border-gray-200 bg-white text-sm outline-none focus:border-blue-400 mb-8"
        />
        {loading ? (
          <p className="text-gray-500">Loading services...</p>
        ) : filtered.length === 0 ? (
          <p className="text-gray-500">No services found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((service) => (
              <Link href={`/services/${service._id}`} key={service._id}>
                <div className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md transition cursor-pointer h-full">
                  <h2 className="font-bold text-gray-900 text-lg mb-2">
                    {service.title}
                  </h2>
                  <p className="text-gray-500 text-sm line-clamp-2 mb-4">
                    {service.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-green-600 font-bold text-lg">
                      ₹{service.price}
                    </span>
                    <span className="text-xs text-gray-400">
                      by {service.serviceby?.username}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
    )
}