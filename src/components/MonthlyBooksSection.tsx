
import GlanceStatsCard from "./GlanceStatsCard";
import RevenueChartCard from "./RevenueChartCard";
import NeedsAttentionCard from "./NeedsAttentionCard";
import InboxCard from "./InboxCard";
import ExpensesCard from "./ExpensesCard";

interface MonthlyBooksSectionProps {
  glanceStats: { label: string; value: string }[];
  dataMap: Record<string, any[]>;
  graphRange: "6m" | "12m" | "2y" | "3y";
  setGraphRange: (val: "6m" | "12m" | "2y" | "3y") => void;
  uncategorizedTransactions: { id: number; name: string; amount: number; date: string }[];
  onReviewClick: () => void;
  recentInboxMessages: { id: number; subject: string; date: string }[];
  onInboxClick: () => void;
  recentExpenses: { id: number; description: string; amount: number; category: string; date: string }[];
  expenseCategories: { name: string; value: number; color: string }[];
  expenseTimePeriod: "1m" | "6m" | "12m";
  onExpenseTimePeriodChange: (period: "1m" | "6m" | "12m") => void;
}

const MonthlyBooksSection = ({
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
}: MonthlyBooksSectionProps) => (
  <div className="flex flex-col items-center mt-10 w-full">
    <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 text-left w-full pl-2">
      Your Monthly Books
    </h2>
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

export default MonthlyBooksSection;
