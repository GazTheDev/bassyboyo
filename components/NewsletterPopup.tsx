"use client";

import { useState, useEffect } from "react";
import { X, Mail, CheckCircle, Loader2, ArrowRight } from "lucide-react";
import { useActionState } from "react";
import { subscribeToNewsletter } from "@/app/actions/newsletter";

export default function NewsletterPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(true); // Default to true to prevent flash
  const [state, formAction, isPending] = useActionState(subscribeToNewsletter, null);

  useEffect(() => {
    // 1. Check local storage on mount
    const dismissed = localStorage.getItem("bassyboy_newsletter_dismissed");
    
    if (!dismissed) {
      setIsDismissed(false);
      // 2. Start timer only if not dismissed
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 5000); // 5 seconds delay
      return () => clearTimeout(timer);
    }
  }, []);

  // 3. Handle successful subscription
  useEffect(() => {
    if (state?.success) {
      localStorage.setItem("bassyboy_newsletter_dismissed", "true");
      // Hide popup after showing success message for 3s
      const hideTimer = setTimeout(() => {
        setIsVisible(false);
      }, 3000);
      return () => clearTimeout(hideTimer);
    }
  }, [state?.success]);

  const handleDismiss = () => {
    setIsVisible(false);
    // Save to local storage so it doesn't show again
    localStorage.setItem("bassyboy_newsletter_dismissed", "true");
  };

  if (isDismissed) return null;

  return (
    <div 
      className={`fixed bottom-6 right-6 z-50 w-full max-w-xs bg-white rounded-xl shadow-2xl border border-gray-100 p-5 transition-all duration-700 ease-out transform ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0 pointer-events-none"
      }`}
    >
      <button 
        onClick={handleDismiss}
        className="absolute top-2 right-2 p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
        aria-label="Close popup"
      >
        <X size={16} />
      </button>

      {state?.success ? (
        <div className="text-center py-4 animate-in fade-in">
          <div className="bg-green-100 w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2 text-green-600">
            <CheckCircle size={20} />
          </div>
          <h3 className="text-gray-900 font-bold text-sm">Welcome aboard!</h3>
          <p className="text-gray-500 text-xs mt-1">Closing in a moment...</p>
        </div>
      ) : (
        <div className="pr-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-orange-50 p-2 rounded-lg text-[#F97316]">
              <Mail size={18} />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-sm leading-tight">Don't miss a tactic</h3>
              <p className="text-xs text-gray-500">Get the monthly Scouting Report.</p>
            </div>
          </div>

          <form action={formAction} className="flex gap-2">
            <input
              type="email"
              name="email"
              required
              placeholder="Email address"
              className="flex-1 w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-[#F97316] transition-all"
            />
            <button
              type="submit"
              disabled={isPending}
              className="bg-[#F97316] hover:bg-[#c2410c] text-white px-3 py-2 rounded-lg transition-colors disabled:opacity-70 flex items-center justify-center shadow-md hover:shadow-lg"
            >
              {isPending ? <Loader2 size={14} className="animate-spin" /> : <ArrowRight size={14} />}
            </button>
          </form>
           {state?.success === false && (
            <p className="text-red-500 text-[10px] mt-2 font-medium">
              {state.message}
            </p>
          )}
        </div>
      )}
    </div>
  );
}