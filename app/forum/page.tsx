import prisma from "@/lib/prisma";
import Link from "next/link";
import { MessageSquare, Hash, ArrowRight, MessageCircle } from "lucide-react";
import { auth } from "@/auth";
import ForumCategoryManager from "@/components/ForumCategoryManager";
import DeleteCategoryButton from "@/components/DeleteCategoryButton";

export default async function ForumHome() {
  const session = await auth();
  // @ts-ignore
  const isAdmin = session?.user?.role === "ADMIN";

  // Fetch categories and stats
  const [categories, stats] = await Promise.all([
    prisma.forumCategory.findMany({
      orderBy: { order: 'asc' },
      include: {
        _count: { select: { topics: true } },
        topics: {
            take: 1,
            orderBy: { createdAt: 'desc' },
            select: { createdAt: true }
        }
      }
    }),
    prisma.forumTopic.count()
  ]);

  return (
    <main className="min-h-screen bg-gray-50">
      
      {/* --- HERO HEADER --- */}
      <div className="bg-[#064E3B] text-white py-16 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <span className="inline-block py-1 px-3 rounded-full bg-white/10 border border-white/20 text-[#F97316] text-xs font-bold uppercase tracking-wider mb-4">
            Community Hub
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">The Forum</h1>
          <p className="text-white/70 max-w-2xl mx-auto text-lg mb-8">
            Discuss tactics, share stories, and get help from the best managers in the game.
          </p>
          
          <div className="flex justify-center gap-8 text-sm font-medium text-white/60">
            <div className="flex items-center gap-2">
                <Hash size={18} className="text-[#F97316]" /> {categories.length} Categories
            </div>
            <div className="flex items-center gap-2">
                <MessageSquare size={18} className="text-[#F97316]" /> {stats} Topics Created
            </div>
          </div>
        </div>
      </div>

      {/* --- MAIN CONTENT --- */}
      <div className="max-w-5xl mx-auto px-4 -mt-8 pb-20">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 md:p-8">
          
          <div className="grid gap-4">
            {categories.map((cat) => (
              <div 
                key={cat.id} 
                className="relative group rounded-xl border border-gray-100 hover:border-[#F97316] hover:bg-orange-50/30 transition-all duration-300"
              >
                <Link 
                  href={`/forum/category/${cat.id}`}
                  className="block p-4"
                >
                  <div className="flex items-center justify-between">
                    
                    <div className="flex items-center gap-5">
                      <div className="bg-[#064E3B]/10 p-3 rounded-xl text-[#064E3B] group-hover:bg-[#F97316] group-hover:text-white transition-colors">
                        <MessageCircle size={24} />
                      </div>
                      <div>
                        <h2 className="text-lg font-bold text-gray-900 group-hover:text-[#F97316] transition-colors">
                          {cat.title}
                        </h2>
                        <p className="text-sm text-gray-500">{cat.description}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-6 text-right">
                      <div className="hidden sm:block">
                        <div className="text-lg font-bold text-gray-900">{cat._count.topics}</div>
                        <div className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Topics</div>
                      </div>
                      
                      <div className="text-gray-300 group-hover:text-[#F97316] group-hover:translate-x-1 transition-all">
                          <ArrowRight size={20} />
                      </div>
                    </div>

                  </div>
                </Link>

                {/* MODERATION DELETE BUTTON */}
                {isAdmin && <DeleteCategoryButton id={cat.id} />}
              </div>
            ))}

            {categories.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                    <p>No categories found.</p>
                    {isAdmin && <p className="text-sm mt-2 text-[#F97316]">Use the controls below to create one.</p>}
                </div>
            )}
          </div>

          {/* ADMIN CONTROLS */}
          {isAdmin && <ForumCategoryManager />}

        </div>
      </div>
    </main>
  );
}