import { motion } from "framer-motion";
import { Layout } from "../layout/Layout";
import { TaskStats } from "./TaskStats";
import { UpcomingTask } from "./UpcomingTask";
import { ProductivityChart } from "./ProductivityChart";
import { TaskSection } from "../tasks/TaskSection";
import { useTask } from "../../contexts/TaskContext";
import { BellIcon, PlusIcon } from "lucide-react";
import { Link } from "react-router-dom";
export const Dashboard = () => {
  const { tasks } = useTask();
  const todayTasks = tasks.filter((task) => {
    const today = new Date();
    const taskDate = new Date(task.date);
    return taskDate.toDateString() === today.toDateString();
  });
  return (
    <Layout>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <motion.div
            initial={{
              y: -20,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            className="flex justify-between items-center"
          >
            <div>
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                Dashboard
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Welcome to TaskDo
              </p>
            </div>
          </motion.div>
          <motion.div
            initial={{
              y: 20,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            transition={{
              delay: 0.1,
            }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <TaskStats />
          </motion.div>
          <motion.div
            initial={{
              y: 20,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            transition={{
              delay: 0.2,
            }}
          >
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">
              Your Productivity
            </h2>
            <ProductivityChart />
          </motion.div>
          <motion.div
            initial={{
              y: 20,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            transition={{
              delay: 0.3,
            }}
          >
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                Today's Tasks
              </h2>
              <Link
                to="/tasks/add"
                className="flex items-center text-[#1E88E5] hover:underline"
              >
                <PlusIcon size={16} className="mr-1" />
                <span>Add Task</span>
              </Link>
            </div>
            {todayTasks.length > 0 ? (
              <TaskSection tasks={todayTasks} />
            ) : (
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 flex flex-col items-center justify-center text-center">
                <p className="text-gray-500 dark:text-gray-400 mb-2">
                  No tasks for today
                </p>
                <Link
                  to="/tasks/add"
                  className="text-[#1E88E5] font-medium hover:underline"
                >
                  + Add a task
                </Link>
              </div>
            )}
          </motion.div>
        </div>
        <div className="space-y-6">
          <motion.div
            initial={{
              y: 20,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            transition={{
              delay: 0.2,
            }}
          >
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">
              Upcoming Task
            </h2>
            <UpcomingTask />
          </motion.div>
          <motion.div
            initial={{
              y: 20,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            transition={{
              delay: 0.3,
            }}
            className="bg-white dark:bg-gray-800 rounded-lg p-5 shadow-sm"
          >
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
              Reminders
            </h2>
            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg mb-3">
              <div className="flex items-center">
                <BellIcon size={18} className="text-[#1E88E5] mr-3" />
                <span className="text-gray-700 dark:text-gray-300">
                  Daily Summary
                </span>
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                9:00 AM
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex items-center">
                <BellIcon size={18} className="text-[#1E88E5] mr-3" />
                <span className="text-gray-700 dark:text-gray-300">
                  Task Review
                </span>
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                6:00 PM
              </span>
            </div>
            <button className="w-full mt-4 text-[#1E88E5] text-sm hover:underline">
              + Add Reminder
            </button>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};
