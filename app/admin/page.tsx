import prisma from "@/lib/prisma"; // <--- IMPORT THE SINGLETON HERE
import Link from "next/link";
import { Download, FileText, Users, MessageSquare, ArrowRight } from "lucide-react";

export default async function AdminDashboard() {
  // 1. Fetch all stats in parallel
  const [downloadStats, articleCount, userCount, commentCount] = await Promise.all([
    // Sum up the 'downloads' column
    prisma.download.aggregate({
      _sum: { downloads: true },
      _count: true,
    }),
    prisma.article.count(),
    prisma.user.count(),
    prisma.comment.count(),
  ]);

  const totalDownloads = downloadStats._sum.downloads || 0;
  const totalFiles = downloadStats._count;

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-[#064E3B]">Dashboard Overview</h2>
        <p className="text-gray-500">Welcome back, Manager. Here is what's happening today.</p>
      </div>
      
      {/* --- STATS GRID --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        
        {/* Card 1: Downloads */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity text-[#F97316]">
            <Download size={60} />
          </div>
          <h3 className="text-gray-500 font-bold text-sm uppercase tracking-wider">Total Downloads</h3>
          <p className="text-4xl font-extrabold text-[#F97316] mt-2">{totalDownloads.toLocaleString()}</p>
          <p className="text-xs text-gray-400 mt-1">Across {totalFiles} files</p>
        </div>

        {/* Card 2: Articles */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm relative overflow-hidden group">
           <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity text-[#064E3B]">
            <FileText size={60} />
          </div>
          <h3 className="text-gray-500 font-bold text-sm uppercase tracking-wider">Articles</h3>
          <p className="text-4xl font-extrabold text-[#064E3B] mt-2">{articleCount}</p>
          <p className="text-xs text-gray-400 mt-1">Published posts</p>
        </div>

        {/* Card 3: Users */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm relative overflow-hidden group">
           <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity text-blue-600">
            <Users size={60} />
          </div>
          <h3 className="text-gray-500 font-bold text-sm uppercase tracking-wider">Community</h3>
          <p className="text-4xl font-extrabold text-blue-600 mt-2">{userCount}</p>
          <p className="text-xs text-gray-400 mt-1">Registered managers</p>
        </div>

        {/* Card 4: Comments */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm relative overflow-hidden group">
           <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity text-purple-600">
            <MessageSquare size={60} />
          </div>
          <h3 className="text-gray-500 font-bold text-sm uppercase tracking-wider">Engagement</h3>
          <p className="text-4xl font-extrabold text-purple-600 mt-2">{commentCount}</p>
          <p className="text-xs text-gray-400 mt-1">Total comments</p>
        </div>

      </div>

      {/* --- QUICK ACTIONS --- */}
      <h3 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <Link 
          href="/admin/downloads/new"
          className="bg-[#F97316]/10 border border-[#F97316]/20 p-6 rounded-xl hover:bg-[#F97316] hover:text-white transition-all group"
        >
          <div className="font-bold text-[#F97316] group-hover:text-white flex items-center gap-2 mb-2">
            <Download size={20} /> Upload File
          </div>
          <p className="text-sm text-gray-600 group-hover:text-white/80">Add a new tactic or graphic pack.</p>
        </Link>

        <Link 
          href="/admin/articles/new"
          className="bg-[#064E3B]/10 border border-[#064E3B]/20 p-6 rounded-xl hover:bg-[#064E3B] hover:text-white transition-all group"
        >
          <div className="font-bold text-[#064E3B] group-hover:text-white flex items-center gap-2 mb-2">
            <FileText size={20} /> Write Article
          </div>
          <p className="text-sm text-gray-600 group-hover:text-white/80">Publish a tutorial or update.</p>
        </Link>

        <Link 
          href="/"
          target="_blank"
          className="bg-gray-50 border border-gray-200 p-6 rounded-xl hover:bg-white hover:shadow-md transition-all group"
        >
          <div className="font-bold text-gray-800 flex items-center gap-2 mb-2">
            <ArrowRight size={20} /> View Website
          </div>
          <p className="text-sm text-gray-500">See what the public sees.</p>
        </Link>

      </div>
    </div>
  );
}