import Link from "next/link";
import ResetForm from "@/components/ResetForm";

export default function ResetPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md border border-gray-200">
        <h1 className="text-2xl font-bold text-center text-[#064E3B] mb-2">Forgot Password?</h1>
        <p className="text-center text-gray-500 mb-6 text-sm">Enter your email and we'll send you a link.</p>
        
        {/* Replace the form with our new Client Component */}
        <ResetForm />

        <div className="mt-6 text-center">
          <Link href="/api/auth/signin" className="text-sm font-bold text-gray-500 hover:text-[#F97316] transition">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}