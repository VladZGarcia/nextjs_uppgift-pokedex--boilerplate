import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full text-center">
        <h2 className="text-2xl font-bold text-yellow-600 mb-4">
          404 - Page Not Found
        </h2>
        <p className="text-gray-600 mb-6">
          The Pokemon you're looking for might be hiding in tall grass...
        </p>
        <Link
          href="/"
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded transition-colors inline-block"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
