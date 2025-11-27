import prisma from "@/lib/prisma";
import Link from "next/link";
import { ArrowRight, Download, FileText, Send, Star, ShieldCheck, Users, Youtube } from "lucide-react";
import FeedbackForm from "@/components/FeedbackForm";

export default async function Home() {
  // 1. Fetch latest 5 Downloads
  const recentDownloads = await prisma.download.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
  });

  // 2. Fetch latest 5 Articles
  const recentArticles = await prisma.article.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
  });

  // --- CONFIG: CHANGE YOUR VIDEO ID HERE ---
  const LATEST_VIDEO_ID = "74ru5kxciXw"; // Replace this ID with your actual YouTube video ID

  return (
    <main className="min-h-screen bg-gray-50">
      
      {/* --- HERO SECTION --- */}
      <section className="bg-[#064E3B] text-white py-20 px-4 relative overflow-hidden">
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#F97316]/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

        <div className="max-w-6xl mx-auto relative z-10 text-center">
          <span className="inline-block py-1 px-3 rounded-full bg-[#F97316]/20 border border-[#F97316] text-[#F97316] text-xs font-bold uppercase tracking-wider mb-6">
            The Ultimate FM Resource
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
            Manage Like a <span className="text-[#F97316]">Legend</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-10">
            Welcome to BassyBoy Mods. We provide the elite tactics, wonderkid databases, and graphical overhauls you need to dominate the league.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/downloads" 
              className="bg-[#F97316] text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-[#c2410c] transition shadow-lg hover:shadow-orange-500/20 flex items-center justify-center gap-2"
            >
              <Download size={20} /> Browse Downloads
            </Link>
            <Link 
              href="/articles" 
              className="bg-white/10 backdrop-blur-sm text-white border border-white/20 px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/20 transition flex items-center justify-center gap-2"
            >
              <FileText size={20} /> Read Tutorials
            </Link>
          </div>
        </div>
      </section>

      {/* --- LATEST YOUTUBE VIDEO SECTION --- */}
      <section className="bg-black py-12 border-b border-gray-800">
        <div className="max-w-4xl mx-auto px-4">
            <div className="flex items-center justify-center gap-2 mb-6 text-white/90">
                <Youtube className="text-[#FF0000]" size={28} />
                <h2 className="text-2xl font-bold">Latest Channel Upload</h2>
            </div>
            
            {/* 16:9 Aspect Ratio Container */}
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-gray-900">
                <iframe 
                    className="absolute top-0 left-0 w-full h-full"
                    src={`https://www.youtube.com/embed/${LATEST_VIDEO_ID}`} 
                    title="Latest YouTube Video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                ></iframe>
            </div>
             <div className="text-center mt-6">
                <a 
                    href="https://www.youtube.com/@BassyBoy" 
                    target="_blank" 
                    className="inline-flex items-center gap-2 text-gray-400 hover:text-[#F97316] transition-colors text-sm font-medium"
                >
                    Subscribe for more modding tutorials <ArrowRight size={16} />
                </a>
            </div>
        </div>
      </section>

      {/* --- CONTENT GRID (Downloads & Articles) --- */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* LEFT: Latest Downloads */}
          <div>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-[#064E3B] flex items-center gap-2">
                <Download className="text-[#F97316]" /> Latest Drops
              </h2>
              <Link href="/downloads" className="text-sm font-bold text-gray-500 hover:text-[#F97316]">View All</Link>
            </div>
            
            <div className="space-y-4">
              {recentDownloads.map((item) => (
                <Link key={item.id} href={`/downloads/${item.id}`} className="group block">
                  <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:border-[#F97316] transition-all flex items-center gap-4">
                    <div className="bg-[#064E3B]/10 p-3 rounded-lg text-[#064E3B] group-hover:bg-[#F97316] group-hover:text-white transition-colors">
                      <Download size={20} />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 group-hover:text-[#F97316] transition-colors">{item.title}</h3>
                      <p className="text-xs text-gray-500">{item.category} • {item.downloads} downloads</p>
                    </div>
                    <ArrowRight size={16} className="ml-auto text-gray-300 group-hover:text-[#F97316] opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-1" />
                  </div>
                </Link>
              ))}
              {recentDownloads.length === 0 && <p className="text-gray-500 italic">No downloads yet.</p>}
            </div>
          </div>

          {/* RIGHT: Latest Articles */}
          <div>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-[#064E3B] flex items-center gap-2">
                <FileText className="text-[#F97316]" /> Tactical Board
              </h2>
              <Link href="/articles" className="text-sm font-bold text-gray-500 hover:text-[#F97316]">View All</Link>
            </div>

            <div className="space-y-4">
              {recentArticles.map((item) => (
                <Link key={item.id} href={`/articles/${item.id}`} className="group block">
                  <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:border-[#F97316] transition-all flex items-center gap-4">
                    <div className="bg-orange-50 p-3 rounded-lg text-[#F97316] group-hover:bg-[#F97316] group-hover:text-white transition-colors">
                      <FileText size={20} />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 group-hover:text-[#F97316] transition-colors">{item.title}</h3>
                      <p className="text-xs text-gray-500">{item.category} • {item.createdAt.toLocaleDateString()}</p>
                    </div>
                  </div>
                </Link>
              ))}
               {recentArticles.length === 0 && <p className="text-gray-500 italic">No articles yet.</p>}
            </div>
          </div>

        </div>
      </section>

      {/* --- ABOUT SECTION --- */}
      <section className="bg-white py-16 border-y border-gray-200">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-[#064E3B] mb-6">About BassyBoy</h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-10">
            I've been playing Football Manager since the Championship Manager 01/02 days. 
            This site is a collection of my personal mods that I've created over the years to enhance my gameplay experience.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-4 bg-gray-50 rounded-xl">
              <div className="bg-[#F97316]/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-[#F97316]">
                <ShieldCheck size={24} />
              </div>
              <h3 className="font-bold text-gray-900">Transform Your Game!</h3>
              <p className="text-sm text-gray-500 mt-2">With my mods you will be able to transform your Football Manager 26 gameplay!.</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl">
              <div className="bg-[#F97316]/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-[#F97316]">
                <Star size={24} />
              </div>
              <h3 className="font-bold text-gray-900">High Quality</h3>
              <p className="text-sm text-gray-500 mt-2">Tested in-game for at least 1 season.</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl">
              <div className="bg-[#F97316]/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-[#F97316]">
                <Users size={24} />
              </div>
              <h3 className="font-bold text-gray-900">Community Driven</h3>
              <p className="text-sm text-gray-500 mt-2">Join the discussion in the comments.</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- FEEDBACK FORM --- */}
      <section className="max-w-2xl mx-auto px-4 py-20">
        <div className="bg-[#064E3B] rounded-3xl p-8 md:p-12 text-white shadow-2xl relative overflow-hidden">
          {/* Decorative Circle */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#F97316] rounded-full opacity-20 blur-2xl"></div>
          
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-2">Have a Request?</h2>
            <p className="text-white/70 mb-8">Found a bug or want a specific mod? Let me know directly.</p>

            <FeedbackForm />
            
          </div>
        </div>
      </section>

    </main>
  );
}