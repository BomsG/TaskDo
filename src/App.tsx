import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Dashboard } from './components/dashboard/Dashboard';
import { AddTaskScreen } from './components/tasks/AddTaskScreen';
import { TaskDetailScreen } from './components/tasks/TaskDetailScreen';
import { SettingsScreen } from './components/settings/SettingsScreen';
import { LoginScreen } from './components/auth/LoginScreen';
import { RegisterScreen } from './components/auth/RegisterScreen';
import { ForgotPasswordScreen } from './components/auth/ForgotPasswordScreen';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { TaskProvider } from './contexts/TaskContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import { AnimatePresence } from 'framer-motion';
import { TaskList } from './components/tasks/TaskList';
export function App() {
  return <ThemeProvider>
      <Router>
        <AuthProvider>
          <TaskProvider>
            <AnimatePresence mode="wait">
              <Routes>
                {/* Public routes */}
                <Route path="/login" element={<LoginScreen />} />
                <Route path="/register" element={<RegisterScreen />} />
                <Route path="/forgot-password" element={<ForgotPasswordScreen />} />
                {/* Protected routes */}
                <Route element={<ProtectedRoute />}>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/tasks" element={<TaskList />} />
                  <Route path="/tasks/add" element={<AddTaskScreen />} />
                  <Route path="/tasks/:id" element={<TaskDetailScreen />} />
                  <Route path="/settings" element={<SettingsScreen />} />
                </Route>
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
              </Routes>
            </AnimatePresence>
          </TaskProvider>
        </AuthProvider>
      </Router>
    </ThemeProvider>;
}