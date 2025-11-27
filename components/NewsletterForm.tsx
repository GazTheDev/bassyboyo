"use client";

import { useActionState } from "react";
import { subscribeToNewsletter } from "@/app/actions/newsletter";
import { Mail, CheckCircle, Loader2, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function NewsletterForm() {
  const [state, formAction, isPending] = useActionState(subscribeToNewsletter, null);

  if (state?.success) {
    return (
      <div className="bg-green-500/20 border border-green-500/50 rounded-xl p-6 text-center animate-in fade-in slide-in-from-bottom-2">
        <div className="bg-green-500 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 text-white shadow-lg">
          <CheckCircle size={24} />
        </div>
        <h3 className="text-white font-bold text-lg">Scout Report Filed!</h3>
        <p className="text-white/80 text-sm mt-1">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="relative max-w-md mx-auto">
      <div className="relative flex items-center">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-white/50">
          <Mail size={20} />
        </div>
        <input
          type="email"
          name="email"
          required
          placeholder="Enter your email address..."
          className="w-full pl-11 pr-32 py-4 bg-white/10 border border-white/20 rounded-full text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#F97316] focus:bg-white/20 transition-all backdrop-blur-sm"
        />
        <button
          type="submit"
          disabled={isPending}
          className="absolute right-1.5 top-1.5 bottom-1.5 bg-[#F97316] hover:bg-[#c2410c] text-white px-6 rounded-full font-bold text-sm transition-colors flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isPending ? <Loader2 size={16} className="animate-spin" /> : <>Join <ArrowRight size={16} /></>}
        </button>
      </div>
      {state?.success === false && (
        <p className="text-red-400 text-sm mt-3 text-center font-medium">
          {state.message}
        </p>
      )}
      <p className="text-white/40 text-xs text-center mt-4">
        No spam. Just wonderkids and tactics. <Link href="/unsubscribe">Unsubscribe anytime.</Link>
      </p>
    </form>
  );
}