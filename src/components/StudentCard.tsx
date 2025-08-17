import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AlertTriangle, TrendingUp, Users, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface Student {
  id: number;
  name: string;
  grade: string;
  riskLevel: "low" | "medium" | "high";
  performance: number;
  attendance: number; 
  engagement: number;
  avatar: string;
  recentActivity: string;
}

interface StudentCardProps {
  student: Student;
}

export const StudentCard = ({ student }: StudentCardProps) => {
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

  const getRiskIcon = (level: string) => {
    switch (level) {
      case "high":
        return <AlertTriangle className="w-3 h-3" />;
      case "medium":
        return <Clock className="w-3 h-3" />;
      case "low":
        return <TrendingUp className="w-3 h-3" />;
      default:
        return null;
    }
  };

  return (
    <Card className="shadow-soft hover:shadow-medium transition-all duration-300">
      <CardContent className="p-4">
        <div className="flex items-start justify-between space-x-4">
          {/* Student Info */}
          <div className="flex items-center space-x-3">
            <Avatar className="w-12 h-12">
              <AvatarImage src={student.avatar} alt={student.name} />
              <AvatarFallback className="bg-gradient-primary text-primary-foreground font-semibold">
                {student.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <h3 className="font-semibold text-foreground">{student.name}</h3>
                <Badge 
                  variant="outline" 
                  className={cn("text-xs", getRiskColor(student.riskLevel))}
                >
                  {getRiskIcon(student.riskLevel)}
                  <span className="ml-1 capitalize">{student.riskLevel} Risk</span>
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">{student.grade}</p>
              <p className="text-xs text-muted-foreground mt-1">{student.recentActivity}</p>
            </div>
          </div>

          {/* Metrics */}
          <div className="flex flex-col space-y-2 min-w-[120px]">
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Performance</span>
                <span className="font-medium">{student.performance}%</span>
              </div>
              <Progress 
                value={student.performance} 
                className="h-1" 
              />
            </div>
            
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Attendance</span>
                <span className="font-medium">{student.attendance}%</span>
              </div>
              <Progress 
                value={student.attendance} 
                className="h-1"
              />
            </div>
            
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Engagement</span>
                <span className="font-medium">{student.engagement}%</span>
              </div>
              <Progress 
                value={student.engagement} 
                className="h-1"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};