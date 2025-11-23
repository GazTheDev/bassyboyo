"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, User, LogOut } from "lucide-react"; // Make sure you have lucide-react installed
import { handleSignOut } from "@/app/actions/auth-actions";

export default function NavbarClient({ session }: { session: any }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-[#064E3B] text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* --- LOGO --- */}
          <Link href="/" className="flex-shrink-0 flex items-center">
            <span className="text-2xl font-extrabold tracking-tighter text-[#F97316]">
              BASSY<span className="text-white">BOY</span>
            </span>
          </Link>

          {/* --- DESKTOP MENU (Hidden on Mobile) --- */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/downloads">Downloads</NavLink>
            <NavLink href="/articles">Articles</NavLink> {/* New Link */}
            
            {/* Admin Link */}
            {session?.user?.role === "ADMIN" && (
              <Link 
                href="/admin" 
                className="text-[#F97316] font-bold hover:text-white transition-colors"
              >
                Admin Panel
              </Link>
            )}

            {/* Auth Buttons */}
            {session ? (
              <div className="flex items-center gap-4 pl-4 border-l border-white/20">
                <div className="text-right hidden lg:block">
                  <div className="text-xs text-gray-300">Manager</div>
                  <div className="text-sm font-bold leading-none">{session.user?.name}</div>
                </div>
                
                <form action={handleSignOut}>
                  <button className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition text-white" title="Logout">
                    <LogOut size={18} />
                  </button>
                </form>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link href="/api/auth/signin" className="text-sm font-medium hover:text-[#F97316] transition">
                  Login
                </Link>
                <Link href="/register" className="bg-[#F97316] hover:bg-[#EA580C] text-white px-4 py-2 rounded-lg text-sm font-bold transition">
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* --- MOBILE MENU BUTTON --- */}
          <div className="md:hidden flex items-center">
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
        <div className="md:hidden bg-[#043d2e] border-t border-white/10">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <MobileNavLink href="/" onClick={() => setIsOpen(false)}>Home</MobileNavLink>
            <MobileNavLink href="/downloads" onClick={() => setIsOpen(false)}>Downloads</MobileNavLink>
            <MobileNavLink href="/articles" onClick={() => setIsOpen(false)}>Articles</MobileNavLink>
            
            {session?.user?.role === "ADMIN" && (
               <MobileNavLink href="/admin" onClick={() => setIsOpen(false)} style="text-[#F97316]">
                 Admin Panel
               </MobileNavLink>
            )}

            <div className="border-t border-white/10 mt-4 pt-4 pb-2">
              {session ? (
                <div className="space-y-3 px-3">
                  <div className="flex items-center gap-3 text-gray-300">
                    <User size={20} />
                    <span className="font-medium">{session.user?.name || "Manager"}</span>
                  </div>
                  <form action={handleSignOut}>
                    <button className="w-full text-left bg-white/10 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-white/20">
                      Logout
                    </button>
                  </form>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3 px-3">
                  <Link href="/api/auth/signin" className="text-center py-2 border border-white/20 rounded-lg text-sm font-bold text-white">
                    Login
                  </Link>
                  <Link href="/register" className="text-center py-2 bg-[#F97316] rounded-lg text-sm font-bold text-white">
                    Sign Up
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

// Helper Components for cleaner code
function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="text-gray-300 hover:text-[#F97316] px-3 py-2 rounded-md text-sm font-medium transition-colors">
      {children}
    </Link>
  );
}

function MobileNavLink({ href, onClick, children, style }: any) {
  return (
    <Link 
      href={href} 
      onClick={onClick}
      className={`block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-white/10 transition ${style}`}
    >
      {children}
    </Link>
  );
}