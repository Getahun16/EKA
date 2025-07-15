"use client";

import { useEffect, useState } from "react";
import LoadingSpinner from "@/app/components/LoadingSpinner";

interface Registration {
  id: number;
  fullName: string;
  dateOfBirth: string;
  email: string;
  mobileNumber: string;
  gender: string;
  occupation: string;
  idType: string;
  idNumber: string;
  issuedAuthority: string;
  issuedPlace: string;
  issuedDate: string;
  expiryDate: string;
  createdAt: string;
}

const PAGE_SIZE = 10;

export default function AdminRegistrations() {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRegistrations() {
      try {
        setLoading(true);
        const res = await fetch("/api/registrations");
        if (!res.ok) throw new Error("Failed to fetch registrations");
        const data = await res.json();
        setRegistrations(data);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setLoading(false);
      }
    }
    fetchRegistrations();
  }, []);

  const totalPages = Math.ceil(registrations.length / PAGE_SIZE);
  const currentData = registrations.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-sky-700">Memberships</h1>

      {loading && (
        <div className="flex justify-center py-12">
          <LoadingSpinner />
        </div>
      )}

      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-4 shadow">
          Error: {error}
        </div>
      )}

      {!loading && !error && registrations.length === 0 && (
        <div className="text-gray-500 text-center">No registrations found.</div>
      )}

      {!loading && !error && registrations.length > 0 && (
        <>
          <div className="overflow-x-auto bg-white rounded-lg shadow-md">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-sky-700 text-white uppercase text-xs">
                <tr>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">DOB</th>
                  <th className="px-4 py-3">Mobile</th>
                  <th className="px-4 py-3">Gender</th>
                  <th className="px-4 py-3">Occupation</th>
                  <th className="px-4 py-3">ID Type</th>
                  <th className="px-4 py-3">ID Number</th>
                  <th className="px-4 py-3">Issued Authority</th>
                  <th className="px-4 py-3">Issued Place</th>
                  <th className="px-4 py-3">Issued Date</th>
                  <th className="px-4 py-3">Expiry Date</th>
                  <th className="px-4 py-3">Submitted At</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {currentData.map((reg) => (
                  <tr key={reg.id} className="hover:bg-gray-50 transition">
                    <td className="px-4 py-2">{reg.fullName}</td>
                    <td className="px-4 py-2">{reg.email}</td>
                    <td className="px-4 py-2">
                      {new Date(reg.dateOfBirth).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-2">{reg.mobileNumber}</td>
                    <td className="px-4 py-2">{reg.gender}</td>
                    <td className="px-4 py-2">{reg.occupation}</td>
                    <td className="px-4 py-2">{reg.idType}</td>
                    <td className="px-4 py-2">{reg.idNumber}</td>
                    <td className="px-4 py-2">{reg.issuedAuthority}</td>
                    <td className="px-4 py-2">{reg.issuedPlace}</td>
                    <td className="px-4 py-2">
                      {new Date(reg.issuedDate).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-2">
                      {new Date(reg.expiryDate).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-2">
                      {new Date(reg.createdAt).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center items-center mt-6 gap-4 text-sm">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              Previous
            </button>

            <span className="text-gray-600">
              Page <strong>{currentPage}</strong> of{" "}
              <strong>{totalPages}</strong>
            </span>

            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
