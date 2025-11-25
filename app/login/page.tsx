"use client";

// CHANGE 1: Import useActionState from "react"
import { useActionState } from "react";
import { useFormStatus } from "react-dom"; // We still use this for the button loading state
import Link from "next/link";
import { ArrowLeft, Lock, Mail, LogIn } from "lucide-react";
import { loginAction } from "@/app/actions/auth-actions";

export default function LoginPage() {
  // CHANGE 2: Use useActionState
  // It returns: [state, actionToRun, isPendingBoolean]
  const [errorMessage, dispatch, isPending] = useActionState(loginAction, undefined);

  return (
    <div className="min-h-screen flex">
      
      {/* --- LEFT SIDE: BRANDING (Desktop Only) --- */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#064E3B] relative overflow-hidden flex-col justify-between p-12 text-white">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#F97316]/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
        
        <div className="relative z-10">
          <Link href="/" className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors mb-8">
            <ArrowLeft size={20} /> Back to Site
          </Link>
          <h1 className="text-6xl font-extrabold tracking-tighter">
            BASSY<span className="text-[#F97316]">BOY</span>
          </h1>
          <p className="mt-4 text-xl text-white/80 max-w-md">
            The dressing room is open. Log in to access exclusive downloads, discuss tactics, and manage your profile.
          </p>
        </div>

        <div className="relative z-10 text-sm opacity-60">
          &copy; {new Date().getFullYear()} BassyBoy Mods. Manage Like a Legend.
        </div>
      </div>

      {/* --- RIGHT SIDE: FORM --- */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md bg-white p-8 md:p-10 rounded-2xl shadow-xl border border-gray-100">
          
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-[#064E3B] mb-2">Welcome Back</h2>
            <p className="text-gray-500">Please sign in to your account</p>
          </div>

          <form action={dispatch} className="space-y-6">
            
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
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F97316] focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-bold text-gray-700">Password</label>
                <Link href="/reset" className="text-sm text-[#F97316] hover:underline font-medium">
                  Forgot Password?
                </Link>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <Lock size={20} />
                </div>
                <input 
                  type="password" 
                  name="password" 
                  required
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F97316] focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Error Message Display */}
            {errorMessage && (
              <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg flex items-center gap-2 border border-red-100">
                <span className="font-bold">Error:</span> {errorMessage}
              </div>
            )}

            {/* Submit Button */}
            <SubmitButton />

          </form>

          {/* Footer Links */}
          <div className="mt-8 text-center text-sm text-gray-600">
            Don't have an account yet?{" "}
            <Link href="/register" className="text-[#064E3B] font-bold hover:underline">
              Sign Up Now
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}

// Helper Component for the button loading state
function SubmitButton() {
  // We use useFormStatus here to detect if the parent form is submitting
  const { pending } = useFormStatus();

  return (
    <button 
      type="submit" 
      disabled={pending}
      className="w-full bg-[#064E3B] text-white font-bold py-4 rounded-xl hover:bg-[#c2410c] transition flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg hover:shadow-orange-500/20"
    >
      {pending ? "Signing In..." : (
        <>
          Sign In <LogIn size={20} />
        </>
      )}
    </button>
  );
}