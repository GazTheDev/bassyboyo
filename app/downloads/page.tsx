import prisma from "@/lib/prisma";
import DownloadCard from "@/components/DownloadCard";

export default async function DownloadsPage() {
  // Fetch all downloads, newest first
  const downloads = await prisma.download.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#064E3B]">Download Center</h1>
          <p className="text-gray-600 mt-2">
            The latest tactics, databases, and graphics for Football Manager.
          </p>
        </div>

        {/* The Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {downloads.map((item) => (
            <DownloadCard 
              key={item.id}
              id={item.id}
              title={item.title}
              category={item.category}
              downloads={item.downloads}
            />
          ))}
        </div>

        {/* Empty State */}
        {downloads.length === 0 && (
          <div className="text-center py-20 text-gray-500 bg-white rounded-xl border border-gray-200 shadow-sm">
            <p className="text-lg font-medium">No downloads found.</p>
            <p className="text-sm">Check back later for new content!</p>
          </div>
        )}
      </div>
    </main>
  );
}