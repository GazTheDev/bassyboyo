import { auth } from "@/auth";
import { updateProfile } from "@/app/actions/account";
import { redirect } from "next/navigation";

export default async function AccountPage() {
  const session = await auth();
  if (!session) redirect("/api/auth/signin");

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md border border-gray-200">
        <h1 className="text-2xl font-bold text-bassy-green mb-6">Manage Account</h1>
        
        <form action={updateProfile} className="space-y-4">
          
          {/* Update Name */}
          <div>
            <label className="block text-sm font-bold text-gray-700">Display Name</label>
            <input 
              type="text" 
              name="name" 
              defaultValue={session.user.name || ""} 
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

          <button type="submit" className="w-full bg-green-700 text-white font-bold py-3 rounded-lg hover:bg-bassy-orange-dark mt-4">
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
}