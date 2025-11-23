import Link from "next/link";
import { Download, FileBox } from "lucide-react";

// This defines what data the card expects to receive
interface DownloadItemProps {
  id: string;
  title: string;
  category: string;
  downloads: number;
}

export default function DownloadCard({ id, title, category, downloads }: DownloadItemProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md hover:border-bassy-orange transition-all duration-300 group">
      
      {/* Card Header with Category Tag */}
      <div className="p-5">
        <div className="flex justify-between items-start mb-4">
          <span className="bg-bassy-green-light text-bassy-green text-xs font-bold px-2 py-1 rounded uppercase tracking-wide">
            {category}
          </span>
          <FileBox className="text-gray-400 group-hover:text-bassy-orange transition-colors" size={20} />
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-gray-900 mb-2 leading-tight">
          {title}
        </h3>

        {/* Download Count */}
        <p className="text-sm text-gray-500 mb-4">
          {downloads} downloads
        </p>
      </div>

      {/* Button Area (Full width at bottom) */}
      <div className="bg-gray-50 px-5 py-3 border-t border-gray-100 flex justify-between items-center group-hover:bg-orange-50 transition-colors">
        <span className="text-xs font-medium text-gray-500">View Details</span>
        <Link 
          href={`/downloads/${id}`} 
          className="flex items-center gap-2 text-sm font-bold text-bassy-orange"
        >
          Get Mod <Download size={16} />
        </Link>
      </div>
    </div>
  );
}