
import { useState, useEffect } from "react";

export const useDashboardState = () => {
  // Load checkbox states from localStorage or default to all false
  const [checked, setChecked] = useState(() => {
    const saved = localStorage.getItem('onboarding-checked');
    return saved ? JSON.parse(saved) : [false, false, false, false, false];
  });
  
  const [graphRange, setGraphRange] = useState<"6m" | "12m" | "2y" | "3y">("6m");
  const [expenseTimePeriod, setExpenseTimePeriod] = useState<"1m" | "6m" | "12m">("1m");
  const [glanceTimePeriod, setGlanceTimePeriod] = useState("current-month");

  // Save checkbox states to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('onboarding-checked', JSON.stringify(checked));
  }, [checked]);

  const handleCheckboxChange = (idx: number, checkedVal: boolean) => {
    setChecked((prev) => prev.map((val, i) => (i === idx ? checkedVal : val)));
  };

  const handleResetOnboarding = () => {
    setChecked([false, false, false, false, false]);
  };

  // Count total checked cards
  const totalChecked = checked.filter(Boolean).length;

  // All onboarding complete?
  const onboardingComplete = totalChecked === 5;

  // Check if first 4 boxes are checked but not all 5
  const firstFourChecked = checked.slice(0, 4).every(Boolean);
  const showTransactionCategorization = firstFourChecked && !onboardingComplete;

  return {
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
  };
};
