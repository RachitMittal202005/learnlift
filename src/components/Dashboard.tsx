import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, Users, TrendingUp, Brain, Bell, Search } from "lucide-react";
import { StudentCard } from "./StudentCard";
import { RiskAssessment } from "./RiskAssessment";
import { PerformanceChart } from "./PerformanceChart";

const mockStudents = [
  {
    id: 1,
    name: "Emma Rodriguez",
    grade: "10th Grade",
    riskLevel: "low" as const,
    performance: 92,
    attendance: 98,
    engagement: 88,
    avatar: "/placeholder.svg",
    recentActivity: "Completed Advanced Math Module"
  },
  {
    id: 2,
    name: "Marcus Johnson",
    grade: "11th Grade", 
    riskLevel: "medium" as const,
    performance: 78,
    attendance: 85,
    engagement: 65,
    avatar: "/placeholder.svg",
    recentActivity: "Missed 3 assignments this week"
  },
  {
    id: 3,
    name: "Aisha Patel",
    grade: "9th Grade",
    riskLevel: "high" as const,
    performance: 65,
    attendance: 72,
    engagement: 45,
    avatar: "/placeholder.svg",
    recentActivity: "No login for 5 days"
  }
];

export const Dashboard = () => {
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
            <Button variant="outline" size="sm">
              <Search className="w-4 h-4 mr-2" />
              Search Students
            </Button>
            <Button size="sm" className="bg-gradient-primary">
              <Bell className="w-4 h-4 mr-2" />
              Alerts (3)
            </Button>
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
              <div className="text-2xl font-bold">1,247</div>
              <p className="text-xs text-muted-foreground">+12 from last month</p>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">At-Risk Students</CardTitle>
              <AlertTriangle className="w-4 h-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">47</div>
              <p className="text-xs text-warning-foreground">Requires immediate attention</p>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Performance</CardTitle>
              <TrendingUp className="w-4 h-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">84.2%</div>
              <p className="text-xs text-success-foreground">+2.1% improvement</p>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Engagement Rate</CardTitle>
              <Brain className="w-4 h-4 text-info" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">91.7%</div>
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
              {mockStudents.map((student) => (
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