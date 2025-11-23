import Link from "next/link";
import { Youtube, Twitch, Twitter, Heart, ExternalLink, Coffee } from "lucide-react";

export default function SocialsPage() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center py-16 px-4">
      
      {/* --- HEADER --- */}
      <div className="text-center mb-12 max-w-2xl">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-[#064E3B] rounded-full mb-6 shadow-lg">
          <span className="text-2xl font-bold text-[#F97316]">B</span>
        </div>
        <h1 className="text-4xl font-extrabold text-[#064E3B] mb-4">
          Connect with BassyBoy
        </h1>
        <p className="text-gray-600 text-lg">
          Catch the livestreams, watch the tutorials, or say hello on X.
        </p>
      </div>

      {/* --- LINKS CONTAINER --- */}
      <div className="w-full max-w-md space-y-4">

        {/* 1. TWITCH */}
        <SocialCard
          href="https://www.youtube.com/@BassyBoy/streams"
          icon={<Youtube size={24} />}
          label="YouTube Live"
          sublabel="Live streams & saves"
          color="bg-[#9146FF]" // Twitch Purple
        />

        {/* 2. YOUTUBE */}
        <SocialCard
          href="https://www.youtube.com/BassyBoy"
          icon={<Youtube size={24} />}
          label="YouTube"
          sublabel="Tutorials & Highlights"
          color="bg-[#FF0000]" // YouTube Red
        />

        {/* 3. X (TWITTER) */}
        <SocialCard
          href="https://twitter.com/BassyBoyo"
          icon={<Twitter size={24} />}
          label="X (Twitter)"
          sublabel="Updates & Thoughts"
          color="bg-black" // X Black
        />

        {/* --- DIVIDER --- */}
        <div className="flex items-center gap-4 py-4">
          <div className="h-px bg-gray-300 flex-1"></div>
          <span className="text-gray-400 text-xs font-bold uppercase tracking-widest">Support</span>
          <div className="h-px bg-gray-300 flex-1"></div>
        </div>

        {/* 4. DONATE (Highlighted) */}
        <a 
          href="https://www.paypal.com/paypalme/bassyboyoyt"
          target="_blank"
          rel="noopener noreferrer"
          className="group block relative overflow-hidden bg-white rounded-2xl shadow-md border-2 border-[#F97316] p-1 transition-all hover:shadow-xl hover:-translate-y-1"
        >
          <div className="bg-[#F97316] rounded-xl p-4 flex items-center justify-between text-white group-hover:bg-[#ea580c] transition-colors">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-2 rounded-lg">
                <Heart size={24} className="animate-pulse" />
              </div>
              <div className="text-left">
                <span className="block font-bold text-lg">Donate via PayPal</span>
                <span className="block text-xs text-white/80 font-medium">Support the content creation</span>
              </div>
            </div>
            <ExternalLink size={20} className="opacity-70 group-hover:opacity-100" />
          </div>
        </a>

      </div>

      {/* Footer Note */}
      <p className="mt-12 text-gray-400 text-sm">
        Thank you for being part of the community.
      </p>

    </main>
  );
}

// --- HELPER COMPONENT ---
// This makes the code cleaner by reusing the card design
function SocialCard({ href, icon, label, sublabel, color }: any) {
  return (
    <a 
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center justify-between bg-white p-4 rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:border-gray-300 transition-all hover:-translate-y-0.5"
    >
      <div className="flex items-center gap-4">
        {/* Icon Container with specific brand color */}
        <div className={`${color} text-white p-3 rounded-lg shadow-sm group-hover:scale-110 transition-transform`}>
          {icon}
        </div>
        
        <div className="text-left">
          <span className="block font-bold text-gray-900 text-lg group-hover:text-[#F97316] transition-colors">
            {label}
          </span>
          <span className="block text-xs text-gray-500 font-medium">
            {sublabel}
          </span>
        </div>
      </div>

      <ExternalLink size={20} className="text-gray-300 group-hover:text-[#F97316] transition-colors" />
    </a>
  );
}