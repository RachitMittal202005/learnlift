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
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, X, Filter, Mail, Phone, GraduationCap } from "lucide-react";
import { useStudents, Student } from "@/contexts/StudentsContext";
import { cn } from "@/lib/utils";

interface SearchStudentsModalProps {
  children: React.ReactNode;
}

export const SearchStudentsModal = ({ children }: SearchStudentsModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRisk, setSelectedRisk] = useState<string>("all");
  const [selectedGrade, setSelectedGrade] = useState<string>("all");
  const { searchStudents, students } = useStudents();

  const filteredStudents = searchStudents(searchQuery).filter(student => {
    const riskMatch = selectedRisk === "all" || student.riskLevel === selectedRisk;
    const gradeMatch = selectedGrade === "all" || student.grade === selectedGrade;
    return riskMatch && gradeMatch;
  });

  const grades = Array.from(new Set(students.map(s => s.grade))).sort();

  const getRiskColor = (level: string) => {
    switch (level) {
      case "high":
        return "bg-danger text-danger-foreground";
      case "medium":
        return "bg-warning text-warning-foreground";
      case "low":
        return "bg-success text-success-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedRisk("all");
    setSelectedGrade("all");
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Search className="w-5 h-5" />
            <span>Search Students</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Search and Filters */}
          <div className="flex flex-col space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, email, grade, or subject..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-10"
              />
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                  onClick={() => setSearchQuery("")}
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
            
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Filters:</span>
              </div>
              
              <select
                value={selectedRisk}
                onChange={(e) => setSelectedRisk(e.target.value)}
                className="px-3 py-1 text-sm border rounded-md bg-background"
              >
                <option value="all">All Risk Levels</option>
                <option value="low">Low Risk</option>
                <option value="medium">Medium Risk</option>
                <option value="high">High Risk</option>
              </select>
              
              <select
                value={selectedGrade}
                onChange={(e) => setSelectedGrade(e.target.value)}
                className="px-3 py-1 text-sm border rounded-md bg-background"
              >
                <option value="all">All Grades</option>
                {grades.map(grade => (
                  <option key={grade} value={grade}>{grade}</option>
                ))}
              </select>
              
              <Button variant="outline" size="sm" onClick={clearFilters}>
                Clear Filters
              </Button>
            </div>
          </div>

          {/* Results */}
          <div className="border rounded-lg overflow-hidden">
            <div className="bg-muted px-4 py-2 border-b">
              <span className="text-sm text-muted-foreground">
                {filteredStudents.length} student{filteredStudents.length !== 1 ? 's' : ''} found
              </span>
            </div>
            
            <div className="max-h-96 overflow-y-auto">
              {filteredStudents.length === 0 ? (
                <div className="p-8 text-center text-muted-foreground">
                  <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No students found matching your criteria</p>
                </div>
              ) : (
                <div className="divide-y">
                  {filteredStudents.map((student) => (
                    <div key={student.id} className="p-4 hover:bg-muted/50 transition-colors">
                      <div className="flex items-start justify-between space-x-4">
                        <div className="flex items-center space-x-3 flex-1">
                          <Avatar className="w-12 h-12">
                            <AvatarImage src={student.avatar} alt={student.name} />
                            <AvatarFallback className="bg-gradient-primary text-primary-foreground font-semibold">
                              {student.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2 mb-1">
                              <h3 className="font-semibold text-foreground">{student.name}</h3>
                              <Badge 
                                variant="outline" 
                                className={cn("text-xs", getRiskColor(student.riskLevel))}
                              >
                                {student.riskLevel} risk
                              </Badge>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-muted-foreground">
                              <div className="flex items-center space-x-1">
                                <GraduationCap className="w-3 h-3" />
                                <span>{student.grade}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Mail className="w-3 h-3" />
                                <span className="truncate">{student.email}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Phone className="w-3 h-3" />
                                <span>{student.phone}</span>
                              </div>
                              <div className="text-xs">
                                Performance: {student.performance}%
                              </div>
                            </div>
                            
                            {student.subjects && (
                              <div className="mt-2 flex flex-wrap gap-1">
                                {student.subjects.map((subject) => (
                                  <Badge key={subject} variant="secondary" className="text-xs">
                                    {subject}
                                  </Badge>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className="text-sm space-y-1">
                            <div>Performance: <span className="font-medium">{student.performance}%</span></div>
                            <div>Attendance: <span className="font-medium">{student.attendance}%</span></div>
                            <div>Engagement: <span className="font-medium">{student.engagement}%</span></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};