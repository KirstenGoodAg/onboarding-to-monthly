
import DashboardHeader from "../components/DashboardHeader";
import { useNavigate } from "react-router-dom";
import OnboardingSection from "../components/OnboardingSection";
import MonthlyBooksSectionWithToggle from "../components/MonthlyBooksSectionWithToggle";
import TransactionCategorization from "../components/TransactionCategorization";
import { useDashboardState } from "../hooks/useDashboardState";
import { 
  onboardingCards,
} from "../data/onboardingData";
import {
  dataMap,
  glanceStatsData,
  uncategorizedTransactions,
  recentInboxMessages,
  recentExpenses,
  expenseCategoriesData,
  farmEquityData,
} from "../data/dashboardData";

const Dashboard = () => {
  const navigate = useNavigate();
  const {
    checked,
    graphRange,
    setGraphRange,
    expenseTimePeriod,
    setExpenseTimePeriod,
    glanceTimePeriod,
    setGlanceTimePeriod,
    handleCheckboxChange,
    handleResetOnboarding,
    totalChecked,
    onboardingComplete,
    showTransactionCategorization,
  } = useDashboardState();

  const handleCardClick = (link: string) => {
    navigate(link);
  };

  // Get current glance stats based on selected time period
  const currentGlanceStats = glanceStatsData[glanceTimePeriod as keyof typeof glanceStatsData];

  return (
    <div className="flex flex-col flex-1 min-h-screen bg-transparent">
      <DashboardHeader 
        onboardingCheckedCount={totalChecked} 
        onResetOnboarding={handleResetOnboarding}
      />
      <div className="flex flex-1 w-full justify-center items-start">
        <div className="grid grid-cols-1 w-full max-w-4xl px-2 py-8 gap-6">
          <OnboardingSection
            cards={onboardingCards}
            checked={checked}
            onCheckboxChange={handleCheckboxChange}
            onCardClick={handleCardClick}
          />
          
          {/* Transaction Categorization Section - show when first 4 boxes checked but not all 5 */}
          {showTransactionCategorization && (
            <TransactionCategorization />
          )}
          
          {/* Monthly Books Section - show only when all onboarding complete */}
          {onboardingComplete && (
            <MonthlyBooksSectionWithToggle
              glanceStats={currentGlanceStats}
              glanceTimePeriod={glanceTimePeriod}
              onGlanceTimePeriodChange={setGlanceTimePeriod}
              dataMap={dataMap}
              graphRange={graphRange}
              setGraphRange={setGraphRange}
              uncategorizedTransactions={uncategorizedTransactions}
              onReviewClick={() => navigate('/transactions')}
              recentInboxMessages={recentInboxMessages}
              onInboxClick={() => navigate('/inbox')}
              recentExpenses={recentExpenses}
              expenseCategories={expenseCategoriesData[expenseTimePeriod]}
              expenseTimePeriod={expenseTimePeriod}
              onExpenseTimePeriodChange={setExpenseTimePeriod}
              farmEquity={farmEquityData}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
