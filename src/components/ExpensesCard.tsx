
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

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
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl font-bold">Expenses Overview</CardTitle>
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
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Expenses - Left Side */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Recent Expenses</h3>
            <div className="space-y-3">
              {recentExpenses.slice(0, 10).map((expense) => (
                <div key={expense.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium text-sm">{expense.description}</p>
                    <p className="text-xs text-gray-500">{expense.category} • {expense.date} • {expense.bankAccount}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-red-600">-${expense.amount.toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Expense Categories Chart - Right Side */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Expense Categories</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={expenseCategories}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {expenseCategories.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`$${value}`, 'Amount']} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExpensesCard;
