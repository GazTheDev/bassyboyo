import prisma from "@/lib/prisma";
import AdminCharts from "@/components/AdminCharts";
import { BarChart3, Eye, Download, Users } from "lucide-react";

export default async function AdminAnalyticsPage() {
  // 1. Fetch raw data (Last 30 days)
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const [users, downloads, pageViews, categoryCounts] = await Promise.all([
    // Get user signup dates
    prisma.user.findMany({
      where: { createdAt: { gte: thirtyDaysAgo } },
      select: { createdAt: true },
    }),
    // Get download creation dates (activity)
    prisma.download.findMany({
      where: { createdAt: { gte: thirtyDaysAgo } },
      select: { createdAt: true },
    }),
    // Get page views (NEW)
    prisma.dailyAnalytics.findMany({
      where: { date: { gte: thirtyDaysAgo } },
    }),
    // Get download counts by category (All time)
    prisma.download.groupBy({
      by: ['category'],
      _count: {
        _all: true,
      },
    }),
  ]);

  // Calculate Totals for Summary Cards
  const totalPageViews = pageViews.reduce((acc, curr) => acc + curr.views, 0);
  const totalDownloads = downloads.length;
  const totalNewUsers = users.length;

  // 2. Transform Data for "Growth Trend" (Line Chart)
  // We need an array of { date: "Jan 01", downloads: 5, users: 2, views: 100 }
  const activityMap = new Map<string, { downloads: number; users: number; views: number }>();

  // Initialize last 30 days with 0
  for (let i = 29; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const label = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    activityMap.set(label, { downloads: 0, users: 0, views: 0 });
  }

  // Fill in User data
  users.forEach((u) => {
    const label = u.createdAt.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    if (activityMap.has(label)) {
      const current = activityMap.get(label)!;
      activityMap.set(label, { ...current, users: current.users + 1 });
    }
  });

  // Fill in Download data
  downloads.forEach((d) => {
    const label = d.createdAt.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    if (activityMap.has(label)) {
      const current = activityMap.get(label)!;
      activityMap.set(label, { ...current, downloads: current.downloads + 1 });
    }
  });

  // Fill in Page Views data (NEW)
  pageViews.forEach((v) => {
    const label = v.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    if (activityMap.has(label)) {
      const current = activityMap.get(label)!;
      activityMap.set(label, { ...current, views: v.views });
    }
  });

  const activityData = Array.from(activityMap.entries()).map(([date, data]) => ({
    date,
    ...data,
  }));

  // 3. Transform Data for "Category Split" (Pie Chart)
  const categoryData = categoryCounts.map((c) => ({
    name: c.category,
    value: c._count._all,
  }));

  return (
    <div>
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-[#F97316]/10 p-3 rounded-xl text-[#F97316]">
          <BarChart3 size={32} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-[#064E3B]">Analytics Dashboard</h1>
          <p className="text-gray-500 text-sm">Performance metrics for the last 30 days.</p>
        </div>
      </div>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 font-medium uppercase tracking-wider mb-1">Page Views</p>
            <p className="text-3xl font-extrabold text-blue-600">{totalPageViews.toLocaleString()}</p>
          </div>
          <div className="bg-blue-50 text-blue-600 p-3 rounded-lg">
            <Eye size={24} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 font-medium uppercase tracking-wider mb-1">Total Downloads</p>
            <p className="text-3xl font-extrabold text-[#F97316]">{totalDownloads.toLocaleString()}</p>
          </div>
          <div className="bg-orange-50 text-[#F97316] p-3 rounded-lg">
            <Download size={24} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 font-medium uppercase tracking-wider mb-1">New Managers</p>
            <p className="text-3xl font-extrabold text-[#064E3B]">{totalNewUsers.toLocaleString()}</p>
          </div>
          <div className="bg-green-50 text-[#064E3B] p-3 rounded-lg">
            <Users size={24} />
          </div>
        </div>
      </div>

      <AdminCharts 
        activityData={activityData} 
        categoryData={categoryData} 
      />
    </div>
  );
}