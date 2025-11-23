import Link from "next/link";
import { LayoutDashboard, FileBox, BookOpen, Users, Home } from "lucide-react";
import { auth } from "@/auth"; // Import the auth helper
import { redirect } from "next/navigation"; // Import the redirect helper

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // --- THE BOUNCER LOGIC ---
  const session = await auth();

  // Check 1: Are they logged in?
  // Check 2: Is their role "ADMIN"?
  // @ts-ignore (TypeScript might complain about role, ignore it for now)
  if (!session || session.user.role !== "ADMIN") {
    // If not, kick them to the homepage
    redirect("/");
  }
  // -------------------------

  return (
    <div className="flex min-h-screen bg-gray-100">
      
      {/* --- SIDEBAR --- */}
      <aside className="w-64 bg-orange-900 text-white flex flex-col">
        <div className="p-6 border-b border-white/10">
          <h1 className="text-2xl font-bold tracking-tighter text-bassy-orange">
            BASSY<span className="text-white">ADMIN</span>
          </h1>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <p className="text-xs text-gray-400 uppercase font-bold px-2 mb-2">Menu</p>
          
          <Link href="/admin" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/10 transition">
            <LayoutDashboard size={20} className="text-bassy-orange" /> Dashboard
          </Link>
          
          <Link href="/admin/downloads" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/10 transition">
            <FileBox size={20} /> Manage Downloads
          </Link>
          
          <Link href="/admin/articles" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/10 transition">
            <BookOpen size={20} /> Manage Articles
          </Link>
          
          <Link href="/admin/users" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/10 transition">
            <Users size={20} /> Users
          </Link>
        </nav>

        <div className="p-4 border-t border-white/10">
          <Link href="/" className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition">
            <Home size={16} /> Back to Website
          </Link>
        </div>
      </aside>

      {/* --- MAIN CONTENT AREA --- */}
      <main className="flex-1 p-10">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 min-h-[500px]">
          {children}
        </div>
      </main>

    </div>
  );
}