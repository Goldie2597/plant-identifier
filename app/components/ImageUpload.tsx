// app/components/ImageUpload.tsx
'use client';
import { useState } from 'react';
import { Upload } from 'lucide-react';

interface ImageUploadProps {
  setPlantData: (data: any) => void;
  setIsLoading: (loading: boolean) => void;
}

export default function ImageUpload({ setPlantData, setIsLoading }: ImageUploadProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);
    
    try {
      // Create a new FileReader instance
      const reader = new FileReader();
      
      // Set up the FileReader onload handler for preview
      reader.onload = (e) => setSelectedImage(e.target?.result as string);
      
      // Read the file as Data URL
      reader.readAsDataURL(file);

      // Wait for the FileReader to complete
      const base64Image = await new Promise<string>((resolve, reject) => {
        reader.onload = () => resolve(reader.result as string);
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
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-green-300 border-dashed rounded-lg cursor-pointer bg-green-50 hover:bg-green-100">
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <Upload className="w-8 h-8 mb-2 text-green-500" />
          <p className="mb-2 text-sm text-gray-500">Click to upload image</p>
          <p className="text-xs text-gray-500">JPG, PNG up to 10MB</p>
        </div>
        <input
          type="file"
          className="hidden"
          accept="image/*"
          onChange={handleImageUpload}
        />
      </label>
      {error && (
        <p className="mt-4 text-red-500 text-center">{error}</p>
      )}
      {selectedImage && (
        <img
          src={selectedImage}
          alt="Selected plant"
          className="mt-4 max-w-full h-auto rounded-lg"
        />
      )}
    </div>
  );
}