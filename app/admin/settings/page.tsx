"use client";

import { useActionState } from "react";
import { updateSettings } from "@/app/actions/settings";
import { Save, Loader2, Youtube } from "lucide-react";

export default function AdminSettingsPage() {
  const [state, formAction, isPending] = useActionState(updateSettings, null);

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold text-[#064E3B] mb-6">Site Configuration</h1>

      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
        <form action={formAction} className="space-y-6">
          
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
              <Youtube size={18} className="text-red-600" /> Featured YouTube Video ID
            </label>
            <input 
              type="text" 
              name="youtubeVideoId" 
              placeholder="e.g. 74ru5kxciXw"
              required 
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-[#F97316] focus:outline-none font-mono"
            />
            <p className="text-xs text-gray-500 mt-2">
              Paste only the ID (the part after <code>v=</code> in the URL). 
              <br/>Example: For <code>youtube.com/watch?v=<b>74ru5kxciXw</b></code>, enter <b>74ru5kxciXw</b>.
            </p>
          </div>

          {state?.error && <p className="text-red-500 text-sm font-bold">{state.error}</p>}
          {state?.success && <p className="text-green-600 text-sm font-bold">{state.message}</p>}

          <div className="pt-4 border-t border-gray-100">
            <button 
              type="submit" 
              disabled={isPending}
              className="bg-[#064E3B] text-white px-6 py-2.5 rounded-lg font-bold hover:bg-[#043d2e] transition flex items-center gap-2 disabled:opacity-70"
            >
              {isPending ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />} Save Settings
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}