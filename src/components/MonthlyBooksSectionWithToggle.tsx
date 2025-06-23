
import { useState } from "react";
import { Card } from "@/components/ui/card";
import MonthlyBooksSectionBasics from "./MonthlyBooksSectionBasics";
import MonthlyBooksSectionEssentials from "./MonthlyBooksSectionEssentials";
import MonthlyBooksSectionPremium from "./MonthlyBooksSectionPremium";

interface MonthlyBooksSectionWithToggleProps {
  glanceStats: { label: string; value: string }[];
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
}

type ViewType = "basics" | "essentials" | "premium";

const MonthlyBooksSectionWithToggle = (props: MonthlyBooksSectionWithToggleProps) => {
  const [currentView, setCurrentView] = useState<ViewType>("essentials");

  const handleFinancialStatementClick = (type: string) => {
    console.log(`Navigate to ${type}`);
    // TODO: Implement navigation to financial statements
  };

  return (
    <div className="flex flex-col w-full">
      {/* Toggle Controls */}
      <Card className="w-full p-4 mb-6">
        <div className="flex gap-2 justify-center">
          <button
            onClick={() => setCurrentView("basics")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              currentView === "basics" 
                ? "bg-primary text-primary-foreground" 
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Basics
          </button>
          <button
            onClick={() => setCurrentView("essentials")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              currentView === "essentials" 
                ? "bg-primary text-primary-foreground" 
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Essentials
          </button>
          <button
            onClick={() => setCurrentView("premium")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              currentView === "premium" 
                ? "bg-primary text-primary-foreground" 
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Premium
          </button>
        </div>
      </Card>

      {/* Render Current View */}
      {currentView === "basics" && (
        <MonthlyBooksSectionBasics
          onCashflowClick={() => handleFinancialStatementClick("cashflow")}
          onBalanceSheetClick={() => handleFinancialStatementClick("balance-sheet")}
          onProfitLossClick={() => handleFinancialStatementClick("profit-loss")}
          uncategorizedTransactions={props.uncategorizedTransactions}
          onReviewClick={props.onReviewClick}
          recentInboxMessages={props.recentInboxMessages}
          onInboxClick={props.onInboxClick}
        />
      )}
      
      {currentView === "essentials" && (
        <MonthlyBooksSectionEssentials 
          {...props}
        />
      )}
      
      {currentView === "premium" && (
        <MonthlyBooksSectionPremium 
          {...props}
        />
      )}
    </div>
  );
};

export default MonthlyBooksSectionWithToggle;
