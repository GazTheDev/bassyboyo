import { PrismaClient } from "@prisma/client";
import Link from "next/link";
import { Plus, Trash2, FileText, BookOpen } from "lucide-react";
import { deleteArticle } from "@/app/actions/articles";

const prisma = new PrismaClient();

export default async function AdminArticlesList() {
  // Fetch articles, newest first
  const articles = await prisma.article.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      _count: {
        select: { comments: true }, // We also count the comments for the dashboard
      },
    },
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-bassy-green">Manage Articles</h1>
        
        {/* The "Add New" Button */}
        <Link 
          href="/admin/articles/new" 
          className="bg-green-500 text-black px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-bassy-green-dark transition"
        >
          <Plus size={20} /> Write Article
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
            <tr>
              <th className="p-4">Headline</th>
              <th className="p-4">Category</th>
              <th className="p-4">Comments</th>
              <th className="p-4">Date</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {articles.map((article) => (
              <tr key={article.id} className="hover:bg-gray-50">
                <td className="p-4 font-bold text-gray-900">
                  {article.title}
                </td>
                <td className="p-4">
                  <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full font-bold">
                    {article.category}
                  </span>
                </td>
                <td className="p-4 text-gray-500">
                  <div className="flex items-center gap-1">
                    <span className="font-mono font-bold">{article._count.comments}</span>
                  </div>
                </td>
                <td className="p-4 text-gray-500 text-sm">
                  {article.createdAt.toLocaleDateString()}
                </td>
                <td className="p-4 text-right flex justify-end gap-2">
                  
                  {/* View Button (Opens public page) */}
                  <Link 
                    href={`/articles/${article.id}`} 
                    target="_blank"
                    className="text-gray-400 hover:text-bassy-orange"
                    title="View on site"
                  >
                    <BookOpen size={20} />
                  </Link>

                  {/* Delete Button */}
                  <form action={deleteArticle}>
                    <input type="hidden" name="id" value={article.id} />
                    <button 
                      type="submit" 
                      className="text-gray-400 hover:text-red-500 transition"
                      title="Delete Article"
                    >
                      <Trash2 size={20} />
                    </button>
                  </form>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {articles.length === 0 && (
          <div className="p-12 text-center flex flex-col items-center justify-center text-gray-500">
            <BookOpen size={48} className="text-gray-300 mb-4" />
            <p className="text-lg font-medium">No articles yet.</p>
            <p className="text-sm">Time to write your first tutorial!</p>
          </div>
        )}
      </div>
    </div>
  );
}