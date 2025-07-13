import React, { useState, createElement } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { CheckCircleIcon, CalendarIcon, BellIcon, BarChartIcon, ArrowRightIcon } from 'lucide-react';
const slides = [{
  title: 'Welcome to TaskFlow',
  description: 'The simple way to organize your tasks and boost productivity',
  icon: CheckCircleIcon,
  color: 'text-[#1E88E5]',
  bg: 'bg-blue-100',
  illustration: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
}, {
  title: 'Plan Your Day',
  description: 'Create tasks, set priorities, and organize your schedule',
  icon: CalendarIcon,
  color: 'text-[#1E88E5]',
  bg: 'bg-blue-100'
}, {
  title: 'Never Miss a Task',
  description: 'Get notifications when your tasks are due',
  icon: BellIcon,
  color: 'text-[#1E88E5]',
  bg: 'bg-blue-100'
}, {
  title: 'Track Your Progress',
  description: 'Monitor your productivity with beautiful charts and statistics',
  icon: BarChartIcon,
  color: 'text-[#1E88E5]',
  bg: 'bg-blue-100'
}];
export const OnboardingScreen = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();
  const nextSlide = () => {
    if (currentSlide === slides.length - 1) {
      navigate('/dashboard');
    } else {
      setCurrentSlide(currentSlide + 1);
    }
  };
  return <div className="w-full h-screen bg-white flex flex-col">
      {/* Slide content */}
      <div className="flex-1 relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div key={currentSlide} initial={{
          opacity: 0,
          x: 100
        }} animate={{
          opacity: 1,
          x: 0
        }} exit={{
          opacity: 0,
          x: -100
        }} transition={{
          duration: 0.5
        }} className="h-full flex flex-col items-center justify-center px-6">
            {currentSlide === 0 && <div className="w-full max-w-xs mb-8">
                <motion.img src={slides[0].illustration} alt="Task management illustration" className="w-full rounded-lg shadow-lg" initial={{
              y: 20,
              opacity: 0
            }} animate={{
              y: 0,
              opacity: 1
            }} transition={{
              delay: 0.3
            }} />
              </div>}
            {currentSlide > 0 && <motion.div className={`p-6 rounded-full ${slides[currentSlide].bg} mb-8`} initial={{
            scale: 0.8,
            opacity: 0
          }} animate={{
            scale: 1,
            opacity: 1
          }} transition={{
            delay: 0.2,
            type: 'spring'
          }}>
                {createElement(slides[currentSlide].icon, {
              size: 60,
              className: slides[currentSlide].color,
              strokeWidth: 1.5
            })}
              </motion.div>}
            <motion.h1 className="text-2xl font-bold text-gray-800 mb-4 text-center" initial={{
            y: 20,
            opacity: 0
          }} animate={{
            y: 0,
            opacity: 1
          }} transition={{
            delay: 0.4
          }}>
              {slides[currentSlide].title}
            </motion.h1>
            <motion.p className="text-gray-600 text-center mb-8" initial={{
            y: 20,
            opacity: 0
          }} animate={{
            y: 0,
            opacity: 1
          }} transition={{
            delay: 0.5
          }}>
              {slides[currentSlide].description}
            </motion.p>
          </motion.div>
        </AnimatePresence>
      </div>
      {/* Progress dots */}
      <div className="flex justify-center gap-2 my-6">
        {slides.map((_, index) => <div key={index} className={`h-2 rounded-full transition-all duration-300 ${index === currentSlide ? 'w-6 bg-[#1E88E5]' : 'w-2 bg-gray-300'}`} />)}
      </div>
      {/* Bottom button */}
      <div className="px-6 pb-10">
        <motion.button whileTap={{
        scale: 0.95
      }} onClick={nextSlide} className="bg-[#1E88E5] text-white w-full py-4 rounded-lg font-medium flex items-center justify-center">
          {currentSlide === slides.length - 1 ? 'Get Started' : 'Next'}
          <ArrowRightIcon size={18} className="ml-2" />
        </motion.button>
      </div>
    </div>;
};