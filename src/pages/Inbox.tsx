
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, MessageSquare, Phone, Paperclip, Send, Reply } from "lucide-react";

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

const sampleMessages: Message[] = [
  {
    id: 1,
    type: 'email',
    from: 'Sarah Johnson (Farm Advisor)',
    subject: 'Welcome to Good Agriculture - Next Steps',
    content: 'Hi there! Welcome to Good Agriculture. I\'m excited to work with you on organizing your farm\'s financial data. To get started, please upload your bank statements from the last 12 months. This will help us establish baseline financial patterns for your operation.',
    date: '2024-06-17',
    time: '2:30 PM',
    read: false
  },
  {
    id: 2,
    type: 'text',
    from: 'Sarah Johnson',
    subject: 'Quick question about enterprise setup',
    content: 'Hey! Quick question - do you want to track your corn and soybean operations separately? I can help set up enterprise allocations for each crop if that would be helpful for your planning.',
    date: '2024-06-16',
    time: '11:45 AM',
    read: true
  },
  {
    id: 3,
    type: 'phone',
    from: 'Sarah Johnson (Farm Advisor)',
    subject: 'Phone Call Notes - Enterprise Allocation Discussion',
    content: 'Call Summary (30 min): Discussed setting up enterprise allocations for corn (400 acres) and soybeans (300 acres). Farmer wants to track input costs, labor, and equipment separately for each crop. Need to allocate shared expenses like land rent proportionally. Action items: Upload seed purchase receipts and fuel records.',
    date: '2024-06-15',
    time: '3:00 PM',
    read: true
  },
  {
    id: 4,
    type: 'email',
    from: 'Sarah Johnson (Farm Advisor)',
    subject: 'Bank Statement Import - Missing Transactions',
    content: 'I noticed some gaps in the imported bank data from March. Could you double-check that all accounts were included? Also, I see several large equipment purchases that we should categorize properly. Let\'s schedule a call to review these together.',
    date: '2024-06-14',
    time: '9:15 AM',
    read: true
  },
  {
    id: 5,
    type: 'text',
    from: 'Sarah Johnson',
    subject: 'Fuel allocation question',
    content: 'For the fuel purchases in April - should I allocate 60% to corn and 40% to soybeans based on acreage? Or do you track fuel usage differently?',
    date: '2024-06-13',
    time: '4:20 PM',
    read: true
  },
  {
    id: 6,
    type: 'email',
    from: 'Sarah Johnson (Farm Advisor)',
    subject: 'Seed Cost Allocation - Need Your Input',
    content: 'I\'m working on allocating your seed costs between enterprises. I have the corn seed invoices, but I\'m missing the soybean seed purchases from March. Could you upload those receipts when you get a chance? Also, let me know if you want to track treated vs. untreated seed costs separately.',
    date: '2024-06-12',
    time: '1:45 PM',
    read: true
  },
  {
    id: 7,
    type: 'phone',
    from: 'Sarah Johnson (Farm Advisor)',
    subject: 'Phone Call Notes - Financial Categories Review',
    content: 'Call Summary (45 min): Reviewed transaction categorization for Q1. Farmer confirmed fertilizer allocation method (50% spring application, 50% fall). Discussed creating separate categories for crop insurance vs. general insurance. Need to adjust labor allocation - farmer does 70% corn work, hired help split evenly.',
    date: '2024-06-11',
    time: '10:30 AM',
    read: true
  },
  {
    id: 8,
    type: 'email',
    from: 'Sarah Johnson (Farm Advisor)',
    subject: 'Equipment Depreciation and Allocation',
    content: 'I\'m setting up equipment depreciation schedules for your financial reports. For the new planter purchased in February, should I allocate the depreciation 60/40 between corn and soybeans, or do you prefer a different split? Also, do you want to track custom work separately from owned equipment costs?',
    date: '2024-06-10',
    time: '8:30 AM',
    read: true
  },
  {
    id: 9,
    type: 'text',
    from: 'Sarah Johnson',
    subject: 'Chemical application records',
    content: 'Can you upload your chemical application records? I need them to properly allocate herbicide and fungicide costs between corn and soybeans. The spray records will help with accurate enterprise costing.',
    date: '2024-06-09',
    time: '12:15 PM',
    read: true
  },
  {
    id: 10,
    type: 'email',
    from: 'Sarah Johnson (Farm Advisor)',
    subject: 'Monthly Financial Review - Ready for Your Input',
    content: 'Your May financial summary is ready for review! I\'ve categorized 95% of transactions and allocated costs between corn and soybean enterprises. A few items need your input: 1) Three equipment repair bills that could apply to either enterprise, 2) Fuel allocation for field prep work, 3) Whether to split the soil testing costs. Can we schedule a call this week to finalize these details?',
    date: '2024-06-08',
    time: '4:45 PM',
    read: true
  }
];

const Inbox = () => {
  const [messages, setMessages] = useState<Message[]>(sampleMessages);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [replyText, setReplyText] = useState('');
  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);

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

  const markAsRead = (messageId: number) => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId ? { ...msg, read: true } : msg
    ));
  };

  const handleReply = () => {
    console.log('Sending reply:', replyText);
    console.log('Attached files:', attachedFiles);
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
    <div className="flex flex-col items-center justify-start min-h-screen px-4 py-8" style={{ minHeight: "calc(100vh - 0px)" }}>
      <div className="glass rounded-2xl shadow-xl p-10 w-full max-w-4xl mt-16">
        <h1 className="text-3xl font-bold mb-2">Inbox</h1>
        <p className="text-gray-600 mb-6">Messages and communications with your farm advisor</p>
        
        <div className="flex flex-col gap-3">
          {messages.length === 0 ? (
            <div className="h-12 rounded bg-gray-100 px-4 flex items-center text-gray-500">No messages yet.</div>
          ) : (
            messages.map(message => (
              <Card key={message.id} className={`cursor-pointer transition-all hover:shadow-md ${!message.read ? 'ring-2 ring-blue-200' : ''}`}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      <div className={`p-2 rounded-full ${getMessageTypeColor(message.type)}`}>
                        {getMessageIcon(message.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className={`font-medium truncate ${!message.read ? 'font-bold' : ''}`}>
                            {message.from}
                          </h3>
                          {!message.read && (
                            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                          )}
                        </div>
                        <p className={`text-sm mb-1 truncate ${!message.read ? 'font-semibold' : ''}`}>
                          {message.subject}
                        </p>
                        <p className="text-sm text-gray-600 truncate">
                          {message.content}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {message.date} at {message.time}
                        </p>
                      </div>
                    </div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            setSelectedMessage(message);
                            markAsRead(message.id);
                          }}
                        >
                          <Reply className="w-4 h-4 mr-1" />
                          View & Reply
                        </Button>
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
                              
                              <Button onClick={handleReply} className="ml-auto">
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
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Inbox;
