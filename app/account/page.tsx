import { auth } from "@/auth";
import { redirect } from "next/navigation";
import AccountForm from "@/components/AccountForm"; // Import the new component

export default async function AccountPage() {
  const session = await auth();
  if (!session) redirect("/api/auth/signin");

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md border border-gray-200">
        <h1 className="text-2xl font-bold text-[#064E3B] mb-6">Manage Account</h1>
        
        {/* Pass the user name to the client form */}
        <AccountForm userName={session.user?.name || ""} />
        
      </div>
    </div>
  );
}