import prisma from "@/lib/prisma";
import { updateDownload } from "@/app/actions/downloads";
import Link from "next/link";
import { ArrowLeft, Save, Info } from "lucide-react";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditDownloadPage(props: PageProps) {
  const params = await props.params;
  
  const download = await prisma.download.findUnique({
    where: { id: params.id },
  });

  if (!download) return <div>Download not found</div>;

  return (
    <div className="max-w-2xl mx-auto">
      
      <div className="flex items-center gap-4 mb-6">
        <Link href="/admin/downloads" className="text-gray-400 hover:text-gray-600">
          <ArrowLeft size={24} />
        </Link>
        <h1 className="text-2xl font-bold text-[#064E3B]">Edit Download</h1>
      </div>

      <form action={updateDownload} className="space-y-6">
        <input type="hidden" name="id" value={download.id} />
        
        {/* Title */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Mod Title</label>
          <input 
            type="text" 
            name="title" 
            required 
            defaultValue={download.title}
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-[#F97316] focus:outline-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Version */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Version</label>
            <input 
              type="text" 
              name="version" 
              required 
              defaultValue={download.version}
              placeholder="e.g. 2.1"
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-[#F97316] focus:outline-none"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Category</label>
            <select 
              name="category" 
              defaultValue={download.category}
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-[#F97316] focus:outline-none bg-white"
            >
              <option value="Tactics">Tactics</option>
              <option value="Graphics">Graphics</option>
              <option value="Database">Database</option>
              <option value="Shortlist">Shortlist</option>
              <option value="Skin">Skin</option>
            </select>
          </div>
        </div>

        {/* File URL */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Download Link (URL)</label>
          <input 
            type="url" 
            name="fileUrl" 
            required 
            defaultValue={download.fileUrl}
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-[#F97316] focus:outline-none"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
          <textarea 
            name="description" 
            rows={6}
            required
            defaultValue={download.description}
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-[#F97316] focus:outline-none"
          />
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-3 text-sm text-blue-800">
          <Info className="shrink-0" size={20} />
          <p>
            Editing this will update the content immediately. If you are releasing a major update (e.g. v2.0), 
            consider updating the Version number above to let users know.
          </p>
        </div>

        <div className="pt-4">
          <button 
            type="submit" 
            className="w-full bg-[#F97316] text-white font-bold py-4 rounded-xl hover:bg-[#c2410c] transition flex justify-center items-center gap-2"
          >
            <Save size={20} /> Save Changes
          </button>
        </div>

      </form>
    </div>
  );
}