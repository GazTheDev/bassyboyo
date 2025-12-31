import prisma from "@/lib/prisma";
import Link from "next/link";
import { ArrowLeft, User, ShieldCheck } from "lucide-react";
import { auth } from "@/auth";
import ReactMarkdown from "react-markdown";
import ReplyForm from "@/components/ReplyForm"; // We will create this

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function TopicPage(props: PageProps) {
  const params = await props.params;
  const session = await auth();

  const topic = await prisma.forumTopic.findUnique({
    where: { id: params.id },
    include: {
      user: true,
      category: true,
      posts: {
        orderBy: { createdAt: 'asc' },
        include: { user: true }
      }
    }
  });

  if (!topic) return <div>Topic not found</div>;

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        
        <Link href={`/forum/category/${topic.categoryId}`} className="inline-flex items-center gap-2 text-gray-500 hover:text-[#F97316] mb-6">
          <ArrowLeft size={20} /> Back to {topic.category.title}
        </Link>

        {/* ORIGINAL POST */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-8">
          <div className="bg-gray-50 p-4 border-b border-gray-200 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-full ${topic.user.role === 'ADMIN' ? 'bg-[#064E3B] text-white' : 'bg-gray-200 text-gray-600'}`}>
                <User size={20} />
              </div>
              <div>
                <div className="font-bold text-gray-900 flex items-center gap-2">
                  {topic.user.name}
                  {topic.user.role === 'ADMIN' && <ShieldCheck size={16} className="text-[#F97316]" />}
                </div>
                <div className="text-xs text-gray-500">{topic.createdAt.toLocaleDateString()}</div>
              </div>
            </div>
          </div>
          <div className="p-8">
            <h1 className="text-2xl font-bold mb-4 text-[#064E3B]">{topic.title}</h1>
            <div className="prose max-w-none text-gray-700">
              <ReactMarkdown>{topic.content}</ReactMarkdown>
            </div>
          </div>
        </div>

        {/* REPLIES */}
        <div className="space-y-6 mb-12">
          {topic.posts.map((post) => (
            <div key={post.id} className={`rounded-xl shadow-sm border p-6 ${post.user.role === 'ADMIN' ? 'bg-[#064E3B]/5 border-[#064E3B]/20' : 'bg-white border-gray-200'}`}>
              <div className="flex items-center gap-3 mb-4">
                 <div className={`p-1.5 rounded-full ${post.user.role === 'ADMIN' ? 'bg-[#064E3B] text-white' : 'bg-gray-100 text-gray-500'}`}>
                    <User size={16} />
                 </div>
                 <span className={`font-bold text-sm ${post.user.role === 'ADMIN' ? 'text-[#064E3B]' : 'text-gray-900'}`}>
                    {post.user.name}
                 </span>
                 {post.user.role === 'ADMIN' && (
                    <span className="text-[10px] bg-[#064E3B] text-white px-2 py-0.5 rounded-full font-bold uppercase">Staff</span>
                 )}
                 <span className="text-xs text-gray-400 ml-auto">{post.createdAt.toLocaleDateString()}</span>
              </div>
              <div className="prose max-w-none text-gray-700 text-sm">
                <ReactMarkdown>{post.content}</ReactMarkdown>
              </div>
            </div>
          ))}
        </div>

        {/* REPLY FORM */}
        {session ? (
          <ReplyForm topicId={topic.id} />
        ) : (
          <div className="bg-gray-100 p-6 rounded-xl text-center">
            <Link href="/api/auth/signin" className="text-[#F97316] font-bold hover:underline">Log in to reply</Link>
          </div>
        )}

      </div>
    </main>
  );
}