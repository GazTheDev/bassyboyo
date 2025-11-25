"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, User, LogOut, LogIn, UserPlus } from "lucide-react";
import { handleSignOut } from "@/app/actions/auth-actions";

export default function NavbarClient({ session }: { session: any }) {
  const [isOpen, setIsOpen] = useState(false);
  
  // STRICT CHECK: Ensure we actually have a user object
  const isLoggedIn = !!session?.user;

  return (
    <nav className="bg-[#064E3B] text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* --- LOGO --- */}
          <Link href="/" className="flex-shrink-0 flex items-center group">
            <span className="text-2xl font-extrabold tracking-tighter text-[#F97316] group-hover:scale-105 transition-transform">
              BASSY<span className="text-white">BOY</span>
            </span>
          </Link>

          {/* --- DESKTOP MENU --- */}
          <div className="hidden md:flex items-center space-x-6">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/downloads">Downloads</NavLink>
            <NavLink href="/articles">Articles</NavLink>
            <NavLink href="/socials">Socials</NavLink>
            
            {/* Admin Link (Only visible if ADMIN) */}
            {session?.user?.role === "ADMIN" && (
              <Link 
                href="/admin" 
                className="bg-white/10 px-3 py-1 rounded border border-white/20 text-[#F97316] font-bold hover:bg-white/20 transition-colors text-sm"
              >
                Admin Panel
              </Link>
            )}

            {/* --- AUTH SECTION --- */}
            <div className="pl-6 border-l border-white/20 ml-2">
              {isLoggedIn ? (
                // LOGGED IN STATE
                <div className="flex items-center gap-4">
                  <Link href="/account" className="text-right hidden lg:block hover:opacity-80 transition">
                    <div className="text-[10px] uppercase tracking-wider text-[#F97316] font-bold">Manager</div>
                    <div className="text-sm font-bold leading-none">{session.user.name || "User"}</div>
                  </Link>
                  
                  <form action={handleSignOut}>
                    <button 
                      className="bg-white/10 p-2 rounded-full hover:bg-red-500/20 hover:text-red-400 transition text-gray-300" 
                      title="Logout"
                    >
                      <LogOut size={18} />
                    </button>
                  </form>
                </div>
              ) : (
                // LOGGED OUT STATE
                <div className="flex items-center gap-3">
                  <Link 
                    href="/api/auth/signin" 
                    className="flex items-center gap-2 text-sm font-bold text-white/80 hover:text-white transition"
                  >
                    <LogIn size={16} /> Login
                  </Link>
                  <Link 
                    href="/register" 
                    className="bg-[#F97316] hover:bg-[#c2410c] text-white px-4 py-2 rounded-lg text-sm font-bold transition flex items-center gap-2 shadow-md hover:shadow-lg"
                  >
                    <UserPlus size={16} /> Join Club
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* --- MOBILE MENU BUTTON --- */}
          <div className="md:hidden flex items-center gap-4">
             {/* If logged in, show mini avatar on mobile navbar too */}
             {isLoggedIn && (
                <div className="w-8 h-8 bg-[#F97316] rounded-full flex items-center justify-center text-xs font-bold">
                  {session.user.name?.charAt(0) || "U"}
                </div>
             )}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white focus:outline-none p-2"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* --- MOBILE DROPDOWN MENU --- */}
      {isOpen && (
        <div className="md:hidden bg-[#053d2e] border-t border-white/10 animate-fade-in">
          <div className="px-4 pt-4 pb-6 space-y-2">
            <MobileNavLink href="/" onClick={() => setIsOpen(false)}>Home</MobileNavLink>
            <MobileNavLink href="/downloads" onClick={() => setIsOpen(false)}>Downloads</MobileNavLink>
            <MobileNavLink href="/articles" onClick={() => setIsOpen(false)}>Articles</MobileNavLink>
            <MobileNavLink href="/socials" onClick={() => setIsOpen(false)}>Socials</MobileNavLink>
            
            {session?.user?.role === "ADMIN" && (
               <MobileNavLink href="/admin" onClick={() => setIsOpen(false)} highlight>
                 Admin Panel
               </MobileNavLink>
            )}

            <div className="border-t border-white/10 mt-6 pt-6">
              {isLoggedIn ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-white">
                    <div className="bg-[#F97316] p-2 rounded-full">
                      <User size={20} />
                    </div>
                    <div>
                      <div className="text-xs text-white/60 uppercase font-bold">Signed in as</div>
                      <div className="font-bold">{session.user.name || "Manager"}</div>
                    </div>
                  </div>
                  
                  <Link 
                    href="/account"
                    onClick={() => setIsOpen(false)} 
                    className="block text-center w-full bg-white/5 border border-white/10 py-3 rounded-lg text-sm font-bold hover:bg-white/10"
                  >
                    Manage Account
                  </Link>

                  <form action={handleSignOut}>
                    <button className="w-full bg-red-500/10 text-red-400 border border-red-500/20 py-3 rounded-lg text-sm font-bold hover:bg-red-500/20">
                      Logout
                    </button>
                  </form>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  <Link 
                    href="/api/auth/signin" 
                    className="flex items-center justify-center gap-2 py-3 border border-white/20 rounded-xl text-sm font-bold text-white hover:bg-white/5"
                    onClick={() => setIsOpen(false)}
                  >
                    Login
                  </Link>
                  <Link 
                    href="/register" 
                    className="flex items-center justify-center gap-2 py-3 bg-[#F97316] rounded-xl text-sm font-bold text-white hover:bg-[#c2410c]"
                    onClick={() => setIsOpen(false)}
                  >
                    Join Club
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

// --- HELPERS ---

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="text-gray-300 hover:text-[#F97316] px-3 py-2 rounded-md text-sm font-medium transition-colors">
      {children}
    </Link>
  );
}

function MobileNavLink({ href, onClick, children, highlight }: any) {
  return (
    <Link 
      href={href} 
      onClick={onClick}
      className={`block px-4 py-3 rounded-lg text-base font-bold transition ${
        highlight 
          ? "text-[#F97316] bg-[#F97316]/10 border border-[#F97316]/20" 
          : "text-gray-300 hover:text-white hover:bg-white/5"
      }`}
    >
      {children}
    </Link>
  );
}