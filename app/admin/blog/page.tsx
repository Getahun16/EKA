"use client";
const MAX_FILE_SIZE = 15 * 1024 * 1024; // 2MB

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

interface Blog {
  id: number;
  title: string;
  content: string;
  image?: string;
  createdAt: string;
}

export default function BlogManager() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [errors, setErrors] = useState({ title: "", content: "", image: "" });
  const [showForm, setShowForm] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await fetch("/api/blog");
      const data = await res.json();
      setBlogs(data);
    } catch {
      toast.error("Failed to fetch blogs");
    } finally {
      setIsInitialLoading(false); // hide initial spinner
    }
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { title: "", content: "", image: "" };

    if (!title.trim()) {
      newErrors.title = "Title is required";
      isValid = false;
    } else if (title.length > 100) {
      newErrors.title = "Title must be less than 100 characters";
      isValid = false;
    }

    if (!content.trim()) {
      newErrors.content = "Content is required";
      isValid = false;
    } else if (content.length < 50) {
      newErrors.content = "Content must be at least 50 characters";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    const toastId = toast.loading(
      editingId ? "Updating blog..." : "Creating blog..."
    );

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if (imageFile) formData.append("image", imageFile);
    if (editingId) formData.append("id", editingId.toString());

    try {
      const res = await fetch("/api/blog", {
        method: editingId ? "PUT" : "POST",
        body: formData,
      });

      if (!res.ok) throw new Error(res.statusText);

      toast.success(editingId ? "Blog updated!" : "Blog created!", {
        id: toastId,
      });
      resetForm();
      fetchBlogs();
    } catch {
      toast.error("Something went wrong", { id: toastId });
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
    const toastId = toast.loading("Deleting blog...");

    try {
      const res = await fetch("/api/blog", {
        method: "DELETE",
        body: JSON.stringify({ id: deleteId }),
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) throw new Error("Failed to delete blog");

      toast.success("Blog deleted!", { id: toastId });
      fetchBlogs();
      setShowDeleteModal(false);
      setDeleteId(null);
    } catch {
      toast.error("Delete failed", { id: toastId });
    }
  };

  const handleEdit = (blog: Blog) => {
    setTitle(blog.title);
    setContent(blog.content);
    setImageFile(null);
    setImagePreview(blog.image || null);
    setEditingId(blog.id);
    setShowForm(true);
    setTimeout(() => {
      document.getElementById("blog-form")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  };

  const resetForm = () => {
    setTitle("");
    setContent("");
    setImageFile(null);
    setImagePreview(null);
    setEditingId(null);
    setErrors({ title: "", content: "", image: "" });
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
                Delete News
              </h3>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100"
              ></button>
            </div>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this news? This action cannot be
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

      {!showForm && (
        <div className="flex justify-end mb-8">
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 px-4 py-2 bg-sky-500 hover:bg-blue-300 text-white rounded-lg transition-colors cursor-pointer"
          >
            <FiPlus className="text-lg" />
            Add News
          </button>
        </div>
      )}

      {(showForm || editingId) && (
        <form
          id="blog-form"
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow-lg p-6 mb-12 border border-gray-100"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">
              {editingId ? "Edit Blog Post" : "Create New Blog Post"}
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
                News Title
              </label>
              <input
                type="text"
                placeholder="Enter blog title"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  if (errors.title) setErrors({ ...errors, title: "" });
                }}
                className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 ${
                  errors.title ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-600">{errors.title}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                News Content
              </label>
              <textarea
                placeholder="Write your blog content here..."
                value={content}
                onChange={(e) => {
                  setContent(e.target.value);
                  if (errors.content) setErrors({ ...errors, content: "" });
                }}
                rows={8}
                className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 ${
                  errors.content ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.content && (
                <p className="mt-1 text-sm text-red-600">{errors.content}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Featured Image
              </label>
              <div className="flex items-center gap-4">
                <label className="flex-1 cursor-pointer">
                  <div className="px-4 py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-lg border border-gray-300 text-center transition-colors">
                    Choose Image
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        if (file.size > MAX_FILE_SIZE) {
                          setImageFile(null);
                          setImagePreview(null);
                          toast.error("Image must be less than 2MB");
                          return;
                        }
                        setImageFile(file);
                        setImagePreview(URL.createObjectURL(file));
                      }
                    }}
                    className="hidden"
                  />
                </label>
                {imagePreview && (
                  <button
                    type="button"
                    onClick={() => {
                      setImageFile(null);
                      setImagePreview(null);
                    }}
                    className="flex items-center gap-1 px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-colors cursor-pointer"
                  >
                    <FiTrash2 className="text-sm" />
                    Remove
                  </button>
                )}
              </div>
            </div>

            {imagePreview && (
              <div className="relative w-full h-64 rounded-lg overflow-hidden border border-gray-200">
                <Image
                  src={getImageSrc(imagePreview)}
                  alt="Preview"
                  fill
                  sizes="100vw"
                  className="object-cover"
                />
              </div>
            )}

            <div className="flex justify-end gap-4 pt-4">
              <button
                type="submit"
                disabled={isLoading}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium text-white bg-sky-500 hover:bg-blue-300 transition-colors cursor-pointer ${
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
                    {editingId ? "Update Blog" : "Create Blog"}
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      )}

      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Manage News Post
        </h2>
        {isInitialLoading ? (
          <div className="flex justify-center items-center h-60">
            <LoadingSpinner />
          </div>
        ) : blogs.length === 0 ? (
          <div className="bg-gray-50 rounded-xl p-8 text-center">
            <p className="text-gray-500">
              No news post yet. Create your first one!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog) => (
              <div
                key={blog.id}
                className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow"
              >
                {blog.image && (
                  <div className="relative h-48 w-full">
                    <Image
                      src={getImageSrc(blog.image)}
                      alt={blog.title}
                      fill
                      sizes="100vw"
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="p-5">
                  <h3 className="font-bold text-xl mb-2 text-gray-900 line-clamp-2">
                    {blog.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {blog.content}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-400">
                      {new Date(blog.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleEdit(blog)}
                        className="p-2 text-sky-500 hover:text-sky-700 hover:bg-sky-50 rounded-full transition-colors cursor-pointer"
                        title="Edit"
                      >
                        <FiEdit2 />
                      </button>
                      <button
                        onClick={() => confirmDelete(blog.id)}
                        className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-full transition-colors cursor-pointer"
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
