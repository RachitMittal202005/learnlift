import React, { createContext, useContext, useState, useCallback } from 'react';

export interface Student {
  id: number;
  name: string;
  grade: string;
  riskLevel: "low" | "medium" | "high";
  performance: number;
  attendance: number;
  engagement: number;
  avatar: string;
  recentActivity: string;
  email?: string;
  phone?: string;
  parentContact?: string;
  subjects?: string[];
  enrollmentDate?: string;
}

export interface Alert {
  id: number;
  student: string;
  studentId: number;
  type: string;
  severity: "high" | "medium" | "low";
  message: string;
  timeAgo: string;
  action: string;
  resolved?: boolean;
}

interface StudentsContextType {
  students: Student[];
  alerts: Alert[];
  addStudent: (student: Omit<Student, 'id'>) => void;
  removeStudent: (id: number) => void;
  updateStudent: (id: number, updates: Partial<Student>) => void;
  searchStudents: (query: string) => Student[];
  resolveAlert: (alertId: number) => void;
  addAlert: (alert: Omit<Alert, 'id'>) => void;
}

const StudentsContext = createContext<StudentsContextType | undefined>(undefined);

const initialStudents: Student[] = [
  {
    id: 1,
    name: "Emma Rodriguez",
    grade: "10th Grade",
    riskLevel: "low",
    performance: 92,
    attendance: 98,
    engagement: 88,
    avatar: "/placeholder.svg",
    recentActivity: "Completed Advanced Math Module",
    email: "emma.rodriguez@school.edu",
    phone: "(555) 123-4567",
    parentContact: "Maria Rodriguez - (555) 123-4568",
    subjects: ["Mathematics", "Science", "English"],
    enrollmentDate: "2023-09-01"
  },
  {
    id: 2,
    name: "Marcus Johnson",
    grade: "11th Grade", 
    riskLevel: "medium",
    performance: 78,
    attendance: 85,
    engagement: 65,
    avatar: "/placeholder.svg",
    recentActivity: "Missed 3 assignments this week",
    email: "marcus.johnson@school.edu",
    phone: "(555) 234-5678",
    parentContact: "Linda Johnson - (555) 234-5679",
    subjects: ["History", "English", "Art"],
    enrollmentDate: "2022-09-01"
  },
  {
    id: 3,
    name: "Aisha Patel",
    grade: "9th Grade",
    riskLevel: "high",
    performance: 65,
    attendance: 72,
    engagement: 45,
    avatar: "/placeholder.svg",
    recentActivity: "No login for 5 days",
    email: "aisha.patel@school.edu",
    phone: "(555) 345-6789",
    parentContact: "Raj Patel - (555) 345-6790",
    subjects: ["Mathematics", "Science", "Social Studies"],
    enrollmentDate: "2024-09-01"
  },
  {
    id: 4,
    name: "David Chen",
    grade: "12th Grade",
    riskLevel: "low",
    performance: 89,
    attendance: 94,
    engagement: 92,
    avatar: "/placeholder.svg",
    recentActivity: "Submitted college application",
    email: "david.chen@school.edu",
    phone: "(555) 456-7890",
    parentContact: "Susan Chen - (555) 456-7891",
    subjects: ["Physics", "Calculus", "Computer Science"],
    enrollmentDate: "2021-09-01"
  }
];

const initialAlerts: Alert[] = [
  {
    id: 1,
    student: "Aisha Patel",
    studentId: 3,
    type: "attendance",
    severity: "high",
    message: "Has missed 5 consecutive days",
    timeAgo: "2 hours ago",
    action: "Contact Parent"
  },
  {
    id: 2,
    student: "Marcus Johnson",
    studentId: 2,
    type: "performance",
    severity: "medium",
    message: "Declining grades in Mathematics",
    timeAgo: "1 day ago",
    action: "Schedule Tutoring"
  },
  {
    id: 3,
    student: "David Chen",
    studentId: 4,
    type: "engagement",
    severity: "medium", 
    message: "Low participation in online activities",
    timeAgo: "3 days ago",
    action: "Check-in Meeting"
  }
];

export const StudentsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [alerts, setAlerts] = useState<Alert[]>(initialAlerts);

  const addStudent = useCallback((newStudent: Omit<Student, 'id'>) => {
    const id = Math.max(...students.map(s => s.id), 0) + 1;
    setStudents(prev => [...prev, { ...newStudent, id }]);
  }, [students]);

  const removeStudent = useCallback((id: number) => {
    setStudents(prev => prev.filter(student => student.id !== id));
    setAlerts(prev => prev.filter(alert => alert.studentId !== id));
  }, []);

  const updateStudent = useCallback((id: number, updates: Partial<Student>) => {
    setStudents(prev => prev.map(student => 
      student.id === id ? { ...student, ...updates } : student
    ));
  }, []);

  const searchStudents = useCallback((query: string): Student[] => {
    if (!query.trim()) return students;
    
    const lowercaseQuery = query.toLowerCase();
    return students.filter(student => 
      student.name.toLowerCase().includes(lowercaseQuery) ||
      student.grade.toLowerCase().includes(lowercaseQuery) ||
      student.email?.toLowerCase().includes(lowercaseQuery) ||
      student.subjects?.some(subject => subject.toLowerCase().includes(lowercaseQuery))
    );
  }, [students]);

  const resolveAlert = useCallback((alertId: number) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId ? { ...alert, resolved: true } : alert
    ));
  }, []);

  const addAlert = useCallback((newAlert: Omit<Alert, 'id'>) => {
    const id = Math.max(...alerts.map(a => a.id), 0) + 1;
    setAlerts(prev => [...prev, { ...newAlert, id }]);
  }, [alerts]);

  const value: StudentsContextType = {
    students,
    alerts,
    addStudent,
    removeStudent,
    updateStudent,
    searchStudents,
    resolveAlert,
    addAlert
  };

  return (
    <StudentsContext.Provider value={value}>
      {children}
    </StudentsContext.Provider>
  );
};

export const useStudents = () => {
  const context = useContext(StudentsContext);
  if (context === undefined) {
    throw new Error('useStudents must be used within a StudentsProvider');
  }
  return context;
};