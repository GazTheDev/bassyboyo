import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import AccountForm from "@/components/AccountForm";
import Link from "next/link";
import { Bell, MessageSquare, FileText, Settings, Clock, User as UserIcon, MessageCircle } from "lucide-react";

export default async function AccountPage() {
  // 1. Auth Check
  const session = await auth();
  if (!session || !session.user) redirect("/api/auth/signin");

  // 2. Fetch Data (Notifications, Comments, Forum Posts)
  const [notifications, recentComments, recentForumPosts] = await Promise.all([
    // Fetch last 5 notifications
    prisma.notification.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" },
      take: 5
    }),
    // Fetch last 5 comments on downloads/articles
    prisma.comment.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" },
      take: 5,
      include: { download: true, article: true }
    }),
    // Fetch last 5 forum posts
    prisma.forumPost.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" },
      take: 5,
      include: { topic: true }
    })
  ]);

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        
        {/* --- HEADER --- */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 bg-[#064E3B] rounded-full flex items-center justify-center text-white shadow-lg border-4 border-white">
            <UserIcon size={32} />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-[#064E3B]">Manager Office</h1>
            <p className="text-gray-500">Welcome back, {session.user.name || "Boss"}.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* --- LEFT COLUMN: SETTINGS --- */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex items-center gap-2">
                <Settings size={18} className="text-[#F97316]" />
                <h2 className="font-bold text-gray-800">Profile Settings</h2>
              </div>
              <div className="p-6">
                <AccountForm userName={session.user.name || ""} />
              </div>
            </div>
          </div>

          {/* --- RIGHT COLUMN: ACTIVITY FEED --- */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* NOTIFICATIONS CARD */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="bg-[#064E3B] text-white px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bell size={18} />
                  <h2 className="font-bold">Inbox / Notifications</h2>
                </div>
                {notifications.length > 0 && (
                  <span className="bg-[#F97316] text-white text-xs font-bold px-2 py-1 rounded-full">
                    {notifications.length} New
                  </span>
                )}
              </div>
              
              <div className="divide-y divide-gray-100">
                {notifications.length === 0 ? (
                  <div className="p-8 text-center text-gray-500 text-sm">
                    All caught up! No new notifications.
                  </div>
                ) : (
                  notifications.map((note) => (
                    <div key={note.id} className="p-4 hover:bg-gray-50 transition flex gap-4 items-start">
                      <div className={`mt-1 w-2 h-2 rounded-full shrink-0 ${note.isRead ? 'bg-gray-300' : 'bg-[#F97316]'}`} />
                      <div>
                        <p className="text-sm text-gray-800 mb-1">{note.message}</p>
                        <p className="text-xs text-gray-400 mb-2">{note.createdAt.toLocaleDateString()}</p>
                        {note.link && (
                          <Link href={note.link} className="text-xs font-bold text-[#064E3B] hover:underline">
                            View Reply &rarr;
                          </Link>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* ACTIVITY HISTORY CARD */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex items-center gap-2">
                <Clock size={18} className="text-[#F97316]" />
                <h2 className="font-bold text-gray-800">Recent Activity</h2>
              </div>

              <div className="divide-y divide-gray-100">
                {/* Mix Comments and Forum Posts visually */}
                {recentComments.length === 0 && recentForumPosts.length === 0 && (
                   <div className="p-8 text-center text-gray-500 text-sm">
                     You haven't posted anything yet. Get out there and manage!
                   </div>
                )}

                {recentForumPosts.map((post) => (
                  <Link key={post.id} href={`/forum/topic/${post.topicId}`} className="block p-4 hover:bg-orange-50 transition group">
                    <div className="flex items-start gap-3">
                      <div className="bg-blue-100 text-blue-600 p-2 rounded-lg shrink-0">
                        <MessageCircle size={16} />
                      </div>
                      <div>
                        <p className="text-sm text-gray-900 font-medium group-hover:text-[#F97316] transition-colors">
                          Posted in forum topic: "{post.topic.title}"
                        </p>
                        <p className="text-xs text-gray-500 line-clamp-1 mt-1">"{post.content}"</p>
                        <p className="text-[10px] text-gray-400 mt-2">{post.createdAt.toLocaleDateString()}</p>
                      </div>
                    </div>
                  </Link>
                ))}

                {recentComments.map((comment) => {
                  const link = comment.downloadId ? `/downloads/${comment.downloadId}` : `/articles/${comment.articleId}`;
                  const title = comment.download?.title || comment.article?.title || "Deleted Content";
                  const type = comment.downloadId ? "Download" : "Article";

                  return (
                    <Link key={comment.id} href={link} className="block p-4 hover:bg-orange-50 transition group">
                      <div className="flex items-start gap-3">
                        <div className="bg-green-100 text-[#064E3B] p-2 rounded-lg shrink-0">
                          {type === "Download" ? <FileText size={16} /> : <MessageSquare size={16} />}
                        </div>
                        <div>
                          <p className="text-sm text-gray-900 font-medium group-hover:text-[#F97316] transition-colors">
                            Commented on {type}: "{title}"
                          </p>
                          <p className="text-xs text-gray-500 line-clamp-1 mt-1">"{comment.content}"</p>
                          <p className="text-[10px] text-gray-400 mt-2">{comment.createdAt.toLocaleDateString()}</p>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}