
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import TransactionSearch from "@/components/TransactionSearch";
import TransactionList from "@/components/TransactionList";
import { Transaction, SearchFilters } from "@/types/transaction";

// Sample transaction data with realistic names and bank account info
const sampleTransactions: Transaction[] = [
  { id: 1, name: "Randy's Repair Service", amount: -530.12, date: "2025-05-20", bankAccount: "Farm Operating", category: "Uncategorized", notes: "" },
  { id: 2, name: "AgriSupply Co.", amount: -276.79, date: "2025-05-19", bankAccount: "Farm Operating", category: "Uncategorized", notes: "" },
  { id: 3, name: "Shell 3871253", amount: -116.42, date: "2025-05-17", bankAccount: "Farm Operating", category: "Uncategorized", notes: "" },
  { id: 4, name: "Midwest Seed Supply", amount: -445.23, date: "2025-05-15", bankAccount: "Farm Operating", category: "Uncategorized", notes: "" },
  { id: 5, name: "Farm Bureau Insurance", amount: -345.88, date: "2025-05-14", bankAccount: "Savings", category: "Uncategorized", notes: "" },
  { id: 6, name: "Harvest Gold Elevator", amount: 2150.00, date: "2025-05-13", bankAccount: "Farm Operating", category: "Uncategorized", notes: "" },
  { id: 7, name: "Venmo: Jorge Zamp...", amount: -1200.00, date: "2025-05-12", bankAccount: "Farm Operating", category: "Uncategorized", notes: "" },
  { id: 8, name: "Tractor Supply Co #4821", amount: -425.50, date: "2025-05-10", bankAccount: "Farm Operating", category: "Uncategorized", notes: "" },
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
  const [transactions, setTransactions] = useState<Transaction[]>(sampleTransactions);
  const [filter, setFilter] = useState("all");
  const [searchFilters, setSearchFilters] = useState<SearchFilters>({
    searchTerm: "",
    category: "all",
    minAmount: "",
    maxAmount: "",
    startDate: "",
    endDate: ""
  });

  const handleTransactionUpdate = (transactionId: number, field: keyof Transaction, value: string) => {
    setTransactions(prev => 
      prev.map(t => 
        t.id === transactionId 
          ? { ...t, [field]: value }
          : t
      )
    );
  };

  const applyFilters = (transactions: Transaction[]) => {
    return transactions.filter(t => {
      // Basic filter (all or uncategorized)
      const passesBasicFilter = filter === "all" || (filter === "uncategorized" && t.category === "Uncategorized");
      
      // Search term filter
      const passesSearchTerm = !searchFilters.searchTerm || 
        t.name.toLowerCase().includes(searchFilters.searchTerm.toLowerCase());
      
      // Category filter
      const passesCategoryFilter = searchFilters.category === "all" || 
        t.category === searchFilters.category;
      
      // Amount range filter
      const amount = Math.abs(t.amount);
      const passesMinAmount = !searchFilters.minAmount || 
        amount >= parseFloat(searchFilters.minAmount);
      const passesMaxAmount = !searchFilters.maxAmount || 
        amount <= parseFloat(searchFilters.maxAmount);
      
      // Date range filter
      const transactionDate = new Date(t.date);
      const passesStartDate = !searchFilters.startDate || 
        transactionDate >= new Date(searchFilters.startDate);
      const passesEndDate = !searchFilters.endDate || 
        transactionDate <= new Date(searchFilters.endDate);
      
      return passesBasicFilter && passesSearchTerm && passesCategoryFilter && 
             passesMinAmount && passesMaxAmount && passesStartDate && passesEndDate;
    });
  };

  const filteredTransactions = applyFilters(transactions);
  const uncategorizedCount = transactions.filter(t => t.category === "Uncategorized").length;

  const handleExport = () => {
    const csvHeaders = ['Date', 'Name', 'Amount', 'Category', 'Notes'];
    const csvData = filteredTransactions.map(t => [
      t.date,
      `"${t.name}"`,
      t.amount.toString(),
      t.category,
      `"${t.notes}"`
    ]);
    
    const csvContent = [
      csvHeaders.join(','),
      ...csvData.map(row => row.join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `transactions_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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

          <TransactionSearch 
            filters={searchFilters}
            onFiltersChange={setSearchFilters}
            onExport={handleExport}
            categoryOptions={categoryOptions}
            resultsCount={filteredTransactions.length}
          />

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
              <CardTitle>Transactions ({filteredTransactions.length} results)</CardTitle>
            </CardHeader>
            <CardContent>
              <TransactionList 
                transactions={filteredTransactions}
                categoryOptions={categoryOptions}
                onTransactionUpdate={handleTransactionUpdate}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
