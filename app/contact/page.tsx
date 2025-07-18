"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { Mail, MapPin, Phone } from "lucide-react";

interface FormState {
  name: string;
  email: string;
  message: string;
}

export default function ContactUs() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<Partial<FormState>>(
    {}
  );

  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setSubmitted(false);
    setError(null);
    setValidationErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const validateEmail = (email: string) => /^\S+@\S+\.\S+$/.test(email);

  const validateForm = () => {
    const errors: Partial<FormState> = {};

    if (!form.name.trim()) {
      errors.name = "Name is required";
    } else if (form.name.trim().length < 2) {
      errors.name = "Name must be at least 2 characters";
    }

    if (!form.email.trim()) {
      errors.email = "Email is required";
    } else if (!validateEmail(form.email.trim())) {
      errors.email = "Email is invalid";
    }

    if (!form.message.trim()) {
      errors.message = "Message is required";
    } else if (form.message.trim().length < 10) {
      errors.message = "Message must be at least 10 characters";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (!validateForm()) return;

    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Failed to send message.");
      }

      setSubmitted(true);
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setSubmitted(false), 3000);
    } catch (err: unknown) {
      console.error(err);
      if (err instanceof Error) {
        setError(err.message || "Something went wrong.");
      } else {
        setError("Something went wrong.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-12 mt-16">
      <h1 className="text-4xl font-extrabold text-center text-sky-500 mb-8">
        Contact Us
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        {/* Contact Info */}
        <div className="space-y-8 ml-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            We’d love to hear from you
          </h2>
          <p className="text-gray-600">
            Feel free to reach out for any questions, feedback, or inquiries.
          </p>

          <div className="space-y-4 text-gray-700">
            <div className="flex items-start gap-4">
              <Phone className="text-sky-500 mt-1" />
              <div>
                <p>0118263382 </p>
                <p>0911671212</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Mail className="text-sky-500 mt-1" />
              <p>ethiopiankidneyassociationeka@gmail.com</p>
            </div>

            <div className="flex items-start gap-4">
              <MapPin className="text-sky-500 mt-1" />
              <p>Addis Ababa, Ethiopia</p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 space-y-5 animate-fadeIn"
          noValidate
        >
          <h2 className="text-xl font-semibold text-gray-800">
            Send a Message
          </h2>

          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your Name"
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
              validationErrors.name
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-300"
            }`}
            aria-invalid={!!validationErrors.name}
            aria-describedby="name-error"
          />
          {validationErrors.name && (
            <p id="name-error" className="text-red-600 text-sm mt-1">
              {validationErrors.name}
            </p>
          )}

          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Your Email"
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
              validationErrors.email
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-300"
            }`}
            aria-invalid={!!validationErrors.email}
            aria-describedby="email-error"
          />
          {validationErrors.email && (
            <p id="email-error" className="text-red-600 text-sm mt-1">
              {validationErrors.email}
            </p>
          )}

          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Your Message"
            rows={5}
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
              validationErrors.message
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-300"
            }`}
            aria-invalid={!!validationErrors.message}
            aria-describedby="message-error"
          ></textarea>
          {validationErrors.message && (
            <p id="message-error" className="text-red-600 text-sm mt-1">
              {validationErrors.message}
            </p>
          )}

          {error && <p className="text-red-600 text-sm">{error}</p>}
          {submitted && !error && (
            <p className="text-green-600 text-sm">
              Thank you! Your message has been sent.
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-sky-500 cursor-pointer text-white font-medium py-3 rounded-lg hover:bg-sky-600 transition ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading
              ? "Sending..."
              : submitted
              ? "Message Sent!"
              : "Send Message"}
          </button>
        </form>
      </div>
    </div>
  );
}
