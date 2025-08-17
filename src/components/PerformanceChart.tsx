import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { TrendingUp } from "lucide-react";

const performanceData = [
  { month: "Jan", performance: 78, engagement: 82 },
  { month: "Feb", performance: 82, engagement: 85 },
  { month: "Mar", performance: 79, engagement: 88 },
  { month: "Apr", performance: 85, engagement: 84 },
  { month: "May", performance: 88, engagement: 90 },
  { month: "Jun", performance: 84, engagement: 87 }
];

const riskDistribution = [
  { category: "Low Risk", count: 892, color: "hsl(var(--success))" },
  { category: "Medium Risk", count: 308, color: "hsl(var(--warning))" },
  { category: "High Risk", count: 47, color: "hsl(var(--danger))" }
];

export const PerformanceChart = () => {
  return (
    <div className="space-y-6">
      {/* Performance Trends */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-success" />
            <span className="text-base">Performance Trends</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis 
                dataKey="month" 
                className="text-xs"
                tick={{ fontSize: 12 }}
              />
              <YAxis 
                className="text-xs"
                tick={{ fontSize: 12 }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "hsl(var(--card))", 
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "6px",
                  fontSize: "12px"
                }}
              />
              <Line 
                type="monotone" 
                dataKey="performance" 
                stroke="hsl(var(--primary))" 
                strokeWidth={2}
                dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
                name="Performance"
              />
              <Line 
                type="monotone" 
                dataKey="engagement" 
                stroke="hsl(var(--success))" 
                strokeWidth={2}
                dot={{ fill: "hsl(var(--success))", strokeWidth: 2, r: 4 }}
                name="Engagement"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Risk Distribution */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="text-base">Risk Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={riskDistribution} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis 
                type="number"
                className="text-xs"
                tick={{ fontSize: 12 }}
              />
              <YAxis 
                type="category"
                dataKey="category"
                className="text-xs"
                tick={{ fontSize: 12 }}
                width={80}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "hsl(var(--card))", 
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "6px",
                  fontSize: "12px"
                }}
              />
              <Bar 
                dataKey="count" 
                fill="hsl(var(--primary))"
                radius={[0, 4, 4, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};