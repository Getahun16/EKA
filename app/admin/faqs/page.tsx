"use client";

import { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { FiEdit2, FiTrash2, FiPlus, FiX, FiSave } from "react-icons/fi";
import LoadingSpinner from "@/app/components/LoadingSpinner";

type Faq = {
  id: number;
  question: string;
  answer: string;
};

export default function AdminFaqPage() {
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [form, setForm] = useState({ question: "", answer: "" });
  const [editId, setEditId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  useEffect(() => {
    fetchFaqs();
  }, []);

  const fetchFaqs = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/faq");
      const data = await res.json();
      setFaqs(data);
    } catch {
      toast.error("Failed to fetch FAQs");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.question.trim() || !form.answer.trim()) {
      toast.error("Please fill all fields");
      return;
    }

    const toastId = toast.loading(editId ? "Updating FAQ..." : "Adding FAQ...");
    try {
      if (editId) {
        await fetch(`/api/faq/${editId}`, {
          method: "PUT",
          body: JSON.stringify(form),
          headers: { "Content-Type": "application/json" },
        });
      } else {
        await fetch("/api/faq", {
          method: "POST",
          body: JSON.stringify(form),
          headers: { "Content-Type": "application/json" },
        });
      }
      toast.success(editId ? "FAQ updated!" : "FAQ added!", { id: toastId });
      resetForm();
      fetchFaqs();
    } catch {
      toast.error("Something went wrong", { id: toastId });
    }
  };

  const confirmDelete = (id: number) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    const toastId = toast.loading("Deleting FAQ...");
    try {
      await fetch(`/api/faq/${deleteId}`, { method: "DELETE" });
      toast.success("FAQ deleted!", { id: toastId });
      fetchFaqs();
      setShowDeleteModal(false);
    } catch {
      toast.error("Failed to delete FAQ", { id: toastId });
    }
  };

  const handleEdit = (faq: Faq) => {
    setForm({ question: faq.question, answer: faq.answer });
    setEditId(faq.id);
    setShowForm(true);
    setTimeout(() => {
      document.getElementById("faq-form")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  };

  const resetForm = () => {
    setForm({ question: "", answer: "" });
    setEditId(null);
    setShowForm(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
      <Toaster position="top-center" />

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 animate-fade-in">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-800">
                Delete FAQ
              </h3>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100"
              >
                <FiX className="text-lg" />
              </button>
            </div>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this FAQ? This action cannot be
              undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-sky-800">Manage FAQs</h1>
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white rounded-lg transition-colors cursor-pointer"
          >
            <FiPlus className="text-lg" />
            Add FAQ
          </button>
        )}
      </div>

      {(showForm || editId) && (
        <form
          id="faq-form"
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow-lg p-6 mb-12 border border-gray-100"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">
              {editId ? "Edit FAQ" : "Add New FAQ"}
            </h2>
            <button
              type="button"
              onClick={resetForm}
              className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100 cursor-pointer"
            >
              <FiX className="text-lg" />
            </button>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Question
              </label>
              <input
                type="text"
                placeholder="Enter your question"
                value={form.question}
                onChange={(e) => setForm({ ...form, question: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Answer
              </label>
              <textarea
                placeholder="Enter the answer"
                value={form.answer}
                onChange={(e) => setForm({ ...form, answer: e.target.value })}
                rows={6}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                required
              />
            </div>

            <div className="flex justify-end gap-4 pt-4">
              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-3 rounded-lg font-medium text-white bg-sky-500 hover:bg-sky-600 transition-colors cursor-pointer"
              >
                <FiSave />
                {editId ? "Update FAQ" : "Save FAQ"}
              </button>
            </div>
          </div>
        </form>
      )}

      <div className="space-y-6">
        {loading ? (
          <div className="flex justify-center py-12">
            <LoadingSpinner />
          </div>
        ) : faqs.length === 0 ? (
          <div className="bg-gray-50 rounded-xl p-8 text-center">
            <p className="text-gray-500">
              No FAQs yet. Add your first one above.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div
                key={faq.id}
                className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-lg text-sky-800 mb-2">
                        {faq.question}
                      </h3>
                      <p className="text-gray-600 whitespace-pre-line">
                        {faq.answer}
                      </p>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <button
                        onClick={() => handleEdit(faq)}
                        className="p-2 text-sky-500 hover:text-sky-700 hover:bg-sky-50 rounded-full transition-colors cursor-pointer"
                        title="Edit"
                      >
                        <FiEdit2 />
                      </button>
                      <button
                        onClick={() => confirmDelete(faq.id)}
                        className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full transition-colors cursor-pointer"
                        title="Delete"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
