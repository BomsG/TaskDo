import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ClockIcon } from 'lucide-react';
import { useTask } from '../../contexts/TaskContext';
import { formatDistanceToNow } from 'date-fns';
export const UpcomingTask = () => {
  const {
    tasks
  } = useTask();
  const [timeLeft, setTimeLeft] = useState('');
  // Find the next upcoming task that is not completed
  const upcomingTask = tasks.filter(task => !task.completed && new Date(task.date) > new Date()).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())[0];
  useEffect(() => {
    if (upcomingTask) {
      const timer = setInterval(() => {
        setTimeLeft(formatDistanceToNow(new Date(upcomingTask.date), {
          addSuffix: true
        }));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [upcomingTask]);
  if (!upcomingTask) {
    return null;
  }
  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high':
        return 'bg-red-500';
      case 'medium':
        return 'bg-orange-500';
      case 'low':
        return 'bg-green-500';
      default:
        return 'bg-blue-500';
    }
  };
  return <div>
      <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
        Upcoming Task
      </h2>
      <motion.div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm" initial={{
      scale: 0.95,
      opacity: 0
    }} animate={{
      scale: 1,
      opacity: 1
    }} transition={{
      duration: 0.3
    }}>
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-medium text-gray-800 dark:text-white">
            {upcomingTask.title}
          </h3>
          <span className={`text-xs text-white px-2 py-1 rounded-full ${getPriorityColor(upcomingTask.priority)}`}>
            {upcomingTask.priority}
          </span>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          {upcomingTask.description}
        </p>
        <div className="flex items-center">
          <ClockIcon size={16} className="text-[#1E88E5] mr-2" />
          <div className="text-sm text-gray-600 dark:text-gray-400">
            <span className="font-medium text-[#1E88E5]">{timeLeft}</span>
          </div>
        </div>
      </motion.div>
    </div>;
};