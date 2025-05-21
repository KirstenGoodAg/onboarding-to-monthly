
import DashboardHeader from "../components/DashboardHeader";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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

const Dashboard = () => {
  const [checked, setChecked] = useState([false, false, false, false, false]);
  const navigate = useNavigate();

  const handleCardClick = (link: string) => {
    navigate(link);
  };

  const handleCheckboxChange = (idx: number, checkedVal: boolean) => {
    setChecked(prev => prev.map((val, i) => (i === idx ? checkedVal : val)));
  };

  // Count total checked cards
  const totalChecked = checked.filter(Boolean).length;

  return (
    <div className="flex flex-col flex-1 min-h-screen bg-transparent">
      <DashboardHeader onboardingCheckedCount={totalChecked} />
      <div className="flex flex-1 w-full justify-center items-start">
        <div className="grid grid-cols-1 w-full max-w-4xl px-2 py-8 gap-6">
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
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

