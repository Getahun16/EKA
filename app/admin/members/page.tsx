"use client";

import { useEffect, useState } from "react";
import { FiX } from "react-icons/fi";
import {
  FiEdit2,
  FiTrash2,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";

type Member = {
  id: number;
  title: string;
  name: string;
  position: string;
  type: "board" | "branch";
};

export default function AdminMembersPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [form, setForm] = useState<Omit<Member, "id">>({
    title: "",
    name: "",
    position: "",
    type: "board",
  });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  // Modal state for delete confirmation
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const fetchMembers = async () => {
    const res = await fetch("/api/members");
    const data = await res.json();
    setMembers(data);
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  // Calculate member counts
  const boardMembersCount = members.filter((m) => m.type === "board").length;
  const branchMembersCount = members.filter((m) => m.type === "branch").length;

  // Pagination logic
  const totalPages = Math.ceil(members.length / itemsPerPage);
  const paginatedMembers = members.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSubmit = async () => {
    if (editingId) {
      await fetch(`/api/members/${editingId}`, {
        method: "PUT",
        body: JSON.stringify(form),
        headers: { "Content-Type": "application/json" },
      });
      setEditingId(null);
    } else {
      await fetch("/api/members", {
        method: "POST",
        body: JSON.stringify(form),
        headers: { "Content-Type": "application/json" },
      });
    }
    setForm({ title: "", name: "", position: "", type: "board" });
    fetchMembers();
    setCurrentPage(1); // Reset to first page after adding/editing
  };

  const handleEdit = (member: Member) => {
    setForm({
      title: member.title,
      name: member.name,
      position: member.position,
      type: member.type,
    });
    setEditingId(member.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    await fetch(`/api/members/${deleteId}`, { method: "DELETE" });
    fetchMembers();
    // Adjust current page if last item on page was deleted
    if (paginatedMembers.length === 1 && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
    setShowDeleteModal(false);
    setDeleteId(null);
  };

  const cancelEdit = () => {
    setForm({ title: "", name: "", position: "", type: "board" });
    setEditingId(null);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-3xl font-bold text-sky-800">Manage Members</h2>
        <div className="flex gap-4">
          <div className="text-sm text-green-800 bg-green-100 px-3 py-1 rounded-full flex items-center gap-1">
            <span className="font-medium">{boardMembersCount}</span>
            <span>Board Members</span>
          </div>
          <div className="text-sm text-blue-800 bg-blue-100 px-3 py-1 rounded-full flex items-center gap-1">
            <span className="font-medium">{branchMembersCount}</span>
            <span>Branch Members</span>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          {editingId ? "Edit Member" : "Add New Member"}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              placeholder="e.g. Dr., Sr."
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              placeholder="Full name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Position
            </label>
            <input
              placeholder="Position"
              value={form.position}
              onChange={(e) => setForm({ ...form, position: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Type
            </label>
            <select
              value={form.type}
              onChange={(e) =>
                setForm({ ...form, type: e.target.value as "board" | "branch" })
              }
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition"
            >
              <option value="board">Board Member</option>
              <option value="branch">Branch Member</option>
            </select>
          </div>
        </div>
        <div className="flex justify-end space-x-3 mt-6">
          {editingId && (
            <button
              onClick={cancelEdit}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
            >
              Cancel
            </button>
          )}
          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition flex items-center"
          >
            {editingId ? "Update Member" : "Add Member"}
          </button>
        </div>
      </div>

      {/* Members Table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Position
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedMembers.map((member) => (
                <tr key={member.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {member.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {member.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {member.position}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        member.type === "board"
                          ? "bg-green-100 text-green-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {member.type === "board" ? "Board" : "Branch"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-3">
                      <button
                        onClick={() => handleEdit(member)}
                        className="text-sky-600 hover:text-sky-900 p-1 rounded hover:bg-sky-50"
                        title="Edit"
                      >
                        <FiEdit2 className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => {
                          setDeleteId(member.id);
                          setShowDeleteModal(true);
                        }}
                        className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50"
                        title="Delete"
                      >
                        <FiTrash2 className="h-5 w-5" />
                      </button>
                      {/* Delete Confirmation Modal */}
                      {showDeleteModal && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 animate-fade-in">
                            <div className="flex items-center justify-between mb-4">
                              <h3 className="text-xl font-semibold text-gray-800">
                                Delete Member
                              </h3>
                              <button
                                onClick={() => setShowDeleteModal(false)}
                                className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100 cursor-pointer"
                              >
                                <FiX className="w-5 h-5" />
                              </button>
                            </div>
                            <p className="text-gray-600 mb-6">
                              Are you sure you want to delete this member? This
                              action cannot be undone.
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
                    </div>
                  </td>
                </tr>
              ))}
              {members.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-4 text-center text-sm text-gray-500"
                  >
                    No members found. Add your first member above.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {members.length > 0 && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
            <div className="text-sm text-gray-700">
              Showing{" "}
              <span className="font-medium">
                {(currentPage - 1) * itemsPerPage + 1}
              </span>{" "}
              to{" "}
              <span className="font-medium">
                {Math.min(currentPage * itemsPerPage, members.length)}
              </span>{" "}
              of <span className="font-medium">{members.length}</span> members
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`px-3 py-1 rounded border ${
                  currentPage === 1
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "hover:bg-gray-100 text-gray-700"
                }`}
              >
                <FiChevronLeft className="h-5 w-5" />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-1 rounded border ${
                      currentPage === page
                        ? "bg-sky-600 text-white border-sky-600"
                        : "hover:bg-gray-100 text-gray-700"
                    }`}
                  >
                    {page}
                  </button>
                )
              )}
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className={`px-3 py-1 rounded border ${
                  currentPage === totalPages
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "hover:bg-gray-100 text-gray-700"
                }`}
              >
                <FiChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
