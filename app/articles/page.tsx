import { PrismaClient } from "@prisma/client";
import Link from "next/link";
import { BookOpen, Calendar, ArrowRight, Tag } from "lucide-react";

const prisma = new PrismaClient();

// Helper function to strip Markdown and create a clean excerpt
function getExcerpt(content: string) {
  // 1. Remove Markdown syntax (headers, bold, images) using regex
  const plainText = content
    .replace(/#{1,6}\s/g, "") // Remove headers (#)
    .replace(/\*\*/g, "")     // Remove bold (**)
    .replace(/!\[.*?\]\(.*?\)/g, "") // Remove images
    .replace(/\[([^\]]+)\]\([^\)]+\)/g, "$1") // Remove links but keep text
    .replace(/(\r\n|\n|\r)/gm, " "); // Replace line breaks with spaces

  // 2. Cut to 160 characters
  return plainText.length > 160 
    ? plainText.substring(0, 160) + "..." 
    : plainText;
}

export default async function ArticlesPage() {
  const articles = await prisma.article.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      _count: { select: { comments: true } }
    }
  });

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* --- Header Section --- */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-[#064E3B] mb-4 tracking-tight">
            The Dressing Room
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Tactical analysis, wonderkid guides, and the latest news from the manager's office.
          </p>
          <div className="w-24 h-1 bg-[#F97316] mx-auto mt-6 rounded-full"></div>
        </div>

        {/* --- Articles Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <article 
              key={article.id} 
              className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-xl hover:border-[#F97316] transition-all duration-300 flex flex-col group"
            >
              <div className="p-6 flex-1 flex flex-col">
                
                {/* Meta Data (Category & Date) */}
                <div className="flex justify-between items-center mb-4">
                  <span className="inline-flex items-center gap-1 bg-orange-50 text-[#C2410C] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    <Tag size={12} />
                    {article.category}
                  </span>
                  <div className="flex items-center text-gray-400 text-xs font-medium">
                    <Calendar size={12} className="mr-1" />
                    {article.createdAt.toLocaleDateString()}
                  </div>
                </div>

                {/* Title */}
                <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#F97316] transition-colors leading-tight">
                  <Link href={`/articles/${article.id}`}>
                    {article.title}
                  </Link>
                </h2>

                {/* The Excerpt (Clean Text) */}
                <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-1">
                  {getExcerpt(article.content)}
                </p>

                {/* Footer Link */}
                <div className="pt-4 border-t border-gray-100 flex justify-between items-center mt-auto">
                  <Link 
                    href={`/articles/${article.id}`} 
                    className="text-[#064E3B] font-bold text-sm flex items-center gap-2 group-hover:translate-x-1 transition-transform"
                  >
                    Read Full Article <ArrowRight size={16} />
                  </Link>
                  
                  {/* Comment Count Badge */}
                  <span className="text-xs text-gray-400 font-medium">
                    {article._count.comments} comments
                  </span>
                </div>

              </div>
            </article>
          ))}
        </div>

        {/* --- Empty State --- */}
        {articles.length === 0 && (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
            <BookOpen size={48} className="text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900">No articles published yet</h3>
            <p className="text-gray-500">Check back later for updates from the manager.</p>
          </div>
        )}

      </div>
    </main>
  );
}