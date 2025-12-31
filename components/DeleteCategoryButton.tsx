"use client";

import { useActionState } from "react";
import { deleteCategory } from "@/app/actions/forum";
import { Trash2, Loader2 } from "lucide-react";

export default function DeleteCategoryButton({ id }: { id: string }) {
  const [state, formAction, isPending] = useActionState(deleteCategory, null);

  return (
    <form 
      action={formAction} 
      onClick={(e) => e.stopPropagation()} // Prevent clicking the parent Link
      className="absolute top-2 right-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity"
    >
      <input type="hidden" name="id" value={id} />
      <button 
        type="submit"
        disabled={isPending}
        className="p-1.5 bg-white text-red-500 rounded-lg shadow-sm border border-red-100 hover:bg-red-50 hover:text-red-700 transition-colors disabled:opacity-50"
        title="Delete Category"
      >
        {isPending ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
      </button>
      {state?.success === false && (
        <div className="absolute right-0 top-8 bg-red-100 text-red-600 text-[10px] px-2 py-1 rounded shadow-md whitespace-nowrap">
          {state.message}
        </div>
      )}
    </form>
  );
}