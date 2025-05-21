
import DashboardHeader from "../components/DashboardHeader";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

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

const Dashboard = () => {
  const [checked, setChecked] = useState([false, false, false, false, false]);
  const [graphRange, setGraphRange] = useState<"6m" | "12m" | "2y" | "3y">("6m");
  const navigate = useNavigate();

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

  // Section width for books section
  const booksSectionWidth = "w-full sm:w-3/4";

  return (
    <div className="flex flex-col flex-1 min-h-screen bg-transparent">
      <DashboardHeader onboardingCheckedCount={totalChecked} />
      <div className="flex flex-1 w-full justify-center items-start">
        <div className="grid grid-cols-1 w-full max-w-4xl px-2 py-8 gap-6">
          {/* Onboarding Header */}
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2 pl-2">
            Onboarding
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {onboardingCards.slice(0, 4).map((card, idx) => (
              <Card
                key={card.label}
                className="flex flex-col justify-between h-48 cursor-pointer transition-transform hover:scale-105 hover:shadow-xl bg-white/90 relative"
                onClick={() => handleCardClick(card.link)}
                tabIndex={0}
                role="button"
                aria-label={card.label}
                onKeyDown={e => { if (e.key === "Enter" || e.key === " ") handleCardClick(card.link); }}
              >
                <CardContent className="flex flex-col justify-between h-full pt-6 pb-2">
                  <div>
                    <CardTitle className="text-lg mb-2">{card.label}</CardTitle>
                  </div>
                  <div className="flex items-center justify-end">
                    <span
                      className="mr-2 text-sm text-gray-500"
                      onClick={e => e.stopPropagation()}
                    >
                      Mark complete
                    </span>
                    <Checkbox
                      checked={checked[idx]}
                      onCheckedChange={checkedVal => {
                        // Prevent card link navigation on checkbox click
                        handleCheckboxChange(idx, Boolean(checkedVal));
                      }}
                      onClick={e => e.stopPropagation()}
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="flex justify-center">
            {onboardingCards.length > 4 && (
              <Card
                key={onboardingCards[4].label}
                className="flex flex-col justify-between h-48 w-full max-w-md cursor-pointer transition-transform hover:scale-105 hover:shadow-xl bg-white/90 relative"
                onClick={() => handleCardClick(onboardingCards[4].link)}
                tabIndex={0}
                role="button"
                aria-label={onboardingCards[4].label}
                onKeyDown={e => { if (e.key === "Enter" || e.key === " ") handleCardClick(onboardingCards[4].link); }}
              >
                <CardContent className="flex flex-col justify-between h-full pt-6 pb-2">
                  <div>
                    <CardTitle className="text-lg mb-2">{onboardingCards[4].label}</CardTitle>
                  </div>
                  <div className="flex items-center justify-end">
                    <span
                      className="mr-2 text-sm text-gray-500"
                      onClick={e => e.stopPropagation()}
                    >
                      Mark complete
                    </span>
                    <Checkbox
                      checked={checked[4]}
                      onCheckedChange={checkedVal => {
                        handleCheckboxChange(4, Boolean(checkedVal));
                      }}
                      onClick={e => e.stopPropagation()}
                    />
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* "Your Monthly Books" section */}
          {onboardingComplete && (
            <div className="flex flex-col items-center mt-10">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 text-left w-full pl-2">
                Your Monthly Books
              </h2>
              <div className={`${booksSectionWidth} flex flex-col gap-6`}>
                {/* Card 1: Numbers at a Glance */}
                <Card className="w-full flex flex-col p-4">
                  <CardTitle className="text-lg mb-3 text-gray-700">Your Numbers at a Glance</CardTitle>
                  <div className="flex flex-col sm:flex-row gap-4">
                    {glanceStats.map((stat) => (
                      <div key={stat.label} className="flex-1 flex flex-col justify-center items-start bg-gray-50 px-4 py-3 rounded-lg shadow border mt-1">
                        <span className="text-sm text-gray-500">{stat.label}</span>
                        <span className="text-2xl font-semibold text-primary">{stat.value}</span>
                      </div>
                    ))}
                  </div>
                </Card>
                {/* Card 2: Revenue Growth Graph */}
                <Card className="w-full flex flex-col p-4">
                  <div className="flex justify-between items-center mb-3">
                    <CardTitle className="text-lg text-gray-700">Revenue Growth</CardTitle>
                    <select
                      className="border rounded px-2 py-1 text-sm bg-white"
                      value={graphRange}
                      onChange={e => setGraphRange(e.target.value as "6m" | "12m" | "2y" | "3y")}
                    >
                      <option value="6m">Past 6 months</option>
                      <option value="12m">Past 12 months</option>
                      <option value="2y">Past 2 years</option>
                      <option value="3y">Past 3 years</option>
                    </select>
                  </div>
                  <div className="w-full h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={dataMap[graphRange]}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" tick={{fontSize: 13}} />
                        <YAxis tick={{fontSize: 13}} />
                        <Tooltip />
                        <Line type="monotone" dataKey="revenue" stroke="#7E69AB" strokeWidth={3} dot={{r: 4}} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </Card>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

