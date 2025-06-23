
import { useState } from "react";
import { Card, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface RevenueChartCardProps {
  dataMap: Record<string, any[]>;
  graphRange: "6m" | "12m" | "2y" | "3y";
  setGraphRange: (val: "6m" | "12m" | "2y" | "3y") => void;
}

const RevenueChartCard = ({ dataMap, graphRange, setGraphRange }: RevenueChartCardProps) => {
  const [visibleMetrics, setVisibleMetrics] = useState({
    revenue: true,
    cogs: false,
    grossProfit: false,
    totalExpenses: false,
    operatingProfit: false,
    netProfit: false,
  });

  const handleMetricToggle = (metric: keyof typeof visibleMetrics) => {
    setVisibleMetrics(prev => ({
      ...prev,
      [metric]: !prev[metric]
    }));
  };

  const metrics = [
    { key: 'revenue', label: 'Revenue', color: '#7E69AB' },
    { key: 'cogs', label: 'Total COGS', color: '#FF6B6B' },
    { key: 'grossProfit', label: 'Gross Profit', color: '#4ECDC4' },
    { key: 'totalExpenses', label: 'Total Expenses', color: '#45B7D1' },
    { key: 'operatingProfit', label: 'Operating Profit', color: '#96CEB4' },
    { key: 'netProfit', label: 'Net Profit', color: '#FECA57' },
  ];

  return (
    <Card className="w-full flex flex-col p-4">
      <div className="flex justify-between items-center mb-3">
        <CardTitle className="text-lg text-gray-700">Revenue Growth</CardTitle>
        <select
          className="border rounded px-2 py-1 text-sm bg-white"
          value={graphRange}
          onChange={e =>
            setGraphRange(
              e.target.value as "6m" | "12m" | "2y" | "3y"
            )
          }
        >
          <option value="6m">Past 6 months</option>
          <option value="12m">Past 12 months</option>
          <option value="2y">Past 2 years</option>
          <option value="3y">Past 3 years</option>
        </select>
      </div>
      
      <div className="w-full h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={dataMap[graphRange]}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" tick={{ fontSize: 13 }} />
            <YAxis tick={{ fontSize: 13 }} />
            <Tooltip />
            {metrics.map(metric => (
              visibleMetrics[metric.key as keyof typeof visibleMetrics] && (
                <Line
                  key={metric.key}
                  type="monotone"
                  dataKey={metric.key}
                  stroke={metric.color}
                  strokeWidth={3}
                  dot={{ r: 4 }}
                />
              )
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Checkboxes for toggling metrics */}
      <div className="mt-4 pt-4 border-t">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {metrics.map(metric => (
            <div key={metric.key} className="flex items-center space-x-2">
              <Checkbox
                id={metric.key}
                checked={visibleMetrics[metric.key as keyof typeof visibleMetrics]}
                onCheckedChange={() => handleMetricToggle(metric.key as keyof typeof visibleMetrics)}
              />
              <label
                htmlFor={metric.key}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                style={{ color: metric.color }}
              >
                {metric.label}
              </label>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default RevenueChartCard;
