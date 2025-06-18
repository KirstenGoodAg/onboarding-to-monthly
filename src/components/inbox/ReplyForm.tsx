
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Paperclip, Send } from "lucide-react";

interface ReplyFormProps {
  onSendReply: (replyText: string, attachedFiles: File[]) => void;
}

const ReplyForm = ({ onSendReply }: ReplyFormProps) => {
  const [replyText, setReplyText] = useState('');
  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);

  const handleSendReply = () => {
    onSendReply(replyText, attachedFiles);
    setReplyText('');
    setAttachedFiles([]);
  };

  const handleFileAttach = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAttachedFiles(prev => [...prev, ...Array.from(e.target.files!)]);
    }
  };

  const removeFile = (index: number) => {
    setAttachedFiles(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="border-t pt-4">
      <Label htmlFor="reply" className="text-sm font-medium">Reply</Label>
      <Textarea
        id="reply"
        placeholder="Type your reply here..."
        value={replyText}
        onChange={(e) => setReplyText(e.target.value)}
        className="mt-2"
        rows={4}
      />
      
      <div className="flex items-center gap-2 mt-3">
        <Input
          type="file"
          multiple
          onChange={handleFileAttach}
          className="hidden"
          id="file-attach"
        />
        <Label
          htmlFor="file-attach"
          className="cursor-pointer flex items-center gap-1 px-3 py-2 text-sm border rounded-md hover:bg-gray-50"
        >
          <Paperclip className="w-4 h-4" />
          Attach Files
        </Label>
        
        <Button onClick={handleSendReply} className="ml-auto">
          <Send className="w-4 h-4 mr-1" />
          Send Reply
        </Button>
      </div>
      
      {attachedFiles.length > 0 && (
        <div className="mt-2">
          <p className="text-sm font-medium mb-2">Attached Files:</p>
          <div className="space-y-1">
            {attachedFiles.map((file, index) => (
              <div key={index} className="flex items-center justify-between bg-gray-100 p-2 rounded text-sm break-all">
                <span className="truncate pr-2">{file.name}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeFile(index)}
                  className="h-6 w-6 p-0 flex-shrink-0"
                >
                  ×
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ReplyForm;
