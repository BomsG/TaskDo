import React, { useState } from "react";
import { motion } from "framer-motion";
import { useLocation, Link } from "react-router-dom";
import {
  HomeIcon,
  ListTodoIcon,
  SettingsIcon,
  PlusIcon,
  MoonIcon,
  SunIcon,
  UserIcon,
  LogOutIcon,
  ChevronDownIcon,
} from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";
import { useAuth } from "../../contexts/AuthContext";
interface LayoutProps {
  children: React.ReactNode;
  hideNavigation?: boolean;
}
export const Layout = ({ children, hideNavigation = false }: LayoutProps) => {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path);
  };
  const toggleUserMenu = () => {
    setShowUserMenu(!showUserMenu);
  };
  const handleLogout = () => {
    setShowUserMenu(false);
    logout();
  };
  const userInitial = user?.name ? user.name.charAt(0).toUpperCase() : "U";
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header Navigation */}
      {!hideNavigation && (
        <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
          <div className="container mx-auto px-4 py-3 flex items-center justify-between">
            <div className="flex items-center">
              <ListTodoIcon size={24} className="text-[#1E88E5] mr-2" />
              <span className="text-xl font-bold text-gray-800 dark:text-white">
                TaskDo
              </span>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <Link
                to="/dashboard"
                className={`flex items-center ${
                  isActive("/dashboard")
                    ? "text-[#1E88E5]"
                    : "text-gray-600 dark:text-gray-300 hover:text-[#1E88E5]"
                }`}
              >
                <HomeIcon size={18} className="mr-1" />
                <span>Dashboard</span>
              </Link>
              <Link
                to="/tasks"
                className={`flex items-center ${
                  isActive("/tasks")
                    ? "text-[#1E88E5]"
                    : "text-gray-600 dark:text-gray-300 hover:text-[#1E88E5]"
                }`}
              >
                <ListTodoIcon size={18} className="mr-1" />
                <span>Tasks</span>
              </Link>
              <Link
                to="/settings"
                className={`flex items-center ${
                  isActive("/settings")
                    ? "text-[#1E88E5]"
                    : "text-gray-600 dark:text-gray-300 hover:text-[#1E88E5]"
                }`}
              >
                <SettingsIcon size={18} className="mr-1" />
                <span>Settings</span>
              </Link>
            </nav>
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? (
                  <SunIcon
                    size={20}
                    className="text-gray-600 dark:text-gray-300"
                  />
                ) : (
                  <MoonIcon size={20} className="text-gray-600" />
                )}
              </button>
              <Link
                to="/tasks/add"
                className="hidden md:flex items-center bg-[#1E88E5] text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
              >
                <PlusIcon size={18} className="mr-1" />
                <span>Add Task</span>
              </Link>
              {/* User Menu */}
              <div className="relative">
                <button
                  onClick={toggleUserMenu}
                  className="flex items-center space-x-2 focus:outline-none"
                >
                  <div className="w-8 h-8 bg-[#1E88E5] rounded-full flex items-center justify-center text-white text-sm font-medium">
                    {userInitial}
                  </div>
                  <ChevronDownIcon
                    size={16}
                    className="text-gray-600 dark:text-gray-400"
                  />
                </button>
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-10 border border-gray-200 dark:border-gray-700">
                    <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                      <p className="text-sm font-medium text-gray-800 dark:text-white">
                        {user?.name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {user?.email}
                      </p>
                    </div>
                    <Link
                      to="/settings"
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
                      onClick={() => setShowUserMenu(false)}
                    >
                      <UserIcon size={16} className="mr-2" />
                      Profile Settings
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
                    >
                      <LogOutIcon size={16} className="mr-2" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* Mobile Navigation */}
          <div className="md:hidden border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-around py-2">
              <Link
                to="/dashboard"
                className={`flex flex-col items-center px-4 py-1 ${
                  isActive("/dashboard")
                    ? "text-[#1E88E5]"
                    : "text-gray-500 dark:text-gray-400"
                }`}
              >
                <HomeIcon size={20} />
                <span className="text-xs mt-1">Home</span>
              </Link>
              <Link
                to="/tasks"
                className={`flex flex-col items-center px-4 py-1 ${
                  isActive("/tasks")
                    ? "text-[#1E88E5]"
                    : "text-gray-500 dark:text-gray-400"
                }`}
              >
                <ListTodoIcon size={20} />
                <span className="text-xs mt-1">Tasks</span>
              </Link>
              <Link
                to="/tasks/add"
                className={`flex flex-col items-center px-4 py-1 ${
                  isActive("/tasks/add")
                    ? "text-[#1E88E5]"
                    : "text-gray-500 dark:text-gray-400"
                }`}
              >
                <PlusIcon size={20} />
                <span className="text-xs mt-1">Add</span>
              </Link>
              <Link
                to="/settings"
                className={`flex flex-col items-center px-4 py-1 ${
                  isActive("/settings")
                    ? "text-[#1E88E5]"
                    : "text-gray-500 dark:text-gray-400"
                }`}
              >
                <SettingsIcon size={20} />
                <span className="text-xs mt-1">Settings</span>
              </Link>
            </div>
          </div>
        </header>
      )}
      <motion.main
        className="flex-1"
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        exit={{
          opacity: 0,
        }}
        transition={{
          duration: 0.3,
        }}
      >
        <div className="container mx-auto px-4 py-6">{children}</div>
      </motion.main>
    </div>
  );
};
