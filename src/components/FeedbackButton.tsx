
import { useState } from 'react';
import { MessageCircle, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const FeedbackButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [feedback, setFeedback] = useState('');
  const { toast } = useToast();

  const handleSendFeedback = () => {
    if (!feedback.trim()) {
      toast({
        title: "Please enter your feedback",
        description: "Your feedback message cannot be empty.",
        variant: "destructive",
      });
      return;
    }

    // Create a new message object that matches the inbox message format
    const newMessage = {
      id: Date.now(),
      from: "feedback@goodagriculture.com",
      subject: "User Feedback",
      date: new Date().toLocaleDateString(),
      content: feedback,
      read: false,
      priority: "normal" as const,
      attachments: [] as string[],
    };

    // Get existing messages from localStorage
    const existingMessages = JSON.parse(localStorage.getItem('inboxMessages') || '[]');
    
    // Add the new feedback message
    const updatedMessages = [newMessage, ...existingMessages];
    
    // Save back to localStorage
    localStorage.setItem('inboxMessages', JSON.stringify(updatedMessages));

    toast({
      title: "Feedback sent!",
      description: "Thank you for your feedback. You can view it in your inbox.",
    });

    setFeedback('');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button
            size="icon"
            className="h-12 w-12 rounded-full shadow-lg bg-primary hover:bg-primary/90"
          >
            <MessageCircle className="h-6 w-6" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Send Feedback</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label htmlFor="feedback" className="block text-sm font-medium text-gray-700 mb-2">
                Your Feedback
              </label>
              <Textarea
                id="feedback"
                placeholder="Please share your thoughts, suggestions, or report any issues..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="min-h-[120px] resize-none"
              />
            </div>
            <div className="flex justify-end space-x-3">
              <Button
                variant="outline"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSendFeedback}
                className="flex items-center gap-2"
              >
                <Send className="h-4 w-4" />
                Send Feedback
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FeedbackButton;
