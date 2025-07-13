import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, Navigate } from 'react-router-dom';
import { MailIcon, LockIcon, UserIcon, AlertCircleIcon, CheckCircleIcon } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
export const RegisterScreen = () => {
  const {
    register,
    isAuthenticated,
    isLoading
  } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  // Redirect if already authenticated
  if (isAuthenticated && !isLoading) {
    return <Navigate to="/dashboard" replace />;
  }
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    setIsSubmitting(true);
    try {
      const success = await register(name, email, password);
      if (!success) {
        setError('Email already in use');
      }
    } catch (err) {
      setError('An error occurred during registration');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };
  return <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <motion.div initial={{
      y: 20,
      opacity: 0
    }} animate={{
      y: 0,
      opacity: 1
    }} className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-2">
            <CheckCircleIcon size={40} className="text-[#1E88E5]" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            Create an Account
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Join TaskFlow today
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          {error && <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md flex items-center text-red-700 dark:text-red-400">
              <AlertCircleIcon size={18} className="mr-2 flex-shrink-0" />
              <span>{error}</span>
            </div>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Full Name
              </label>
              <div className="relative">
                <UserIcon size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} required className="pl-10 w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-[#1E88E5]" placeholder="Enter your name" />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email Address
              </label>
              <div className="relative">
                <MailIcon size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} required className="pl-10 w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-[#1E88E5]" placeholder="Enter your email" />
              </div>
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Password
              </label>
              <div className="relative">
                <LockIcon size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} required className="pl-10 w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-[#1E88E5]" placeholder="Create a password" />
              </div>
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <LockIcon size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input type="password" id="confirmPassword" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required className="pl-10 w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-[#1E88E5]" placeholder="Confirm your password" />
              </div>
            </div>
            <button type="submit" disabled={isSubmitting} className={`w-full py-3 rounded-lg font-medium text-white bg-[#1E88E5] hover:bg-blue-600 transition-colors ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}>
              {isSubmitting ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>
          <div className="mt-6 text-center">
            <p className="text-gray-600 dark:text-gray-400">
              Already have an account?{' '}
              <Link to="/login" className="text-[#1E88E5] hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>;
};