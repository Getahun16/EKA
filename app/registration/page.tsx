"use client";

import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function RegistrationForm() {
  const [form, setForm] = useState({
    fullName: "",
    dateOfBirth: "",
    email: "",
    mobileNumber: "",
    gender: "",
    occupation: "",
    idType: "",
    idNumber: "",
    issuedAuthority: "",
    issuedPlace: "",
    issuedDate: "",
    expiryDate: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.fullName.trim()) newErrors.fullName = "Full Name is required";
    if (!form.dateOfBirth) newErrors.dateOfBirth = "Date of Birth is required";

    if (!form.email) newErrors.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(form.email))
      newErrors.email = "Email format is invalid";

    if (!form.mobileNumber.trim())
      newErrors.mobileNumber = "Mobile Number is required";

    if (!form.gender) newErrors.gender = "Please select gender";

    if (!form.occupation.trim())
      newErrors.occupation = "Occupation is required";

    if (!form.idType) newErrors.idType = "Please select ID Type";

    if (!form.idNumber.trim()) newErrors.idNumber = "ID Number is required";

    if (!form.issuedAuthority.trim())
      newErrors.issuedAuthority = "Issued Authority is required";

    if (!form.issuedPlace.trim())
      newErrors.issuedPlace = "Issued Place is required";

    if (!form.issuedDate) newErrors.issuedDate = "Issued Date is required";

    if (!form.expiryDate) newErrors.expiryDate = "Expiry Date is required";

    if (form.issuedDate && form.expiryDate) {
      if (new Date(form.expiryDate) <= new Date(form.issuedDate)) {
        newErrors.expiryDate = "Expiry Date must be after Issued Date";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    setLoading(true);
    setSuccess(false);

    try {
      const res = await fetch("/api/registrations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          dateOfBirth: new Date(form.dateOfBirth),
          issuedDate: new Date(form.issuedDate),
          expiryDate: new Date(form.expiryDate),
        }),
      });

      if (res.ok) {
        setSuccess(true);
        toast.success("Registration successful!");
        // Optionally reset form here if you want:
        // setForm({ fullName: "", dateOfBirth: "", email: "", ... });
      } else {
        const { message } = await res.json();
        toast.error(message || "Registration failed");
      }
    } catch {
      toast.error("An error occurred during registration");
    } finally {
      setLoading(false);
    }
  };

  const inputBase =
    "w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300";

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-2xl shadow-lg mt-16 mb-8">
      {/* Toast */}
      <Toaster
        position="top-center"
        toastOptions={{
          style: { background: "#363636", color: "#fff" },
          success: { iconTheme: { primary: "#10B981", secondary: "#fff" } },
          error: { iconTheme: { primary: "#EF4444", secondary: "#fff" } },
        }}
      />

      <h2 className="text-3xl font-bold text-center text-sky-500 mb-6">
        Registration Form
      </h2>

      {/* Show success message if form submitted successfully */}
      {success && (
        <div className="mb-6 p-4 text-green-800 bg-green-100 rounded-lg text-center font-semibold">
          Registration successful!
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
        noValidate
      >
        {/* Personal Details */}
        <h3 className="col-span-full text-lg font-semibold text-gray-700">
          Personal Details
        </h3>

        <div>
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={form.fullName}
            onChange={handleChange}
            className={`${inputBase} ${
              errors.fullName ? "border-red-500" : "border-gray-300"
            }`}
            required
          />
          {errors.fullName && (
            <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
          )}
        </div>

        <div>
          <input
            type="date"
            name="dateOfBirth"
            value={form.dateOfBirth}
            onChange={handleChange}
            className={`${inputBase} ${
              errors.dateOfBirth ? "border-red-500" : "border-gray-300"
            }`}
            required
          />
          {errors.dateOfBirth && (
            <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth}</p>
          )}
        </div>

        <div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className={`${inputBase} ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
            required
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        <div>
          <input
            type="text"
            name="mobileNumber"
            placeholder="Mobile Number"
            value={form.mobileNumber}
            onChange={handleChange}
            className={`${inputBase} ${
              errors.mobileNumber ? "border-red-500" : "border-gray-300"
            }`}
            required
          />
          {errors.mobileNumber && (
            <p className="text-red-500 text-sm mt-1">{errors.mobileNumber}</p>
          )}
        </div>

        <div>
          <select
            name="gender"
            value={form.gender}
            onChange={handleChange}
            className={`${inputBase} ${
              errors.gender ? "border-red-500" : "border-gray-300"
            }`}
            required
          >
            <option value="">Select Gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
          {errors.gender && (
            <p className="text-red-500 text-sm mt-1">{errors.gender}</p>
          )}
        </div>

        <div>
          <input
            type="text"
            name="occupation"
            placeholder="Occupation"
            value={form.occupation}
            onChange={handleChange}
            className={`${inputBase} ${
              errors.occupation ? "border-red-500" : "border-gray-300"
            }`}
            required
          />
          {errors.occupation && (
            <p className="text-red-500 text-sm mt-1">{errors.occupation}</p>
          )}
        </div>

        {/* Identity Details */}
        <h3 className="col-span-full text-lg font-semibold text-gray-700 mt-4">
          Identity Details
        </h3>

        <div>
          <select
            name="idType"
            value={form.idType}
            onChange={handleChange}
            className={`${inputBase} ${
              errors.idType ? "border-red-500" : "border-gray-300"
            }`}
            required
          >
            <option value="">Select ID Type</option>
            <option>Passport</option>
            <option>National ID</option>
            <option>Driver’s License</option>
          </select>
          {errors.idType && (
            <p className="text-red-500 text-sm mt-1">{errors.idType}</p>
          )}
        </div>

        <div>
          <input
            type="text"
            name="idNumber"
            placeholder="ID Number"
            value={form.idNumber}
            onChange={handleChange}
            className={`${inputBase} ${
              errors.idNumber ? "border-red-500" : "border-gray-300"
            }`}
            required
          />
          {errors.idNumber && (
            <p className="text-red-500 text-sm mt-1">{errors.idNumber}</p>
          )}
        </div>

        <div>
          <input
            type="text"
            name="issuedAuthority"
            placeholder="Issued Authority"
            value={form.issuedAuthority}
            onChange={handleChange}
            className={`${inputBase} ${
              errors.issuedAuthority ? "border-red-500" : "border-gray-300"
            }`}
            required
          />
          {errors.issuedAuthority && (
            <p className="text-red-500 text-sm mt-1">
              {errors.issuedAuthority}
            </p>
          )}
        </div>

        <div>
          <input
            type="text"
            name="issuedPlace"
            placeholder="Issued Place"
            value={form.issuedPlace}
            onChange={handleChange}
            className={`${inputBase} ${
              errors.issuedPlace ? "border-red-500" : "border-gray-300"
            }`}
            required
          />
          {errors.issuedPlace && (
            <p className="text-red-500 text-sm mt-1">{errors.issuedPlace}</p>
          )}
        </div>

        <div>
          <input
            type="date"
            name="issuedDate"
            value={form.issuedDate}
            onChange={handleChange}
            className={`${inputBase} ${
              errors.issuedDate ? "border-red-500" : "border-gray-300"
            }`}
            required
          />
          {errors.issuedDate && (
            <p className="text-red-500 text-sm mt-1">{errors.issuedDate}</p>
          )}
        </div>

        <div>
          <input
            type="date"
            name="expiryDate"
            value={form.expiryDate}
            onChange={handleChange}
            className={`${inputBase} ${
              errors.expiryDate ? "border-red-500" : "border-gray-300"
            }`}
            required
          />
          {errors.expiryDate && (
            <p className="text-red-500 text-sm mt-1">{errors.expiryDate}</p>
          )}
        </div>

        <div className="col-span-full mt-4">
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 bg-sky-500 text-white rounded-lg cursor-pointer hover:bg-sky-600 transition ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Submitting..." : "Next"}
          </button>
        </div>
      </form>
    </div>
  );
}
