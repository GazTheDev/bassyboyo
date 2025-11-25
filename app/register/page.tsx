"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import Link from "next/link";
import { ArrowLeft, Lock, Mail, User, UserPlus, AlertCircle } from "lucide-react";
import { registerUser } from "@/app/actions/auth";

export default function RegisterPage() {
  // We use useActionState to handle server errors (like "User already exists")
  const [state, formAction] = useActionState(registerUser, null);

  return (
    <div className="min-h-screen flex">
      
      {/* --- LEFT SIDE: BRANDING (Desktop Only) --- */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#064E3B] relative overflow-hidden flex-col justify-between p-12 text-white">
        {/* Decorative Background */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#F97316]/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
        
        <div className="relative z-10">
          <Link href="/" className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors mb-8">
            <ArrowLeft size={20} /> Back to Site
          </Link>
          <h1 className="text-6xl font-extrabold tracking-tighter">
            JOIN THE <br/> <span className="text-[#F97316]">SQUAD</span>
          </h1>
          <p className="mt-4 text-xl text-white/80 max-w-md">
            Create your manager profile to unlock exclusive downloads, track your history, and join the discussion.
          </p>
        </div>

        <div className="relative z-10 flex items-center gap-4 text-sm opacity-60">
          <span>&copy; {new Date().getFullYear()} BassyBoy Mods</span>
        </div>
      </div>

      {/* --- RIGHT SIDE: FORM --- */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md bg-white p-8 md:p-10 rounded-2xl shadow-xl border border-gray-100">
          
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-[#064E3B] mb-2">Create Account</h2>
            <p className="text-gray-500">Enter your details below</p>
          </div>

          <form action={formAction} className="space-y-5">
            
            {/* Name Input */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Manager Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <User size={20} />
                </div>
                <input 
                  type="text" 
                  name="name" 
                  required
                  placeholder="Pep Guardiola"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F97316] transition-all"
                />
              </div>
            </div>

            {/* Email Input */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <Mail size={20} />
                </div>
                <input 
                  type="email" 
                  name="email" 
                  required
                  placeholder="manager@example.com"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F97316] transition-all"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <Lock size={20} />
                </div>
                <input 
                  type="password" 
                  name="password" 
                  required
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F97316] transition-all"
                />
              </div>
            </div>

            {/* Terms and Conditions Checkbox */}
            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border border-gray-100">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  required
                  className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-[#F97316] text-[#F97316]"
                />
              </div>
              <label htmlFor="terms" className="text-sm text-gray-600">
                I accept the <Link href="/terms" className="text-[#F97316] font-bold hover:underline">Terms and Conditions</Link> and agree to the Privacy Policy.
              </label>
            </div>

            {/* Error Message */}
            {state?.error && (
              <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg flex items-center gap-2 border border-red-100 font-bold">
                <AlertCircle size={16} /> {state.error}
              </div>
            )}

            {/* Submit Button */}
            <SubmitButton />

          </form>

          {/* Footer Links */}
          <div className="mt-8 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link href="/login" className="text-[#064E3B] font-bold hover:underline">
              Sign In
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}

// Helper Component for Loading State
function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button 
      type="submit" 
      disabled={pending}
      className="w-full bg-[#064E3B] text-white font-bold py-4 rounded-xl hover:bg-[#053d2e] transition flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg hover:shadow-emerald-900/20"
    >
      {pending ? "Creating Account..." : (
        <>
          Create Account <UserPlus size={20} />
        </>
      )}
    </button>
  );
}