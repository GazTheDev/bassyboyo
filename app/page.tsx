import prisma from "@/lib/prisma";
import Link from "next/link";
import { ArrowRight, Download, FileText, Star, ShieldCheck, Users, Youtube, Lightbulb, Mail, MessageCircle, MessageSquare } from "lucide-react";
import FeedbackForm from "@/components/FeedbackForm";
import HomepageSearch from "@/components/HomepageSearch";
import NewsletterForm from "@/components/NewsletterForm";
import NewsletterPopup from "@/components/NewsletterPopup";

export default async function Home() {
  // 1. Fetch content data in parallel
  const [recentDownloads, recentArticles, recentTopics, recentComments] = await Promise.all([
    prisma.download.findMany({ take: 5, orderBy: { createdAt: "desc" } }),
    prisma.article.findMany({ take: 5, orderBy: { createdAt: "desc" } }),
    prisma.forumTopic.findMany({ 
      take: 5, 
      orderBy: { createdAt: "desc" },
      include: { _count: { select: { posts: true } } }
    }),
    prisma.comment.findMany({ 
      take: 5, 
      orderBy: { createdAt: "desc" },
      include: { user: true, download: true, article: true }
    }),
  ]);

  // 2. Fetch Video ID safely (Prevents page crash if DB table is missing)
  let LATEST_VIDEO_ID = "74ru5kxciXw"; // Default Fallback
  try {
    // @ts-ignore - Ignores type error if Prisma Client isn't fully updated yet
    const siteConfig = await prisma.siteConfig?.findUnique({ where: { id: "config" } });
    if (siteConfig?.youtubeVideoId) {
      LATEST_VIDEO_ID = siteConfig.youtubeVideoId;
    }
  } catch (error) {
    console.warn("Site config not found, using default video.");
  }

  const fmTips = [
    "Check your Medical Centre weekly to prevent injury crises before they happen.",
    "Don't ignore Team Cohesion. A happy squad overperforms; an unhappy one collapses.",
    "Use 'Demand More' shout when drawing against a weaker team, but only after 60 mins.",
    "Scout nations with high youth ratings like Brazil, Argentina, and Colombia for cheap wonderkids.",
    "In lower leagues, physical attributes (Pace, Strength) often matter more than technical ones.",
    "Set individual training focuses for your young players to mold them into specific roles.",
    "If you're conceding late goals, switch your goalkeeper's distribution to 'Slow Pace' to kill time.",
    "Analyze the 'Data Hub' pass maps to see if your striker is isolated during matches.",
  ];
  const randomTip = fmTips[Math.floor(Math.random() * fmTips.length)];

  return (
    <main className="min-h-screen bg-gray-50">
      
      {/* --- HERO SECTION --- */}
      <section className="bg-[#064E3B] text-white py-20 px-4 relative z-30">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#F97316]/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
        </div>

        <div className="max-w-6xl mx-auto relative text-center">
          <span className="inline-block py-1 px-3 rounded-full bg-[#F97316]/20 border border-[#F97316] text-[#F97316] text-xs font-bold uppercase tracking-wider mb-6">
            The Ultimate FM Resource
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
            Manage Like a <span className="text-[#F97316]">Legend</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            Welcome to BassyBoy Mods. We provide the elite tactics, wonderkid databases, and graphical overhauls you need to dominate the league.
          </p>

          <HomepageSearch />
          
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

      {/* --- RANDOM TIP BAR --- */}
      <div className="bg-[#F97316] text-white py-3 px-4 shadow-md relative z-20">
        <div className="max-w-6xl mx-auto flex items-center justify-center gap-3 text-center text-sm md:text-base font-medium">
          <Lightbulb className="shrink-0 text-white fill-white/20" size={20} />
          <span>
            <span className="font-bold opacity-80 uppercase tracking-wider mr-2">Tip:</span> 
            {randomTip}
          </span>
        </div>
      </div>

      {/* --- LATEST YOUTUBE VIDEO --- */}
      <section className="bg-black py-16 border-b border-gray-800">
        <div className="max-w-4xl mx-auto px-4">
            <div className="flex items-center justify-center gap-2 mb-8 text-white/90">
                <Youtube className="text-[#FF0000]" size={32} />
                <h2 className="text-3xl font-bold tracking-tight">Latest from the Touchline</h2>
            </div>
            
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-gray-900 group">
                <iframe 
                    className="absolute top-0 left-0 w-full h-full"
                    src={`https://www.youtube.com/embed/${LATEST_VIDEO_ID}`} 
                    title="Latest YouTube Video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                ></iframe>
            </div>
             <div className="text-center mt-8">
                <a 
                    href="https://youtube.com/@BassyBoy" 
                    target="_blank" 
                    className="inline-flex items-center gap-2 text-gray-400 hover:text-[#F97316] transition-colors text-sm font-bold uppercase tracking-wider"
                >
                    Subscribe for more tactics <ArrowRight size={16} />
                </a>
            </div>
        </div>
      </section>

      {/* --- MAIN CONTENT GRID --- */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        
        {/* ROW 1: DOWNLOADS & ARTICLES */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          
          {/* Latest Downloads */}
          <div>
            <div className="flex items-center justify-between mb-8 border-b border-gray-200 pb-4">
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
                      <p className="text-xs text-gray-500 font-medium">{item.category} • {item.downloads} downloads</p>
                    </div>
                    <ArrowRight size={16} className="ml-auto text-gray-300 group-hover:text-[#F97316] opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-1" />
                  </div>
                </Link>
              ))}
              {recentDownloads.length === 0 && <p className="text-gray-500 italic">No downloads yet.</p>}
            </div>
          </div>

          {/* Latest Articles */}
          <div>
            <div className="flex items-center justify-between mb-8 border-b border-gray-200 pb-4">
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
                      <p className="text-xs text-gray-500 font-medium">{item.category} • {item.createdAt.toLocaleDateString()}</p>
                    </div>
                  </div>
                </Link>
              ))}
               {recentArticles.length === 0 && <p className="text-gray-500 italic">No articles yet.</p>}
            </div>
          </div>

        </div>

        {/* ROW 2: FORUM & COMMENTS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Latest Forum Discussions */}
          <div className="bg-gray-100 rounded-2xl p-8 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-[#064E3B] flex items-center gap-2">
                <MessageSquare className="text-[#F97316]" /> Recent Discussions
              </h2>
              <Link href="/forum" className="text-xs font-bold uppercase tracking-wider text-gray-500 hover:text-[#F97316]">Visit Forum</Link>
            </div>
            
            <div className="space-y-3">
              {recentTopics.map((topic) => (
                <Link key={topic.id} href={`/forum/topic/${topic.id}`} className="block group">
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition border border-transparent hover:border-[#F97316]/30">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-[#F97316]"></div>
                      <h3 className="font-medium text-gray-700 group-hover:text-[#064E3B] transition-colors line-clamp-1">
                        {topic.title}
                      </h3>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-400 font-bold">
                      <MessageCircle size={12} /> {topic._count.posts}
                    </div>
                  </div>
                </Link>
              ))}
              {recentTopics.length === 0 && <p className="text-gray-500 italic text-sm">No discussions yet.</p>}
            </div>
          </div>

          {/* Recent Comments */}
          <div>
            <div className="flex items-center justify-between mb-6 pt-2">
              <h2 className="text-xl font-bold text-[#064E3B] flex items-center gap-2">
                <Users className="text-[#F97316]" /> Community Chatter
              </h2>
            </div>

            <div className="space-y-4">
              {recentComments.map((comment) => {
                const link = comment.downloadId ? `/downloads/${comment.downloadId}` : `/articles/${comment.articleId}`;
                const title = comment.download?.title || comment.article?.title || "Deleted Content";
                
                return (
                  <Link key={comment.id} href={link} className="block group">
                    <div className="bg-white p-4 rounded-xl border border-gray-100 hover:shadow-md hover:border-[#F97316]/50 transition-all">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-[#064E3B] bg-[#064E3B]/10 px-2 py-0.5 rounded-full">{comment.user?.name || "Manager"}</span>
                        <span className="text-[10px] text-gray-400">{comment.createdAt.toLocaleDateString()}</span>
                      </div>
                      <p className="text-sm text-gray-600 line-clamp-2 italic mb-2">"{comment.content}"</p>
                      <div className="text-[10px] text-gray-400 flex items-center gap-1 border-t border-gray-50 pt-2">
                        on <span className="text-[#F97316] font-medium truncate max-w-[200px]">{title}</span>
                      </div>
                    </div>
                  </Link>
                );
              })}
              {recentComments.length === 0 && <p className="text-gray-500 italic text-sm">No comments yet.</p>}
            </div>
          </div>

        </div>

      </section>

      {/* --- ABOUT SECTION --- */}
      <section className="bg-white py-20 border-y border-gray-200">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-extrabold text-[#064E3B] mb-6">About BassyBoy</h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-12">
            I've been playing Football Manager since the Championship Manager 01/02 days. 
            This site is a collection of my personal mods, tactical experiments, and graphical tweaks designed to make your save more immersive.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100 hover:border-[#F97316]/50 transition-colors">
              <div className="bg-[#F97316]/10 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 text-[#F97316]">
                <ShieldCheck size={28} />
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-2">Transform Your Game</h3>
              <p className="text-sm text-gray-500">Essential fixes and improvements for Football Manager 2026.</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100 hover:border-[#F97316]/50 transition-colors">
              <div className="bg-[#F97316]/10 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 text-[#F97316]">
                <Star size={28} />
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-2">High Quality</h3>
              <p className="text-sm text-gray-500">Every file is tested in-game for at least one full season before release.</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100 hover:border-[#F97316]/50 transition-colors">
              <div className="bg-[#F97316]/10 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 text-[#F97316]">
                <Users size={28} />
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-2">Community Driven</h3>
              <p className="text-sm text-gray-500">Join the locker room discussion and shape future content.</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- NEWSLETTER SECTION --- */}
      <section className="py-24 bg-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(#F97316 1px, transparent 1px)", backgroundSize: "30px 30px" }}></div>
        <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-gray-900 to-transparent"></div>
        
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-[#F97316]/20 border border-[#F97316] text-[#F97316] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-6 shadow-[0_0_15px_rgba(249,115,22,0.3)]">
            <Mail size={14} /> Monthly Updates
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tighter">
            THE SCOUTING REPORT
          </h2>
          <p className="text-lg text-gray-400 mb-10 max-w-2xl mx-auto font-light">
            Get the latest wonderkid shortlists, tactic testing results, and site updates delivered straight to your inbox. No spam, just winning.
          </p>
          
          <NewsletterForm />

          <p className="mt-8 text-xs text-gray-600">
             To stop receiving updates, <Link href="/unsubscribe" className="text-gray-500 hover:text-[#F97316] underline decoration-gray-700 underline-offset-4">unsubscribe here</Link>.
          </p>
        </div>
      </section>

      {/* --- FEEDBACK FORM --- */}
      <section className="max-w-2xl mx-auto px-4 py-20">
        <div className="bg-[#064E3B] rounded-3xl p-8 md:p-12 text-white shadow-2xl relative overflow-hidden transform hover:scale-[1.01] transition-transform duration-500">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#F97316] rounded-full opacity-20 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/20 to-transparent"></div>
          
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-2">Have a Request?</h2>
            <p className="text-white/70 mb-8">Found a bug or want a specific mod? Let me know directly.</p>

            <FeedbackForm />
            
          </div>
        </div>
      </section>

      <NewsletterPopup />

    </main>
  );
}