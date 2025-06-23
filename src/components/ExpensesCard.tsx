
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { useState, useMemo } from "react";

interface Expense {
  id: number;
  description: string;
  amount: number;
  category: string;
  date: string;
  bankAccount: string;
}

interface ExpenseCategory {
  name: string;
  value: number;
  color: string;
}

interface ExpensesCardProps {
  recentExpenses: Expense[];
  expenseCategories: ExpenseCategory[];
  timePeriod: "1m" | "6m" | "12m";
  onTimePeriodChange: (period: "1m" | "6m" | "12m") => void;
}

const ExpensesCard = ({ 
  recentExpenses, 
  expenseCategories, 
  timePeriod, 
  onTimePeriodChange 
}: ExpensesCardProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Get unique categories from expenses
  const availableCategories = useMemo(() => {
    const categories = Array.from(new Set(recentExpenses.map(expense => expense.category)));
    return categories.sort();
  }, [recentExpenses]);

  // Filter expenses by selected category
  const filteredExpenses = useMemo(() => {
    if (selectedCategory === "all") {
      return recentExpenses;
    }
    return recentExpenses.filter(expense => expense.category === selectedCategory);
  }, [recentExpenses, selectedCategory]);

  // Filter expense categories for pie chart
  const filteredExpenseCategories = useMemo(() => {
    if (selectedCategory === "all") {
      return expenseCategories;
    }
    return expenseCategories.filter(category => category.name === selectedCategory);
  }, [expenseCategories, selectedCategory]);

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl font-bold">Expenses Overview</CardTitle>
        <div className="flex gap-3">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {availableCategories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={timePeriod} onValueChange={onTimePeriodChange}>
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1m">Past Month</SelectItem>
              <SelectItem value="6m">Past 6 Months</SelectItem>
              <SelectItem value="12m">Past 12 Months</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Expenses - Left Side */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              Recent Expenses
              {selectedCategory !== "all" && (
                <span className="text-sm font-normal text-gray-500 ml-2">
                  - {selectedCategory}
                </span>
              )}
            </h3>
            <div className="space-y-3">
              {filteredExpenses.length > 0 ? (
                filteredExpenses.slice(0, 10).map((expense) => (
                  <div key={expense.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium text-sm">{expense.description}</p>
                      <p className="text-xs text-gray-500">{expense.category} • {expense.date} • {expense.bankAccount}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-red-600">-${expense.amount.toFixed(2)}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-sm">No expenses found for the selected category.</p>
              )}
            </div>
          </div>

          {/* Expense Categories Chart - Right Side */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              Expense Categories
              {selectedCategory !== "all" && (
                <span className="text-sm font-normal text-gray-500 ml-2">
                  - {selectedCategory}
                </span>
              )}
            </h3>
            <div className="h-80">
              {filteredExpenseCategories.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={filteredExpenseCategories}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={120}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {filteredExpenseCategories.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`$${value}`, 'Amount']} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500">
                  No data available for the selected category.
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExpensesCard;
