
import { Card, CardTitle } from "@/components/ui/card";

interface InboxCardProps {
  recentInboxMessages: { id: number; subject: string; date: string }[];
  onInboxClick: () => void;
}

const InboxCard = ({
  recentInboxMessages,
  onInboxClick,
}: InboxCardProps) => (
  <Card className="flex flex-col p-4 min-h-[200px]">
    <CardTitle className="text-lg mb-3 flex items-center text-primary">
      Inbox
    </CardTitle>
    {recentInboxMessages.length > 0 ? (
      <ul className="flex flex-col gap-2 mb-4">
        {recentInboxMessages.slice(0, 3).map(msg => (
          <li
            key={msg.id}
            className="flex flex-col cursor-pointer px-2 py-1 rounded hover:bg-indigo-50 transition"
            onClick={onInboxClick}
          >
            <span className="truncate pr-2 font-medium text-gray-800 text-sm">{msg.subject}</span>
            <span className="text-xs text-gray-500">{msg.date}</span>
          </li>
        ))}
      </ul>
    ) : (
      <div className="text-sm text-gray-500 mb-4">No new messages</div>
    )}
    <button
      onClick={onInboxClick}
      className="mt-auto w-full bg-indigo-100 text-primary rounded px-2 py-1 text-sm font-semibold hover:bg-indigo-200 transition"
    >
      Go to Inbox
    </button>
  </Card>
);

export default InboxCard;
