export default function AdminDashboard() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Dashboard Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Stat Card 1 */}
        <div className="bg-orange-50 p-6 rounded-xl border border-bassy-orange/20">
          <h3 className="text-gray-500 font-medium">Total Downloads</h3>
          <p className="text-4xl font-bold text-bassy-orange mt-2">15.2k</p>
        </div>

        {/* Stat Card 2 */}
        <div className="bg-green-50 p-6 rounded-xl border border-green-200">
          <h3 className="text-gray-500 font-medium">Active Articles</h3>
          <p className="text-4xl font-bold text-bassy-green mt-2">8</p>
        </div>

        {/* Stat Card 3 */}
        <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
          <h3 className="text-gray-500 font-medium">Pending Comments</h3>
          <p className="text-4xl font-bold text-gray-800 mt-2">12</p>
        </div>

      </div>

      <div className="mt-10 p-4 bg-yellow-50 text-yellow-800 rounded-lg border border-yellow-200">
        <strong>⚠️ Note:</strong> Authentication is currently disabled. Anyone can access this page until we add login protection.
      </div>
    </div>
  );
}