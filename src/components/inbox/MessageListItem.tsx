
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, MessageSquare, Phone, Reply } from "lucide-react";

interface Message {
  id: number;
  type: 'email' | 'text' | 'phone';
  from: string;
  subject: string;
  content: string;
  date: string;
  time: string;
  read: boolean;
}

interface MessageListItemProps {
  message: Message;
  onViewMessage: (message: Message) => void;
  onMarkAsRead: (messageId: number) => void;
}

const MessageListItem = ({ message, onViewMessage, onMarkAsRead }: MessageListItemProps) => {
  const getMessageIcon = (type: string) => {
    switch (type) {
      case 'email': return <Mail className="w-4 h-4" />;
      case 'text': return <MessageSquare className="w-4 h-4" />;
      case 'phone': return <Phone className="w-4 h-4" />;
      default: return <Mail className="w-4 h-4" />;
    }
  };

  const getMessageTypeColor = (type: string) => {
    switch (type) {
      case 'email': return 'bg-blue-100 text-blue-700';
      case 'text': return 'bg-green-100 text-green-700';
      case 'phone': return 'bg-purple-100 text-purple-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const handleViewMessage = () => {
    onViewMessage(message);
    onMarkAsRead(message.id);
  };

  return (
    <Card className={`cursor-pointer transition-all hover:shadow-md ${!message.read ? 'ring-2 ring-blue-200' : ''}`}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3 flex-1 min-w-0">
            <div className={`p-2 rounded-full flex-shrink-0 ${getMessageTypeColor(message.type)}`}>
              {getMessageIcon(message.type)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className={`font-medium ${!message.read ? 'font-bold' : ''} break-words`}>
                  {message.from}
                </h3>
                {!message.read && (
                  <span className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></span>
                )}
              </div>
              <p className={`text-sm mb-1 ${!message.read ? 'font-semibold' : ''} break-words`}>
                {message.subject}
              </p>
              <p className="text-sm text-gray-600 break-words line-clamp-2">
                {message.content}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {message.date} at {message.time}
              </p>
            </div>
          </div>
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleViewMessage}
            className="flex-shrink-0"
          >
            <Reply className="w-4 h-4 mr-1" />
            View & Reply
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default MessageListItem;
export type { Message };
