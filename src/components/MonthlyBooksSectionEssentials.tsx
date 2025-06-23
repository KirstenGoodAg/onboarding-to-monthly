
import GlanceStatsCard from "./GlanceStatsCard";
import RevenueChartCard from "./RevenueChartCard";
import NeedsAttentionCard from "./NeedsAttentionCard";
import InboxCard from "./InboxCard";
import FarmEquityCard from "./FarmEquityCard";
import ExpensesCard from "./ExpensesCard";
import ShopifyBanner from "./ShopifyBanner";
import { Button } from "@/components/ui/button";

interface MonthlyBooksSectionEssentialsProps {
  glanceStats: { label: string; value: string; explanation: string }[];
  glanceTimePeriod: string;
  onGlanceTimePeriodChange: (period: string) => void;
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
  farmEquity: { equityValue: number; changePercentage: number; changeDirection: "up" | "down" };
}

const MonthlyBooksSectionEssentials = ({
  glanceStats,
  glanceTimePeriod,
  onGlanceTimePeriodChange,
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
  farmEquity,
}: MonthlyBooksSectionEssentialsProps) => {
  const handleMeetWithAdvisor = () => {
    console.log("Navigate to advisor meeting");
    // TODO: Implement advisor meeting functionality
  };

  return (
    <div className="flex flex-col items-center mt-10 w-full">
      <div className="flex justify-between items-center w-full mb-4">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 pl-2">
          Your Monthly Books - Essentials
        </h2>
        <Button onClick={handleMeetWithAdvisor} className="mr-2">
          Meet with Advisor
        </Button>
      </div>
      <ShopifyBanner />
      <div className="w-full flex flex-col gap-6">
        {/* Top Row: Numbers & Graph with Sidebar Cards */}
        <div className="w-full flex flex-col lg:flex-row gap-6">
          {/* Left (75%): Numbers & Graph */}
          <div className="w-full lg:w-3/4 flex flex-col gap-6">
            <GlanceStatsCard 
              glanceStats={glanceStats} 
              timePeriod={glanceTimePeriod}
              onTimePeriodChange={onGlanceTimePeriodChange}
            />
            <RevenueChartCard dataMap={dataMap} graphRange={graphRange} setGraphRange={setGraphRange} />
          </div>
          {/* Right (25%): Needs Attention, Inbox, and Farm Equity Cards */}
          <div className="w-full lg:w-1/4 flex flex-col gap-6">
            <NeedsAttentionCard uncategorizedTransactions={uncategorizedTransactions} onReviewClick={onReviewClick} />
            <InboxCard recentInboxMessages={recentInboxMessages} onInboxClick={onInboxClick} />
            <FarmEquityCard 
              equityValue={farmEquity.equityValue}
              changePercentage={farmEquity.changePercentage}
              changeDirection={farmEquity.changeDirection}
            />
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

export default MonthlyBooksSectionEssentials;
