import prisma from "@/lib/prisma";
import Link from "next/link";
import { ArrowLeft, Plus, MessageCircle, User as UserIcon, Pin } from "lucide-react";
import { auth } from "@/auth";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function CategoryPage(props: PageProps) {
  const params = await props.params;
  const session = await auth();

  const category = await prisma.forumCategory.findUnique({
    where: { id: params.id },
    include: {
      topics: {
        orderBy: [
          { isPinned: 'desc' }, // Pinned topics first
          { createdAt: 'desc' } // Then by date
        ],
        include: {
          user: true,
          _count: { select: { posts: true } }
        }
      }
    }
  });

  if (!category) return <div>Category not found</div>;

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        
        <div className="flex justify-between items-center mb-8">
          <Link href="/forum" className="flex items-center gap-2 text-gray-500 hover:text-[#F97316]">
            <ArrowLeft size={20} /> Back to Forum
          </Link>
          {session ? (
            <Link 
              href={`/forum/create?cat=${category.id}`} 
              className="bg-[#F97316] text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-[#c2410c] transition"
            >
              <Plus size={20} /> New Topic
            </Link>
          ) : (
            <Link href="/api/auth/signin" className="text-[#064E3B] font-bold hover:underline">Login to Post</Link>
          )}
        </div>

        <div className="bg-[#064E3B] text-white p-8 rounded-t-2xl">
          <h1 className="text-3xl font-bold">{category.title}</h1>
          <p className="opacity-80">{category.description}</p>
        </div>

        <div className="bg-white rounded-b-2xl shadow-sm border border-gray-200 overflow-hidden">
          {category.topics.length === 0 ? (
            <div className="p-12 text-center text-gray-500">No topics yet. Be the first!</div>
          ) : (
            <div className="divide-y divide-gray-100">
              {category.topics.map((topic) => (
                <Link 
                  key={topic.id} 
                  href={`/forum/topic/${topic.id}`}
                  className={`block p-6 hover:bg-orange-50 transition group ${topic.isPinned ? 'bg-orange-50/20' : ''}`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#F97316] mb-1 flex items-center gap-2">
                        {topic.isPinned && <Pin size={16} className="text-[#F97316] fill-[#F97316]" />}
                        {topic.title}
                      </h3>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <UserIcon size={12} /> {topic.user.name || "Manager"}
                        </span>
                        <span>{topic.createdAt.toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-gray-400 font-medium">
                      <MessageCircle size={16} /> {topic._count.posts}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

      </div>
    </main>
  );
}