import NewPasswordForm from "@/components/NewPasswordForm";

interface PageProps {
  searchParams: Promise<{ token: string }>;
}

export default async function NewPasswordPage(props: PageProps) {
  const searchParams = await props.searchParams;
  const token = searchParams.token;

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 text-red-500 font-bold">
        Missing Token! Please check your email link.
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md border border-gray-200">
        <h1 className="text-2xl font-bold text-center text-[#064E3B] mb-6">Enter New Password</h1>
        
        {/* Render the Client Form */}
        <NewPasswordForm token={token} />
        
      </div>
    </div>
  );
}