
import { Card, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, TrendingUp, DollarSign } from "lucide-react";
import NeedsAttentionCard from "./NeedsAttentionCard";
import InboxCard from "./InboxCard";

interface MonthlyBooksSectionBasicsProps {
  onCashflowClick: () => void;
  onBalanceSheetClick: () => void;
  onProfitLossClick: () => void;
  uncategorizedTransactions: { id: number; name: string; amount: number; date: string }[];
  onReviewClick: () => void;
  recentInboxMessages: { id: number; subject: string; date: string }[];
  onInboxClick: () => void;
}

const MonthlyBooksSectionBasics = ({
  onCashflowClick,
  onBalanceSheetClick,
  onProfitLossClick,
  uncategorizedTransactions,
  onReviewClick,
  recentInboxMessages,
  onInboxClick,
}: MonthlyBooksSectionBasicsProps) => (
  <div className="flex flex-col items-center mt-10 w-full">
    <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 text-left w-full pl-2">
      Your Monthly Books - Basics
    </h2>
    <div className="w-full flex flex-col gap-6">
      {/* Top Row: Financial Statement Cards with Sidebar Cards */}
      <div className="w-full flex flex-col lg:flex-row gap-6">
        {/* Left (75%): Financial Statement Cards */}
        <div className="w-full lg:w-3/4">
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
        
        {/* Right (25%): Needs Attention and Inbox Cards */}
        <div className="w-full lg:w-1/4 flex flex-col gap-6">
          <NeedsAttentionCard uncategorizedTransactions={uncategorizedTransactions} onReviewClick={onReviewClick} />
          <InboxCard recentInboxMessages={recentInboxMessages} onInboxClick={onInboxClick} />
        </div>
      </div>
    </div>
  </div>
);

export default MonthlyBooksSectionBasics;
