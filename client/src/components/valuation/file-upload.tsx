import { useState, useCallback } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, FileText, CheckCircle, X, Info } from "lucide-react";

interface FileUploadProps {
  valuationId?: string;
  onNext: () => void;
  onPrevious: () => void;
  isLoading?: boolean;
  onFilesUpdate?: (files: UploadedFile[]) => void;
}

interface UploadedFile {
  id: string;
  fileName: string;
  fileSize: number;
  mimeType: string;
}

export default function FileUpload({ valuationId, onNext, onPrevious, isLoading, onFilesUpdate }: FileUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const { toast } = useToast();

  const uploadMutation = useMutation({
    mutationFn: async (file: File) => {
      console.log("Creating FormData with file:", file.name);
      const formData = new FormData();
      formData.append('file', file);
      
      console.log("Sending file upload request...");
      // Upload to temporary files endpoint that doesn't require valuation ID
      const response = await fetch('/api/files/upload', {
        method: 'POST',
        body: formData,
        credentials: 'include', // Include cookies for authentication
      });
      
      console.log("Upload response status:", response.status);
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Upload failed:", errorText);
        throw new Error(`Upload failed: ${errorText}`);
      }
      
      const result = await response.json();
      console.log("Upload successful:", result);
      return result;
    },
    onSuccess: (data) => {
      console.log("Upload mutation success:", data);
      const newFiles = [...uploadedFiles, data];
      setUploadedFiles(newFiles);
      onFilesUpdate?.(newFiles);
      toast({
        title: "File uploaded successfully",
        description: "Your file has been uploaded and will be included in the valuation.",
      });
    },
    onError: (error: Error) => {
      console.error("Upload mutation error:", error);
      toast({
        title: "Upload failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    console.log("File selected:", file.name, file.type, file.size);
    
    // Validate file type - be more permissive to handle different MIME types
    const allowedTypes = [
      'application/pdf', 
      'text/csv', 
      'application/csv',
      'application/vnd.ms-excel', 
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ];
    
    // Also check file extensions as fallback
    const fileName = file.name.toLowerCase();
    const allowedExtensions = ['.pdf', '.csv', '.xls', '.xlsx'];
    const hasValidExtension = allowedExtensions.some(ext => fileName.endsWith(ext));
    
    if (!allowedTypes.includes(file.type) && !hasValidExtension) {
      toast({
        title: "Invalid file type",
        description: `Please upload PDF, CSV, or Excel files only. File type: ${file.type}`,
        variant: "destructive",
      });
      return;
    }

    // Validate file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please upload files smaller than 10MB.",
        variant: "destructive",
      });
      return;
    }

    console.log("File validation passed, uploading...");
    uploadMutation.mutate(file);
  };

  const removeFile = (fileId: string) => {
    const newFiles = uploadedFiles.filter(f => f.id !== fileId);
    setUploadedFiles(newFiles);
    onFilesUpdate?.(newFiles);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <Card className="shadow-lg">
      <CardContent className="p-8">
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-slate-900 mb-2">Upload Financial Documents (Optional)</h3>
          <div className="flex items-start text-slate-600 mb-4">
            <Info className="w-5 h-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
            <p>
              <strong>Why we ask this:</strong> While optional, uploading P&L statements, balance sheets, or tax returns can provide additional context for your valuation. Files are stored securely and not automatically processed in this version.
            </p>
          </div>
        </div>

        {/* File Upload Area */}
        <div
          className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            dragActive
              ? "border-primary bg-blue-50"
              : "border-slate-300 hover:border-slate-400"
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            type="file"
            accept=".pdf,.csv,.xls,.xlsx"
            onChange={handleChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            disabled={uploadMutation.isPending}
          />
          
          <div className="space-y-4">
            <div className="mx-auto w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center">
              <Upload className="w-8 h-8 text-slate-500" />
            </div>
            
            <div>
              <p className="text-lg font-medium text-slate-900">
                Drop files here or click to browse
              </p>
              <p className="text-sm text-slate-500 mt-1">
                PDF, CSV, or Excel files up to 10MB
              </p>
            </div>
            
            {uploadMutation.isPending && (
              <div className="flex items-center justify-center">
                <div className="animate-spin w-6 h-6 border-2 border-primary border-t-transparent rounded-full" />
                <span className="ml-2 text-sm text-slate-600">Uploading...</span>
              </div>
            )}
          </div>
        </div>

        {/* Uploaded Files */}
        {uploadedFiles.length > 0 && (
          <div className="mt-6">
            <h4 className="text-lg font-semibold text-slate-900 mb-4">Uploaded Files</h4>
            <div className="space-y-3">
              {uploadedFiles.map((file) => (
                <div key={file.id} className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <div>
                      <p className="font-medium text-slate-900">{file.fileName}</p>
                      <p className="text-sm text-slate-600">{formatFileSize(file.fileSize)}</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFile(file.id)}
                    className="text-slate-500 hover:text-red-500"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Supported File Types */}
        <div className="mt-6 p-4 bg-slate-50 rounded-lg">
          <h5 className="font-medium text-slate-900 mb-2">Supported Documents:</h5>
          <div className="grid grid-cols-2 gap-2 text-sm text-slate-600">
            <div className="flex items-center">
              <FileText className="w-4 h-4 mr-2" />
              <span>Profit & Loss Statements</span>
            </div>
            <div className="flex items-center">
              <FileText className="w-4 h-4 mr-2" />
              <span>Balance Sheets</span>
            </div>
            <div className="flex items-center">
              <FileText className="w-4 h-4 mr-2" />
              <span>Tax Returns</span>
            </div>
            <div className="flex items-center">
              <FileText className="w-4 h-4 mr-2" />
              <span>Financial Statements</span>
            </div>
          </div>
        </div>

        <div className="flex justify-between pt-6">
          <Button variant="ghost" onClick={onPrevious} disabled={isLoading}>
            Previous
          </Button>
          <Button onClick={onNext} disabled={isLoading}>
            {isLoading ? "Calculating..." : "Calculate Valuation"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
