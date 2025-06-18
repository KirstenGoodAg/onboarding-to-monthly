
import { Card, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, TrendingUp, DollarSign } from "lucide-react";

interface MonthlyBooksSectionBasicsProps {
  onCashflowClick: () => void;
  onBalanceSheetClick: () => void;
  onProfitLossClick: () => void;
}

const MonthlyBooksSectionBasics = ({
  onCashflowClick,
  onBalanceSheetClick,
  onProfitLossClick,
}: MonthlyBooksSectionBasicsProps) => (
  <div className="flex flex-col items-center mt-10 w-full">
    <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 text-left w-full pl-2">
      Your Monthly Books - Basics
    </h2>
    <div className="w-full flex flex-col gap-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer" onClick={onCashflowClick}>
          <div className="flex flex-col items-center text-center space-y-3">
            <TrendingUp className="h-12 w-12 text-primary" />
            <CardTitle className="text-lg text-gray-700">Cashflow Statement</CardTitle>
            <p className="text-sm text-gray-500">View your cash inflows and outflows</p>
            <Button variant="outline" className="w-full">View Report</Button>
          </div>
        </Card>
        
        <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer" onClick={onBalanceSheetClick}>
          <div className="flex flex-col items-center text-center space-y-3">
            <FileText className="h-12 w-12 text-primary" />
            <CardTitle className="text-lg text-gray-700">Balance Sheet</CardTitle>
            <p className="text-sm text-gray-500">Review your assets, liabilities, and equity</p>
            <Button variant="outline" className="w-full">View Report</Button>
          </div>
        </Card>
        
        <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer" onClick={onProfitLossClick}>
          <div className="flex flex-col items-center text-center space-y-3">
            <DollarSign className="h-12 w-12 text-primary" />
            <CardTitle className="text-lg text-gray-700">Profit & Loss Statement</CardTitle>
            <p className="text-sm text-gray-500">Analyze your revenues and expenses</p>
            <Button variant="outline" className="w-full">View Report</Button>
          </div>
        </Card>
      </div>
    </div>
  </div>
);

export default MonthlyBooksSectionBasics;
