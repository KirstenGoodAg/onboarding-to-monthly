
import { useState } from 'react';
import MessageListItem from '../components/inbox/MessageListItem';
import MessageDialog from '../components/inbox/MessageDialog';
import { sampleMessages } from '../components/inbox/sampleMessages';
import { Message } from '../components/inbox/MessageListItem';

const Inbox = () => {
  const [messages, setMessages] = useState<Message[]>(sampleMessages);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  const markAsRead = (messageId: number) => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId ? { ...msg, read: true } : msg
    ));
  };

  const handleSendReply = (replyText: string, attachedFiles: File[]) => {
    console.log('Sending reply:', replyText);
    console.log('Attached files:', attachedFiles);
  };

  const handleViewMessage = (message: Message) => {
    setSelectedMessage(message);
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen px-4 py-8" style={{ minHeight: "calc(100vh - 0px)" }}>
      <div className="glass rounded-2xl shadow-xl p-10 w-full max-w-4xl mt-16">
        <h1 className="text-3xl font-bold mb-2">Inbox</h1>
        <p className="text-gray-600 mb-6">Messages and communications with your farm advisor</p>
        
        <div className="flex flex-col gap-3">
          {messages.length === 0 ? (
            <div className="h-12 rounded bg-gray-100 px-4 flex items-center text-gray-500">No messages yet.</div>
          ) : (
            messages.map(message => (
              <MessageDialog
                key={message.id}
                message={message}
                onSendReply={handleSendReply}
              >
                <MessageListItem
                  message={message}
                  onViewMessage={handleViewMessage}
                  onMarkAsRead={markAsRead}
                />
              </MessageDialog>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Inbox;
