import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import { Trash2, Upload, FileText } from "lucide-react";

interface DocumentItem {
  name: string;
  canProvide: boolean;
  notApplicable: boolean;
  file?: File;
  fileName?: string;
}

interface DocumentUploadWithCheckboxProps {
  documents: DocumentItem[];
  onDocumentsChange: (documents: DocumentItem[]) => void;
  documentOptions: string[];
}

export default function DocumentUploadWithCheckbox({ 
  documents, 
  onDocumentsChange, 
  documentOptions 
}: DocumentUploadWithCheckboxProps) {
  
  // Initialize documents if empty
  const initializeDocuments = () => {
    if (documents.length === 0) {
      const initialDocs = documentOptions.map(name => ({
        name,
        canProvide: false,
        notApplicable: false,
        file: undefined,
        fileName: undefined
      }));
      onDocumentsChange(initialDocs);
      return initialDocs;
    }
    return documents;
  };

  const currentDocuments = initializeDocuments();

  const updateDocument = (index: number, updates: Partial<DocumentItem>) => {
    const newDocuments = [...currentDocuments];
    newDocuments[index] = { ...newDocuments[index], ...updates };
    onDocumentsChange(newDocuments);
  };

  const handleFileChange = (index: number, file: File | null) => {
    if (file) {
      updateDocument(index, { file, fileName: file.name });
    }
  };

  const handleCanProvideChange = (index: number, checked: boolean) => {
    const doc = currentDocuments[index];
    // Only allow checking if document is uploaded or if unchecking
    if (!checked || doc.fileName) {
      updateDocument(index, { canProvide: checked });
    }
  };

  const handleNotApplicableChange = (index: number, checked: boolean) => {
    updateDocument(index, { 
      notApplicable: checked,
      canProvide: checked ? false : currentDocuments[index].canProvide
    });
  };

  const removeFile = (index: number) => {
    updateDocument(index, { 
      file: undefined, 
      fileName: undefined,
      canProvide: false
    });
  };

  return (
    <div className="space-y-4">
      {currentDocuments.map((doc, index) => (
        <Card key={doc.name} className="p-4">
          <div className="space-y-3">
            {/* Document name and checkboxes */}
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <p className="text-sm font-medium">{doc.name}</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={`provide-${index}`}
                    checked={doc.canProvide}
                    disabled={doc.notApplicable || (!doc.fileName && !doc.canProvide)}
                    onCheckedChange={(checked) => handleCanProvideChange(index, checked as boolean)}
                    className={doc.notApplicable ? "opacity-50" : ""}
                  />
                  <label 
                    htmlFor={`provide-${index}`} 
                    className={`text-sm cursor-pointer ${doc.notApplicable ? 'line-through opacity-50' : ''}`}
                  >
                    Uploaded
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={`na-${index}`}
                    checked={doc.notApplicable}
                    onCheckedChange={(checked) => handleNotApplicableChange(index, checked as boolean)}
                  />
                  <label htmlFor={`na-${index}`} className="text-sm cursor-pointer">
                    Not Applicable
                  </label>
                </div>
              </div>
            </div>

            {/* File upload section */}
            {!doc.notApplicable && (
              <div className="mt-3">
                {doc.fileName ? (
                  <div className="flex items-center gap-2 p-2 bg-muted rounded text-sm">
                    <FileText className="h-4 w-4" />
                    <span className="flex-1">{doc.fileName}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(index)}
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
            )}
          </div>
        </Card>
      ))}
    </div>
  );
}