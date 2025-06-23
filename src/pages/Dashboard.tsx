
import DashboardHeader from "../components/DashboardHeader";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import OnboardingSection from "../components/OnboardingSection";
import MonthlyBooksSectionWithToggle from "../components/MonthlyBooksSectionWithToggle";
import TransactionCategorization from "../components/TransactionCategorization";

// Step data for onboarding
const onboardingCards = [
  {
    label: "Fill out your profile",
    description: "Tell us about what you grow and how you'd like to track your money",
    link: "/profile",
  },
  {
    label: "Connect your bank feeds",
    description: "Log into QuickBooks or Xero and connect your bank feeds so we can automatically import transactions",
    link: "/profile", // Can change to dedicated bank page if exists in future
  },
  {
    label: "Upload your documents",
    description: "Upload your tax returns, loan schedules, equipment lists and most recent bank statements",
    link: "/upload",
  },
  {
    label: "Schedule your onboarding call",
    description: "Book with your dedicated accountant to set up your account",
    link: "/profile", // Set to calendar page if exists in future
  },
  {
    label: "Answer Advisor questions",
    description: "Respond to questions from your dedicated accountant to make sure we're meeting your needs",
    link: "/inbox",
  },
];

// Example financial data
const dataMap = {
  "6m": [
    { month: "Jan", revenue: 15500 },
    { month: "Feb", revenue: 14800 },
    { month: "Mar", revenue: 17000 },
    { month: "Apr", revenue: 16200 },
    { month: "May", revenue: 17500 },
    { month: "Jun", revenue: 18700 },
  ],
  "12m": [
    { month: "Jul", revenue: 14000 },
    { month: "Aug", revenue: 13100 },
    { month: "Sep", revenue: 15000 },
    { month: "Oct", revenue: 15500 },
    { month: "Nov", revenue: 16000 },
    { month: "Dec", revenue: 14200 },
    { month: "Jan", revenue: 15500 },
    { month: "Feb", revenue: 14800 },
    { month: "Mar", revenue: 17000 },
    { month: "Apr", revenue: 16200 },
    { month: "May", revenue: 17500 },
    { month: "Jun", revenue: 18700 },
  ],
  "2y": [
    // 24 months data (simplified for brevity)
    ...Array.from({ length: 24 }).map((_, idx) => ({
      month: `M${idx + 1}`,
      revenue: 12000 + idx * 400 + ((idx % 3) * 500),
    })),
  ],
  "3y": [
    // 36 months data (simplified for brevity)
    ...Array.from({ length: 36 }).map((_, idx) => ({
      month: `M${idx + 1}`,
      revenue: 10000 + idx * 400 + ((idx % 4) * 700),
    })),
  ],
};

const glanceStats = [
  { label: "Top-line Revenue", value: "$18,700" },
  { label: "Net Profits", value: "$2,100" },
  { label: "Cash on Hand", value: "$6,500" },
];

// Placeholder: uncategorized transactions
const uncategorizedTransactions = [
  { id: 1, name: "John Deere Repair", amount: -530.12, date: "2025-05-20" },
  { id: 2, name: "Fertilizer Purchase", amount: -276.79, date: "2025-05-19" },
  { id: 3, name: "Tractor Fuel", amount: -116.42, date: "2025-05-17" },
];

// Placeholder: recent inbox messages
const recentInboxMessages = [
  { id: 1, subject: "Advisor Question: Crop Rotation", date: "2025-05-20" },
  { id: 2, subject: "Document Reminder: Tax Form", date: "2025-05-19" },
  { id: 3, subject: "Welcome to Good Agriculture!", date: "2025-05-18" },
];

// Sample expense data
const recentExpenses = [
  { id: 1, description: "Fertilizer Purchase", amount: 276.79, category: "Supplies", date: "2025-05-28" },
  { id: 2, description: "Tractor Fuel", amount: 116.42, category: "Fuel", date: "2025-05-27" },
  { id: 3, description: "Seed Purchase", amount: 445.23, category: "Supplies", date: "2025-05-26" },
  { id: 4, description: "Equipment Repair", amount: 530.12, category: "Maintenance", date: "2025-05-25" },
  { id: 5, description: "Irrigation Equipment", amount: 892.45, category: "Equipment", date: "2025-05-24" },
  { id: 6, description: "Pesticide Application", amount: 234.67, category: "Supplies", date: "2025-05-23" },
  { id: 7, description: "Labor Costs", amount: 1200.00, category: "Labor", date: "2025-05-22" },
  { id: 8, description: "Insurance Payment", amount: 345.88, category: "Insurance", date: "2025-05-21" },
  { id: 9, description: "Vehicle Maintenance", amount: 189.33, category: "Maintenance", date: "2025-05-20" },
  { id: 10, description: "Office Supplies", amount: 67.45, category: "Office", date: "2025-05-19" },
];

const expenseCategoriesData = {
  "1m": [
    { name: "Supplies", value: 956.69, color: "#8884d8" },
    { name: "Fuel", value: 116.42, color: "#82ca9d" },
    { name: "Maintenance", value: 719.45, color: "#ffc658" },
    { name: "Equipment", value: 892.45, color: "#ff7300" },
    { name: "Labor", value: 1200.00, color: "#8dd1e1" },
    { name: "Insurance", value: 345.88, color: "#d084d0" },
    { name: "Office", value: 67.45, color: "#ffb347" },
  ],
  "6m": [
    { name: "Supplies", value: 5740.15, color: "#8884d8" },
    { name: "Fuel", value: 698.52, color: "#82ca9d" },
    { name: "Maintenance", value: 4316.70, color: "#ffc658" },
    { name: "Equipment", value: 5354.70, color: "#ff7300" },
    { name: "Labor", value: 7200.00, color: "#8dd1e1" },
    { name: "Insurance", value: 2075.28, color: "#d084d0" },
    { name: "Office", value: 404.70, color: "#ffb347" },
  ],
  "12m": [
    { name: "Supplies", value: 11480.30, color: "#8884d8" },
    { name: "Fuel", value: 1397.04, color: "#82ca9d" },
    { name: "Maintenance", value: 8633.40, color: "#ffc658" },
    { name: "Equipment", value: 10709.40, color: "#ff7300" },
    { name: "Labor", value: 14400.00, color: "#8dd1e1" },
    { name: "Insurance", value: 4150.56, color: "#d084d0" },
    { name: "Office", value: 809.40, color: "#ffb347" },
  ],
};

const Dashboard = () => {
  // Load checkbox states from localStorage or default to all false
  const [checked, setChecked] = useState(() => {
    const saved = localStorage.getItem('onboarding-checked');
    return saved ? JSON.parse(saved) : [false, false, false, false, false];
  });
  
  const [graphRange, setGraphRange] = useState<"6m" | "12m" | "2y" | "3y">("6m");
  const [expenseTimePeriod, setExpenseTimePeriod] = useState<"1m" | "6m" | "12m">("1m");
  const navigate = useNavigate();

  // Save checkbox states to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('onboarding-checked', JSON.stringify(checked));
  }, [checked]);

  const handleCardClick = (link: string) => {
    navigate(link);
  };

  const handleCheckboxChange = (idx: number, checkedVal: boolean) => {
    setChecked((prev) => prev.map((val, i) => (i === idx ? checkedVal : val)));
  };

  const handleResetOnboarding = () => {
    setChecked([false, false, false, false, false]);
  };

  // Count total checked cards
  const totalChecked = checked.filter(Boolean).length;

  // All onboarding complete?
  const onboardingComplete = totalChecked === onboardingCards.length;

  // Check if first 4 boxes are checked but not all 5
  const firstFourChecked = checked.slice(0, 4).every(Boolean);
  const showTransactionCategorization = firstFourChecked && !onboardingComplete;

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
              glanceStats={glanceStats}
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
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
