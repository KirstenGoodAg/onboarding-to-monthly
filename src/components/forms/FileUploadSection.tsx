import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Trash2, Upload, FileText } from "lucide-react";

interface FileItem {
  description: string;
  file?: File;
  fileName?: string;
}

interface FileUploadSectionProps {
  title: string;
  items: FileItem[];
  onItemsChange: (items: FileItem[]) => void;
}

export default function FileUploadSection({ title, items, onItemsChange }: FileUploadSectionProps) {
  const [newDescription, setNewDescription] = useState("");

  const addItem = () => {
    if (newDescription.trim()) {
      onItemsChange([...items, { description: newDescription.trim() }]);
      setNewDescription("");
    }
  };

  const updateItem = (index: number, updates: Partial<FileItem>) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], ...updates };
    onItemsChange(newItems);
  };

  const removeItem = (index: number) => {
    onItemsChange(items.filter((_, i) => i !== index));
  };

  const handleFileChange = (index: number, file: File | null) => {
    if (file) {
      updateItem(index, { file, fileName: file.name });
    }
  };

  return (
    <div>
      <h3 className="text-lg font-medium mb-4">{title}</h3>
      
      {/* Add new item */}
      <div className="mb-6 p-4 border rounded-lg bg-muted/20">
        <Label htmlFor={`new-${title}`} className="text-sm font-medium">
          Add {title.toLowerCase().slice(0, -1)}
        </Label>
        <div className="flex gap-2 mt-2">
          <Input
            id={`new-${title}`}
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            placeholder="Enter description..."
            className="flex-1"
          />
          <Button onClick={addItem} disabled={!newDescription.trim()}>
            Add
          </Button>
        </div>
      </div>

      {/* Existing items */}
      <div className="space-y-4">
        {items.map((item, index) => (
          <Card key={index} className="p-4">
            <div className="flex justify-between items-start mb-3">
              <div className="flex-1">
                <p className="font-medium text-sm">{item.description}</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeItem(index)}
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex flex-col gap-3">
              {item.fileName ? (
                <div className="flex items-center gap-2 p-2 bg-muted rounded text-sm">
                  <FileText className="h-4 w-4" />
                  <span className="flex-1">{item.fileName}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => updateItem(index, { file: undefined, fileName: undefined })}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Input
                    type="file"
                    onChange={(e) => handleFileChange(index, e.target.files?.[0] || null)}
                    className="flex-1"
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.csv,.xlsx,.xls"
                  />
                  <Upload className="h-4 w-4 text-muted-foreground" />
                </div>
              )}
            </div>
          </Card>
        ))}
        
        {items.length === 0 && (
          <p className="text-sm text-muted-foreground italic">
            No {title.toLowerCase()} added yet
          </p>
        )}
      </div>
    </div>
  );
}
