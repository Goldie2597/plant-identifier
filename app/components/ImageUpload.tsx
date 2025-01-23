// app/components/ImageUpload.tsx
'use client';
import { useState, useRef } from 'react';
import { Upload, Camera } from 'lucide-react';

interface ImageUploadProps {
  setPlantData: (data: any) => void;
  setIsLoading: (loading: boolean) => void;
  setSelectedImage: (image: string | null) => void;
}

export default function ImageUpload({ setPlantData, setIsLoading, setSelectedImage }: ImageUploadProps) {
  const [error, setError] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showCamera, setShowCamera] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);
    processImage(file);
  };

  const processImage = async (file: File | Blob) => {
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

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setShowCamera(true);
    } catch (err) {
      setError('Unable to access camera. Please make sure you have granted camera permissions.');
    }
  };

  const captureImage = async () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx?.drawImage(videoRef.current, 0, 0);
      
      // Convert the canvas to a blob
      canvas.toBlob(async (blob) => {
        if (blob) {
          // Stop the camera stream
          const stream = videoRef.current?.srcObject as MediaStream;
          stream?.getTracks().forEach(track => track.stop());
          setShowCamera(false);
          
          // Process the captured image
          await processImage(blob);
        }
      }, 'image/jpeg', 0.8);
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

  if (showCamera) {
    return (
      <div className="relative">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          className="w-full h-64 object-cover rounded-lg"
        />
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-4">
          <button
            onClick={captureImage}
            className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-500 transition-colors flex items-center space-x-2"
          >
            <Camera className="w-5 h-5" />
            <span>Capture Photo</span>
          </button>
          <button
            onClick={() => {
              const stream = videoRef.current?.srcObject as MediaStream;
              stream?.getTracks().forEach(track => track.stop());
              setShowCamera(false);
            }}
            className="bg-gray-600 text-white px-6 py-2 rounded-full hover:bg-gray-500 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Upload Image Button */}
        <button
          onClick={() => fileInputRef.current?.click()}
          className="flex-1 bg-green-600 hover:bg-green-500 text-white rounded-lg p-4 flex items-center justify-center space-x-3 transition-colors"
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <Upload className="w-6 h-6" />
          <span className="font-semibold">Upload Image</span>
        </button>

        {/* Take Photo Button */}
        <button
          onClick={startCamera}
          className="flex-1 bg-green-600 hover:bg-green-500 text-white rounded-lg p-4 flex items-center justify-center space-x-3 transition-colors"
        >
          <Camera className="w-6 h-6" />
          <span className="font-semibold">Take Photo</span>
        </button>

        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
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