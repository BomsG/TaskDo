import React from 'react';
import { motion } from 'framer-motion';
import { Layout } from '../layout/Layout';
import { ArrowLeftIcon, ClockIcon, BellIcon, CalendarIcon, TrashIcon, EditIcon } from 'lucide-react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useTask } from '../../contexts/TaskContext';
import { format } from 'date-fns';
export const TaskDetailScreen = () => {
  const navigate = useNavigate();
  const {
    id
  } = useParams<{
    id: string;
  }>();
  const {
    tasks,
    deleteTask,
    toggleTaskCompletion
  } = useTask();
  const task = tasks.find(t => t.id === id);
  if (!task) {
    return <Layout>
        <div className="flex flex-col items-center justify-center h-full p-6">
          <p className="text-gray-500 dark:text-gray-400">Task not found</p>
          <button onClick={() => navigate('/dashboard')} className="mt-4 text-[#1E88E5] hover:underline">
            Go to Dashboard
          </button>
        </div>
      </Layout>;
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
  const handleDelete = () => {
    deleteTask(task.id);
    navigate('/tasks');
  };
  return <Layout>
      <div className="max-w-3xl mx-auto">
        <motion.div initial={{
        x: -20,
        opacity: 0
      }} animate={{
        x: 0,
        opacity: 1
      }} className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <button onClick={() => navigate(-1)} className="mr-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
              <ArrowLeftIcon size={20} />
            </button>
            <h1 className="text-xl font-bold">Task Details</h1>
          </div>
          <div className="flex space-x-2">
            <motion.button whileTap={{
            scale: 0.9
          }} className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700">
              <EditIcon size={20} className="text-gray-600 dark:text-gray-400" />
            </motion.button>
            <motion.button whileTap={{
            scale: 0.9
          }} onClick={handleDelete} className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700">
              <TrashIcon size={20} className="text-red-500" />
            </motion.button>
          </div>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div initial={{
          y: 20,
          opacity: 0
        }} animate={{
          y: 0,
          opacity: 1
        }} transition={{
          delay: 0.1
        }} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm md:col-span-2">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                {task.title}
              </h2>
              <div className="flex space-x-2">
                <span className={`text-xs px-2 py-1 rounded-full ${getCategoryColor(task.category)}`}>
                  {task.category}
                </span>
                <span className={`text-xs px-2 py-1 rounded-full text-white ${getPriorityColor(task.priority)}`}>
                  {task.priority}
                </span>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              {task.description || 'No description provided.'}
            </p>
            <div className="space-y-3">
              <div className="flex items-center">
                <CalendarIcon size={18} className="text-[#1E88E5] mr-3" />
                <span className="text-gray-700 dark:text-gray-300">
                  {format(new Date(task.date), 'EEEE, MMMM d, yyyy')}
                </span>
              </div>
              <div className="flex items-center">
                <ClockIcon size={18} className="text-[#1E88E5] mr-3" />
                <span className="text-gray-700 dark:text-gray-300">
                  {format(new Date(task.date), 'h:mm a')}
                </span>
              </div>
              {task.alarm && <div className="flex items-center">
                  <BellIcon size={18} className="text-[#1E88E5] mr-3" />
                  <span className="text-gray-700 dark:text-gray-300">
                    Alarm set (
                    {task.repeat !== 'never' ? `Repeats ${task.repeat}` : 'No repeat'}
                    )
                  </span>
                </div>}
            </div>
          </motion.div>
          <motion.div initial={{
          y: 20,
          opacity: 0
        }} animate={{
          y: 0,
          opacity: 1
        }} transition={{
          delay: 0.2
        }} className="md:row-start-1 space-y-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-5 shadow-sm">
              <h3 className="font-medium text-gray-800 dark:text-white mb-3">
                Status
              </h3>
              <motion.button whileTap={{
              scale: 0.95
            }} onClick={() => toggleTaskCompletion(task.id)} className={`w-full py-2 rounded-lg font-medium ${task.completed ? 'bg-green-500 text-white' : 'bg-[#1E88E5] text-white'}`}>
                {task.completed ? 'Completed' : 'Mark as Complete'}
              </motion.button>
              {task.completed && <button onClick={() => toggleTaskCompletion(task.id)} className="w-full mt-2 text-sm text-gray-600 dark:text-gray-400 hover:underline">
                  Mark as Incomplete
                </button>}
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-5 shadow-sm">
              <h3 className="font-medium text-gray-800 dark:text-white mb-3">
                Actions
              </h3>
              <div className="space-y-2">
                <Link to="/tasks" className="block w-full py-2 text-center border border-gray-300 dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
                  Back to Task List
                </Link>
                <Link to="/tasks/add" className="block w-full py-2 text-center bg-gray-100 dark:bg-gray-700 rounded-lg text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600">
                  Create Similar Task
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>;
};