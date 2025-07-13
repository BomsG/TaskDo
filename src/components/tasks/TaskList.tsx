import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Layout } from '../layout/Layout';
import { TaskSection } from './TaskSection';
import { useTask } from '../../contexts/TaskContext';
import { FilterIcon, SearchIcon, PlusIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
export const TaskList = () => {
  const {
    tasks
  } = useTask();
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const categories = [{
    id: 'all',
    name: 'All'
  }, {
    id: 'work',
    name: 'Work'
  }, {
    id: 'personal',
    name: 'Personal'
  }, {
    id: 'urgent',
    name: 'Urgent'
  }];
  const filteredTasks = tasks.filter(task => {
    const matchesCategory = activeCategory === 'all' || task.category === activeCategory;
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) || task.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  const workTasks = filteredTasks.filter(task => task.category === 'work');
  const personalTasks = filteredTasks.filter(task => task.category === 'personal');
  const urgentTasks = filteredTasks.filter(task => task.category === 'urgent');
  const otherTasks = filteredTasks.filter(task => !['work', 'personal', 'urgent'].includes(task.category));
  return <Layout>
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{
        y: -20,
        opacity: 0
      }} animate={{
        y: 0,
        opacity: 1
      }} className="mb-6 flex flex-wrap justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2 md:mb-0">
            Task List
          </h1>
          <Link to="/tasks/add" className="flex items-center bg-[#1E88E5] text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors md:ml-4">
            <PlusIcon size={18} className="mr-1" />
            <span>Add Task</span>
          </Link>
        </motion.div>
        <motion.div initial={{
        y: 20,
        opacity: 0
      }} animate={{
        y: 0,
        opacity: 1
      }} transition={{
        delay: 0.1
      }} className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-3 md:space-y-0 mb-6">
          <div className="relative flex-grow">
            <SearchIcon size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input type="text" placeholder="Search tasks..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="bg-white dark:bg-gray-800 w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#1E88E5]" />
          </div>
          <div className="flex items-center overflow-x-auto hide-scrollbar">
            {categories.map(category => <button key={category.id} onClick={() => setActiveCategory(category.id)} className={`px-4 py-2 mr-2 rounded-lg whitespace-nowrap transition-colors ${activeCategory === category.id ? 'bg-[#1E88E5] text-white' : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300'}`}>
                {category.name}
              </button>)}
            <button className="p-2 rounded-full bg-white dark:bg-gray-800">
              <FilterIcon size={18} className="text-gray-600 dark:text-gray-300" />
            </button>
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
      }}>
          {activeCategory === 'all' || activeCategory === 'work' ? workTasks.length > 0 && <div className="mb-6">
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">
                    Work
                  </h2>
                  <TaskSection tasks={workTasks} />
                </div> : null}
          {activeCategory === 'all' || activeCategory === 'personal' ? personalTasks.length > 0 && <div className="mb-6">
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">
                    Personal
                  </h2>
                  <TaskSection tasks={personalTasks} />
                </div> : null}
          {activeCategory === 'all' || activeCategory === 'urgent' ? urgentTasks.length > 0 && <div className="mb-6">
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">
                    Urgent
                  </h2>
                  <TaskSection tasks={urgentTasks} />
                </div> : null}
          {otherTasks.length > 0 && <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">
                Other
              </h2>
              <TaskSection tasks={otherTasks} />
            </div>}
          {filteredTasks.length === 0 && <div className="bg-white dark:bg-gray-800 rounded-lg p-6 flex flex-col items-center justify-center text-center">
              <p className="text-gray-500 dark:text-gray-400 mb-2">
                No tasks found
              </p>
              <Link to="/tasks/add" className="text-[#1E88E5] font-medium hover:underline">
                + Add a task
              </Link>
            </div>}
        </motion.div>
      </div>
    </Layout>;
};