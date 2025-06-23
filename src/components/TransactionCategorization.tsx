
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";
import { Button } from "@/components/ui/button";

// Sample transaction data for categorization
const sampleTransactions = [
  { id: 1, date: "2025-05-28", bankAccount: "Farm Operating", reference: "ACH DEBIT", amount: -276.79, contact: "AgriSupply Co.", category: "Uncategorized", comments: "" },
  { id: 2, date: "2025-05-27", bankAccount: "Farm Operating", reference: "CARD PURCHASE", amount: -116.42, contact: "Shell 3871253", category: "Uncategorized", comments: "" },
  { id: 3, date: "2025-05-26", bankAccount: "Farm Operating", reference: "CHECK 1023", amount: -445.23, contact: "Midwest Seed Supply", category: "Uncategorized", comments: "" },
  { id: 4, date: "2025-05-25", bankAccount: "Savings", reference: "AUTO PAY", amount: -345.88, contact: "Farm Bureau Insurance", category: "Uncategorized", comments: "" },
  { id: 5, date: "2025-05-24", bankAccount: "Farm Operating", reference: "WIRE TRANSFER", amount: 2150.00, contact: "Harvest Gold Elevator", category: "Uncategorized", comments: "" },
  { id: 6, date: "2025-05-23", bankAccount: "Farm Operating", reference: "VENMO", amount: -1200.00, contact: "Jorge Zamp...", category: "Uncategorized", comments: "" },
  { id: 7, date: "2025-05-22", bankAccount: "Farm Operating", reference: "CARD PURCHASE", amount: -425.50, contact: "Tractor Supply Co #4821", category: "Uncategorized", comments: "" },
  { id: 8, date: "2025-05-21", bankAccount: "Farm Operating", reference: "ACH DEBIT", amount: -530.12, contact: "Randy's Repair Service", category: "Uncategorized", comments: "" },
  { id: 9, date: "2025-05-20", bankAccount: "Farm Operating", reference: "CHECK 1024", amount: -189.33, contact: "Peterson Equipment", category: "Uncategorized", comments: "" },
  { id: 10, date: "2025-05-19", bankAccount: "Savings", reference: "TRANSFER", amount: -500.00, contact: "Internal Transfer", category: "Uncategorized", comments: "" },
  { id: 11, date: "2025-05-18", bankAccount: "Farm Operating", reference: "CARD PURCHASE", amount: -67.45, contact: "Office Depot #2341", category: "Uncategorized", comments: "" },
  { id: 12, date: "2025-05-17", bankAccount: "Farm Operating", reference: "ACH DEBIT", amount: -892.45, contact: "John Deere Financial", category: "Uncategorized", comments: "" },
  { id: 13, date: "2025-05-16", bankAccount: "Farm Operating", reference: "WIRE TRANSFER", amount: 1800.00, contact: "Commodity Trading Co", category: "Uncategorized", comments: "" },
  { id: 14, date: "2025-05-15", bankAccount: "Farm Operating", reference: "CHECK 1025", amount: -234.67, contact: "Green Valley Chemicals", category: "Uncategorized", comments: "" },
  { id: 15, date: "2025-05-14", bankAccount: "Farm Operating", reference: "CARD PURCHASE", amount: -156.89, contact: "Fuel Express #789", category: "Uncategorized", comments: "" },
  { id: 16, date: "2025-05-13", bankAccount: "Farm Operating", reference: "ACH DEBIT", amount: -378.92, contact: "Midwest Fertilizer", category: "Uncategorized", comments: "" },
  { id: 17, date: "2025-05-12", bankAccount: "Farm Operating", reference: "CHECK 1026", amount: -125.00, contact: "Smith Veterinary", category: "Uncategorized", comments: "" },
  { id: 18, date: "2025-05-11", bankAccount: "Savings", reference: "INTEREST", amount: 12.34, contact: "First National Bank", category: "Uncategorized", comments: "" },
  { id: 19, date: "2025-05-10", bankAccount: "Farm Operating", reference: "CARD PURCHASE", amount: -298.76, contact: "Hardware Store #45", category: "Uncategorized", comments: "" },
  { id: 20, date: "2025-05-09", bankAccount: "Farm Operating", reference: "ACH DEBIT", amount: -567.12, contact: "Equipment Rental Plus", category: "Uncategorized", comments: "" },
  { id: 21, date: "2025-05-08", bankAccount: "Farm Operating", reference: "WIRE TRANSFER", amount: 3200.00, contact: "Grain Cooperative", category: "Uncategorized", comments: "" },
  { id: 22, date: "2025-05-07", bankAccount: "Farm Operating", reference: "CHECK 1027", amount: -89.45, contact: "Local Feed Store", category: "Uncategorized", comments: "" },
  { id: 23, date: "2025-05-06", bankAccount: "Farm Operating", reference: "CARD PURCHASE", amount: -45.78, contact: "Coffee Shop Downtown", category: "Uncategorized", comments: "" },
  { id: 24, date: "2025-05-05", bankAccount: "Farm Operating", reference: "ACH DEBIT", amount: -789.33, contact: "Irrigation Systems Inc", category: "Uncategorized", comments: "" },
  { id: 25, date: "2025-05-04", bankAccount: "Savings", reference: "DEPOSIT", amount: 1500.00, contact: "Tax Refund", category: "Uncategorized", comments: "" },
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

const TransactionCategorization = () => {
  const [transactions, setTransactions] = useState(sampleTransactions);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 25;

  const handleCategoryChange = (transactionId: number, newCategory: string) => {
    setTransactions(prev => 
      prev.map(t => 
        t.id === transactionId 
          ? { ...t, category: newCategory }
          : t
      )
    );
  };

  const handleContactChange = (transactionId: number, newContact: string) => {
    setTransactions(prev => 
      prev.map(t => 
        t.id === transactionId 
          ? { ...t, contact: newContact }
          : t
      )
    );
  };

  const handleCommentsChange = (transactionId: number, newComments: string) => {
    setTransactions(prev => 
      prev.map(t => 
        t.id === transactionId 
          ? { ...t, comments: newComments }
          : t
      )
    );
  };

  // Calculate progress (percentage of categorized transactions)
  const categorizedCount = transactions.filter(t => t.category !== "Uncategorized").length;
  const totalTransactions = transactions.length;
  const progressPercentage = (categorizedCount / totalTransactions) * 100;

  // Get current page transactions
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTransactions = transactions.slice(startIndex, endIndex);
  const totalPages = Math.ceil(transactions.length / itemsPerPage);

  return (
    <div className="w-full">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Transaction Categorization</CardTitle>
            <div className="flex flex-col items-end min-w-[200px]">
              <div className="text-sm text-gray-600 mb-2">
                {categorizedCount} of {totalTransactions} transactions categorized
              </div>
              <Progress value={progressPercentage} className="w-[200px]" />
              <div className="text-xs text-gray-500 mt-1">
                {Math.round(progressPercentage)}% complete
              </div>
            </div>
          </div>
          <p className="text-sm text-gray-600">
            Categorize your transactions to track your progress toward completion.
          </p>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Bank Account</TableHead>
                <TableHead>Reference</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Comments</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentTransactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell className="font-medium">{transaction.date}</TableCell>
                  <TableCell>{transaction.bankAccount}</TableCell>
                  <TableCell className="text-sm text-gray-600">{transaction.reference}</TableCell>
                  <TableCell className={`font-semibold ${transaction.amount < 0 ? 'text-red-600' : 'text-green-600'}`}>
                    {transaction.amount < 0 ? '-' : '+'}${Math.abs(transaction.amount).toFixed(2)}
                  </TableCell>
                  <TableCell>
                    <Input
                      value={transaction.contact}
                      onChange={(e) => handleContactChange(transaction.id, e.target.value)}
                      className="w-[180px]"
                    />
                  </TableCell>
                  <TableCell>
                    <Select 
                      value={transaction.category} 
                      onValueChange={(value) => handleCategoryChange(transaction.id, value)}
                    >
                      <SelectTrigger className={`w-[140px] ${transaction.category === "Uncategorized" ? "border-yellow-400" : "border-green-400"}`}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Uncategorized">Uncategorized</SelectItem>
                        {categoryOptions.map(category => (
                          <SelectItem key={category} value={category}>{category}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Textarea
                      placeholder="Add comments..."
                      value={transaction.comments}
                      onChange={(e) => handleCommentsChange(transaction.id, e.target.value)}
                      className="w-[200px]"
                      rows={1}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-4">
              <div className="text-sm text-gray-600">
                Showing {startIndex + 1}-{Math.min(endIndex, transactions.length)} of {transactions.length} transactions
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                <span className="px-3 py-1 text-sm">
                  Page {currentPage} of {totalPages}
                </span>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TransactionCategorization;
