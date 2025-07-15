import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6 text-center">
      <h1 className="text-5xl font-bold text-gray-800 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-700 mb-2">
        Page Not Found
      </h2>
      <p className="text-gray-600 mb-6 max-w-md">
        Sorry, the page you are looking for doesn’t exist or has been moved.
      </p>
      <Link href="/" passHref>
        <span className="inline-block bg-lime-700 text-white px-6 py-3 rounded-lg hover:bg-lime-600 transition">
          Go Home
        </span>
      </Link>
    </div>
  );
}
