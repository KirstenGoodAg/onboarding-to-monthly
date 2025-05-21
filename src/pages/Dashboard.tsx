import React from "react";
import DashboardHeader from "../components/DashboardHeader";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import OnboardingSection from "../components/OnboardingSection";
import MonthlyBooksSection from "../components/MonthlyBooksSection";
import { MonthlyBooksProvider, useMonthlyBooksContext } from "../context/MonthlyBooksContext";

// Step data for onboarding
const onboardingCards = [
  {
    label: "Fill out your profile",
    link: "/profile",
  },
  {
    label: "Connect your bank feeds",
    link: "/profile", // Can change to dedicated bank page if exists in future
  },
  {
    label: "Upload your documents",
    link: "/upload",
  },
  {
    label: "Schedule your onboarding call",
    link: "/profile", // Set to calendar page if exists in future
  },
  {
    label: "Answer Advisor questions",
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

const DashboardContent = () => {
  const [checked, setChecked] = useState([false, false, false, false, false]);
  const [graphRange, setGraphRange] = useState<"6m" | "12m" | "2y" | "3y">("6m");
  const navigate = useNavigate();
  const { setMonthlyBooksVisible } = useMonthlyBooksContext();

  const handleCardClick = (link: string) => {
    navigate(link);
  };

  const handleCheckboxChange = (idx: number, checkedVal: boolean) => {
    setChecked((prev) => prev.map((val, i) => (i === idx ? checkedVal : val)));
  };

  // Count total checked cards
  const totalChecked = checked.filter(Boolean).length;
  // All onboarding complete?
  const onboardingComplete = totalChecked === onboardingCards.length;

  // Let context know when Monthly Books should be shown
  React.useEffect(() => {
    setMonthlyBooksVisible(onboardingComplete);
  }, [onboardingComplete, setMonthlyBooksVisible]);

  return (
    <div className="flex flex-col flex-1 min-h-screen bg-transparent">
      <DashboardHeader onboardingCheckedCount={totalChecked} />
      <div className="flex flex-1 w-full justify-center items-start">
        <div className="grid grid-cols-1 w-full max-w-4xl px-2 py-8 gap-6">
          <OnboardingSection
            cards={onboardingCards}
            checked={checked}
            onCheckboxChange={handleCheckboxChange}
            onCardClick={handleCardClick}
          />
          {onboardingComplete && (
            <MonthlyBooksSection
              glanceStats={glanceStats}
              dataMap={dataMap}
              graphRange={graphRange}
              setGraphRange={setGraphRange}
              uncategorizedTransactions={uncategorizedTransactions}
              onReviewClick={() => navigate('/transaction-review')}
              recentInboxMessages={recentInboxMessages}
              onInboxClick={() => navigate('/inbox')}
            />
          )}
        </div>
      </div>
    </div>
  );
};

const Dashboard = () => (
  <MonthlyBooksProvider>
    <DashboardContent />
  </MonthlyBooksProvider>
);

export default Dashboard;
