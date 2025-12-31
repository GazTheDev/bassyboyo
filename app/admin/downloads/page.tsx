import prisma from "@/lib/prisma";
import Link from "next/link";
import { Plus, Trash2, FileText, Edit2 } from "lucide-react"; // Added Edit2
import { deleteDownload } from "@/app/actions/downloads";

export default async function AdminDownloadsList() {
  const downloads = await prisma.download.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-[#064E3B]">Manage Downloads</h1>
        
        <Link 
          href="/admin/downloads/new" 
          className="bg-[#F97316] text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-[#c2410c] transition"
        >
          <Plus size={20} /> Add New Mod
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
            <tr>
              <th className="p-4">Title</th>
              <th className="p-4">Category</th>
              <th className="p-4">Ver.</th>
              <th className="p-4">Downloads</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {downloads.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="p-4 font-medium text-gray-900">{item.title}</td>
                <td className="p-4">
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-bold">
                    {item.category}
                  </span>
                </td>
                <td className="p-4 text-xs font-mono text-gray-500">{item.version}</td>
                <td className="p-4 text-gray-500">{item.downloads}</td>
                <td className="p-4 text-right flex justify-end gap-2">
                  
                  {/* View Button */}
                  <Link href={`/downloads/${item.id}`} className="text-gray-400 hover:text-[#064E3B]" title="View">
                    <FileText size={20} />
                  </Link>

                  {/* Edit Button - NEW */}
                  <Link href={`/admin/downloads/${item.id}`} className="text-gray-400 hover:text-[#F97316]" title="Edit">
                    <Edit2 size={20} />
                  </Link>

                  {/* Delete Button */}
                  <form action={deleteDownload}>
                    <input type="hidden" name="id" value={item.id} />
                    <button type="submit" className="text-gray-400 hover:text-red-500" title="Delete">
                      <Trash2 size={20} />
                    </button>
                  </form>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {downloads.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            No downloads found. Click "Add New Mod" to start.
          </div>
        )}
      </div>
    </div>
  );
}