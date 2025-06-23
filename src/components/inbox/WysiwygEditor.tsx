
import { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Bold, Italic, Underline, Send, Type } from "lucide-react";

interface WysiwygEditorProps {
  onSendReply: (content: string) => void;
  placeholder?: string;
}

const WysiwygEditor = ({ onSendReply, placeholder = "Type your reply..." }: WysiwygEditorProps) => {
  const [content, setContent] = useState('');
  const editorRef = useRef<HTMLDivElement>(null);

  const handleFormat = (command: string) => {
    document.execCommand(command, false, undefined);
    editorRef.current?.focus();
  };

  const handleSend = () => {
    if (editorRef.current) {
      const htmlContent = editorRef.current.innerHTML;
      const textContent = editorRef.current.textContent || '';
      
      if (textContent.trim()) {
        onSendReply(htmlContent);
        editorRef.current.innerHTML = '';
        setContent('');
      }
    }
  };

  const handleInput = () => {
    if (editorRef.current) {
      setContent(editorRef.current.textContent || '');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="flex items-center gap-1 p-2 border-b bg-gray-50">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleFormat('bold')}
          className="h-8 w-8 p-0"
        >
          <Bold className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleFormat('italic')}
          className="h-8 w-8 p-0"
        >
          <Italic className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleFormat('underline')}
          className="h-8 w-8 p-0"
        >
          <Underline className="w-4 h-4" />
        </Button>
        <div className="ml-auto">
          <Button
            onClick={handleSend}
            size="sm"
            disabled={!content.trim()}
          >
            <Send className="w-4 h-4 mr-1" />
            Send
          </Button>
        </div>
      </div>
      <div
        ref={editorRef}
        contentEditable
        className="min-h-[120px] p-3 focus:outline-none"
        style={{ wordBreak: 'break-word' }}
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        suppressContentEditableWarning={true}
        data-placeholder={placeholder}
      />
      <style jsx>{`
        div[contenteditable]:empty:before {
          content: attr(data-placeholder);
          color: #9ca3af;
          pointer-events: none;
        }
      `}</style>
    </div>
  );
};

export default WysiwygEditor;
