interface EmailLog {
  to: string;
  subject: string;
  body: string;
  timestamp: number;
}
// Store sent emails in localStorage for demonstration purposes
const getEmailLogs = (): EmailLog[] => {
  const logs = localStorage.getItem('taskflow_email_logs');
  return logs ? JSON.parse(logs) : [];
};
const saveEmailLogs = (logs: EmailLog[]) => {
  localStorage.setItem('taskflow_email_logs', JSON.stringify(logs));
};
export const sendEmail = (to: string, subject: string, body: string): boolean => {
  // In a real app, this would connect to an email service API
  console.log(`Sending email to ${to}: ${subject}`);
  // Log the email
  const logs = getEmailLogs();
  logs.push({
    to,
    subject,
    body,
    timestamp: Date.now()
  });
  saveEmailLogs(logs);
  return true;
};
export const sendTaskReminder = (to: string, taskTitle: string, dueDate: string): boolean => {
  return sendEmail(to, `Reminder: ${taskTitle}`, `Your task "${taskTitle}" is due on ${dueDate}.`);
};
export const sendDailySummary = (to: string, completedTasks: number, pendingTasks: number): boolean => {
  return sendEmail(to, 'Your Daily TaskFlow Summary', `Today's summary:\n- Completed tasks: ${completedTasks}\n- Pending tasks: ${pendingTasks}`);
};