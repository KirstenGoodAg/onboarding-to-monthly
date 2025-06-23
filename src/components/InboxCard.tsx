
import { useState, useEffect } from "react";
import { Card, CardTitle } from "@/components/ui/card";

interface InboxMessage {
  id: number;
  subject: string;
  date: string;
  replies?: { id: number; content: string; from: string; date: string; time: string }[];
}

interface InboxCardProps {
  recentInboxMessages: InboxMessage[];
  onInboxClick: () => void;
}

const InboxCard = ({
  recentInboxMessages,
  onInboxClick,
}: InboxCardProps) => {
  const [allMessages, setAllMessages] = useState<InboxMessage[]>([]);

  // Load messages from localStorage
  useEffect(() => {
    const loadMessages = () => {
      const savedMessages = JSON.parse(localStorage.getItem('inboxMessages') || '[]');
      const savedReplies = JSON.parse(localStorage.getItem('messageReplies') || '{}');
      
      // Merge sample messages with any saved replies
      const messagesWithReplies = recentInboxMessages.map(msg => ({
        ...msg,
        replies: savedReplies[msg.id] || msg.replies || []
      }));
      
      // Add any completely new messages from localStorage
      const newMessages = savedMessages.filter((saved: InboxMessage) => 
        !recentInboxMessages.some(sample => sample.id === saved.id)
      );
      
      const combinedMessages = [...newMessages, ...messagesWithReplies];
      setAllMessages(combinedMessages);
    };

    // Load initially
    loadMessages();

    // Listen for storage changes
    const handleStorageChange = () => {
      loadMessages();
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Also check periodically for localStorage changes in same tab
    const interval = setInterval(loadMessages, 1000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, [recentInboxMessages]);

  return (
    <Card className="flex flex-col p-4 min-h-[200px]">
      <CardTitle className="text-lg mb-3 flex items-center text-primary">
        Inbox
      </CardTitle>
      {allMessages.length > 0 ? (
        <ul className="flex flex-col gap-2 mb-4">
          {allMessages.slice(0, 3).map(msg => (
            <li
              key={msg.id}
              className="flex flex-col cursor-pointer px-2 py-1 rounded hover:bg-indigo-50 transition"
              onClick={onInboxClick}
            >
              <div className="flex items-center justify-between">
                <span className="truncate pr-2 font-medium text-gray-800 text-sm">{msg.subject}</span>
                {msg.replies && msg.replies.length > 0 && (
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full flex-shrink-0">
                    {msg.replies.length}
                  </span>
                )}
              </div>
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
};

export default InboxCard;
