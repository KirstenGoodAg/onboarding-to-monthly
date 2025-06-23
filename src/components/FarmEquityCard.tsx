
import { Card, CardTitle } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";

interface FarmEquityCardProps {
  equityValue: number;
  changePercentage: number;
  changeDirection: "up" | "down";
}

const FarmEquityCard = ({
  equityValue,
  changePercentage,
  changeDirection,
}: FarmEquityCardProps) => {
  return (
    <Card className="flex flex-col p-4 min-h-[200px]">
      <CardTitle className="text-lg mb-3 flex items-center text-primary">
        Farm Equity
      </CardTitle>
      <div className="flex flex-col items-center justify-center flex-1">
        <div className="text-3xl font-bold text-gray-800 mb-2">
          ${equityValue.toLocaleString()}
        </div>
        <div className={`flex items-center gap-1 text-sm ${
          changeDirection === "up" ? "text-green-600" : "text-red-600"
        }`}>
          <TrendingUp className={`h-4 w-4 ${
            changeDirection === "down" ? "rotate-180" : ""
          }`} />
          {changePercentage}% from last month
        </div>
      </div>
      <div className="mt-4 text-xs text-gray-500 text-center">
        Total assets minus total liabilities
      </div>
    </Card>
  );
};

export default FarmEquityCard;
