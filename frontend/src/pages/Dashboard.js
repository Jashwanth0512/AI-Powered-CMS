import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import '../styles/dashboard.css';

const Dashboard = () => {
  const stats = [
    { title: 'Total Content', value: '142', trend: '+12%' },
    { title: 'Active Users', value: '2.3k', trend: '+8%' },
    { title: 'Engagement Rate', value: '68%', trend: '-3%' },
  ];

  // Chart data
  const chartData = [
    { date: 'Mon', engagement: 4000 },
    { date: 'Tue', engagement: 3000 },
    { date: 'Wed', engagement: 5000 },
    { date: 'Thu', engagement: 2780 },
    { date: 'Fri', engagement: 1890 },
    { date: 'Sat', engagement: 2390 },
    { date: 'Sun', engagement: 3490 },
  ];

  const activities = [
    { time: '2:45 PM', description: 'New article published', user: 'System' },
    { time: '10:30 AM', description: 'Content updated', user: 'John Doe' },
    { time: '9:15 AM', description: 'New user registered', user: 'System' },
  ];

  return (
    <div className="dashboard-container">
      {/* ... other components ... */}

      <div className="chart-container">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="date" 
              tick={{ fill: 'var(--text-secondary)' }}
            />
            <YAxis 
              tick={{ fill: 'var(--text-secondary)' }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'var(--surface)',
                border: '1px solid var(--primary)',
                borderRadius: 'var(--radius)'
              }}
            />
            <Bar 
              dataKey="engagement" 
              fill="var(--primary)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* ... rest of the component ... */}
    </div>
  );
};

export default Dashboard;