import prisma from "@/lib/prisma"; // <--- IMPORT THE SINGLETON HERE
import Link from "next/link";
import { ArrowLeft, MessageSquare, User, Calendar, Tag, Clock } from "lucide-react";
import { auth } from "@/auth";
import CommentForm from "@/components/CommentForm";
import ReactMarkdown from "react-markdown";


interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ArticleDetailsPage(props: PageProps) {
  const params = await props.params;
  
  const article = await prisma.article.findUnique({
    where: { id: params.id },
    include: {
      comments: {
        orderBy: { createdAt: "desc" },
        include: { user: true },
      },
    },
  });

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#064E3B]">Article not found</h1>
          <Link href="/articles" className="text-[#F97316] hover:underline mt-2 block">
            Return to dressing room
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      
      {/* --- HERO HEADER --- */}
      <div className="bg-[#064E3B] text-white pt-12 pb-32 px-4 sm:px-6 relative overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>

        <div className="max-w-4xl mx-auto relative z-10">
          <Link 
            href="/articles" 
            className="inline-flex items-center gap-2 text-white/70 hover:text-[#F97316] mb-8 transition-colors font-medium"
          >
            <ArrowLeft size={20} /> Back to Articles
          </Link>

          <div className="flex flex-wrap items-center gap-4 mb-6 text-sm font-medium">
            <span className="bg-[#F97316] text-white px-3 py-1 rounded-full uppercase tracking-wider text-xs font-bold flex items-center gap-1">
              <Tag size={12} /> {article.category}
            </span>
            <span className="flex items-center gap-1 text-white/80">
              <Calendar size={14} /> {article.createdAt.toLocaleDateString()}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight text-white mb-4">
            {article.title}
          </h1>
        </div>
      </div>

      {/* --- CONTENT CARD (Overlapping) --- */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 -mt-20 relative z-20">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          
          {/* Markdown Content */}
          <article className="prose prose-lg max-w-none 
            prose-headings:text-[#064E3B] 
            prose-headings:font-bold
            prose-a:text-[#F97316] prose-a:no-underline hover:prose-a:underline
            prose-strong:text-[#064E3B]
            prose-blockquote:border-l-[#F97316] prose-blockquote:bg-orange-50 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:not-italic prose-blockquote:rounded-r-lg
            prose-img:rounded-xl prose-img:shadow-lg prose-img:my-8
            text-gray-700 leading-relaxed"
          >
            <ReactMarkdown>{article.content}</ReactMarkdown>
          </article>

          {/* Divider */}
          <div className="h-px bg-gray-100 my-12"></div>

          {/* --- COMMENTS SECTION --- */}
          <div>
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold text-[#064E3B] flex items-center gap-2">
                <MessageSquare size={24} /> 
                Discussion <span className="text-gray-400 text-lg font-normal">({article.comments.length})</span>
              </h3>
            </div>

            {/* Login/Comment Form Logic */}
            {(await auth()) ? (
               <CommentForm targetId={article.id} type="article" />
            ) : (
              <div className="bg-gray-50 border border-gray-200 p-8 text-center rounded-xl mb-10">
                <p className="text-gray-600 mb-4">Want to share your tactical genius?</p>
                <Link 
                  href="/api/auth/signin" 
                  className="inline-block bg-[#F97316] text-white font-bold px-6 py-3 rounded-lg hover:bg-[#c2410c] transition shadow-md hover:shadow-lg"
                >
                  Login to Comment
                </Link>
              </div>
            )}

            {/* Comments List */}
            <div className="space-y-6">
              {article.comments.length === 0 ? (
                <p className="text-gray-500 italic">No comments yet. Be the first to start the discussion.</p>
              ) : (
                article.comments.map((comment) => (
                  <div key={comment.id} className="flex gap-4 group">
                    <div className="bg-[#064E3B]/10 p-3 rounded-full h-12 w-12 flex items-center justify-center shrink-0 text-[#064E3B]">
                      <User size={24} />
                    </div>
                    <div className="flex-1 bg-gray-50 rounded-2xl rounded-tl-none p-5">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold text-[#064E3B]">{comment.user.name || "Manager"}</span>
                        <span className="text-xs text-gray-400 font-medium">
                          {comment.createdAt.toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-gray-700 leading-relaxed text-sm">{comment.content}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>
      </div>
      
      {/* Footer Spacer */}
      <div className="h-24"></div>
    </main>
  );
}