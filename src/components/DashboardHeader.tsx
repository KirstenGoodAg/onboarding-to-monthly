import { useState } from "react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useNavigate } from "react-router-dom";

const onboardingSteps = [
  {
    label: "Fill out your onboarding form",
    estimate: "2 min",
    link: "/profile",
  },
  {
    label: "Connect your financial feeds",
    estimate: "5 min",
    link: "/profile", // could be a dedicated page if available later
  },
  {
    label: "Upload your previous financial data",
    estimate: "3 min",
    link: "/upload",
  },
  {
    label: "Schedule an appointment with your bookkeeper",
    estimate: "2 min",
    link: "/profile", // could be a calendar later
  },
  {
    label: "Answer questions from your financial manager",
    estimate: "3 min",
    link: "/inbox",
  },
];

// You might want to load progress from state or props later
const currentStep = 0; // set this dynamically as onboarding progresses

export default function DashboardHeader() {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const navigate = useNavigate();
  const vineImg = "https://goodagriculture.com/wp-content/uploads/2025/05/Empty-Vine.png";

  return (
    <header className="flex items-start justify-between w-full pb-4 pt-6 px-2 md:px-8">
      <div>
        <h2 className="text-2xl md:text-3xl font-semibold mb-1">Welcome, Farmer!</h2>
        <p className="text-gray-600 text-base md:text-lg font-light">Let&apos;s grow together.</p>
      </div>
      <div className="flex flex-col items-end ml-auto min-w-[240px]">
        <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
          <PopoverTrigger asChild>
            <button
              className="group flex flex-col items-center focus:outline-none"
              aria-label="Show onboarding steps"
            >
              {/* Vine shaped progress bar */}
              <img
                src={vineImg}
                alt="Vine progress bar"
                className="transition-transform duration-150 group-hover:scale-105 cursor-pointer"
                style={{ width: "200px", height: "100px", objectFit: "contain" }}
              />
              <span className="text-xs text-gray-500 mt-1">
                {`Next: ${onboardingSteps[currentStep]?.label ?? "All steps complete!"}`}
              </span>
            </button>
          </PopoverTrigger>
          <PopoverContent align="end" sideOffset={8} className="w-[320px] p-4 shadow-lg rounded-xl">
            <div>
              <div className="font-semibold text-base mb-3 text-gray-600">
                Onboarding steps
              </div>
              <ol className="space-y-3 text-sm">
                {onboardingSteps.map((step, idx) => (
                  <li key={step.label} className="flex items-start gap-2">
                    <div className={`flex items-center justify-center rounded-full h-5 w-5 border ${idx < currentStep ? "bg-green-200 border-green-600 text-green-600" : idx === currentStep ? "bg-yellow-50 border-yellow-400 text-yellow-700 animate-pulse" : "bg-gray-100 border-gray-300 text-gray-400"}`}>
                      {idx < currentStep ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <span className="font-bold">{idx + 1}</span>
                      )}
                    </div>
                    <div className="flex flex-col flex-1">
                      <button
                        className={`text-left ${idx === currentStep ? "text-green-900 font-semibold underline" : "hover:underline"} focus:outline-none`}
                        onClick={() => {
                          setPopoverOpen(false);
                          navigate(step.link);
                        }}
                      >
                        {step.label}
                      </button>
                      <span className="text-xs text-gray-400">{step.estimate}</span>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </header>
  );
}
