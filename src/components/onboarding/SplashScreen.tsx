import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircleIcon } from 'lucide-react';
export const SplashScreen = () => {
  return <div className="bg-[#1E88E5] flex flex-col justify-center items-center w-full h-screen">
      <motion.div initial={{
      scale: 0.8,
      opacity: 0
    }} animate={{
      scale: 1,
      opacity: 1
    }} transition={{
      duration: 0.8,
      ease: [0.6, 0.05, -0.01, 0.9]
    }} className="flex flex-col items-center">
        <motion.div initial={{
        scale: 0,
        rotate: -180
      }} animate={{
        scale: 1,
        rotate: 0
      }} transition={{
        type: 'spring',
        stiffness: 260,
        damping: 20,
        delay: 0.2
      }} className="text-white mb-4">
          <CheckCircleIcon size={80} strokeWidth={1.5} />
        </motion.div>
        <motion.h1 initial={{
        y: 20,
        opacity: 0
      }} animate={{
        y: 0,
        opacity: 1
      }} transition={{
        delay: 0.4,
        duration: 0.5
      }} className="text-3xl font-bold text-white mb-2">
          TaskFlow
        </motion.h1>
        <motion.p initial={{
        y: 20,
        opacity: 0
      }} animate={{
        y: 0,
        opacity: 1
      }} transition={{
        delay: 0.6,
        duration: 0.5
      }} className="text-blue-100 text-center">
          Manage your tasks with ease
        </motion.p>
      </motion.div>
    </div>;
};