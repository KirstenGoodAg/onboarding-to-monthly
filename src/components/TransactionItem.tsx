
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Transaction } from "@/types/transaction";

interface TransactionItemProps {
  transaction: Transaction;
  categoryOptions: string[];
  onTransactionUpdate: (transactionId: number, field: keyof Transaction, value: string) => void;
}

const TransactionItem = ({ transaction, categoryOptions, onTransactionUpdate }: TransactionItemProps) => {
  const handleCategoryChange = (newCategory: string) => {
    onTransactionUpdate(transaction.id, 'category', newCategory);
  };

  const handleContactChange = (newContact: string) => {
    onTransactionUpdate(transaction.id, 'name', newContact);
  };

  const handleNotesChange = (newNotes: string) => {
    onTransactionUpdate(transaction.id, 'notes', newNotes);
  };

  return (
    <div className="p-4 bg-gray-50 rounded-lg border">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <Input
              value={transaction.name}
              onChange={(e) => handleContactChange(e.target.value)}
              className="font-semibold text-lg bg-white border-gray-300 hover:border-gray-400 focus:border-blue-500"
            />
            <span className={`font-bold text-lg ml-4 ${transaction.amount < 0 ? 'text-red-600' : 'text-green-600'}`}>
              {transaction.amount < 0 ? '-' : '+'}${Math.abs(transaction.amount).toFixed(2)}
            </span>
          </div>
          <div className="flex items-center gap-3 text-xs text-gray-500">
            <span>{transaction.date}</span>
            <span>•</span>
            <span>{transaction.bankAccount}</span>
          </div>
        </div>
        <div className="ml-6 min-w-[150px]">
          <Select 
            value={transaction.category} 
            onValueChange={handleCategoryChange}
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
          onChange={(e) => handleNotesChange(e.target.value)}
          className="w-full"
          rows={2}
        />
      </div>
    </div>
  );
};

export default TransactionItem;
