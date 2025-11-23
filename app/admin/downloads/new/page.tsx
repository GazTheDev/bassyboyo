import { createDownload } from "@/app/actions/downloads";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";

export default function NewDownloadPage() {
  return (
    <div className="max-w-2xl mx-auto">
      
      <div className="flex items-center gap-4 mb-6">
        <Link href="/admin/downloads" className="text-gray-400 hover:text-gray-600">
          <ArrowLeft size={24} />
        </Link>
        <h1 className="text-2xl font-bold text-bassy-green">Add New Download</h1>
      </div>

      <form action={createDownload} className="space-y-6">
        
        {/* Title Input */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Mod Title</label>
          <input 
            type="text" 
            name="title" 
            required 
            placeholder="e.g. Wonderkids Shortlist 2024"
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-bassy-orange focus:outline-none"
          />
        </div>

        {/* Category Select */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Category</label>
          <select 
            name="category" 
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-bassy-orange focus:outline-none bg-white"
          >
            <option value="Tactics">Tactics</option>
            <option value="Graphics">Graphics</option>
            <option value="Database">Database</option>
            <option value="Shortlist">Shortlist</option>
            <option value="Skin">Skin</option>
          </select>
        </div>

        {/* File URL Input */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Download Link (URL)</label>
          <input 
            type="url" 
            name="fileUrl" 
            required 
            placeholder="https://mediafire.com/..."
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-bassy-orange focus:outline-none"
          />
          <p className="text-xs text-gray-500 mt-1">Paste the link to Mediafire, Dropbox, or Google Drive here.</p>
        </div>

        {/* Description Textarea */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
          <textarea 
            name="description" 
            rows={6}
            required
            placeholder="Describe what this mod does..."
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-bassy-orange focus:outline-none"
          />
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button 
            type="submit" 
            className="w-full bg-orange-800 text-black font-bold py-4 rounded-xl hover:bg-bassy-orange-dark transition flex justify-center items-center gap-2"
          >
            <Save size={20} /> Publish Mod
          </button>
        </div>

      </form>
    </div>
  );
}