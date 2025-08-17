import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, X, UserPlus } from "lucide-react";
import { useStudents } from "@/contexts/StudentsContext";
import { useToast } from "@/hooks/use-toast";

interface AddStudentModalProps {
  children: React.ReactNode;
}

const subjectOptions = [
  "Mathematics", "Science", "English", "History", "Physics", "Chemistry", 
  "Biology", "Computer Science", "Art", "Music", "Physical Education", 
  "Social Studies", "Foreign Language", "Economics", "Psychology"
];

export const AddStudentModal = ({ children }: AddStudentModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { addStudent } = useStudents();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: "",
    grade: "",
    email: "",
    phone: "",
    parentContact: "",
    performance: 75,
    attendance: 95,
    engagement: 80,
    riskLevel: "low" as "low" | "medium" | "high",
    subjects: [] as string[],
    recentActivity: "",
    enrollmentDate: new Date().toISOString().split('T')[0]
  });

  const resetForm = () => {
    setFormData({
      name: "",
      grade: "",
      email: "",
      phone: "",
      parentContact: "",
      performance: 75,
      attendance: 95,
      engagement: 80,
      riskLevel: "low",
      subjects: [],
      recentActivity: "",
      enrollmentDate: new Date().toISOString().split('T')[0]
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.grade || !formData.email) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    addStudent({
      ...formData,
      avatar: "/placeholder.svg",
      recentActivity: formData.recentActivity || "Recently enrolled"
    });

    toast({
      title: "Student Added",
      description: `${formData.name} has been successfully added to the system.`,
    });

    resetForm();
    setIsOpen(false);
  };

  const addSubject = (subject: string) => {
    if (!formData.subjects.includes(subject)) {
      setFormData(prev => ({
        ...prev,
        subjects: [...prev.subjects, subject]
      }));
    }
  };

  const removeSubject = (subject: string) => {
    setFormData(prev => ({
      ...prev,
      subjects: prev.subjects.filter(s => s !== subject)
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <UserPlus className="w-5 h-5" />
            <span>Add New Student</span>
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
              Basic Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter student's full name"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="grade">Grade *</Label>
                <Select 
                  value={formData.grade} 
                  onValueChange={(value) => setFormData(prev => ({ ...prev, grade: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select grade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="9th Grade">9th Grade</SelectItem>
                    <SelectItem value="10th Grade">10th Grade</SelectItem>
                    <SelectItem value="11th Grade">11th Grade</SelectItem>
                    <SelectItem value="12th Grade">12th Grade</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="student@school.edu"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="(555) 123-4567"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="parentContact">Parent/Guardian Contact</Label>
              <Input
                id="parentContact"
                value={formData.parentContact}
                onChange={(e) => setFormData(prev => ({ ...prev, parentContact: e.target.value }))}
                placeholder="Parent Name - (555) 123-4567"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="enrollmentDate">Enrollment Date</Label>
              <Input
                id="enrollmentDate"
                type="date"
                value={formData.enrollmentDate}
                onChange={(e) => setFormData(prev => ({ ...prev, enrollmentDate: e.target.value }))}
              />
            </div>
          </div>

          {/* Academic Information */}
          <div className="space-y-4">
            <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
              Academic Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="performance">Performance (%)</Label>
                <Input
                  id="performance"
                  type="number"
                  min="0"
                  max="100"
                  value={formData.performance}
                  onChange={(e) => setFormData(prev => ({ ...prev, performance: parseInt(e.target.value) || 0 }))}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="attendance">Attendance (%)</Label>
                <Input
                  id="attendance"
                  type="number"
                  min="0"
                  max="100"
                  value={formData.attendance}
                  onChange={(e) => setFormData(prev => ({ ...prev, attendance: parseInt(e.target.value) || 0 }))}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="engagement">Engagement (%)</Label>
                <Input
                  id="engagement"
                  type="number"
                  min="0"
                  max="100"
                  value={formData.engagement}
                  onChange={(e) => setFormData(prev => ({ ...prev, engagement: parseInt(e.target.value) || 0 }))}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="riskLevel">Risk Level</Label>
              <Select 
                value={formData.riskLevel} 
                onValueChange={(value: "low" | "medium" | "high") => setFormData(prev => ({ ...prev, riskLevel: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select risk level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low Risk</SelectItem>
                  <SelectItem value="medium">Medium Risk</SelectItem>
                  <SelectItem value="high">High Risk</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Subjects</Label>
              <Select onValueChange={addSubject}>
                <SelectTrigger>
                  <SelectValue placeholder="Add subjects" />
                </SelectTrigger>
                <SelectContent>
                  {subjectOptions.filter(subject => !formData.subjects.includes(subject)).map(subject => (
                    <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              {formData.subjects.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.subjects.map(subject => (
                    <Badge key={subject} variant="secondary" className="flex items-center space-x-1">
                      <span>{subject}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-4 w-4 p-0 hover:bg-transparent"
                        onClick={() => removeSubject(subject)}
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="recentActivity">Recent Activity</Label>
              <Textarea
                id="recentActivity"
                value={formData.recentActivity}
                onChange={(e) => setFormData(prev => ({ ...prev, recentActivity: e.target.value }))}
                placeholder="Enter recent activity or notes about the student..."
                rows={3}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button type="button" variant="outline" onClick={resetForm}>
              Reset Form
            </Button>
            <Button type="submit" className="bg-gradient-primary">
              <Plus className="w-4 h-4 mr-2" />
              Add Student
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};