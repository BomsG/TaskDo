import React, { useEffect, useState, createContext, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { sendEmail } from '../services/emailService';
interface User {
  id: string;
  name: string;
  email: string;
  preferences: {
    emailNotifications: boolean;
    taskReminders: boolean;
    dailySummary: boolean;
  };
}
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  resetPassword: (email: string) => Promise<boolean>;
  updateUserPreferences: (preferences: Partial<User['preferences']>) => void;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
export const AuthProvider: React.FC<{
  children: React.ReactNode;
}> = ({
  children
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  // Check for existing session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('taskflow_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);
  // Mock user database (in a real app, this would be on a server)
  const getUsers = (): Record<string, any> => {
    const users = localStorage.getItem('taskflow_users');
    return users ? JSON.parse(users) : {};
  };
  const saveUsers = (users: Record<string, any>) => {
    localStorage.setItem('taskflow_users', JSON.stringify(users));
  };
  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    const users = getUsers();
    const userRecord = Object.values(users).find((u: any) => u.email === email && u.password === password) as any;
    if (userRecord) {
      const loggedInUser: User = {
        id: userRecord.id,
        name: userRecord.name,
        email: userRecord.email,
        preferences: userRecord.preferences || {
          emailNotifications: false,
          taskReminders: true,
          dailySummary: false
        }
      };
      setUser(loggedInUser);
      localStorage.setItem('taskflow_user', JSON.stringify(loggedInUser));
      setIsLoading(false);
      return true;
    }
    setIsLoading(false);
    return false;
  };
  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    const users = getUsers();
    // Check if user already exists
    const userExists = Object.values(users).some((u: any) => u.email === email);
    if (userExists) {
      setIsLoading(false);
      return false;
    }
    // Create new user
    const newUserId = Date.now().toString();
    const newUser = {
      id: newUserId,
      name,
      email,
      password,
      preferences: {
        emailNotifications: false,
        taskReminders: true,
        dailySummary: false
      }
    };
    // Save to "database"
    users[newUserId] = newUser;
    saveUsers(users);
    // Log in the new user
    const loggedInUser: User = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      preferences: newUser.preferences
    };
    setUser(loggedInUser);
    localStorage.setItem('taskflow_user', JSON.stringify(loggedInUser));
    // Send welcome email
    sendEmail(email, 'Welcome to TaskFlow', 'Thank you for registering with TaskFlow!');
    setIsLoading(false);
    return true;
  };
  const logout = () => {
    setUser(null);
    localStorage.removeItem('taskflow_user');
    navigate('/login');
  };
  const resetPassword = async (email: string): Promise<boolean> => {
    setIsLoading(true);
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    const users = getUsers();
    const userRecord = Object.values(users).find((u: any) => u.email === email) as any;
    if (userRecord) {
      // Generate a temporary password
      const tempPassword = Math.random().toString(36).slice(-8);
      // Update the user's password
      userRecord.password = tempPassword;
      saveUsers(users);
      // Send password reset email
      sendEmail(email, 'Password Reset', `Your temporary password is: ${tempPassword}. Please login and change your password.`);
      setIsLoading(false);
      return true;
    }
    setIsLoading(false);
    return false;
  };
  const updateUserPreferences = (preferences: Partial<User['preferences']>) => {
    if (!user) return;
    const updatedUser = {
      ...user,
      preferences: {
        ...user.preferences,
        ...preferences
      }
    };
    // Update local state
    setUser(updatedUser);
    // Update localStorage
    localStorage.setItem('taskflow_user', JSON.stringify(updatedUser));
    // Update in "database"
    const users = getUsers();
    if (users[user.id]) {
      users[user.id].preferences = updatedUser.preferences;
      saveUsers(users);
    }
  };
  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout,
    resetPassword,
    updateUserPreferences
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};