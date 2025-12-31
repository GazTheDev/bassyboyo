"use client";

import { useActionState, useState } from "react";
import { sendCampaign } from "@/app/actions/campaign";
import Link from "next/link";
import { ArrowLeft, Send, Loader2, Mail, Eye } from "lucide-react";

export default function SendCampaignPage() {
  const [state, formAction, isPending] = useActionState(sendCampaign, null);
  
  // Local state for live preview
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");

  return (
    <div className="max-w-7xl mx-auto px-4">
      
      <div className="mb-8">
        <Link href="/admin/newsletter" className="inline-flex items-center gap-2 text-gray-500 hover:text-[#F97316] mb-4 transition-colors">
          <ArrowLeft size={20} /> Back to Newsletter Dashboard
        </Link>
        <h1 className="text-3xl font-bold text-[#064E3B] flex items-center gap-3">
          <Mail className="text-[#F97316]" size={32} /> Send Campaign
        </h1>
        <p className="text-gray-500 mt-2">
          Write an update to all subscribed managers.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* LEFT COLUMN: COMPOSER FORM */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 h-fit">
          
          {state?.success ? (
            <div className="text-center py-12">
              <div className="bg-green-100 text-green-700 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Send size={32} />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Campaign Sent!</h2>
              <p className="text-gray-600 mb-6">{state.message}</p>
              <Link href="/admin/newsletter" className="text-[#F97316] font-bold hover:underline">
                Return to dashboard
              </Link>
            </div>
          ) : (
            <form action={formAction} className="space-y-6">
              
              {/* Subject Line */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Subject Line</label>
                <input 
                  type="text" 
                  name="subject" 
                  required 
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="e.g. New 4-3-3 Tactic Available Now!"
                  className="w-full border border-gray-300 rounded-lg p-4 text-lg focus:ring-2 focus:ring-[#F97316] focus:outline-none font-medium"
                />
              </div>

              {/* Email Body */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Email Content</label>
                <div className="relative">
                  <textarea 
                    name="content" 
                    rows={12}
                    required
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Hi Managers, &#10;&#10;I've just uploaded a new file..."
                    className="w-full border border-gray-300 rounded-lg p-4 focus:ring-2 focus:ring-[#F97316] focus:outline-none resize-y"
                  />
                  <p className="text-xs text-gray-400 mt-2 text-right">
                    Tip: New lines will be preserved as paragraphs.
                  </p>
                </div>
              </div>

              {/* Error Message */}
              {state?.error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-lg border border-red-100 font-bold text-sm">
                  ⚠️ {state.error}
                </div>
              )}

              {/* Warning Box */}
              <div className="bg-blue-50 border border-blue-100 p-4 rounded-lg flex gap-3">
                  <div className="shrink-0 text-blue-500 mt-0.5">ℹ️</div>
                  <div className="text-sm text-blue-800">
                      <strong>Note:</strong> Emails are sent in batches to prevent server timeouts. 
                      Please do not close this page until you see the success message.
                  </div>
              </div>

              {/* Submit Toolbar */}
              <div className="pt-4 border-t border-gray-100 flex justify-end">
                <button 
                  type="submit" 
                  disabled={isPending}
                  className="bg-[#064E3B] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#043d2e] transition shadow-lg flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isPending ? (
                    <>Sending <Loader2 size={18} className="animate-spin" /></>
                  ) : (
                    <>Send Blast <Send size={18} /></>
                  )}
                </button>
              </div>

            </form>
          )}
        </div>

        {/* RIGHT COLUMN: LIVE PREVIEW */}
        <div className="hidden lg:block space-y-4">
            <h3 className="text-lg font-bold text-gray-700 flex items-center gap-2">
                <Eye size={20} /> Live Preview
            </h3>
            
            {/* Mock Email Container */}
            <div className="bg-gray-100 p-8 rounded-xl border border-gray-300 min-h-[600px] flex items-start justify-center">
                <div className="bg-white w-full max-w-md shadow-sm rounded-lg border border-gray-200 overflow-hidden">
                    
                    {/* Email Header */}
                    <div className="p-8 text-center border-b border-gray-50">
                        <div className="text-2xl font-bold text-[#064E3B]">
                            BASSY<span className="text-[#F97316]">BOY</span>
                        </div>
                    </div>

                    {/* Email Body */}
                    <div className="p-8">
                        <h1 className="text-xl font-bold text-gray-900 mb-4 break-words">
                            {subject || "Your Subject Line Here"}
                        </h1>
                        
                        <div className="text-gray-600 leading-relaxed whitespace-pre-line mb-8 text-sm break-words">
                            {content || "Start typing to see your email content appear here..."}
                        </div>

                        <div className="text-center mb-8">
                            <span className="inline-block bg-[#F97316] text-white px-6 py-3 rounded-md font-bold text-sm shadow-sm">
                                Visit Download Center
                            </span>
                        </div>

                        <div className="border-t border-gray-100 pt-6 text-center">
                            <p className="text-xs text-gray-400 leading-relaxed">
                                You received this email because you subscribed to the BassyBoy Scouting Report.
                                <br />
                                <span className="underline text-[#F97316]">Unsubscribe</span>
                            </p>
                        </div>
                    </div>

                </div>
            </div>
            <p className="text-center text-xs text-gray-400">
                This is an approximation. Actual rendering depends on the email client.
            </p>
        </div>

      </div>
    </div>
  );
}