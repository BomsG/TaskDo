import React from 'react';
import { BarChart, Bar, XAxis, ResponsiveContainer } from 'recharts';
export const ProductivityChart = () => {
  // Sample data for the chart
  const data = [{
    day: 'Mon',
    completed: 5,
    total: 7
  }, {
    day: 'Tue',
    completed: 3,
    total: 5
  }, {
    day: 'Wed',
    completed: 7,
    total: 7
  }, {
    day: 'Thu',
    completed: 4,
    total: 8
  }, {
    day: 'Fri',
    completed: 6,
    total: 9
  }, {
    day: 'Sat',
    completed: 2,
    total: 4
  }, {
    day: 'Sun',
    completed: 1,
    total: 3
  }];
  return <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
      <ResponsiveContainer width="100%" height={180}>
        <BarChart data={data} margin={{
        top: 20,
        right: 10,
        left: -20,
        bottom: 5
      }}>
          <XAxis dataKey="day" axisLine={false} tickLine={false} />
          <Bar dataKey="total" fill="#E3F2FD" radius={[4, 4, 0, 0]} />
          <Bar dataKey="completed" fill="#1E88E5" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
      <div className="flex justify-center mt-2">
        <div className="flex items-center mr-4">
          <div className="w-3 h-3 bg-[#1E88E5] rounded-full mr-1"></div>
          <span className="text-xs text-gray-600 dark:text-gray-400">
            Completed
          </span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-[#E3F2FD] rounded-full mr-1"></div>
          <span className="text-xs text-gray-600 dark:text-gray-400">
            Total
          </span>
        </div>
      </div>
    </div>;
};