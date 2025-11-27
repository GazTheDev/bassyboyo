import Link from "next/link";
import { ArrowLeft, ShieldX } from "lucide-react";
import UnsubscribeForm from "@/components/UnsubscribeForm";

export default function UnsubscribePage() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-gray-500 hover:text-[#F97316] mb-8 transition-colors font-medium"
        >
          <ArrowLeft size={20} /> Back to Homepage
        </Link>

        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4 text-red-600">
              <ShieldX size={32} />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Unsubscribe</h1>
            <p className="text-gray-600 text-sm">
              Enter your email address below to be removed from the BassyBoy Scouting Report.
            </p>
          </div>

          <UnsubscribeForm />
        </div>
      </div>
    </main>
  );
}