import { addComment } from "@/app/actions/comments";
import { User } from "lucide-react";

interface CommentFormProps {
  targetId: string;
  type: "download" | "article"; // We tell the form what it's for
}

export default function CommentForm({ targetId, type }: CommentFormProps) {
  return (
    <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 mb-8">
      <h3 className="font-bold text-gray-700 mb-4 flex items-center gap-2">
        <User size={18} /> Leave a Comment
      </h3>
      
      <form action={addComment}>
        <input type="hidden" name="targetId" value={targetId} />
        <input type="hidden" name="type" value={type} />
        
        <textarea
          name="content"
          required
          rows={3}
          placeholder="Share your thoughts..."
          className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-bassy-orange focus:outline-none mb-3"
        />
        
        <div className="flex justify-end">
          <button 
            type="submit" 
            className="bg-orange-800 text-white px-6 py-2 rounded-lg font-bold hover:bg-bassy-green-dark transition"
          >
            Post Comment
          </button>
        </div>
      </form>
    </div>
  );
}