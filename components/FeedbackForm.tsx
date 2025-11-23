"use client";

import { useActionState } from "react";
import { submitFeedback } from "@/app/actions/home";
import { Send, CheckCircle, Loader2 } from "lucide-react";

export default function FeedbackForm() {
  const [state, formAction, isPending] = useActionState(submitFeedback, null);

  // If message sent successfully, show a Thank You note instead of the form
  if (state?.success) {
    return (
      <div className="bg-white/10 rounded-xl p-8 text-center animate-fade-in border border-white/20">
        <div className="bg-green-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-white shadow-lg">
          <CheckCircle size={32} />
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">Message Received!</h3>
        <p className="text-white/80">Thanks for the feedback. I'll read it shortly.</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <label className="block text-sm font-bold text-white/80 mb-1">Your Name</label>
        <input 
          type="text" 
          name="name" 
          required
          placeholder="Manager Name"
          className="w-full bg-white/10 border border-white/20 rounded-lg p-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#F97316] transition-all"
        />
      </div>
      <div>
        <label className="block text-sm font-bold text-white/80 mb-1">Message</label>
        <textarea 
          name="message" 
          required
          rows={4}
          placeholder="Describe what you need..."
          className="w-full bg-white/10 border border-white/20 rounded-lg p-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#F97316] transition-all"
        />
      </div>
      <button 
        type="submit" 
        disabled={isPending}
        className="w-full bg-[#F97316] text-white font-bold py-4 rounded-xl hover:bg-[#c2410c] transition flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg"
      >
        {isPending ? (
          <>Sending... <Loader2 size={18} className="animate-spin" /></>
        ) : (
          <>Send Feedback <Send size={18} /></>
        )}
      </button>
    </form>
  );
}