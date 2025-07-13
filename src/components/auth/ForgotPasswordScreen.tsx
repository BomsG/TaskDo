import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MailIcon, AlertCircleIcon, CheckCircleIcon, ArrowLeftIcon } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
export const ForgotPasswordScreen = () => {
  const {
    resetPassword
  } = useAuth();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setIsSubmitting(true);
    try {
      const result = await resetPassword(email);
      if (result) {
        setSuccess(true);
        setEmail('');
      } else {
        setError('Email not found');
      }
    } catch (err) {
      setError('An error occurred');
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
            Reset Password
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Enter your email to receive a password reset link
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          {error && <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md flex items-center text-red-700 dark:text-red-400">
              <AlertCircleIcon size={18} className="mr-2 flex-shrink-0" />
              <span>{error}</span>
            </div>}
          {success && <div className="mb-4 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md flex items-center text-green-700 dark:text-green-400">
              <CheckCircleIcon size={18} className="mr-2 flex-shrink-0" />
              <span>
                Password reset email sent! Check your inbox for further
                instructions.
              </span>
            </div>}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email Address
              </label>
              <div className="relative">
                <MailIcon size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} required className="pl-10 w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-[#1E88E5]" placeholder="Enter your email" />
              </div>
            </div>
            <button type="submit" disabled={isSubmitting} className={`w-full py-3 rounded-lg font-medium text-white bg-[#1E88E5] hover:bg-blue-600 transition-colors ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}>
              {isSubmitting ? 'Sending...' : 'Reset Password'}
            </button>
          </form>
          <div className="mt-6 text-center">
            <Link to="/login" className="inline-flex items-center text-[#1E88E5] hover:underline">
              <ArrowLeftIcon size={16} className="mr-1" />
              Back to Login
            </Link>
          </div>
        </div>
      </motion.div>
    </div>;
};