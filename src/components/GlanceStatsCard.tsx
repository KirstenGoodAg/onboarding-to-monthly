
import { Card, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface GlanceStatsCardProps {
  glanceStats: { label: string; value: string }[];
  timePeriod: string;
  onTimePeriodChange: (period: string) => void;
}

const GlanceStatsCard = ({ glanceStats, timePeriod, onTimePeriodChange }: GlanceStatsCardProps) => (
  <Card className="w-full flex flex-col p-4">
    <div className="flex justify-between items-center mb-3">
      <CardTitle className="text-lg text-gray-700">
        Your Numbers at a Glance
      </CardTitle>
      <Select value={timePeriod} onValueChange={onTimePeriodChange}>
        <SelectTrigger className="w-48">
          <SelectValue placeholder="Select time period" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="current-month">Current Month</SelectItem>
          <SelectItem value="last-month">Last Month</SelectItem>
          <SelectItem value="last-quarter">Last Quarter</SelectItem>
          <SelectItem value="year-to-date">Year to Date</SelectItem>
          <SelectItem value="previous-year">Previous Year</SelectItem>
          <SelectItem value="two-years-ago">Two Years Ago</SelectItem>
        </SelectContent>
      </Select>
    </div>
    <div className="flex flex-col sm:flex-row gap-4">
      {glanceStats.map((stat) => (
        <div
          key={stat.label}
          className="flex-1 flex flex-col justify-center items-start bg-gray-50 px-4 py-3 rounded-lg shadow border mt-1"
        >
          <span className="text-sm text-gray-500">{stat.label}</span>
          <span className="text-2xl font-semibold text-primary">
            {stat.value}
          </span>
        </div>
      ))}
    </div>
  </Card>
);

export default GlanceStatsCard;
