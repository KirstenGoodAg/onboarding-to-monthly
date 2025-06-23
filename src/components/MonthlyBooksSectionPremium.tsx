import GlanceStatsCard from "./GlanceStatsCard";
import RevenueChartCard from "./RevenueChartCard";
import NeedsAttentionCard from "./NeedsAttentionCard";
import InboxCard from "./InboxCard";
import ExpensesCard from "./ExpensesCard";
import { Card, CardTitle } from "@/components/ui/card";
import ShopifyBanner from "./ShopifyBanner";
import { Button } from "@/components/ui/button";

interface MonthlyBooksSectionPremiumProps {
  glanceStats: { label: string; value: string }[];
  dataMap: Record<string, any[]>;
  graphRange: "6m" | "12m" | "2y" | "3y";
  setGraphRange: (val: "6m" | "12m" | "2y" | "3y") => void;
  uncategorizedTransactions: { id: number; name: string; amount: number; date: string }[];
  onReviewClick: () => void;
  recentInboxMessages: { id: number; subject: string; date: string }[];
  onInboxClick: () => void;
  recentExpenses: { id: number; description: string; amount: number; category: string; date: string; bankAccount: string }[];
  expenseCategories: { name: string; value: number; color: string }[];
  expenseTimePeriod: "1m" | "6m" | "12m";
  onExpenseTimePeriodChange: (period: "1m" | "6m" | "12m") => void;
}

const MonthlyBooksSectionPremium = ({
  glanceStats,
  dataMap,
  graphRange,
  setGraphRange,
  uncategorizedTransactions,
  onReviewClick,
  recentInboxMessages,
  onInboxClick,
  recentExpenses,
  expenseCategories,
  expenseTimePeriod,
  onExpenseTimePeriodChange,
}: MonthlyBooksSectionPremiumProps) => {
  const handleMeetWithAdvisor = () => {
    console.log("Navigate to advisor meeting");
    // TODO: Implement advisor meeting functionality
  };

  return (
    <div className="flex flex-col items-center mt-10 w-full">
      <div className="flex justify-between items-center w-full mb-4">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 pl-2">
          Your Monthly Books - Premium
        </h2>
        <Button onClick={handleMeetWithAdvisor} className="mr-2">
          Meet with Advisor
        </Button>
      </div>
      <ShopifyBanner />
      
      {/* Enterprise Selection */}
      <Card className="w-full p-4 mb-6">
        <CardTitle className="text-lg mb-3 text-gray-700">Enterprise View</CardTitle>
        <div className="flex gap-4 items-center">
          <label className="text-sm text-gray-600">View data for:</label>
          <select className="border rounded px-3 py-2 text-sm bg-white">
            <option value="overall">Overall Business</option>
            <option value="crop-production">Crop Production</option>
            <option value="livestock">Livestock</option>
            <option value="equipment-rental">Equipment Rental</option>
          </select>
        </div>
      </Card>
      
      <div className="w-full flex flex-col gap-6">
        {/* Top Row: Numbers & Graph with Sidebar Cards */}
        <div className="w-full flex flex-col lg:flex-row gap-6">
          {/* Left (75%): Numbers & Graph */}
          <div className="w-full lg:w-3/4 flex flex-col gap-6">
            <GlanceStatsCard glanceStats={glanceStats} />
            <RevenueChartCard dataMap={dataMap} graphRange={graphRange} setGraphRange={setGraphRange} />
          </div>
          {/* Right (25%): Needs Attention and Inbox Cards */}
          <div className="w-full lg:w-1/4 flex flex-col gap-6">
            <NeedsAttentionCard uncategorizedTransactions={uncategorizedTransactions} onReviewClick={onReviewClick} />
            <InboxCard recentInboxMessages={recentInboxMessages} onInboxClick={onInboxClick} />
          </div>
        </div>
        
        {/* Bottom Row: Full Width Expenses Card */}
        <ExpensesCard
          recentExpenses={recentExpenses}
          expenseCategories={expenseCategories}
          timePeriod={expenseTimePeriod}
          onTimePeriodChange={onExpenseTimePeriodChange}
        />
      </div>
    </div>
  );
};

export default MonthlyBooksSectionPremium;
