"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Pencil, Trash2, X, Loader2 } from "lucide-react";
import { toast, Toaster } from "react-hot-toast";
import { FiPlus, FiX } from "react-icons/fi";
import LoadingSpinner from "@/app/components/LoadingSpinner";

interface Partner {
  id: number;
  name: string;
  logo: string;
  createdAt?: string;
}

export default function ManagePartnersPage() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [name, setName] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [loadingPartners, setLoadingPartners] = useState(true);

  // Modal state
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  useEffect(() => {
    fetchPartners();
  }, []);

  async function fetchPartners() {
    try {
      setLoadingPartners(true);
      const res = await fetch("/api/partner");
      const data = await res.json();
      setPartners(Array.isArray(data) ? data : []);
    } catch {
      toast.error("Failed to load partners");
    } finally {
      setLoadingPartners(false);
    }
  }

  function resetForm() {
    setEditingId(null);
    setName("");
    setImageFile(null);
    setImagePreview(null);
    setShowForm(false);
  }

  function startEdit(p: Partner) {
    setEditingId(p.id);
    setName(p.name);
    setImagePreview(p.logo);
    setShowForm(true);
  }

  function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null;
    if (file && file.size > 2 * 1024 * 1024) {
      toast.error("Image must be <2MB");
      return;
    }
    setImageFile(file);
    setImagePreview(file ? URL.createObjectURL(file) : null);
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return toast.error("Name is required");
    if (!editingId && !imageFile) return toast.error("Logo is required");

    setLoading(true);
    const fd = new FormData();
    fd.append("name", name);
    if (imageFile) fd.append("logo", imageFile, imageFile.name);
    else if (editingId && imagePreview) fd.append("existingLogo", imagePreview);

    try {
      const url = editingId ? `/api/partner/${editingId}` : "/api/partner";
      const res = await fetch(url, {
        method: editingId ? "PUT" : "POST",
        body: fd,
      });
      if (!res.ok) throw new Error(await res.text());

      toast.success(editingId ? "Updated!" : "Added!");
      resetForm();
      fetchPartners();
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "An unknown error occurred";
      toast.error("Save failed: " + message);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    if (!deleteId) return;
    try {
      const res = await fetch(`/api/partner/${deleteId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        toast.success("Partner deleted");
        fetchPartners();
      } else {
        toast.error("Failed to delete partner");
      }
    } catch {
      toast.error("Delete failed");
    } finally {
      setShowDeleteModal(false);
      setDeleteId(null);
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <Toaster />

      {!showForm && (
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-sky-700">Manage Partners</h2>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 bg-sky-500 hover:bg-blue-300 text-white px-4 py-2 rounded-lg shadow transition"
          >
            <FiPlus />
            Add Partner
          </button>
        </div>
      )}

      {(showForm || editingId) && (
        <form
          onSubmit={onSubmit}
          className="bg-white p-6 rounded-2xl shadow-lg space-y-4 border border-gray-200"
        >
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold text-sky-700">
              {editingId ? "Edit Partner" : "Add Partner"}
            </h3>
            <button
              type="button"
              onClick={resetForm}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          <input
            type="text"
            placeholder="Partner Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
          />

          <div className="flex items-center gap-4">
            <label className="bg-gray-100 px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-200 transition">
              Choose Logo
              <input
                type="file"
                accept="image/*"
                onChange={onFileChange}
                className="hidden"
              />
            </label>
            {imagePreview && (
              <div className="w-20 h-16 border border-gray-200 rounded-lg overflow-hidden">
                <Image
                  src={imagePreview}
                  alt="Preview"
                  width={80}
                  height={64}
                  className="object-contain"
                />
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`flex items-center gap-2 px-6 py-2 rounded-lg text-white ${
              loading
                ? "bg-blue-200 cursor-not-allowed"
                : "bg-blue-300 hover:bg-blue-400"
            } shadow transition`}
          >
            {loading ? (
              <Loader2 className="animate-spin w-5 h-5" />
            ) : (
              <Pencil className="w-5 h-5" />
            )}
            {editingId ? "Update" : "Save"}
          </button>
        </form>
      )}

      {/* Partners Grid */}
      {loadingPartners ? (
        <div className="flex justify-center py-12">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {partners.map((p) => (
            <div
              key={p.id}
              className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden flex flex-col"
            >
              <div className="flex-1 bg-gray-50 p-4 flex items-center justify-center">
                <Image
                  src={p.logo}
                  alt={p.name}
                  width={140}
                  height={100}
                  className="object-contain"
                />
              </div>
              <div className="p-4 flex flex-col">
                <h4 className="font-bold text-lg text-gray-800 text-center mb-4 line-clamp-2">
                  {p.name}
                </h4>
                <div className="flex justify-between">
                  <button
                    onClick={() => startEdit(p)}
                    className="text-blue-600 hover:text-blue-800"
                    title="Edit"
                  >
                    <Pencil className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => {
                      setDeleteId(p.id);
                      setShowDeleteModal(true);
                    }}
                    className="text-red-600 hover:text-red-800"
                    title="Delete"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 animate-fade-in">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-800">
                Delete Partner
              </h3>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this partner? This action cannot
              be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
