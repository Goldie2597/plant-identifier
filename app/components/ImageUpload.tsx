// app/components/ImageUpload.tsx
'use client';
import { useState } from 'react';
import { Upload } from 'lucide-react';

interface ImageUploadProps {
  setPlantData: (data: any) => void;
  setIsLoading: (loading: boolean) => void;
  setSelectedImage: (image: string | null) => void;
}

export default function ImageUpload({ setPlantData, setIsLoading, setSelectedImage }: ImageUploadProps) {
  const [error, setError] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState<boolean>(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);
    
    try {
      // Create a new FileReader instance
      const reader = new FileReader();
      
      // Read the file as Data URL
      reader.readAsDataURL(file);

      // Wait for the FileReader to complete
      const base64Image = await new Promise<string>((resolve, reject) => {
        reader.onload = () => {
          const result = reader.result as string;
          setSelectedImage(result);  // Set the preview image
          resolve(result);
        };
        reader.onerror = () => reject(new Error('Failed to read file'));
      });

      setIsLoading(true);
      const response = await fetch('/api/identify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: base64Image }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to identify plant');
      }

      const data = await response.json();
      setPlantData(data);
    } catch (error) {
      console.error('Error:', error);
      setError(error instanceof Error ? error.message : 'An error occurred');
      setPlantData(null);
      setSelectedImage(null);
    } finally {
      setIsLoading(false);
    }
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

    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const input = document.createElement('input');
      input.files = e.dataTransfer.files;
      handleImageUpload({ target: input } as any);
    }
  };

  return (
    <div>
      <div
        className={`relative flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer transition-colors
          ${dragActive 
            ? 'border-green-500 bg-green-50' 
            : 'border-green-300 bg-green-50 hover:bg-green-100'
          }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <Upload className={`w-8 h-8 mb-2 ${dragActive ? 'text-green-600' : 'text-green-500'}`} />
          <p className="mb-2 text-sm text-gray-500">
            {dragActive ? 'Drop your image here' : 'Click to upload or drag and drop'}
          </p>
          <p className="text-xs text-gray-500">JPG, PNG up to 10MB</p>
        </div>
        <input
          type="file"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          accept="image/*"
          onChange={handleImageUpload}
        />
      </div>
      {error && (
        <p className="mt-4 text-red-500 text-center">{error}</p>
      )}
    </div>
  );
}