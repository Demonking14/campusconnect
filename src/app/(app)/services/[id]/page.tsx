"use client"
import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter, useParams } from "next/navigation"
import axios from "axios";
import ChatModal from "@/components/ChatModal";

interface Service {
  _id: string,
  title: string,
  description: string,
  price: number,
  isActive: boolean,
  serviceby: {
    _id: string;
    username: string;
    email: string,
    avatar: string
  };
}

export default function ServiceDetailPage() {
  const { data: session } = useSession();
  const { id } = useParams();
  const router = useRouter();
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const { data } = await axios.get(`/api/services/${id}`);
        if (data.success) setService(data.data);
      } catch (error) {
        console.error("Failed to fetch service:", error);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchService();
  }, [id]);

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this service?")) return;
    setDeleting(true);
    try {
      const { data } = await axios.delete(`/api/services/${id}`);
      if (data.success) router.push("/services");
    } catch (error) {
      console.error("Delete failed:", error);
    } finally {
      setDeleting(false);
    }
  };

  const isOwner = session?.user?.email === service?.serviceby?.email;

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-gray-500">Loading...</p>
    </div>
  );

  if (!service) return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-gray-500">Service not found.</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto">

        <button
          onClick={() => router.back()}
          className="text-sm text-gray-500 hover:text-gray-700 mb-6 flex items-center gap-1"
        >
          ← Back
        </button>

        <div className="bg-white rounded-2xl border border-gray-100 p-8">

          {/* Title & Price */}
          <div className="flex items-start justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-900 flex-1">
              {service.title}
            </h1>
            <span className="text-2xl font-bold text-green-600 ml-4">
              ₹{service.price}
            </span>
          </div>

          {/* Provider */}
          <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-100">
            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-sm">
              {service.serviceby?.username?.[0]?.toUpperCase()}
            </div>
            <div>
              <p className="font-medium text-gray-900 text-sm">
                {service.serviceby?.username}
              </p>
              <p className="text-xs text-gray-400">
                {service.serviceby?.email}
              </p>
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-600 text-sm leading-relaxed mb-8">
            {service.description}
          </p>

          {/* Actions */}
          <div className="flex gap-3">
            {!isOwner && (
              <>
                <button
                  onClick={() => setChatOpen(true)}
                  className="flex-1 bg-gray-900 text-white py-3 rounded-xl font-medium text-sm hover:bg-gray-700 transition"
                >
                  💬 Chat & Negotiate
                </button>

                {chatOpen && (
                  <ChatModal
                    serviceId={service._id}
                    providerId={service.serviceby._id}
                    providerName={service.serviceby.username}
                    onClose={() => setChatOpen(false)}
                  />
                )}
              </>
            )}

            {isOwner && (
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="flex-1 bg-red-50 text-red-500 py-3 rounded-xl font-medium text-sm hover:bg-red-100 disabled:opacity-50"
              >
                {deleting ? "Deleting..." : "Delete Service"}
              </button>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}