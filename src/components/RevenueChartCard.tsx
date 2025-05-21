
import { Card, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface RevenueChartCardProps {
  dataMap: Record<string, any[]>;
  graphRange: "6m" | "12m" | "2y" | "3y";
  setGraphRange: (val: "6m" | "12m" | "2y" | "3y") => void;
}

const RevenueChartCard = ({ dataMap, graphRange, setGraphRange }: RevenueChartCardProps) => (
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
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#7E69AB"
            strokeWidth={3}
            dot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  </Card>
);

export default RevenueChartCard;
