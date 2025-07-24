"use client";

import { useEffect, useState, useRef } from "react";
import { FiSave, FiLoader, FiEdit2, FiTrash2, FiX } from "react-icons/fi";
import { toast, Toaster } from "react-hot-toast";
import LoadingSpinner from "@/app/components/LoadingSpinner";

interface MV {
  id: number;
  type: string;
  description: string;
}

export default function AdminMissionVision() {
  const [items, setItems] = useState<MV[]>([]);
  const [type, setType] = useState("mission");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const fetchData = async () => {
    try {
      const res = await fetch("/api/mission-vision");
      const data = await res.json();
      setItems(data);
    } catch {
      toast.error("Failed to fetch data");
    } finally {
      setIsInitialLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const formRef = useRef<HTMLFormElement | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return toast.error("Description is required");
    setIsLoading(true);
    const toastId = toast.loading(editingId ? "Updating..." : "Adding...");
    try {
      if (editingId) {
        // Update
        const res = await fetch(`/api/mission-vision/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ description }),
        });
        if (!res.ok) throw new Error("Failed to update");
        toast.success("Updated", { id: toastId });
        setEditingId(null);
      } else {
        // Add
        const res = await fetch("/api/mission-vision", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ type, description }),
        });
        if (!res.ok) throw new Error("Failed to submit");
        toast.success("Successfully added", { id: toastId });
      }
      setType("mission");
      setDescription("");
      fetchData();
    } catch {
      toast.error(editingId ? "Update failed" : "Submit failed", {
        id: toastId,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (item: MV) => {
    setEditingId(item.id);
    setType(item.type);
    setDescription(item.description);
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 100);
  };

  // handleUpdate removed; update is now handled in handleSubmit

  const confirmDelete = (id: number) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setIsLoading(true);
    const toastId = toast.loading("Deleting...");
    try {
      await fetch(`/api/mission-vision/${deleteId}`, {
        method: "DELETE",
      });
      toast.success("Deleted", { id: toastId });
      fetchData();
      setShowDeleteModal(false);
    } catch {
      toast.error("Delete failed", { id: toastId });
    } finally {
      setIsLoading(false);
    }
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
                Delete {items.find((i) => i.id === deleteId)?.type || "Item"}
              </h3>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100"
              >
                <FiX className="text-lg" />
              </button>
            </div>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this? This action cannot be
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

      <h1 className="text-3xl font-bold text-center text-sky-800 mb-10">
        Manage Mission & Vision
      </h1>

      {/* Form Card */}
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-lg p-6 mb-12 border border-gray-100"
        autoComplete="off"
      >
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          {editingId ? "Edit Item" : "Add New Item"}
        </h2>
        <div className="flex flex-col gap-4">
          <div>
            <label
              htmlFor="type"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Type
            </label>
            <select
              id="type"
              className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
              value={type}
              onChange={(e) => setType(e.target.value)}
              required
              disabled={!!editingId}
            >
              <option value="mission">Mission</option>
              <option value="vision">Vision</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Description
            </label>
            <textarea
              id="description"
              rows={4}
              className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
              placeholder="Enter description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-end gap-3">
            {editingId && (
              <button
                type="button"
                onClick={() => {
                  setEditingId(null);
                  setType("mission");
                  setDescription("");
                }}
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition cursor-pointer"
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              disabled={isLoading}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium text-white bg-sky-600 hover:bg-sky-700 transition-colors cursor-pointer ${
                isLoading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? (
                <>
                  <FiLoader className="animate-spin" />{" "}
                  {editingId ? "Saving..." : "Saving..."}
                </>
              ) : (
                <>
                  <FiSave /> {editingId ? "Save Changes" : "Add Item"}
                </>
              )}
            </button>
          </div>
        </div>
      </form>

      {/* List Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Current Items</h2>
        {isInitialLoading ? (
          <div className="flex justify-center items-center h-60">
            <LoadingSpinner />
          </div>
        ) : items.length === 0 ? (
          <div className="bg-gray-50 rounded-xl p-8 text-center">
            <p className="text-gray-500">
              No mission or vision items added yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {items.map((item) => (
              <div
                key={item.id}
                className={`bg-white rounded-xl shadow-md overflow-hidden border ${
                  item.type === "mission"
                    ? "border-green-100"
                    : "border-blue-100"
                } hover:shadow-lg transition-shadow`}
                id={`edit-form-${item.id}`}
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        item.type === "mission"
                          ? "bg-green-100 text-green-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                    </span>
                    {editingId !== item.id && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(item)}
                          className="p-2 text-sky-600 hover:text-sky-800 hover:bg-sky-50 rounded-full transition-colors cursor-pointer"
                          title="Edit"
                        >
                          <FiEdit2 />
                        </button>
                        <button
                          onClick={() => confirmDelete(item.id)}
                          className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-full transition-colors cursor-pointer"
                          title="Delete"
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    )}
                  </div>

                  <p className="text-gray-700 whitespace-pre-line">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
