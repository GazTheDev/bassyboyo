"use client";

import { useActionState, useState } from "react"; // Added useState
import { createReply } from "@/app/actions/forum";
import { Send, Loader2 } from "lucide-react";
import ForumImageUpload from "@/components/ForumImageUpload"; // Import new component

export default function ReplyForm({ topicId }: { topicId: string }) {
  const [state, formAction, isPending] = useActionState(createReply, null);
  const [content, setContent] = useState("");

  const handleImageUpload = (url: string) => {
    setContent((prev) => prev + `\n\n![Uploaded Image](${url})\n`);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
      <h3 className="font-bold text-gray-900 mb-4">Post a Reply</h3>
      <form action={formAction}>
        <input type="hidden" name="topicId" value={topicId} />
        
        <textarea
          name="content"
          rows={4}
          required
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-[#F97316] focus:outline-none"
          placeholder="Write your reply here..."
        />
        
        <div className="flex justify-between items-center mt-4">
          <ForumImageUpload onUploadComplete={handleImageUpload} />
          
          <button 
            type="submit" 
            disabled={isPending}
            className="bg-[#064E3B] text-white px-6 py-2 rounded-lg font-bold hover:bg-[#043d2e] transition flex items-center gap-2 disabled:opacity-70"
          >
            {isPending ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />} Reply
          </button>
        </div>
      </form>
    </div>
  );
}