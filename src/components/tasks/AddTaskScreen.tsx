import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Layout } from '../layout/Layout';
import { ArrowLeftIcon, ClockIcon, BellIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTask } from '../../contexts/TaskContext';
export const AddTaskScreen = () => {
  const navigate = useNavigate();
  const {
    addTask
  } = useTask();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [category, setCategory] = useState('personal');
  const [priority, setPriority] = useState('medium');
  const [alarm, setAlarm] = useState(false);
  const [repeat, setRepeat] = useState('never');
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const dateTime = new Date(`${date}T${time || '00:00'}`);
    const newTask = {
      id: Date.now().toString(),
      title,
      description,
      date: dateTime.toISOString(),
      category,
      priority,
      alarm,
      repeat,
      completed: false
    };
    addTask(newTask);
    navigate(-1);
  };
  return <Layout>
      <div className="max-w-2xl mx-auto">
        <motion.div initial={{
        x: -20,
        opacity: 0
      }} animate={{
        x: 0,
        opacity: 1
      }} className="flex items-center mb-6">
          <button onClick={() => navigate(-1)} className="mr-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
            <ArrowLeftIcon size={20} />
          </button>
          <h1 className="text-xl font-bold">Add New Task</h1>
        </motion.div>
        <motion.form initial={{
        y: 20,
        opacity: 0
      }} animate={{
        y: 0,
        opacity: 1
      }} transition={{
        delay: 0.1
      }} onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Task Title
            </label>
            <input type="text" id="title" value={title} onChange={e => setTitle(e.target.value)} required className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-[#1E88E5]" placeholder="Enter task title" />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Description
            </label>
            <textarea id="description" value={description} onChange={e => setDescription(e.target.value)} rows={3} className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-[#1E88E5]" placeholder="Enter task description" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Date
              </label>
              <div className="relative">
                <input type="date" id="date" value={date} onChange={e => setDate(e.target.value)} required className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-[#1E88E5]" />
                <ClockIcon size={18} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>
            <div>
              <label htmlFor="time" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Time
              </label>
              <input type="time" id="time" value={time} onChange={e => setTime(e.target.value)} className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-[#1E88E5]" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Category
              </label>
              <select id="category" value={category} onChange={e => setCategory(e.target.value)} className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-[#1E88E5]">
                <option value="personal">Personal</option>
                <option value="work">Work</option>
                <option value="urgent">Urgent</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Priority
              </label>
              <div className="flex space-x-3">
                {['low', 'medium', 'high'].map(p => <button key={p} type="button" onClick={() => setPriority(p)} className={`flex-1 py-2 px-2 rounded-lg capitalize ${priority === p ? p === 'low' ? 'bg-green-500 text-white' : p === 'medium' ? 'bg-orange-500 text-white' : 'bg-red-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}>
                    {p}
                  </button>)}
              </div>
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex items-center">
                <BellIcon size={18} className="text-gray-600 dark:text-gray-400 mr-3" />
                <span className="text-gray-700 dark:text-gray-300">
                  Set Alarm
                </span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" checked={alarm} onChange={() => setAlarm(!alarm)} className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#1E88E5]"></div>
              </label>
            </div>
          </div>
          {alarm && <div>
              <label htmlFor="repeat" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Repeat
              </label>
              <select id="repeat" value={repeat} onChange={e => setRepeat(e.target.value)} className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-[#1E88E5]">
                <option value="never">Never</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>}
          <div className="flex items-center justify-end space-x-3 pt-4">
            <button type="button" onClick={() => navigate(-1)} className="px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
              Cancel
            </button>
            <motion.button type="submit" whileTap={{
            scale: 0.95
          }} className="px-6 py-2 bg-[#1E88E5] text-white rounded-lg font-medium hover:bg-blue-600">
              Create Task
            </motion.button>
          </div>
        </motion.form>
      </div>
    </Layout>;
};