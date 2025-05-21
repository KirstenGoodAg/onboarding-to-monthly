
import React, { createContext, useContext, useState } from "react";

interface MonthlyBooksContextType {
  monthlyBooksVisible: boolean;
  setMonthlyBooksVisible: (v: boolean) => void;
}

const MonthlyBooksContext = createContext<MonthlyBooksContextType | undefined>(undefined);

export const useMonthlyBooksContext = () => {
  const ctx = useContext(MonthlyBooksContext);
  if (!ctx) throw new Error("useMonthlyBooksContext must be used within MonthlyBooksProvider");
  return ctx;
};

export const MonthlyBooksProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [monthlyBooksVisible, setMonthlyBooksVisible] = useState(false);
  return (
    <MonthlyBooksContext.Provider value={{ monthlyBooksVisible, setMonthlyBooksVisible }}>
      {children}
    </MonthlyBooksContext.Provider>
  );
};
