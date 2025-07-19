"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner";

type DonationMethod = {
  id: number;
  accountName?: string | null;
  accountNumber?: string | null;
  logoUrl: string;
};

export default function DonatePage() {
  const [methods, setMethods] = useState<DonationMethod[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMethods() {
      const res = await fetch("/api/donation-methods");
      const data = await res.json();
      setMethods(data);
      setLoading(false);
    }
    fetchMethods();
  }, []);

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] w-full">
        <LoadingSpinner />
        <span className="mt-4 text-sky-600 text-lg text-center">
          Loading donation methods...
        </span>
      </div>
    );

  return (
    <section className="max-w-4xl mx-auto p-6 sm:p-10 bg-white  mt-12  mb-8">
      <h1 className="text-3xl sm:text-4xl font-bold text-center text-sky-500 mb-6">
        Support Our Work
      </h1>

      <p className="text-gray-700 text-lg mb-10 text-center max-w-2xl mx-auto leading-relaxed">
        Your donation helps us advance kidney health awareness, prevention, and
        care across Ethiopia. Every contribution matters.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {methods.map((method) => (
          <div
            key={method.id}
            className="bg-blue-50 p-6 rounded-xl border border-blue-200 shadow-sm"
          >
            <div className="flex items-center gap-3 mb-4">
              <Image
                src={method.logoUrl}
                alt={method.accountName || "Donation Method"}
                width={40}
                height={40}
              />
              <h2 className="text-xl font-semibold text-sky-500">
                {method.accountName || "Donation Method"}
              </h2>
            </div>
            {method.accountNumber && (
              <p className="text-gray-700">
                💳 Account Number:{" "}
                <span className="font-semibold text-sky-600">
                  {method.accountNumber}
                </span>
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
