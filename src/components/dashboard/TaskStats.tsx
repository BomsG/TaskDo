import React from 'react';
import { motion } from 'framer-motion';
import { useTask } from '../../contexts/TaskContext';
export const TaskStats = () => {
  const {
    tasks
  } = useTask();
  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;
  const productivityPercentage = totalTasks > 0 ? Math.round(completedTasks / totalTasks * 100) : 0;
  return <div className="grid grid-cols-2 gap-4">
      <motion.div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm" whileHover={{
      y: -5
    }} transition={{
      type: 'spring',
      stiffness: 300
    }}>
        <p className="text-gray-500 dark:text-gray-400 text-sm">Completed</p>
        <h3 className="text-2xl font-bold text-gray-800 dark:text-white mt-1">
          {completedTasks}/{totalTasks}
        </h3>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 mt-2">
          <div className="bg-[#1E88E5] h-1.5 rounded-full" style={{
          width: `${productivityPercentage}%`
        }}></div>
        </div>
      </motion.div>
      <motion.div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm" whileHover={{
      y: -5
    }} transition={{
      type: 'spring',
      stiffness: 300
    }}>
        <p className="text-gray-500 dark:text-gray-400 text-sm">Productivity</p>
        <h3 className="text-2xl font-bold text-gray-800 dark:text-white mt-1">
          {productivityPercentage}%
        </h3>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 mt-2">
          <div className="bg-green-500 h-1.5 rounded-full" style={{
          width: `${productivityPercentage}%`
        }}></div>
        </div>
      </motion.div>
    </div>;
};