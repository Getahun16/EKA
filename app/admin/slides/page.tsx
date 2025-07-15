"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { Edit2, Trash2, Plus, ChevronDown, X } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

interface Slide {
  id: number;
  title: string;
  description: string;
  image: string;
  createdAt: string;
}

const PAGE_SIZE = 6;
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export default function SlideManager() {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState({
    fetch: false,
    submit: false,
    delete: false,
  });
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchSlides();
  }, []);

  const fetchSlides = async () => {
    setIsLoading((p) => ({ ...p, fetch: true }));
    try {
      const res = await fetch("/api/slide");
      if (!res.ok) throw new Error();
      const data = await res.json();
      setSlides(Array.isArray(data) ? data : []);
    } catch {
      toast.error("Failed to load slides");
    } finally {
      setIsLoading((p) => ({ ...p, fetch: false }));
    }
  };

  const scrollToForm = () => {
    setShowForm(true);
    setTimeout(
      () => formRef.current?.scrollIntoView({ behavior: "smooth" }),
      50
    );
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setImageFile(null);
    setPreview(null);
    setEditingId(null);
  };

  const handleNew = () => {
    resetForm();
    scrollToForm();
  };

  const validateForm = () => {
    if (!title.trim()) return toast.error("Title is required"), false;
    if (!description.trim())
      return toast.error("Description is required"), false;
    if (!editingId && !imageFile)
      return toast.error("Image is required"), false;
    return true;
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/"))
      return toast.error("Only images allowed");
    if (file.size > MAX_FILE_SIZE) return toast.error("Max 5MB");
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading((p) => ({ ...p, submit: true }));
    const toastId = toast.loading(
      editingId ? "Updating slide..." : "Adding slide..."
    );

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      if (imageFile) formData.append("image", imageFile);
      if (editingId) formData.append("id", editingId.toString());

      const res = await fetch("/api/slide", {
        method: editingId ? "PUT" : "POST",
        body: formData,
      });
      if (!res.ok) throw new Error();

      toast.success(editingId ? "Slide updated!" : "Slide added!", {
        id: toastId,
      });
      resetForm();
      setShowForm(false);
      fetchSlides();
    } catch {
      toast.error("Operation failed", { id: toastId });
    } finally {
      setIsLoading((p) => ({ ...p, submit: false }));
    }
  };

  const confirmDelete = (id: number) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setIsLoading((p) => ({ ...p, delete: true }));
    const toastId = toast.loading("Deleting slide...");
    try {
      const res = await fetch("/api/slide", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: deleteId }),
      });
      if (!res.ok) throw new Error();

      toast.success("Slide deleted!", { id: toastId });
      setShowDeleteModal(false);
      setDeleteId(null);
      fetchSlides();
      if (slides.length % PAGE_SIZE === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    } catch {
      toast.error("Delete failed", { id: toastId });
    } finally {
      setIsLoading((p) => ({ ...p, delete: false }));
    }
  };

  const handleEdit = (slide: Slide) => {
    setTitle(slide.title);
    setDescription(slide.description);
    setPreview(slide.image);
    setEditingId(slide.id);
    scrollToForm();
  };

  const totalPages = Math.ceil(slides.length / PAGE_SIZE);
  const paginated = slides.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  return (
    <div className="p-6 max-w-5xl mx-auto relative">
      <Toaster position="top-right" />

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 animate-fade-in">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Delete Slide</h3>
              <button
                onClick={() => !isLoading.delete && setShowDeleteModal(false)}
                disabled={isLoading.delete}
                className="p-1 rounded-full hover:bg-gray-100 disabled:opacity-50"
              >
                <X size={20} />
              </button>
            </div>
            <p className="mb-6 text-gray-600">
              This action cannot be undone. Continue?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => !isLoading.delete && setShowDeleteModal(false)}
                disabled={isLoading.delete}
                className="px-4 py-2 border rounded-lg hover:bg-gray-100 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={isLoading.delete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-70"
              >
                {isLoading.delete ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-sky-600">Slides Manager</h1>
        <button
          onClick={handleNew}
          disabled={isLoading.fetch}
          className="flex items-center gap-2 px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-blue-300 disabled:opacity-50"
        >
          <Plus size={18} /> New Slide
        </button>
      </div>

      {/* Form Accordion */}
      <div ref={formRef} className="mb-10">
        <div
          className="flex justify-between items-center p-6 bg-white rounded-2xl shadow-lg cursor-pointer"
          onClick={() => !isLoading.submit && setShowForm((v) => !v)}
        >
          <h2 className="text-2xl font-semibold">
            {editingId ? "Edit Slide" : "Add Slide"}
          </h2>
          {showForm ? <X size={24} /> : <ChevronDown size={24} />}
        </div>

        {showForm && (
          <form
            onSubmit={handleSubmit}
            className="mt-4 p-6 bg-white rounded-2xl shadow-lg space-y-4"
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Title *"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-300"
                disabled={isLoading.submit}
              />
              <label className="w-full cursor-pointer">
                <div className="p-3 bg-gray-50 border rounded-lg text-center hover:bg-gray-100">
                  {imageFile?.name || "Choose Image *"}
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  disabled={isLoading.submit}
                />
              </label>
            </div>

            <textarea
              placeholder="Description *"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-300"
              rows={4}
              disabled={isLoading.submit}
            />

            {preview && (
              <div className="relative w-full h-64 overflow-hidden rounded-lg border">
                <Image
                  src={preview}
                  alt="Preview"
                  fill
                  className="object-cover"
                  style={{ objectFit: "cover" }}
                />
              </div>
            )}

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={isLoading.submit}
                className="flex items-center gap-2 px-8 py-3 bg-sky-600 text-white rounded-lg hover:bg-blue-300 disabled:opacity-70"
              >
                {isLoading.submit ? (
                  editingId ? (
                    "Updating..."
                  ) : (
                    "Adding..."
                  )
                ) : editingId ? (
                  <>
                    <Edit2 size={18} />
                    Update Slide
                  </>
                ) : (
                  <>
                    <Plus size={18} />
                    Add Slide
                  </>
                )}
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={() => {
                    resetForm();
                    setShowForm(false);
                  }}
                  disabled={isLoading.submit}
                  className="px-8 py-3 bg-gray-300 rounded-lg hover:bg-gray-400 disabled:opacity-50"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        )}
      </div>

      {/* Slides List */}
      <h2 className="text-2xl font-semibold mb-4">Slides List</h2>

      {isLoading.fetch ? (
        <div className="flex justify-center py-20">
          <div className="w-12 h-12 border-4 border-sky-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : slides.length === 0 ? (
        <div className="p-8 bg-gray-50 rounded-2xl text-center">
          <p className="mb-4 text-gray-500">No slides yet.</p>
          <button
            onClick={handleNew}
            className="px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-blue-300"
          >
            Add Your First Slide
          </button>
        </div>
      ) : (
        <>
          <div className="grid md:grid-cols-2 gap-6">
            {paginated.map((slide) => (
              <div
                key={slide.id}
                className="relative bg-white rounded-2xl shadow hover:shadow-lg transition"
              >
                <div className="relative h-48 w-full">
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div className="p-4">
                  <h3 className="mb-1 text-lg font-bold">{slide.title}</h3>
                  <p className="mb-3 text-sm text-gray-600 line-clamp-2">
                    {slide.description}
                  </p>
                  <div className="flex gap-4">
                    <button
                      onClick={() => handleEdit(slide)}
                      className="flex items-center gap-1 text-sky-600 hover:text-sky-700 transition-colors"
                    >
                      <Edit2 size={16} /> Edit
                    </button>
                    <button
                      onClick={() => confirmDelete(slide.id)}
                      className="flex items-center gap-1 text-red-600 hover:text-red-400 transition-colors"
                    >
                      <Trash2 size={16} /> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-8">
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1 || isLoading.fetch}
                className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-50"
              >
                Previous
              </button>
              <span className="text-gray-600">
                Page <strong>{currentPage}</strong> of{" "}
                <strong>{totalPages}</strong>
              </span>
              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(p + 1, totalPages))
                }
                disabled={currentPage === totalPages || isLoading.fetch}
                className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-50"
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
