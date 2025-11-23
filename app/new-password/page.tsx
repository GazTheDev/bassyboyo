import { newPassword } from "@/app/actions/reset-password";

interface PageProps {
  searchParams: Promise<{ token: string }>;
}

export default async function NewPasswordPage(props: PageProps) {
  // In Next.js 15, searchParams is async
  const searchParams = await props.searchParams;
  const token = searchParams.token;

  if (!token) return <div>Missing Token!</div>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md border border-gray-200">
        <h1 className="text-2xl font-bold text-center text-bassy-green mb-6">Enter New Password</h1>
        
        <form action={newPassword} className="space-y-4">
          <input type="hidden" name="token" value={token} />
          
          <input 
            type="password" 
            name="password" 
            placeholder="New Password"
            required 
            className="w-full border p-2 rounded-lg" 
          />
          
          <button type="submit" className="w-full bg-bassy-green text-white font-bold py-3 rounded-lg hover:bg-bassy-green-dark">
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
}