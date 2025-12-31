"use client";

import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  BarChart, Bar, PieChart, Pie, Cell, Legend 
} from 'recharts';

type ChartProps = {
  activityData: { date: string; downloads: number; users: number }[];
  categoryData: { name: string; value: number }[];
};

const COLORS = ['#064E3B', '#F97316', '#10B981', '#3B82F6', '#8B5CF6'];

export default function AdminCharts({ activityData, categoryData }: ChartProps) {
  return (
    <div className="space-y-8">
      
      {/* ROW 1: GROWTH OVER TIME */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="text-lg font-bold text-gray-800 mb-6">30-Day Growth Trend</h3>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={activityData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
              <XAxis 
                dataKey="date" 
                tick={{fill: '#9ca3af', fontSize: 12}} 
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                tick={{fill: '#9ca3af', fontSize: 12}} 
                tickLine={false}
                axisLine={false}
              />
              <Tooltip 
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="downloads" 
                name="New Downloads"
                stroke="#F97316" 
                strokeWidth={3} 
                dot={false}
                activeDot={{ r: 6 }}
              />
              <Line 
                type="monotone" 
                dataKey="users" 
                name="New Signups"
                stroke="#064E3B" 
                strokeWidth={3} 
                dot={false}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ROW 2: CATEGORY SPLIT */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* PIE CHART */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-bold text-gray-800 mb-2">Popular Categories</h3>
          <p className="text-xs text-gray-500 mb-6">Distribution of total downloads by type</p>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* BAR CHART */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-bold text-gray-800 mb-2">Category Volume</h3>
          <p className="text-xs text-gray-500 mb-6">Total files uploaded per category</p>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                <XAxis type="number" hide />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  tick={{fill: '#4b5563', fontSize: 12, fontWeight: 600}} 
                  width={100}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip cursor={{fill: 'transparent'}} />
                <Bar dataKey="value" fill="#064E3B" radius={[0, 4, 4, 0]} barSize={30}>
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
}