import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, MessageSquare, Phone, Reply, ChevronDown, ChevronRight, MoreHorizontal } from "lucide-react";
import { useState } from "react";
import WysiwygEditor from "./WysiwygEditor";

interface Message {
  id: number;
  type: 'email' | 'text' | 'phone';
  from: string;
  subject: string;
  content: string;
  date: string;
  time: string;
  read: boolean;
  replies?: Reply[];
  parentId?: number;
}

interface Reply {
  id: number;
  content: string;
  from: string;
  date: string;
  time: string;
}

interface MessageListItemProps {
  message: Message;
  onViewMessage: (message: Message) => void;
  onMarkAsRead: (messageId: number) => void;
  onSendReply: (messageId: number, replyContent: string) => void;
}

const MessageListItem = ({ message, onViewMessage, onMarkAsRead, onSendReply }: MessageListItemProps) => {
  const [showReplyEditor, setShowReplyEditor] = useState(false);
  const [showReplies, setShowReplies] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

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

  const handleReply = () => {
    setShowReplyEditor(true);
    handleViewMessage();
  };

  const handleSendReply = (replyContent: string) => {
    onSendReply(message.id, replyContent);
    setShowReplyEditor(false);
  };

  const toggleReplies = () => {
    setShowReplies(!showReplies);
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
    if (!isExpanded) {
      handleViewMessage();
    }
  };

  // Check if message content is long (more than 200 characters)
  const isLongMessage = message.content.length > 200;
  const displayContent = isExpanded || !isLongMessage 
    ? message.content 
    : message.content.substring(0, 200) + '...';

  return (
    <div className="space-y-2">
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
                <p className="text-sm text-gray-600 break-words whitespace-pre-wrap">
                  {displayContent}
                </p>
                {isLongMessage && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleExpanded();
                    }}
                    className="h-6 px-2 text-xs mt-1 text-blue-600 hover:text-blue-700"
                  >
                    {isExpanded ? (
                      <>
                        <ChevronDown className="w-3 h-3 mr-1" />
                        Show less
                      </>
                    ) : (
                      <>
                        <MoreHorizontal className="w-3 h-3 mr-1" />
                        Show more
                      </>
                    )}
                  </Button>
                )}
                <p className="text-xs text-gray-500 mt-1">
                  {message.date} at {message.time}
                </p>
                {message.replies && message.replies.length > 0 && (
                  <div className="flex items-center gap-2 mt-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleReplies();
                      }}
                      className="h-6 px-2 text-xs"
                    >
                      {showReplies ? <ChevronDown className="w-3 h-3 mr-1" /> : <ChevronRight className="w-3 h-3 mr-1" />}
                      {message.replies.length} {message.replies.length === 1 ? 'Reply' : 'Replies'}
                    </Button>
                  </div>
                )}
              </div>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                handleReply();
              }}
              className="flex-shrink-0"
            >
              <Reply className="w-4 h-4 mr-1" />
              Reply
            </Button>
          </div>
        </CardContent>
      </Card>

      {showReplies && message.replies && (
        <div className="ml-8 space-y-2">
          {message.replies.map((reply) => (
            <Card key={reply.id} className="bg-gray-50">
              <CardContent className="p-3">
                <div className="flex items-start gap-2">
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-medium text-gray-600">
                      {reply.from.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium break-words">{reply.from}</span>
                      <span className="text-xs text-gray-500">{reply.date} at {reply.time}</span>
                    </div>
                    <div 
                      className="text-sm text-gray-700 break-words"
                      dangerouslySetInnerHTML={{ __html: reply.content }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {showReplyEditor && (
        <div className="ml-8">
          <Card>
            <CardContent className="p-4">
              <h4 className="text-sm font-medium mb-3">Reply to: {message.subject}</h4>
              <WysiwygEditor 
                onSendReply={handleSendReply}
                placeholder="Type your reply..."
              />
              <div className="flex justify-end mt-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowReplyEditor(false)}
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default MessageListItem;
export type { Message, Reply };
