
import { useState, useEffect } from 'react';
import MessageListItem from '../components/inbox/MessageListItem';
import { sampleMessages } from '../components/inbox/sampleMessages';
import { Message, Reply } from '../components/inbox/MessageListItem';

const Inbox = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  // Load messages from localStorage and combine with sample messages
  useEffect(() => {
    const loadMessages = () => {
      const savedMessages = JSON.parse(localStorage.getItem('inboxMessages') || '[]');
      const combinedMessages = [...savedMessages, ...sampleMessages];
      setMessages(combinedMessages);
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
  }, []);

  const markAsRead = (messageId: number) => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId ? { ...msg, read: true } : msg
    ));
  };

  const handleSendReply = (messageId: number, replyContent: string) => {
    const now = new Date();
    const newReply: Reply = {
      id: Date.now(),
      content: replyContent,
      from: 'You',
      date: now.toLocaleDateString(),
      time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => prev.map(msg => {
      if (msg.id === messageId) {
        return {
          ...msg,
          replies: [...(msg.replies || []), newReply]
        };
      }
      return msg;
    }));

    console.log('Reply sent:', { messageId, replyContent });
  };

  const handleViewMessage = (message: Message) => {
    console.log('Viewing message:', message);
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen px-4 py-8" style={{ minHeight: "calc(100vh - 0px)" }}>
      <div className="glass rounded-2xl shadow-xl p-10 w-full max-w-4xl mt-16">
        <h1 className="text-3xl font-bold mb-2">Inbox</h1>
        <p className="text-gray-600 mb-6">Messages and communications with your farm advisor</p>
        
        <div className="flex flex-col gap-4">
          {messages.length === 0 ? (
            <div className="h-12 rounded bg-gray-100 px-4 flex items-center text-gray-500">No messages yet.</div>
          ) : (
            messages.map(message => (
              <MessageListItem
                key={message.id}
                message={message}
                onViewMessage={handleViewMessage}
                onMarkAsRead={markAsRead}
                onSendReply={handleSendReply}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Inbox;
