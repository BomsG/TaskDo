import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { CheckIcon } from 'lucide-react';
import { useTask } from '../../contexts/TaskContext';
import { Task } from '../../contexts/TaskContext';
import { format } from 'date-fns';
interface TaskCardProps {
  task: Task;
}
export const TaskCard = ({
  task
}: TaskCardProps) => {
  const {
    toggleTaskCompletion
  } = useTask();
  const navigate = useNavigate();
  const handleTaskClick = () => {
    navigate(`/tasks/${task.id}`);
  };
  const handleCheckboxClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleTaskCompletion(task.id);
  };
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
  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'work':
        return 'bg-blue-100 text-blue-800';
      case 'personal':
        return 'bg-purple-100 text-purple-800';
      case 'urgent':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  const item = {
    hidden: {
      y: 20,
      opacity: 0
    },
    show: {
      y: 0,
      opacity: 1
    }
  };
  return <motion.div variants={item} whileHover={{
    scale: 1.02
  }} whileTap={{
    scale: 0.98
  }} className={`bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border-l-4 ${task.completed ? 'border-green-500' : getPriorityColor(task.priority)}`} onClick={handleTaskClick}>
      <div className="flex items-start">
        <motion.div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mr-3 mt-0.5 ${task.completed ? 'border-green-500 bg-green-500' : 'border-gray-300 dark:border-gray-600'}`} whileTap={{
        scale: 0.8
      }} onClick={handleCheckboxClick}>
          {task.completed && <CheckIcon size={14} className="text-white" />}
        </motion.div>
        <div className="flex-1">
          <div className="flex justify-between items-start mb-1">
            <h3 className={`font-medium ${task.completed ? 'text-gray-400 line-through' : 'text-gray-800 dark:text-white'}`}>
              {task.title}
            </h3>
            <span className={`text-xs px-2 py-0.5 rounded-full ${getCategoryColor(task.category)}`}>
              {task.category}
            </span>
          </div>
          <p className={`text-sm mb-2 ${task.completed ? 'text-gray-400 line-through' : 'text-gray-600 dark:text-gray-400'}`}>
            {task.description.length > 60 ? task.description.substring(0, 60) + '...' : task.description}
          </p>
          <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
            <div size={12} className="mr-1" />
            {format(new Date(task.date), 'MMM d, h:mm a')}
            {task.alarm && <span className="ml-2">⏰</span>}
          </div>
        </div>
      </div>
    </motion.div>;
};