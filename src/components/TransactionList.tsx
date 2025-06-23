
import TransactionItem from "./TransactionItem";
import { Transaction } from "@/types/transaction";

interface TransactionListProps {
  transactions: Transaction[];
  categoryOptions: string[];
  onTransactionUpdate: (transactionId: number, field: keyof Transaction, value: string) => void;
}

const TransactionList = ({ transactions, categoryOptions, onTransactionUpdate }: TransactionListProps) => {
  return (
    <div className="space-y-4">
      {transactions.map((transaction) => (
        <TransactionItem
          key={transaction.id}
          transaction={transaction}
          categoryOptions={categoryOptions}
          onTransactionUpdate={onTransactionUpdate}
        />
      ))}
    </div>
  );
};

export default TransactionList;
