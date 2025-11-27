import Link from "next/link";
import { ArrowLeft, ShieldAlert, FileText } from "lucide-react";

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* --- HEADER --- */}
        <div className="mb-8">
          <Link 
            href="/register" 
            className="inline-flex items-center gap-2 text-gray-500 hover:text-[#F97316] mb-6 transition-colors font-medium"
          >
            <ArrowLeft size={20} /> Back to Registration
          </Link>
          
          <div className="bg-[#064E3B] text-white p-8 rounded-2xl shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="relative z-10">
              <h1 className="text-3xl md:text-4xl font-extrabold mb-2">Terms and Conditions</h1>
              <p className="text-white/80">Last Updated: {new Date().getFullYear()}</p>
            </div>
          </div>
        </div>

        {/* --- CONTENT CARD --- */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 md:p-12 space-y-8 text-gray-700 leading-relaxed">
          
          <section>
            <h2 className="text-2xl font-bold text-[#064E3B] mb-4 flex items-center gap-2">
              <FileText size={24} /> 1. Introduction
            </h2>
            <p>
              Welcome to BassyBoy Mods. By creating an account or downloading content from this website, you agree to comply with and be bound by the following terms and conditions of use. If you disagree with any part of these terms, please do not use our website.
            </p>
          </section>

          <hr className="border-gray-100" />

          <section>
            <h2 className="text-xl font-bold text-[#064E3B] mb-3">2. User Accounts</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>You are responsible for maintaining the confidentiality of your account and password.</li>
              <li>You agree to accept responsibility for all activities that occur under your account.</li>
              <li>We reserve the right to terminate accounts, remove or edit content, or cancel orders in our sole discretion.</li>
            </ul>
          </section>

          <hr className="border-gray-100" />

          <section>
            <h2 className="text-xl font-bold text-[#064E3B] mb-3">3. Mod Downloads & Usage</h2>
            <div className="bg-orange-50 border-l-4 border-[#F97316] p-4 my-4">
              <p className="text-sm text-orange-800 font-bold flex items-center gap-2">
                <ShieldAlert size={16} /> Disclaimer
              </p>
              <p className="text-sm text-orange-900 mt-1">
                All mods, tactics, and graphics are provided "as is". While we test everything thoroughly, BassyBoy Mods is not liable for any corrupted save games or technical issues that may arise from using third-party files. Always backup your save files!
              </p>
            </div>
            <p>
              You may download files for personal use only. You are not permitted to re-upload, sell, or redistribute our files on other platforms without explicit permission.
            </p>
          </section>

          <hr className="border-gray-100" />

          <section>
            <h2 className="text-xl font-bold text-[#064E3B] mb-3">4. Community Guidelines</h2>
            <p>
              We want to keep the dressing room atmosphere positive. When using the comments section:
            </p>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li>No hate speech, bullying, or harassment.</li>
              <li>No spamming or self-promotion.</li>
              <li>Respect other managers and their tactical opinions.</li>
            </ul>
            <p className="mt-2 text-sm text-gray-500 italic">
              Violating these rules will result in an immediate ban.
            </p>
          </section>

          <hr className="border-gray-100" />

          <section>
            <h2 className="text-xl font-bold text-[#064E3B] mb-3">5. Intellectual Property</h2>
            <p>
              The content on this website, including text, graphics, logos, and custom tactics, is the property of BassyBoy Mods unless otherwise stated. Football Manager is a registered trademark of Sports Interactive and SEGA; this site is not affiliated with them.
            </p>
          </section>

        </div>

        {/* --- FOOTER ACTIONS --- */}
        <div className="mt-8 text-center">
          <p className="text-gray-500 mb-4">Have questions about these terms?</p>
          <Link 
            href="/" 
            className="inline-block bg-[#F97316] text-white font-bold px-8 py-3 rounded-xl hover:bg-[#c2410c] transition shadow-md"
          >
            Contact Support
          </Link>
        </div>

      </div>
    </main>
  );
}