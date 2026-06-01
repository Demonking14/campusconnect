"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function createServicePage() {
  const { data: session } = useSession();
  const [form, setForm] = useState({ title: "", description: "", price: "" });
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.title || !form.description || !form.price) {
      setError("All fields are required");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const { data } = await axios.post("/api/services", {
        title: form.title,
        description: form.description,
        price: Number(form.price),
      });
      if (data.success) router.push("/dashboard");
      else setError(data.message);
    } catch (error) {
      setError("Failed to create services");
    } finally {
      setLoading(false);
    }
  };

  if (!session) {
    return router.push("/login");
    
  }
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl border border-gray-100 p-8 w-full max-w-lg">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Offer a Service
        </h1>

        {error && (
          <p className="text-red-500 text-sm mb-4 bg-red-50 px-4 py-2 rounded-lg">
            {error}
          </p>
        )}

        <div className="flex flex-col gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Title
            </label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="e.g. Logo Design, DSA Tutoring"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-400"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Describe what you offer, timeline, deliverables..."
              rows={4}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-400 resize-none"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Price (₹)
            </label>
            <input
              name="price"
              type="number"
              value={form.price}
              onChange={handleChange}
              placeholder="e.g. 299"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-400"
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-red-500 text-white py-3 rounded-xl font-medium text-sm hover:bg-red-600 disabled:opacity-50 mt-2"
          >
            {loading ? "Creating..." : "Create Service"}
          </button>
        </div>
      </div>
    </div>
  );
}
