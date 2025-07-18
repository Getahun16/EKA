"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { toast, Toaster } from "react-hot-toast";
import LoadingSpinner from "@/app/components/LoadingSpinner";
import {
  FiEdit2,
  FiTrash2,
  FiPlus,
  FiX,
  FiSave,
  FiLoader,
} from "react-icons/fi";

type DonationMethod = {
  id: number;
  accountName?: string | null;
  accountNumber?: string | null;
  logoUrl: string;
  createdAt: string;
};

type Errors = {
  accountName?: string;
  accountNumber?: string;
  logoUrl?: string;
};

export default function AdminDonationMethods() {
  const [methods, setMethods] = useState<DonationMethod[]>([]);
  const [accountName, setAccountName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [logoUrl, setLogoUrl] = useState<string>("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    fetchMethods();
  }, []);

  const fetchMethods = async () => {
    setIsInitialLoading(true);
    try {
      const res = await fetch("/api/donation-methods");
      const data = await res.json();
      setMethods(data);
    } catch {
      toast.error("Failed to fetch donation methods");
    } finally {
      setIsInitialLoading(false);
    }
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors: Errors = {};

    if (!logoUrl) {
      newErrors.logoUrl = "Logo is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const uploadImage = async (file: File): Promise<string> => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload-image", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Image upload failed");
      }

      const data = await res.json();
      return data.url;
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    const toastId = toast.loading(
      editingId ? "Updating donation method..." : "Creating donation method..."
    );

    try {
      const body = {
        accountName: accountName || null,
        accountNumber: accountNumber || null,
        logoUrl,
      };

      const res = await fetch(
        editingId
          ? `/api/donation-methods?id=${editingId}`
          : "/api/donation-methods",
        {
          method: editingId ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );

      if (!res.ok) throw new Error("Failed to save donation method");

      toast.success(
        editingId ? "Donation method updated!" : "Donation method created!",
        { id: toastId }
      );
      resetForm();
      fetchMethods();
    } catch (error) {
      toast.error("Something went wrong", { id: toastId });
      console.error("Donation method save error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const confirmDelete = (id: number) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    const toastId = toast.loading("Deleting donation method...");

    try {
      const res = await fetch(`/api/donation-methods?id=${deleteId}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete donation method");

      toast.success("Donation method deleted!", { id: toastId });
      fetchMethods();
      setShowDeleteModal(false);
      setDeleteId(null);
    } catch (error) {
      toast.error("Delete failed", { id: toastId });
      console.error("Delete failed:", error);
    }
  };

  const handleEdit = (method: DonationMethod) => {
    setAccountName(method.accountName || "");
    setAccountNumber(method.accountNumber || "");
    setLogoUrl(method.logoUrl);
    setImagePreview(method.logoUrl);
    setEditingId(method.id);
    setShowForm(true);
    setTimeout(() => {
      document.getElementById("donation-form")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  };

  const resetForm = () => {
    setAccountName("");
    setAccountNumber("");
    setLogoUrl("");
    setImagePreview(null);
    setEditingId(null);
    setErrors({});
    setShowForm(false);
  };

  const getImageSrc = (src: string | null) => {
    if (!src) return "/placeholder.jpg";
    if (src.startsWith("blob:") || src.startsWith("data:")) return src;
    if (src.startsWith("/uploads/")) return src;
    return `/uploads/${src}`;
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      <Toaster position="top-center" />

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 animate-fade-in">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-800">
                Delete Donation Method
              </h3>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this donation method? This action
              cannot be undone.
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

      {!showForm && (
        <div className="flex justify-end mb-8">
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 px-4 py-2 bg-sky-500 hover:bg-blue-300 text-white rounded-lg transition-colors"
          >
            <FiPlus className="text-lg" />
            Add Donation Method
          </button>
        </div>
      )}

      {(showForm || editingId) && (
        <form
          id="donation-form"
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow-lg p-6 mb-12 border border-gray-100"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">
              {editingId
                ? "Edit Donation Method"
                : "Create New Donation Method"}
            </h2>
            <button
              type="button"
              onClick={resetForm}
              className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100"
            >
              <FiX className="text-lg" />
            </button>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Account Name
              </label>
              <input
                type="text"
                placeholder="Enter account name"
                value={accountName}
                onChange={(e) => setAccountName(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-300 focus:border-blue-300 border-gray-300"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Account Number
              </label>
              <input
                type="text"
                placeholder="Enter account number"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-300 focus:border-blue-300 border-gray-300"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Logo Image
              </label>
              <div className="flex items-center gap-4">
                <label className="flex-1 cursor-pointer">
                  <div className="px-4 py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-lg border border-gray-300 text-center transition-colors">
                    Choose Image
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        if (file.size > 2 * 1024 * 1024) {
                          toast.error("Image must be less than 2MB");
                          return;
                        }
                        setImagePreview(URL.createObjectURL(file));
                        try {
                          const url = await uploadImage(file);
                          setLogoUrl(url);
                        } catch {
                          toast.error("Failed to upload image");
                        }
                      }
                    }}
                    className="hidden"
                  />
                </label>
                {imagePreview && (
                  <button
                    type="button"
                    onClick={() => {
                      setImagePreview(null);
                      setLogoUrl("");
                    }}
                    className="flex items-center gap-1 px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-colors"
                  >
                    <FiTrash2 className="text-sm" />
                    Remove
                  </button>
                )}
              </div>
              {errors.logoUrl && (
                <p className="mt-1 text-sm text-red-600">{errors.logoUrl}</p>
              )}
            </div>

            {imagePreview && (
              <div className="relative w-full h-64 rounded-lg overflow-hidden border border-gray-200">
                <Image
                  src={getImageSrc(imagePreview)}
                  alt="Preview"
                  fill
                  sizes="100vw"
                  className="object-contain"
                />
              </div>
            )}

            <div className="flex justify-end gap-4 pt-4">
              <button
                type="submit"
                disabled={isLoading}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium text-white bg-sky-500 hover:bg-blue-300 transition-colors ${
                  isLoading ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {isLoading ? (
                  <>
                    <FiLoader className="animate-spin" />
                    {editingId ? "Updating..." : "Creating..."}
                  </>
                ) : (
                  <>
                    <FiSave />
                    {editingId ? "Update Method" : "Create Method"}
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      )}

      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Manage Donation Methods
        </h2>
        {isInitialLoading ? (
          <div className="flex justify-center items-center h-60">
            <LoadingSpinner />
          </div>
        ) : methods.length === 0 ? (
          <div className="bg-gray-50 rounded-xl p-8 text-center">
            <p className="text-gray-500">
              No donation methods yet. Create your first one!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {methods.map((method) => (
              <div
                key={method.id}
                className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow"
              >
                <div className="relative h-48 w-full bg-gray-50">
                  <Image
                    src={getImageSrc(method.logoUrl)}
                    alt={method.accountName || "Donation Method"}
                    fill
                    sizes="100vw"
                    className="object-contain p-4"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-xl mb-2 text-gray-900 line-clamp-2">
                    {method.accountName || "Donation Method"}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {method.accountNumber || "No account number"}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-400">
                      {new Date(method.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleEdit(method)}
                        className="p-2 text-sky-500 hover:text-sky-700 hover:bg-sky-50 rounded-full transition-colors"
                        title="Edit"
                      >
                        <FiEdit2 />
                      </button>
                      <button
                        onClick={() => confirmDelete(method.id)}
                        className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-full transition-colors"
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
