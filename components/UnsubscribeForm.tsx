"use client";

import { useActionState } from "react";
import { unsubscribeUser } from "@/app/actions/unsubscribe";
import { Mail, Loader2, CheckCircle, AlertCircle } from "lucide-react";

export default function UnsubscribeForm() {
  const [state, formAction, isPending] = useActionState(unsubscribeUser, null);

  if (state?.success) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
        <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 text-green-600">
          <CheckCircle size={24} />
        </div>
        <h3 className="text-green-800 font-bold text-lg">Unsubscribed</h3>
        <p className="text-green-700 text-sm mt-1">{state.message}</p>
        <p className="text-green-600 text-xs mt-4">We're sorry to see you go!</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="max-w-md mx-auto">
      <div className="relative mb-4">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
          <Mail size={20} />
        </div>
        <input
          type="email"
          name="email"
          required
          placeholder="Enter your email to unsubscribe..."
          className="w-full pl-11 pr-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#F97316] focus:border-transparent"
        />
      </div>

      {state?.success === false && (
        <div className="flex items-center gap-2 text-red-600 text-sm mb-4 bg-red-50 p-3 rounded-lg border border-red-100">
          <AlertCircle size={16} /> {state.message}
        </div>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
      >
        {isPending ? <Loader2 size={18} className="animate-spin" /> : "Unsubscribe"}
      </button>
    </form>
  );
}