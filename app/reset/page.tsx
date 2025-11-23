import { resetRequest } from "@/app/actions/reset-password";
import Link from "next/link";

export default function ResetPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md border border-gray-200">
        <h1 className="text-2xl font-bold text-center text-black mb-2">Forgot Password?</h1>
        <p className="text-center text-gray-500 mb-6 text-sm">Enter your email and we'll send you a link.</p>
        
        <form action={resetRequest} className="space-y-4">
          <input 
            type="email" 
            name="email" 
            placeholder="email@example.com"
            required 
            className="w-full border p-2 rounded-lg" 
          />
          <button type="submit" className="w-full bg-orange-500 text-white font-bold py-3 rounded-lg hover:bg-bassy-orange-dark">
            Send Reset Link
          </button>
        </form>

        <div className="mt-4 text-center">
          <Link href="/api/auth/signin" className="text-sm text-gray-500 hover:text-bassy-orange">Back to Login</Link>
        </div>
      </div>
    </div>
  );
}