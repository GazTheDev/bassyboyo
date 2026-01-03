"use client";

import { useActionState } from "react";
import { togglePinTopic } from "@/app/actions/forum-admin";
import { Pin, Loader2, PinOff } from "lucide-react";

export default function PinTopicButton({ topicId, isPinned }: { topicId: string, isPinned: boolean }) {
  const [state, formAction, isPending] = useActionState(togglePinTopic, null);

  return (
    <form action={formAction}>
      <input type="hidden" name="topicId" value={topicId} />
      <input type="hidden" name="currentStatus" value={String(isPinned)} />
      
      <button 
        type="submit" 
        disabled={isPending}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
          isPinned 
            ? "bg-orange-100 text-orange-700 hover:bg-orange-200" 
            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
        }`}
        title={isPinned ? "Unpin Topic" : "Pin Topic"}
      >
        {isPending ? (
          <Loader2 size={14} className="animate-spin" />
        ) : isPinned ? (
          <>
            <PinOff size={14} /> Unpin
          </>
        ) : (
          <>
            <Pin size={14} /> Pin
          </>
        )}
      </button>
    </form>
  );
}