"use client";

import { useSearchParams } from "next/navigation";
import { useActionState } from "react";
import { createTopic } from "@/app/actions/forum";
import { ArrowLeft, Save, Loader2, MessageSquare, Info, Shield, ListChecks } from "lucide-react";
import Link from "next/link";
import { useEffect, Suspense } from "react";
import { useRouter } from "next/navigation";

// We separate the form logic into its own component so we can wrap it in Suspense
function CreateTopicForm() {
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("cat");
  const router = useRouter();
  
  const [state, formAction, isPending] = useActionState(createTopic, null);

  // If success, redirect (Client side redirect logic)
  useEffect(() => {
    if (state?.success && state.topicId) {
        router.push(`/forum/topic/${state.topicId}`);
    }
  }, [state, router]);

  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 h-full">
      <div className="flex items-center gap-3 mb-8 pb-6 border-b border-gray-100">
        <div className="bg-[#064E3B]/10 p-3 rounded-xl text-[#064E3B]">
            <MessageSquare size={24} />
        </div>
        <div>
            <h1 className="text-2xl font-bold text-[#064E3B]">Start New Discussion</h1>
            <p className="text-sm text-gray-500">Share your tactics or ask for help</p>
        </div>
      </div>
      
      <form action={formAction} className="space-y-6">
        <input type="hidden" name="categoryId" value={categoryId || ""} />
        
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Topic Title</label>
          <input 
            type="text" 
            name="title" 
            required 
            className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 text-gray-900 placeholder-gray-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#F97316] focus:border-transparent transition-all"
            placeholder="e.g. Need help with my 4-2-3-1 pressing trigger"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Content</label>
          <textarea 
            name="content" 
            rows={12}
            required
            className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 text-gray-900 placeholder-gray-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#F97316] focus:border-transparent transition-all resize-y min-h-[200px]"
            placeholder="Explain your thoughts in detail..."
          />
          <div className="flex justify-between items-center mt-2 text-xs text-gray-400">
            <span>Markdown is supported</span>
            <span>Be descriptive for better answers</span>
          </div>
        </div>

        {state?.error && (
            <div className="bg-red-50 text-red-600 text-sm font-bold p-4 rounded-xl border border-red-100 flex items-center gap-2">
                <Info size={16} /> {state.error}
            </div>
        )}

        <div className="pt-2">
            <button 
            type="submit" 
            disabled={isPending}
            className="w-full bg-[#064E3B] text-white font-bold py-4 rounded-xl hover:bg-[#043d2e] transition shadow-lg hover:shadow-xl transform active:scale-[0.99] flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
            >
            {isPending ? <Loader2 className="animate-spin" /> : <Save size={20} />} Post Topic
            </button>
        </div>
      </form>
    </div>
  );
}

export default function CreateTopicPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <Link href={`/forum`} className="inline-flex items-center gap-2 text-gray-500 hover:text-[#F97316] mb-8 transition-colors font-medium">
          <ArrowLeft size={20} /> Cancel and return to forum
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Main Form Area */}
            <div className="lg:col-span-2">
                {/* Wrapping in Suspense prevents build errors with useSearchParams */}
                <Suspense fallback={
                    <div className="bg-white p-12 rounded-2xl shadow-lg border border-gray-200 text-center">
                        <Loader2 className="animate-spin mx-auto text-[#F97316] mb-4" size={32} />
                        <p className="text-gray-500">Loading editor...</p>
                    </div>
                }>
                    <CreateTopicForm />
                </Suspense>
            </div>

            {/* Sidebar Guidelines */}
            <div className="lg:col-span-1 space-y-6">
                <div className="bg-[#064E3B] text-white p-6 rounded-2xl shadow-lg">
                    <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                        <Shield size={20} className="text-[#F97316]" /> Locker Room Rules
                    </h3>
                    <ul className="space-y-3 text-sm text-white/80">
                        <li className="flex gap-3">
                            <span className="bg-white/20 w-5 h-5 rounded-full flex items-center justify-center shrink-0 font-bold text-xs">1</span>
                            <span>Be respectful to other managers. No tactical elitism.</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="bg-white/20 w-5 h-5 rounded-full flex items-center justify-center shrink-0 font-bold text-xs">2</span>
                            <span>Search before posting. Your question might already be answered.</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="bg-white/20 w-5 h-5 rounded-full flex items-center justify-center shrink-0 font-bold text-xs">3</span>
                            <span>Use clear titles. "Help" is bad. "Help with 4-3-3 Defense" is good.</span>
                        </li>
                    </ul>
                </div>

                <div className="bg-orange-50 border border-orange-100 p-6 rounded-2xl">
                    <h3 className="font-bold text-orange-900 mb-2 flex items-center gap-2">
                        <ListChecks size={18} /> Posting Tips
                    </h3>
                    <p className="text-sm text-orange-800 leading-relaxed">
                        If asking for tactical help, try to include screenshots of your formation and instructions. It makes it much easier for the community to analyze your setup.
                    </p>
                </div>
            </div>
        </div>
      </div>
    </main>
  );
}