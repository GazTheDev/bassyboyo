import Link from "next/link";
import { Twitter, Youtube, Twitch, Heart } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#064E3B] text-white pt-16 pb-8 border-t border-[#F97316]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* COLUMN 1: BRAND */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="inline-block mb-4 group">
              <span className="text-2xl font-extrabold tracking-tighter text-[#F97316] group-hover:opacity-80 transition-opacity">
                BASSY<span className="text-white">BOY</span>
              </span>
            </Link>
            <p className="text-gray-300 text-sm leading-relaxed mb-6">
              The ultimate resource for Football Manager fans. Tactics, wonderkids, and the tools you need to dominate the dugout.
            </p>
            <div className="flex gap-4">
              <SocialIcon href="https://x.com/BassyBoyo" icon={<Twitter size={18} />} />
              <SocialIcon href="https://t.co/Eto64sHIuB" icon={<Youtube size={18} />} />
              <SocialIcon href="https://www.twitch.tv/bassyboyyoutube" icon={<Twitch size={18} />} />
            </div>
          </div>

          {/* COLUMN 2: DISCOVER */}
          <div>
            <h3 className="font-bold text-[#F97316] mb-4 uppercase text-sm tracking-wider">Discover</h3>
            <ul className="space-y-3 text-sm text-gray-300">
              <li><FooterLink href="/downloads">Download Center</FooterLink></li>
              <li><FooterLink href="/articles">The Dressing Room</FooterLink></li>
              <li><FooterLink href="/socials">Community Socials</FooterLink></li>
              <li><FooterLink href="/register">Join the Club</FooterLink></li>
            </ul>
          </div>

          {/* COLUMN 3: TOOLS */}
          <div>
            <h3 className="font-bold text-[#F97316] mb-4 uppercase text-sm tracking-wider">Manager Tools</h3>
            <ul className="space-y-3 text-sm text-gray-300">
              <li><FooterLink href="/tools/wage-calculator">Wage Converter</FooterLink></li>
        
            </ul>
          </div>

          {/* COLUMN 4: SUPPORT */}
          <div>
            <h3 className="font-bold text-[#F97316] mb-4 uppercase text-sm tracking-wider">Support</h3>
            <ul className="space-y-3 text-sm text-gray-300">
              <li><FooterLink href="/">Report a Bug</FooterLink></li>
              <li><FooterLink href="/terms">Terms & Conditions</FooterLink></li>
              <li><FooterLink href="/unsubscribe">Unsubscribe From Mailing List</FooterLink></li>
            </ul>
          </div>

        </div>

        {/* DIVIDER */}
        <div className="border-t border-white/10 pt-8 mt-8 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-4">
          
          <p className="text-xs text-gray-400">
            &copy; {currentYear} BassyBoy Mods. All rights reserved.
          </p>

          <p className="text-[10px] text-gray-500 max-w-md text-center md:text-right">
            This site is not affiliated with Sports Interactive or SEGA. Football Manager is a registered trademark of Sports Interactive & SEGA.
          </p>

        </div>
      </div>
    </footer>
  );
}

// Helper Components
function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="hover:text-white hover:translate-x-1 transition-all duration-200 inline-block">
      {children}
    </Link>
  );
}

function SocialIcon({ href, icon }: { href: string; icon: React.ReactNode }) {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      className="bg-white/10 p-2 rounded-full hover:bg-[#F97316] hover:text-white transition-colors text-gray-300"
    >
      {icon}
    </a>
  );
}