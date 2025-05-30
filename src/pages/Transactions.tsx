
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

// Sample transaction data with realistic names
const sampleTransactions = [
  { id: 1, name: "Randy's Repair Service", amount: -530.12, date: "2025-05-20", category: "Uncategorized", notes: "" },
  { id: 2, name: "AgriSupply Co.", amount: -276.79, date: "2025-05-19", category: "Uncategorized", notes: "" },
  { id: 3, name: "Shell 3871253", amount: -116.42, date: "2025-05-17", category: "Uncategorized", notes: "" },
  { id: 4, name: "Midwest Seed Supply", amount: -445.23, date: "2025-05-15", category: "Uncategorized", notes: "" },
  { id: 5, name: "Farm Bureau Insurance", amount: -345.88, date: "2025-05-14", category: "Uncategorized", notes: "" },
  { id: 6, name: "Harvest Gold Elevator", amount: 2150.00, date: "2025-05-13", category: "Uncategorized", notes: "" },
  { id: 7, name: "Venmo: Jorge Zamp...", amount: -1200.00, date: "2025-05-12", category: "Uncategorized", notes: "" },
  { id: 8, name: "Tractor Supply Co #4821", amount: -425.50, date: "2025-05-10", category: "Uncategorized", notes: "" },
];

const categoryOptions = [
  "Supplies",
  "Fuel", 
  "Maintenance",
  "Equipment",
  "Labor",
  "Insurance",
  "Revenue",
  "Office",
  "Other"
];

const Transactions = () => {
  const [transactions, setTransactions] = useState(sampleTransactions);
  const [filter, setFilter] = useState("all");

  const handleCategoryChange = (transactionId: number, newCategory: string) => {
    setTransactions(prev => 
      prev.map(t => 
        t.id === transactionId 
          ? { ...t, category: newCategory }
          : t
      )
    );
  };

  const handleNotesChange = (transactionId: number, newNotes: string) => {
    setTransactions(prev => 
      prev.map(t => 
        t.id === transactionId 
          ? { ...t, notes: newNotes }
          : t
      )
    );
  };

  const filteredTransactions = transactions.filter(t => 
    filter === "all" || (filter === "uncategorized" && t.category === "Uncategorized")
  );

  const uncategorizedCount = transactions.filter(t => t.category === "Uncategorized").length;

  return (
    <div className="flex flex-col flex-1 min-h-screen bg-gray-50">
      <div className="flex flex-1 w-full justify-center items-start">
        <div className="w-full max-w-6xl px-4 py-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Transaction Review</h1>
            <p className="text-gray-600">
              Review and categorize your transactions. You have {uncategorizedCount} uncategorized transactions.
            </p>
          </div>

          <div className="mb-6">
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-[200px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Transactions</SelectItem>
                <SelectItem value="uncategorized">Uncategorized Only</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredTransactions.map((transaction) => (
                  <div key={transaction.id} className="p-4 bg-gray-50 rounded-lg border">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-lg">{transaction.name}</h3>
                          <span className={`font-bold text-lg ${transaction.amount < 0 ? 'text-red-600' : 'text-green-600'}`}>
                            {transaction.amount < 0 ? '-' : '+'}${Math.abs(transaction.amount).toFixed(2)}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500">{transaction.date}</p>
                      </div>
                      <div className="ml-6 min-w-[150px]">
                        <Select 
                          value={transaction.category} 
                          onValueChange={(value) => handleCategoryChange(transaction.id, value)}
                        >
                          <SelectTrigger className={transaction.category === "Uncategorized" ? "border-yellow-400" : ""}>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Uncategorized">Uncategorized</SelectItem>
                            {categoryOptions.map(category => (
                              <SelectItem key={category} value={category}>{category}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="mt-3">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                      <Textarea
                        placeholder="Add notes about this transaction..."
                        value={transaction.notes}
                        onChange={(e) => handleNotesChange(transaction.id, e.target.value)}
                        className="w-full"
                        rows={2}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
