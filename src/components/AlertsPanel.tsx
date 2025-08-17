import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertTriangle, CheckCircle, Clock, Bell, Eye, Check, X } from "lucide-react";
import { useStudents } from "@/contexts/StudentsContext";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface AlertsPanelProps {
  children: React.ReactNode;
}

export const AlertsPanel = ({ children }: AlertsPanelProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { alerts, resolveAlert } = useStudents();
  const { toast } = useToast();

  const activeAlerts = alerts.filter(alert => !alert.resolved);
  const resolvedAlerts = alerts.filter(alert => alert.resolved);

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

  const handleResolveAlert = (alertId: number, studentName: string) => {
    resolveAlert(alertId);
    toast({
      title: "Alert Resolved",
      description: `Alert for ${studentName} has been marked as resolved.`,
    });
  };

  const AlertCard = ({ alert, showActions = true }: { alert: any, showActions?: boolean }) => (
    <div className={cn(
      "p-4 rounded-lg border transition-all duration-200",
      alert.resolved ? "bg-muted/50 opacity-75" : "bg-card hover:shadow-soft"
    )}>
      <div className="flex items-start justify-between space-x-3">
        <div className="flex items-start space-x-3 flex-1">
          {getSeverityIcon(alert.severity)}
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-1">
              <h4 className="font-semibold text-sm text-foreground">{alert.student}</h4>
              <Badge 
                variant="outline" 
                className={cn("text-xs", getSeverityColor(alert.severity))}
              >
                {alert.severity}
              </Badge>
              {alert.resolved && (
                <Badge variant="outline" className="text-xs bg-success-light text-success">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Resolved
                </Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground mb-2">{alert.message}</p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">{alert.timeAgo}</span>
              <Badge variant="secondary" className="text-xs">
                {alert.type}
              </Badge>
            </div>
          </div>
        </div>
      </div>
      
      {showActions && !alert.resolved && (
        <div className="mt-3 pt-3 border-t flex space-x-2">
          <Button 
            size="sm" 
            variant="outline" 
            className="flex-1 text-xs"
            onClick={() => {
              toast({
                title: "Action Initiated",
                description: `${alert.action} has been scheduled for ${alert.student}.`,
              });
            }}
          >
            <Eye className="w-3 h-3 mr-1" />
            {alert.action}
          </Button>
          <Button 
            size="sm" 
            variant="outline"
            className="text-xs"
            onClick={() => handleResolveAlert(alert.id, alert.student)}
          >
            <Check className="w-3 h-3 mr-1" />
            Resolve
          </Button>
        </div>
      )}
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Bell className="w-5 h-5" />
            <span>Alert Management</span>
            {activeAlerts.length > 0 && (
              <Badge variant="outline" className="bg-danger-light text-danger">
                {activeAlerts.length} active
              </Badge>
            )}
          </DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="active" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="active" className="flex items-center space-x-2">
              <AlertTriangle className="w-4 h-4" />
              <span>Active ({activeAlerts.length})</span>
            </TabsTrigger>
            <TabsTrigger value="resolved" className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4" />
              <span>Resolved ({resolvedAlerts.length})</span>
            </TabsTrigger>
            <TabsTrigger value="summary" className="flex items-center space-x-2">
              <Eye className="w-4 h-4" />
              <span>Summary</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="active" className="mt-4">
            <div className="max-h-96 overflow-y-auto space-y-4">
              {activeAlerts.length === 0 ? (
                <div className="p-8 text-center text-muted-foreground">
                  <CheckCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No active alerts</p>
                  <p className="text-sm">All students are doing well!</p>
                </div>
              ) : (
                activeAlerts.map((alert) => (
                  <AlertCard key={alert.id} alert={alert} />
                ))
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="resolved" className="mt-4">
            <div className="max-h-96 overflow-y-auto space-y-4">
              {resolvedAlerts.length === 0 ? (
                <div className="p-8 text-center text-muted-foreground">
                  <Clock className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No resolved alerts</p>
                  <p className="text-sm">Resolved alerts will appear here</p>
                </div>
              ) : (
                resolvedAlerts.map((alert) => (
                  <AlertCard key={alert.id} alert={alert} showActions={false} />
                ))
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="summary" className="mt-4">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-lg bg-danger-light border border-danger/20">
                  <div className="flex items-center space-x-2 mb-2">
                    <AlertTriangle className="w-5 h-5 text-danger" />
                    <span className="font-semibold text-danger">High Priority</span>
                  </div>
                  <div className="text-2xl font-bold text-danger">
                    {activeAlerts.filter(a => a.severity === 'high').length}
                  </div>
                  <p className="text-sm text-danger/80">Require immediate attention</p>
                </div>
                
                <div className="p-4 rounded-lg bg-warning-light border border-warning/20">
                  <div className="flex items-center space-x-2 mb-2">
                    <Clock className="w-5 h-5 text-warning" />
                    <span className="font-semibold text-warning">Medium Priority</span>
                  </div>
                  <div className="text-2xl font-bold text-warning">
                    {activeAlerts.filter(a => a.severity === 'medium').length}
                  </div>
                  <p className="text-sm text-warning/80">Schedule follow-up</p>
                </div>
                
                <div className="p-4 rounded-lg bg-success-light border border-success/20">
                  <div className="flex items-center space-x-2 mb-2">
                    <CheckCircle className="w-5 h-5 text-success" />
                    <span className="font-semibold text-success">Resolved</span>
                  </div>
                  <div className="text-2xl font-bold text-success">
                    {resolvedAlerts.length}
                  </div>
                  <p className="text-sm text-success/80">Successfully addressed</p>
                </div>
              </div>
              
              {/* Recent Activity */}
              <div className="p-4 rounded-lg border bg-card">
                <h4 className="font-semibold mb-3">Recent Alert Activity</h4>
                <div className="space-y-2">
                  {alerts.slice(0, 5).map((alert) => (
                    <div key={alert.id} className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        {alert.student} - {alert.message}
                      </span>
                      <span className="text-xs text-muted-foreground">{alert.timeAgo}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};