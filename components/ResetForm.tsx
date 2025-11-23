"use client";

import { useActionState } from "react";
import { resetRequest } from "@/app/actions/reset-password";
import { Mail, CheckCircle, Loader2 } from "lucide-react";

export default function ResetForm() {
  const [state, formAction, isPending] = useActionState(resetRequest, null);

  if (state?.success) {
    return (
      <div className="bg-green-50 p-6 rounded-lg text-center border border-green-200">
        <div className="bg-green-500 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 text-white">
          <CheckCircle size={24} />
        </div>
        <h3 className="text-green-800 font-bold mb-2">Check your email</h3>
        <p className="text-green-700 text-sm">
          {state.success}
        </p>
        <p className="text-green-600 text-xs mt-4">
          (Check your VS Code terminal for the link since we are in dev mode!)
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
            <Mail size={20} />
          </div>
          <input 
            type="email" 
            name="email" 
            placeholder="manager@example.com"
            required 
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F97316]" 
          />
        </div>
      </div>

      <button 
        type="submit" 
        disabled={isPending}
        className="w-full bg-[#F97316] text-white font-bold py-3 rounded-lg hover:bg-[#c2410c] transition flex items-center justify-center gap-2 disabled:opacity-70"
      >
        {isPending ? (
          <>Sending... <Loader2 size={18} className="animate-spin" /></>
        ) : (
          "Send Reset Link"
        )}
      </button>
    </form>
  );
}