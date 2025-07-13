import React, { Children } from 'react';
import { motion } from 'framer-motion';
import { TaskCard } from './TaskCard';
import { Task } from '../../contexts/TaskContext';
interface TaskSectionProps {
  tasks: Task[];
}
export const TaskSection = ({
  tasks
}: TaskSectionProps) => {
  const container = {
    hidden: {
      opacity: 0
    },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  return <motion.div variants={container} initial="hidden" animate="show" className="space-y-3">
      {tasks.map(task => <TaskCard key={task.id} task={task} />)}
    </motion.div>;
};