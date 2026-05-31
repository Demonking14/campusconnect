"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import Link from "next/link";

interface Service {
  _id: string;
  title: string;
  description: string;
  price: number;
  isActive: boolean;
  serviceby: {
    username: string;
    avatar: string;
    email: string;
  };
}

interface UserData {
  activeServices: Service[];
  providedServices: Service[];
}

export default function DashboardPage() {
  const { data: session } = useSession();
  const [userData, setUserData] = useState<UserData>({
    activeServices: [],
    providedServices: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const { data } = await axios.get("/api/user/dashboard");
        if (data.success) setUserData(data.data);
      } catch (error) {
        console.error("Dashboard fetch error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  return (
    <div className="p-6 max-w-5xl mx-auto">

      {/* Welcome */}
      <div className="mb-8">
        <h1 className="text-2xl font-black text-gray-900 tracking-tight">
          Hey, {session?.user?.name?.split(" ")[0]} 👋
        </h1>
        <p className="text-gray-400 text-sm mt-1">
          Here's what's happening on your campus
        </p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-10">
        <div className="bg-white rounded-2xl p-5 border border-gray-100">
          <p className="text-3xl font-black text-gray-900">
            {userData.providedServices.length}
          </p>
          <p className="text-xs text-gray-400 mt-1 font-medium">Services offered</p>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-gray-100">
          <p className="text-3xl font-black text-gray-900">
            {userData.activeServices.length}
          </p>
          <p className="text-xs text-gray-400 mt-1 font-medium">Services taken</p>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-gray-100 col-span-2 sm:col-span-1">
          <p className="text-3xl font-black text-green-500">
            ₹{userData.providedServices.reduce((acc, s) => acc + s.price, 0)}
          </p>
          <p className="text-xs text-gray-400 mt-1 font-medium">Total value offered</p>
        </div>
      </div>

      {/* Services You're Providing */}
      <section className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-black text-gray-900">
            Services you're offering
          </h2>
          <Link
            href="/services/create"
            className="text-xs font-semibold text-blue-500 hover:underline"
          >
            + Add new
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[1, 2].map((i) => (
              <div key={i} className="bg-white rounded-2xl p-5 border border-gray-100 animate-pulse h-28" />
            ))}
          </div>
        ) : userData.providedServices.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 border border-dashed border-gray-200 text-center">
            <p className="text-gray-400 text-sm mb-3">
              You haven't offered any services yet
            </p>
            <Link
              href="/services/create"
              className="text-sm font-semibold text-white bg-gray-900 px-5 py-2.5 rounded-xl hover:bg-gray-700 transition"
            >
              Offer a service
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {userData.providedServices.map((service) => (
              <ServiceCard key={service._id} service={service} owned />
            ))}
          </div>
        )}
      </section>

      {/* Services You've Taken */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-black text-gray-900">
            Services you've taken
          </h2>
          <Link
            href="/services"
            className="text-xs font-semibold text-blue-500 hover:underline"
          >
            Browse more
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[1, 2].map((i) => (
              <div key={i} className="bg-white rounded-2xl p-5 border border-gray-100 animate-pulse h-28" />
            ))}
          </div>
        ) : userData.activeServices.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 border border-dashed border-gray-200 text-center">
            <p className="text-gray-400 text-sm mb-3">
              You haven't taken any services yet
            </p>
            <Link
              href="/services"
              className="text-sm font-semibold text-white bg-gray-900 px-5 py-2.5 rounded-xl hover:bg-gray-700 transition"
            >
              Browse services
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {userData.activeServices.map((service) => (
              <ServiceCard key={service._id} service={service} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

function ServiceCard({ service, owned }: { service: Service; owned?: boolean }) {
  return (
    <Link href={`/services/${service._id}`}>
      <div className="bg-white rounded-2xl p-5 border border-gray-100 hover:border-gray-300 hover:shadow-sm transition cursor-pointer h-full">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-bold text-gray-900 text-sm leading-snug flex-1">
            {service.title}
          </h3>
          <span className="text-green-600 font-black text-sm whitespace-nowrap">
            ₹{service.price}
          </span>
        </div>
        <p className="text-xs text-gray-400 line-clamp-2 mb-3">
          {service.description}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold">
              {service.serviceby?.username?.[0]?.toUpperCase()}
            </div>
            <span className="text-xs text-gray-400">
              {service.serviceby?.username}
            </span>
          </div>
          {owned && (
            <span className="text-xs bg-green-50 text-green-600 font-semibold px-2 py-0.5 rounded-full">
              Your service
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}