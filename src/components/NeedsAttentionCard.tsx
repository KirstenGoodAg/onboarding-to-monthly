
import { Card, CardTitle } from "@/components/ui/card";

interface NeedsAttentionCardProps {
  uncategorizedTransactions: { id: number; name: string; amount: number; date: string }[];
  onReviewClick: () => void;
}

const NeedsAttentionCard = ({
  uncategorizedTransactions,
  onReviewClick,
}: NeedsAttentionCardProps) => (
  <Card className="flex flex-col p-4 min-h-[200px]">
    <CardTitle className="text-lg mb-3 text-yellow-700 flex items-center">
      Needs Your Attention
    </CardTitle>
    {uncategorizedTransactions.length > 0 ? (
      <ul className="flex flex-col gap-2 mb-4">
        {uncategorizedTransactions.slice(0, 3).map(txn => (
          <li
            key={txn.id}
            className="flex items-center justify-between px-2 py-1 rounded bg-yellow-50"
          >
            <span className="truncate pr-2 text-sm font-medium text-gray-700">{txn.name}</span>
            <span className="text-sm text-gray-500">
              ${Math.abs(txn.amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </span>
          </li>
        ))}
      </ul>
    ) : (
      <div className="text-sm text-gray-500 mb-4">All transactions categorized!</div>
    )}
    <button
      onClick={onReviewClick}
      className="mt-auto w-full bg-yellow-100 text-yellow-900 rounded px-2 py-1 text-sm font-semibold hover:bg-yellow-200 transition"
    >
      Review all
    </button>
  </Card>
);

export default NeedsAttentionCard;
