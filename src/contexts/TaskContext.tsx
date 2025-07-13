import React, { useEffect, useState, createContext, useContext } from 'react';
import { sendEmail } from '../services/emailService';
import { useAuth } from './AuthContext';
export interface Task {
  id: string;
  title: string;
  description: string;
  date: string;
  category: string;
  priority: string;
  completed: boolean;
  alarm?: boolean;
  repeat?: string;
}
interface TaskContextType {
  tasks: Task[];
  addTask: (task: Task) => void;
  deleteTask: (id: string) => void;
  toggleTaskCompletion: (id: string) => void;
  updateTask: (id: string, updatedTask: Partial<Task>) => void;
}
const TaskContext = createContext<TaskContextType | undefined>(undefined);
export const useTask = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTask must be used within a TaskProvider');
  }
  return context;
};
export const TaskProvider: React.FC<{
  children: React.ReactNode;
}> = ({
  children
}) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const {
    user
  } = useAuth();
  // Load tasks from localStorage on mount
  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    } else {
      // Sample tasks for new users
      const sampleTasks = [{
        id: '1',
        title: 'Complete project proposal',
        description: 'Finish the project proposal for the client meeting',
        date: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        category: 'work',
        priority: 'high',
        completed: false
      }, {
        id: '2',
        title: 'Buy groceries',
        description: 'Milk, eggs, bread, and vegetables',
        date: new Date().toISOString(),
        category: 'personal',
        priority: 'medium',
        completed: false
      }];
      setTasks(sampleTasks);
      localStorage.setItem('tasks', JSON.stringify(sampleTasks));
    }
  }, []);
  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);
  // Check for due tasks and send notifications
  useEffect(() => {
    if (!user?.preferences.emailNotifications) return;
    const checkInterval = setInterval(() => {
      const now = new Date();
      const dueTasks = tasks.filter(task => {
        if (task.completed) return false;
        const taskDate = new Date(task.date);
        const timeDiff = taskDate.getTime() - now.getTime();
        // Task is due within the next hour
        return timeDiff > 0 && timeDiff < 60 * 60 * 1000;
      });
      // Send email notifications for due tasks
      dueTasks.forEach(task => {
        sendEmail(user.email, `Task Reminder: ${task.title}`, `Your task "${task.title}" is due soon at ${new Date(task.date).toLocaleTimeString()}.`);
      });
    }, 60000); // Check every minute
    return () => clearInterval(checkInterval);
  }, [tasks, user]);
  const addTask = (task: Task) => {
    setTasks([...tasks, task]);
    // Send email notification if enabled
    if (user?.preferences.emailNotifications) {
      sendEmail(user.email, 'New Task Created', `You've created a new task: "${task.title}" due on ${new Date(task.date).toLocaleString()}.`);
    }
  };
  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };
  const toggleTaskCompletion = (id: string) => {
    setTasks(tasks.map(task => task.id === id ? {
      ...task,
      completed: !task.completed
    } : task));
    // Send email notification if task is completed and notifications are enabled
    const completedTask = tasks.find(task => task.id === id);
    if (completedTask && !completedTask.completed && user?.preferences.emailNotifications) {
      sendEmail(user.email, 'Task Completed', `You've completed the task: "${completedTask.title}".`);
    }
  };
  const updateTask = (id: string, updatedTask: Partial<Task>) => {
    setTasks(tasks.map(task => task.id === id ? {
      ...task,
      ...updatedTask
    } : task));
  };
  return <TaskContext.Provider value={{
    tasks,
    addTask,
    deleteTask,
    toggleTaskCompletion,
    updateTask
  }}>
      {children}
    </TaskContext.Provider>;
};