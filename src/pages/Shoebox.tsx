import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Upload, FileText, Trash2, Download } from "lucide-react";

interface UploadedFile {
  name: string;
  fileName: string;
  uploadDate: string;
  source: string; // Which form section/field it came from
  file?: File;
}

const Shoebox = () => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [dragActive, setDragActive] = useState(false);

  useEffect(() => {
    // Collect files from localStorage or form data
    // This would typically come from your form state management
    loadFilesFromStorage();
  }, []);

  const loadFilesFromStorage = () => {
    // Placeholder for loading files from form data
    // In a real app, this would load from your form state or database
    const mockFiles: UploadedFile[] = [
      {
        name: "Equipment Invoice",
        fileName: "tractor_invoice_2024.pdf",
        uploadDate: "2024-01-15",
        source: "Equipment & Machinery"
      },
      {
        name: "Bank Statement",
        fileName: "january_bank_statement.pdf", 
        uploadDate: "2024-02-01",
        source: "Tax Documents"
      }
    ];
    setUploadedFiles(mockFiles);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFiles = (files: FileList) => {
    Array.from(files).forEach((file) => {
      const newFile: UploadedFile = {
        name: file.name.split('.')[0],
        fileName: file.name,
        uploadDate: new Date().toISOString().split('T')[0],
        source: "Manual Upload",
        file
      };
      setUploadedFiles(prev => [...prev, newFile]);
    });
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files);
    }
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const downloadFile = (file: UploadedFile) => {
    if (file.file) {
      const url = URL.createObjectURL(file.file);
      const a = document.createElement('a');
      a.href = url;
      a.download = file.fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Farmer's Shoebox</h1>
          <p className="text-gray-600">All your uploaded documents in one place</p>
        </div>

        {/* Upload Area */}
        <Card className="p-6 mb-8">
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragActive 
                ? "border-primary bg-primary/5" 
                : "border-gray-300 hover:border-gray-400"
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Upload new documents
            </h3>
            <p className="text-gray-500 mb-4">
              Drag and drop files here, or click to select files
            </p>
            <Input
              type="file"
              multiple
              onChange={handleFileInput}
              className="hidden"
              id="file-upload"
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.csv,.xlsx,.xls"
            />
            <Button asChild variant="outline">
              <label htmlFor="file-upload" className="cursor-pointer">
                Choose Files
              </label>
            </Button>
          </div>
        </Card>

        {/* Files List */}
        <div className="grid gap-4">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Your Documents ({uploadedFiles.length})
          </h2>
          
          {uploadedFiles.length === 0 ? (
            <Card className="p-8 text-center">
              <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <p className="text-gray-500">No documents uploaded yet</p>
            </Card>
          ) : (
            <div className="grid gap-3">
              {uploadedFiles.map((file, index) => (
                <Card key={index} className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FileText className="h-8 w-8 text-blue-500" />
                      <div>
                        <h3 className="font-medium text-gray-900">{file.name}</h3>
                        <p className="text-sm text-gray-500">{file.fileName}</p>
                        <div className="flex gap-4 text-xs text-gray-400 mt-1">
                          <span>Uploaded: {file.uploadDate}</span>
                          <span>Source: {file.source}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {file.file && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => downloadFile(file)}
                          className="text-blue-600 hover:text-blue-700"
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFile(index)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shoebox;