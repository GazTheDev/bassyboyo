import prisma from "@/lib/prisma";
import { Download, Mail, Users } from "lucide-react";

export default async function AdminNewsletterPage() {
  const subscriberCount = await prisma.newsletterSubscriber.count();

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#064E3B] mb-6">Newsletter Management</h1>

      <div className="max-w-2xl">
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 text-center">
          
          <div className="bg-orange-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-[#F97316]">
            <Mail size={40} />
          </div>
          
          <h2 className="text-5xl font-extrabold text-gray-900 mb-2">{subscriberCount}</h2>
          <p className="text-gray-500 mb-8 font-medium uppercase tracking-wide text-sm">Active Subscribers</p>

          <div className="bg-gray-50 p-4 rounded-lg text-left mb-8 border border-gray-100">
            <h3 className="font-bold text-gray-700 mb-2 flex items-center gap-2">
              <Users size={16} /> How to use:
            </h3>
            <ol className="list-decimal list-inside text-sm text-gray-600 space-y-1">
              <li>Click the button below to download your <strong>.csv</strong> file.</li>
              <li>Go to your newsletter software (Mailchimp, ConvertKit, etc.).</li>
              <li>Select <strong>"Import Contacts"</strong> and upload this file.</li>
            </ol>
          </div>

          <a
            href="/api/admin/export-subscribers"
            className="inline-flex items-center gap-2 bg-[#064E3B] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#043d2e] transition shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <Download size={20} /> Download Subscriber List
          </a>
          
        </div>
      </div>
    </div>
  );
}