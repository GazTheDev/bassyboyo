import { registerUser } from "@/app/actions/auth";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-bassy-green-light">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md border border-gray-200">
        <h1 className="text-2xl font-bold text-center text-bassy-green mb-6">Join BassyBoy FC</h1>
        
        <form action={registerUser} className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-gray-700">Username</label>
            <input type="text" name="name" required className="w-full border p-2 rounded-lg" />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700">Email</label>
            <input type="email" name="email" required className="w-full border p-2 rounded-lg" />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700">Password</label>
            <input type="password" name="password" required className="w-full border p-2 rounded-lg" />
          </div>
          
          <button type="submit" className="w-full bg-[#064E3B] text-white font-bold py-3 rounded-lg hover:bg-bassy-orange-dark">
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
}