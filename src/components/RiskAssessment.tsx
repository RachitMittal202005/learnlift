import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Clock, CheckCircle, ArrowRight } from "lucide-react";

const riskAlerts = [
  {
    id: 1,
    student: "Aisha Patel",
    type: "attendance",
    severity: "high",
    message: "Has missed 5 consecutive days",
    timeAgo: "2 hours ago",
    action: "Contact Parent"
  },
  {
    id: 2,
    student: "Marcus Johnson", 
    type: "performance",
    severity: "medium",
    message: "Declining grades in Mathematics",
    timeAgo: "1 day ago",
    action: "Schedule Tutoring"
  },
  {
    id: 3,
    student: "David Chen",
    type: "engagement",
    severity: "medium", 
    message: "Low participation in online activities",
    timeAgo: "3 days ago",
    action: "Check-in Meeting"
  }
];

export const RiskAssessment = () => {
  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "high":
        return <AlertTriangle className="w-4 h-4 text-danger" />;
      case "medium":
        return <Clock className="w-4 h-4 text-warning" />;
      case "low":
        return <CheckCircle className="w-4 h-4 text-success" />;
      default:
        return null;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "bg-danger-light text-danger border-danger/20";
      case "medium":
        return "bg-warning-light text-warning border-warning/20";
      case "low":
        return "bg-success-light text-success border-success/20";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <Card className="shadow-soft">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <AlertTriangle className="w-5 h-5 text-warning" />
          <span>Risk Assessment</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {riskAlerts.map((alert) => (
          <div key={alert.id} className="p-3 rounded-lg border bg-card hover:shadow-soft transition-all duration-200">
            <div className="flex items-start justify-between space-x-2">
              <div className="flex items-start space-x-2 flex-1">
                {getSeverityIcon(alert.severity)}
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm text-foreground">{alert.student}</p>
                  <p className="text-xs text-muted-foreground mt-1">{alert.message}</p>
                  <p className="text-xs text-muted-foreground mt-1">{alert.timeAgo}</p>
                </div>
              </div>
              <Badge 
                variant="outline" 
                className={`text-xs ${getSeverityColor(alert.severity)}`}
              >
                {alert.severity}
              </Badge>
            </div>
            <div className="mt-3 pt-2 border-t">
              <Button size="sm" variant="outline" className="w-full justify-between text-xs">
                {alert.action}
                <ArrowRight className="w-3 h-3" />
              </Button>
            </div>
          </div>
        ))}
        
        <Button variant="outline" className="w-full mt-4" size="sm">
          View All Alerts
        </Button>
      </CardContent>
    </Card>
  );
};