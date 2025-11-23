"use client";

import { useActionState } from "react";
import { newPassword } from "@/app/actions/reset-password";
import { Lock, AlertCircle } from "lucide-react";

export default function NewPasswordForm({ token }: { token: string }) {
  const [state, formAction, isPending] = useActionState(newPassword, null);

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="token" value={token} />
      
      <div>
        <label className="block text-sm font-bold text-gray-700 mb-2">New Password</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
            <Lock size={20} />
          </div>
          <input 
            type="password" 
            name="password" 
            placeholder="••••••••"
            required 
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#064E3B]" 
          />
        </div>
      </div>

      {state?.error && (
        <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg flex items-center gap-2 border border-red-100 font-bold">
          <AlertCircle size={16} /> {state.error}
        </div>
      )}
      
      <button 
        type="submit" 
        disabled={isPending}
        className="w-full bg-[#064E3B] text-white font-bold py-3 rounded-lg hover:bg-[#053d2e] transition disabled:opacity-50"
      >
        {isPending ? "Resetting..." : "Reset Password"}
      </button>
    </form>
  );
}