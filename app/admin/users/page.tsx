import prisma from "@/lib/prisma"; // <--- IMPORT THE SINGLETON HERE
import Link from "next/link";
import { Trash2, Edit, Shield, User as UserIcon } from "lucide-react";
import { deleteUserAsAdmin } from "@/app/actions/admin-users";
import { auth } from "@/auth";


export default async function AdminUsersList() {
  const session = await auth();
  
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    include: {
        _count: { select: { comments: true } } // Count their comments too
    }
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-bassy-green">Manage Users</h1>
        <span className="text-gray-500 text-sm">{users.length} registered users</span>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
            <tr>
              <th className="p-4">User</th>
              <th className="p-4">Role</th>
              <th className="p-4">Stats</th>
              <th className="p-4">Joined</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-gray-100 p-2 rounded-full text-gray-400">
                        <UserIcon size={16} />
                    </div>
                    <div>
                        <div className="font-bold text-gray-900">{user.name || "No Name"}</div>
                        <div className="text-xs text-gray-500">{user.email}</div>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  {user.role === "ADMIN" ? (
                    <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full font-bold flex items-center gap-1 w-fit">
                        <Shield size={12} /> ADMIN
                    </span>
                  ) : (
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-bold">
                        USER
                    </span>
                  )}
                </td>
                <td className="p-4 text-sm text-gray-600">
                   {user._count.comments} comments
                </td>
                <td className="p-4 text-gray-500 text-sm">
                  {user.createdAt.toLocaleDateString()}
                </td>
                <td className="p-4 text-right flex justify-end gap-2">
                  
                  {/* Edit Button */}
                  <Link 
                    href={`/admin/users/${user.id}`} 
                    className="text-gray-400 hover:text-bassy-orange"
                    title="Edit User"
                  >
                    <Edit size={20} />
                  </Link>

                  {/* Delete Button (Protected) */}
                  {user.id !== session?.user?.id && (
                    <form action={deleteUserAsAdmin}>
                        <input type="hidden" name="id" value={user.id} />
                        <button 
                        type="submit" 
                        className="text-gray-400 hover:text-red-500 transition"
                        title="Delete User"
                        >
                        <Trash2 size={20} />
                        </button>
                    </form>
                  )}

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}