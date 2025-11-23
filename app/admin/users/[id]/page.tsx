import { updateUserAsAdmin } from "@/app/actions/admin-users";
import { PrismaClient } from "@prisma/client";
import Link from "next/link";
import { ArrowLeft, Save, ShieldAlert } from "lucide-react";

const prisma = new PrismaClient();

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditUserPage(props: PageProps) {
  const params = await props.params;
  
  const user = await prisma.user.findUnique({
    where: { id: params.id },
  });

  if (!user) return <div>User not found</div>;

  return (
    <div className="max-w-xl mx-auto">
      
      <div className="flex items-center gap-4 mb-6">
        <Link href="/admin/users" className="text-gray-400 hover:text-gray-600">
          <ArrowLeft size={24} />
        </Link>
        <h1 className="text-2xl font-bold text-bassy-green">Edit User</h1>
      </div>

      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
        
        <form action={updateUserAsAdmin} className="space-y-6">
          <input type="hidden" name="id" value={user.id} />

          {/* Name */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Display Name</label>
            <input 
              type="text" 
              name="name" 
              defaultValue={user.name || ""} 
              className="w-full border border-gray-300 rounded-lg p-3"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
            <input 
              type="email" 
              name="email" 
              required
              defaultValue={user.email} 
              className="w-full border border-gray-300 rounded-lg p-3"
            />
          </div>

          {/* Role Selection */}
          <div className="bg-orange-50 p-4 rounded-lg border border-bassy-orange/20">
            <label className="block text-sm font-bold text-orange-900 mb-2 flex items-center gap-2">
                <ShieldAlert size={16} /> Security Role
            </label>
            <select 
                name="role" 
                defaultValue={user.role}
                className="w-full border border-orange-200 rounded-lg p-3 bg-white focus:ring-2 focus:ring-bassy-orange"
            >
                <option value="USER">User (Standard)</option>
                <option value="ADMIN">Admin (Full Access)</option>
            </select>
            <p className="text-xs text-orange-800 mt-2">
                <strong>Warning:</strong> Admins can delete content and other users.
            </p>
          </div>

          <div className="pt-4">
            <button 
              type="submit" 
              className="w-full bg-bassy-green text-white font-bold py-3 rounded-xl hover:bg-bassy-green-dark transition flex justify-center items-center gap-2"
            >
              <Save size={20} /> Update User
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}