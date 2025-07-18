import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 to-sky-100 p-6 text-center">
      <h1 className="text-7xl font-extrabold text-sky-700 mb-2 animate-pulse">
        404
      </h1>
      <h2 className="text-3xl font-semibold text-slate-800 mb-4 tracking-wide">
        Oops! Page Not Found
      </h2>
      <p className="text-slate-600 mb-8 max-w-lg leading-relaxed px-2">
        Sorry, the page you are looking for doesn’t exist or might have been
        moved.
      </p>
      <Link
        href="/"
        className="inline-block bg-sky-600 text-white px-8 py-3 rounded-lg shadow-md hover:bg-sky-700 transition transform hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-sky-300"
      >
        Take Me Home
      </Link>
    </div>
  );
}
