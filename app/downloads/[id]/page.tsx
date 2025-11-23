import { PrismaClient } from "@prisma/client";
import Link from "next/link";
import { ArrowLeft, Download as DownloadIcon, MessageSquare, User } from "lucide-react";
import { auth } from "@/auth"; // <--- Add this
import CommentForm from "@/components/CommentForm"; // <--- Add this
const prisma = new PrismaClient();

// TYPE UPDATE: params is now a Promise in Next.js 15
interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function DownloadDetailsPage(props: PageProps) {
  // FIX: We must "await" the params before using them
  const params = await props.params;
  const id = params.id;

  // 1. Fetch the specific download AND its comments
const item = await prisma.download.findUnique({
  where: { id: id },
  include: {
    comments: {
      orderBy: { createdAt: "desc" },
      include: { user: true }, // <--- CRITICAL: Get the user details for every comment
    },
  },
});

  // If the ID doesn't exist or database is empty
  if (!item) {
    return (
      <div className="p-20 text-center">
        <h2 className="text-xl font-bold text-bassy-green">Mod Not Found</h2>
        <Link href="/downloads" className="text-bassy-orange hover:underline">Return to list</Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-bassy-green-light/30 p-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Back Button */}
        <Link href="/downloads" className="inline-flex items-center gap-2 text-gray-500 hover:text-bassy-orange mb-6 transition">
          <ArrowLeft size={20} /> Back to Downloads
        </Link>

        {/* --- MAIN CONTENT CARD --- */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mb-8">
          
          {/* Header Section */}
          <div className="bg-bassy-green p-8 text-white">
            <div className="flex justify-between items-start">
              <div>
                <span className="bg-bassy-orange text-white text-xs font-bold px-2 py-1 rounded uppercase tracking-wide">
                  {item.category}
                </span>
                <h1 className="text-3xl font-bold mt-3">{item.title}</h1>
                <p className="opacity-80 mt-2 text-sm">Released on {item.createdAt.toLocaleDateString()}</p>
              </div>
              
              <a 
                href={item.fileUrl} 
                target="_blank" 
                className="bg-white text-bassy-green px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-bassy-orange hover:text-white transition-colors shadow-lg"
              >
                <DownloadIcon size={20} /> Download
              </a>
            </div>
          </div>

          {/* Description Section */}
          <div className="p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 border-b pb-2">Description</h2>
            <div className="prose text-gray-700 leading-relaxed whitespace-pre-line">
              {item.description}
            </div>
          </div>
        </div>

      {/* --- COMMENT SECTION --- */}
        <div className="max-w-2xl mt-12">
          <h3 className="text-xl font-bold text-bassy-green mb-6 flex items-center gap-2">
            <MessageSquare size={20} /> 
            Comments ({item.comments.length})
          </h3>

          {/* 1. Show Form if Logged In, OR Login Button if not */}
          {(await auth()) ? (
            <CommentForm targetId={item.id} type="download" />
          ) : (
            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 mb-8 text-center">
              <p className="text-yellow-800 mb-2">You must be logged in to post a comment.</p>
              <Link href="/api/auth/signin" className="text-bassy-orange font-bold hover:underline">
                Login here
              </Link>
            </div>
          )}

          {/* 2. Comment List (Existing Code) */}
          <div className="space-y-4">
            {item.comments.length === 0 ? (
               // ... (keep your existing "No comments" code here) ...
               <p className="text-gray-500 italic">No comments yet. Be the first!</p>
            ) : (
              item.comments.map((comment) => (
                <div key={comment.id} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-bassy-green-light p-2 rounded-full text-bassy-green">
                      <User size={16} />
                    </div>
                    <div>
                      {/* Display the User's name from the relation */}
                      <span className="font-bold text-sm block">
                         {comment.user.name || "Anonymous Manager"}
                      </span>
                      <span className="text-xs text-gray-400">
                        {comment.createdAt.toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-700 text-sm pl-11">{comment.content}</p>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </main>
  );
}