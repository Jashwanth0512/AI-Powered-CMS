import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import '../styles/analytics.css';

const Analytics = () => {
  const stats = [
    { title: 'Active Users', value: '1.2k', trend: '+8%' },
    { title: 'Published Posts', value: '430', trend: '+15%' },
    { title: 'Monthly Revenue', value: '$12.5k', trend: '+22%' },
  ];

  const chartData = [
    { date: 'Mon', users: 400, posts: 240 },
    { date: 'Tue', users: 600, posts: 380 },
    { date: 'Wed', users: 800, posts: 540 },
    { date: 'Thu', users: 1200, posts: 620 },
    { date: 'Fri', users: 900, posts: 480 },
    { date: 'Sat', users: 750, posts: 410 },
    { date: 'Sun', users: 500, posts: 300 },
  ];

  return (
    <div className="analytics-container">
      <div className="analytics-header">
        <h2 className="analytics-title">Performance Analytics</h2>
        <div className="time-filter">
          <button className="filter-button active">24h</button>
          <button className="filter-button">7d</button>
          <button className="filter-button">30d</button>
        </div>
      </div>

      <div className="metrics-grid">
        {stats.map((stat, index) => (
          <div key={index} className="metric-card">
            <h3 className="metric-title">{stat.title}</h3>
            <div className="metric-value">{stat.value}</div>
            <div className="metric-trend">
              <span className={`trend-${stat.trend.includes('+') ? 'up' : 'down'}`}>
                {stat.trend}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="chart-container">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
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
                background: 'var(--surface)',
                border: '1px solid var(--primary)',
                borderRadius: 'var(--radius)'
              }}
            />
            <Line 
              type="monotone" 
              dataKey="users" 
              stroke="var(--primary)" 
              strokeWidth={2}
            />
            <Line 
              type="monotone" 
              dataKey="posts" 
              stroke="var(--accent)" 
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="data-summary">
        <div className="summary-card">
          <h4>Top Content</h4>
          <ul className="content-list">
            <li>AI Trends Report (1.2k views)</li>
            <li>Machine Learning Guide (980 views)</li>
            <li>Neural Networks 101 (850 views)</li>
          </ul>
        </div>
        
        <div className="summary-card">
          <h4>User Activity</h4>
          <div className="activity-metrics">
            <div>Avg. Time: 4m 12s</div>
            <div>Bounce Rate: 32%</div>
            <div>New Users: 240</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;