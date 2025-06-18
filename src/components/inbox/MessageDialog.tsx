
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Mail, MessageSquare, Phone } from "lucide-react";
import ReplyForm from "./ReplyForm";
import { Message } from "./MessageListItem";

interface MessageDialogProps {
  children: React.ReactNode;
  message: Message;
  onSendReply: (replyText: string, attachedFiles: File[]) => void;
}

const MessageDialog = ({ children, message, onSendReply }: MessageDialogProps) => {
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

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className={`p-2 rounded-full ${getMessageTypeColor(message.type)}`}>
              {getMessageIcon(message.type)}
            </div>
            <span className="break-words">{message.subject}</span>
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm font-medium mb-1 break-words">{message.from}</div>
            <div className="text-xs text-gray-500 mb-3">{message.date} at {message.time}</div>
            <div className="text-sm break-words whitespace-pre-wrap leading-relaxed">{message.content}</div>
          </div>
          
          <ReplyForm onSendReply={onSendReply} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MessageDialog;
