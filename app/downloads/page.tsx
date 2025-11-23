import { PrismaClient } from "@prisma/client";
import DownloadCard from "@/components/DownloadCard";

// Initialize the database connection
const prisma = new PrismaClient();

export default async function DownloadsPage() {
  // 1. Fetch data from SQLite
  // We use 'findMany' to get all records from the 'Download' table
  const downloads = await prisma.download.findMany({
    orderBy: {
      downloads: 'desc', // Sort by most popular
    },
  });

  return (
    <main className="min-h-screen p-8 max-w-6xl mx-auto">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-bassy-green">Download Center</h1>
        <p className="text-gray-600 mt-2">
          The latest tactics, databases, and graphics for Football Manager.
        </p>
      </div>

      {/* The Grid */}
      {/* 'grid-cols-1 md:grid-cols-3' means: 1 column on mobile, 3 on desktop */}
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

      {/* Empty State (just in case) */}
      {downloads.length === 0 && (
        <div className="text-center py-20 text-gray-500 bg-white rounded-xl">
          No downloads found. Run the seed script!
        </div>
      )}
    </main>
  );
}