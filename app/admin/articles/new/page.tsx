import { createArticle } from "@/app/actions/articles";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";

export default function NewArticlePage() {
  return (
    <div className="max-w-3xl mx-auto">
      
      <div className="flex items-center gap-4 mb-6">
        <Link href="/admin/articles" className="text-gray-400 hover:text-gray-600">
          <ArrowLeft size={24} />
        </Link>
        <h1 className="text-2xl font-bold text-bassy-green">Write New Article</h1>
      </div>

      <form action={createArticle} className="space-y-6">
        
        {/* Title */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Headline</label>
          <input 
            type="text" 
            name="title" 
            required 
            placeholder="e.g. How to Scout in South America"
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-bassy-orange focus:outline-none"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Category</label>
          <select 
            name="category" 
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-bassy-orange focus:outline-none bg-white"
          >
            <option value="Tutorial">Tutorial</option>
            <option value="News">News</option>
            <option value="Tactics">Tactics</option>
            <option value="Stories">Stories</option>
          </select>
        </div>

        {/* Content (Big Text Area) */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Article Content</label>
          <textarea 
            name="content" 
            rows={15}
            required
            placeholder="Write your article here..."
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-bassy-orange focus:outline-none font-mono text-sm"
          />
          <p className="text-xs text-gray-500 mt-2">
            Tip: You can use simple text for now. (Later we can add Markdown support).
          </p>
        </div>

        {/* Submit */}
        <div className="pt-4">
          <button 
            type="submit" 
            className="w-full bg-orange-700 text-white font-bold py-4 rounded-xl hover:bg-bassy-green-dark transition flex justify-center items-center gap-2"
          >
            <Save size={20} /> Publish Article
          </button>
        </div>

      </form>
    </div>
  );
}