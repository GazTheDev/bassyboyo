"use client";

import { useActionState } from "react";
import { updateProfile } from "@/app/actions/account";
import { Save, AlertCircle, CheckCircle } from "lucide-react";

export default function AccountForm({ userName }: { userName: string }) {
  // Hook to handle the form state and response
  const [state, formAction, isPending] = useActionState(updateProfile, null);

  return (
    <form action={formAction} className="space-y-4">
      
      {/* Update Name */}
      <div>
        <label className="block text-sm font-bold text-gray-700">Display Name</label>
        <input 
          type="text" 
          name="name" 
          defaultValue={userName} 
          className="w-full border p-2 rounded-lg"
        />
      </div>

      <hr className="my-6 border-gray-200" />
      <h2 className="text-lg font-bold text-gray-900">Change Password</h2>

      {/* Old Password */}
      <div>
        <label className="block text-sm font-bold text-gray-700">Old Password</label>
        <input 
          type="password" 
          name="oldPassword" 
          placeholder="Required to set new password"
          className="w-full border p-2 rounded-lg"
        />
      </div>

      {/* New Password */}
      <div>
        <label className="block text-sm font-bold text-gray-700">New Password</label>
        <input 
          type="password" 
          name="newPassword" 
          className="w-full border p-2 rounded-lg"
        />
      </div>

      {/* MESSAGES */}
      {state?.error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-lg flex items-center gap-2 text-sm font-bold">
          <AlertCircle size={16} /> {state.error}
        </div>
      )}
      
      {state?.success && (
        <div className="bg-green-50 text-green-600 p-3 rounded-lg flex items-center gap-2 text-sm font-bold">
          <CheckCircle size={16} /> {state.success}
        </div>
      )}

      <button 
        type="submit" 
        disabled={isPending}
        className="w-full bg-[#F97316] text-white font-bold py-3 rounded-lg hover:bg-[#c2410c] mt-4 flex justify-center items-center gap-2 disabled:opacity-50"
      >
        {isPending ? "Updating..." : (
          <>
            <Save size={18} /> Update Profile
          </>
        )}
      </button>
    </form>
  );
}