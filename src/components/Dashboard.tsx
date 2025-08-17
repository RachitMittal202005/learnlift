import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, Users, TrendingUp, Brain, Bell, Search, Plus, UserMinus } from "lucide-react";
import { StudentCard } from "./StudentCard";
import { RiskAssessment } from "./RiskAssessment";
import { PerformanceChart } from "./PerformanceChart";
import { SearchStudentsModal } from "./SearchStudentsModal";
import { AlertsPanel } from "./AlertsPanel";
import { AddStudentModal } from "./AddStudentModal";
import { useStudents } from "@/contexts/StudentsContext";

export const Dashboard = () => {
  const { students, alerts } = useStudents();
  
  const activeAlerts = alerts.filter(alert => !alert.resolved);
  const atRiskStudents = students.filter(student => student.riskLevel === "high" || student.riskLevel === "medium");
  const averagePerformance = students.reduce((sum, student) => sum + student.performance, 0) / students.length;
  const averageEngagement = students.reduce((sum, student) => sum + student.engagement, 0) / students.length;
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card shadow-soft">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Brain className="w-8 h-8 text-primary" />
              <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Student Success AI
              </h1>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <SearchStudentsModal>
              <Button variant="outline" size="sm">
                <Search className="w-4 h-4 mr-2" />
                Search Students
              </Button>
            </SearchStudentsModal>
            
            <AlertsPanel>
              <Button size="sm" className="bg-gradient-primary">
                <Bell className="w-4 h-4 mr-2" />
                Alerts ({activeAlerts.length})
              </Button>
            </AlertsPanel>
            
            <AddStudentModal>
              <Button size="sm" variant="outline">
                <Plus className="w-4 h-4 mr-2" />
                Add Student
              </Button>
            </AddStudentModal>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6 space-y-6">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="shadow-soft">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Students</CardTitle>
              <Users className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{students.length}</div>
              <p className="text-xs text-muted-foreground">+{students.filter(s => {
                const enrollDate = new Date(s.enrollmentDate || '2024-01-01');
                const lastMonth = new Date();
                lastMonth.setMonth(lastMonth.getMonth() - 1);
                return enrollDate > lastMonth;
              }).length} from last month</p>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">At-Risk Students</CardTitle>
              <AlertTriangle className="w-4 h-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{atRiskStudents.length}</div>
              <p className="text-xs text-warning-foreground">Requires immediate attention</p>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Performance</CardTitle>
              <TrendingUp className="w-4 h-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{averagePerformance.toFixed(1)}%</div>
              <p className="text-xs text-success-foreground">
                {averagePerformance > 80 ? '+' : ''}
                {(averagePerformance - 80).toFixed(1)}% from target
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Engagement Rate</CardTitle>
              <Brain className="w-4 h-4 text-info" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{averageEngagement.toFixed(1)}%</div>
              <p className="text-xs text-info-foreground">Active participation</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Student List */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Recent Student Activity</h2>
              <Button variant="outline" size="sm">View All</Button>
            </div>
            <div className="space-y-4">
              {students.slice(0, 5).map((student) => (
                <StudentCard key={student.id} student={student} />
              ))}
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            <RiskAssessment />
            <PerformanceChart />
          </div>
        </div>
      </div>
    </div>
  );
};