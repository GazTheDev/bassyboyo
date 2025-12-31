"use client";

import { useActionState } from "react";
import { createCategory } from "@/app/actions/forum";
import { Plus, Loader2, Save, Shield } from "lucide-react";
import { useState } from "react";

export default function ForumCategoryManager() {
  const [isOpen, setIsOpen] = useState(false);
  const [state, formAction, isPending] = useActionState(createCategory, null);

  return (
    <div className="mt-12 border-t border-gray-200 pt-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <Shield size={18} className="text-[#F97316]" /> Admin Controls
        </h3>
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="text-sm font-bold text-[#064E3B] hover:underline"
        >
          {isOpen ? "Cancel" : "Add New Category"}
        </button>
      </div>

      {isOpen && (
        <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 animate-in slide-in-from-top-2">
          <form action={formAction} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Category Title</label>
                <input 
                  name="title"
                  type="text" 
                  required
                  placeholder="e.g. Wonderkids"
                  className="w-full bg-white border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-[#F97316] outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Description</label>
                <input 
                  name="description"
                  type="text" 
                  required
                  placeholder="Discuss the best young talent..."
                  className="w-full bg-white border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-[#F97316] outline-none"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              {state?.error && <p className="text-red-500 text-sm font-bold">{state.error}</p>}
              {state?.success && <p className="text-green-600 text-sm font-bold">{state.message}</p>}
              
              <button 
                type="submit" 
                disabled={isPending}
                className="ml-auto bg-[#064E3B] text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-[#043d2e] transition flex items-center gap-2"
              >
                {isPending ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />} Save Category
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}