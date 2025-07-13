import React from 'react';
import { motion } from 'framer-motion';
import { Layout } from '../layout/Layout';
import { MoonIcon, SunIcon, BellIcon, UserIcon, LogOutIcon, MailIcon, KeyIcon } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
export const SettingsScreen = () => {
  const {
    theme,
    toggleTheme
  } = useTheme();
  const {
    user,
    logout,
    updateUserPreferences
  } = useAuth();
  const handleToggleEmailNotifications = () => {
    if (user) {
      updateUserPreferences({
        emailNotifications: !user.preferences.emailNotifications
      });
    }
  };
  const handleToggleTaskReminders = () => {
    if (user) {
      updateUserPreferences({
        taskReminders: !user.preferences.taskReminders
      });
    }
  };
  const handleToggleDailySummary = () => {
    if (user) {
      updateUserPreferences({
        dailySummary: !user.preferences.dailySummary
      });
    }
  };
  return <Layout>
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{
        y: -20,
        opacity: 0
      }} animate={{
        y: 0,
        opacity: 1
      }} className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            Settings
          </h1>
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
        }} className="md:col-span-1">
            {/* Profile Section */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-5 shadow-sm mb-6">
              <div className="flex items-center">
                <div className="w-16 h-16 bg-[#1E88E5] rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  {user?.name?.charAt(0).toUpperCase() || 'U'}
                </div>
                <div className="ml-4">
                  <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                    {user?.name || 'User'}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    {user?.email || 'user@example.com'}
                  </p>
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <button className="flex items-center text-[#1E88E5] hover:underline">
                  <UserIcon size={16} className="mr-2" />
                  Edit Profile
                </button>
                <button className="flex items-center text-[#1E88E5] hover:underline">
                  <KeyIcon size={16} className="mr-2" />
                  Change Password
                </button>
                <button className="flex items-center text-[#1E88E5] hover:underline">
                  <MailIcon size={16} className="mr-2" />
                  Update Email
                </button>
              </div>
            </div>
            {/* Logout Button */}
            <button onClick={logout} className="w-full bg-white dark:bg-gray-800 text-red-500 py-3 rounded-lg font-medium flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-700">
              <LogOutIcon size={18} className="mr-2" />
              Sign Out
            </button>
          </motion.div>
          <motion.div initial={{
          y: 20,
          opacity: 0
        }} animate={{
          y: 0,
          opacity: 1
        }} transition={{
          delay: 0.2
        }} className="md:col-span-2 space-y-6">
            {/* Appearance Section */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <h3 className="font-medium text-gray-800 dark:text-white">
                  Appearance
                </h3>
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    {theme === 'dark' ? <MoonIcon size={20} className="text-[#1E88E5] mr-3" /> : <SunIcon size={20} className="text-[#1E88E5] mr-3" />}
                    <span className="text-gray-700 dark:text-gray-300">
                      {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
                    </span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" checked={theme === 'dark'} onChange={toggleTheme} className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#1E88E5]"></div>
                  </label>
                </div>
              </div>
            </div>
            {/* Notifications Section */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <h3 className="font-medium text-gray-800 dark:text-white">
                  Notifications
                </h3>
              </div>
              <div className="p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <BellIcon size={20} className="text-[#1E88E5] mr-3" />
                    <span className="text-gray-700 dark:text-gray-300">
                      Task Reminders
                    </span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" checked={user?.preferences.taskReminders || false} onChange={handleToggleTaskReminders} className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#1E88E5]"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <BellIcon size={20} className="text-[#1E88E5] mr-3" />
                    <span className="text-gray-700 dark:text-gray-300">
                      Daily Summary
                    </span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" checked={user?.preferences.dailySummary || false} onChange={handleToggleDailySummary} className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#1E88E5]"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <MailIcon size={20} className="text-[#1E88E5] mr-3" />
                    <span className="text-gray-700 dark:text-gray-300">
                      Email Notifications
                    </span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" checked={user?.preferences.emailNotifications || false} onChange={handleToggleEmailNotifications} className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#1E88E5]"></div>
                  </label>
                </div>
                {user?.preferences.emailNotifications && <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 border-t border-gray-200 dark:border-gray-700 pt-2">
                    Email notifications will be sent to: {user.email}
                  </p>}
              </div>
            </div>
            {/* Data & Privacy */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <h3 className="font-medium text-gray-800 dark:text-white">
                  Data & Privacy
                </h3>
              </div>
              <div className="p-4 space-y-4">
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Your data is stored locally in your browser. No data is sent
                  to any server.
                </p>
                <button className="text-[#1E88E5] text-sm hover:underline">
                  Export Your Data
                </button>
                <button className="text-red-500 text-sm hover:underline">
                  Clear All Data
                </button>
              </div>
            </div>
            {/* Account Security */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <h3 className="font-medium text-gray-800 dark:text-white">
                  Account Security
                </h3>
              </div>
              <div className="p-4 space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-gray-700 dark:text-gray-300 font-medium">
                      Password
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Last changed: Never
                    </p>
                  </div>
                  <button className="text-[#1E88E5] hover:underline">
                    Change
                  </button>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-gray-200 dark:border-gray-700">
                  <div>
                    <p className="text-gray-700 dark:text-gray-300 font-medium">
                      Account Activity
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Current session: This device
                    </p>
                  </div>
                  <button className="text-[#1E88E5] hover:underline">
                    View All
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>;
};