"use client";

import { useEffect, useState } from "react";
import { Mail, User, MessageSquare, CalendarClock } from "lucide-react";
import LoadingSpinner from "@/app/components/LoadingSpinner";

interface Contact {
  id: number;
  name: string;
  email: string;
  message: string;
  createdAt: string;
}

const PAGE_SIZE = 3;

export default function AdminContacts() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedMessages, setExpandedMessages] = useState<
    Record<number, boolean>
  >({});

  useEffect(() => {
    async function fetchContacts() {
      try {
        setLoading(true);
        const res = await fetch("/api/contact");
        if (!res.ok) throw new Error("Failed to fetch contacts");
        const data = await res.json();
        if (!Array.isArray(data)) throw new Error("Invalid response format");
        setContacts(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Failed to load contacts");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchContacts();
  }, []);

  const totalPages = Math.ceil(contacts.length / PAGE_SIZE);
  const paginatedContacts = contacts.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const toggleMessage = (id: number) => {
    setExpandedMessages((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <h1 className="text-4xl font-bold text-sky-700 text-center mb-6">
        Contact Messages
      </h1>

      {loading ? (
        <div className="flex justify-center items-center min-h-[200px]">
          <LoadingSpinner />
        </div>
      ) : error ? (
        <div className="bg-red-100 text-red-700 px-4 py-3 rounded border border-red-300">
          <p className="font-semibold">Error: {error}</p>
        </div>
      ) : contacts.length === 0 ? (
        <div className="text-center text-gray-500 text-lg">
          No contact messages found.
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedContacts.map(
              ({ id, name, email, message, createdAt }) => {
                const isExpanded = expandedMessages[id];
                const shouldShowToggle = message.length > 150;

                return (
                  <div
                    key={id}
                    className="bg-white rounded-xl border shadow p-5 hover:shadow-lg transition flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <User className="text-sky-600" />
                        <p className="font-semibold text-gray-800">{name}</p>
                      </div>

                      <div className="flex items-center gap-3 mb-3 text-sm">
                        <Mail className="text-sky-600" size={16} />
                        <p className="text-gray-600">{email}</p>
                      </div>

                      <div className="flex items-start gap-3 mb-3 text-sm">
                        <MessageSquare
                          className="text-sky-600 mt-1"
                          size={16}
                        />
                        <div>
                          <p className="text-gray-700">
                            {isExpanded || !shouldShowToggle
                              ? message
                              : `${message.slice(0, 150)}...`}
                          </p>

                          {shouldShowToggle && (
                            <button
                              onClick={() => toggleMessage(id)}
                              className="mt-2 text-sky-700 text-xs font-medium hover:underline"
                              aria-expanded={isExpanded}
                            >
                              {isExpanded ? "See Less" : "See More"}
                            </button>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-gray-500 mt-4">
                      <CalendarClock size={14} />
                      <span>{new Date(createdAt).toLocaleString()}</span>
                    </div>
                  </div>
                );
              }
            )}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-8">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
              >
                Previous
              </button>

              <span className="text-gray-600 text-sm">
                Page {currentPage} of {totalPages}
              </span>

              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
