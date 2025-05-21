
import { Card, CardTitle } from "@/components/ui/card";

interface GlanceStatsCardProps {
  glanceStats: { label: string; value: string }[];
}

const GlanceStatsCard = ({ glanceStats }: GlanceStatsCardProps) => (
  <Card className="w-full flex flex-col p-4">
    <CardTitle className="text-lg mb-3 text-gray-700">
      Your Numbers at a Glance
    </CardTitle>
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
