"use client";

import { UploadButton } from "@/lib/uploadthing";
import { ImageIcon, Loader2 } from "lucide-react";
import { useState } from "react";

interface Props {
  onUploadComplete: (url: string) => void;
}

export default function ForumImageUpload({ onUploadComplete }: Props) {
  const [isUploading, setIsUploading] = useState(false);

  return (
    <div className="flex items-center gap-2">
      <div className={isUploading ? "pointer-events-none opacity-50" : ""}>
        <UploadButton
          endpoint="forumImage"
          appearance={{
            button: "bg-orange-500 text-[#F97316] border border-[#F97316]/30 text-xs font-bold px-4 py-2 rounded-lg hover:bg-[#F97316] hover:text-black transition-all duration-200 focus-within:ring-2 focus-within:ring-[#F97316] focus-within:ring-offset-1 h-auto w-auto shadow-sm flex items-center gap-2",
            container: "w-auto m-0 p-0",
            allowedContent: "hidden", // Hide "Max 4MB" text to keep the UI clean
          }}
          content={{
            button({ ready }) {
              if (ready) return <span className="flex items-center gap-2"><ImageIcon size={16} /> Attach Image</span>;
              return <span className="flex items-center gap-2"><Loader2 size={16} className="animate-spin" /> Initializing...</span>;
            },
          }}
          onUploadBegin={() => setIsUploading(true)}
          onClientUploadComplete={(res) => {
            setIsUploading(false);
            if (res && res[0]) {
              onUploadComplete(res[0].url);
            }
          }}
          onUploadError={(error: Error) => {
            setIsUploading(false);
            alert(`Error: ${error.message}`);
          }}
        />
      </div>
      {isUploading && (
        <span className="text-xs text-[#F97316] flex items-center gap-1 font-medium animate-pulse">
          <Loader2 size={12} className="animate-spin" /> Uploading...
        </span>
      )}
    </div>
  );
}