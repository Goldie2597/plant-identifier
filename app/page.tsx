// app/page.tsx
'use client';

import React from 'react';
import { useState } from 'react';
import ImageUpload from './components/ImageUpload';
import PlantInfo from './components/PlantInfo';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import { Leaf } from 'lucide-react';

interface PlantData {
  name: {
    common: string;
    scientific: string;
  };
  description: string;
  careInstructions: {
    watering?: string;
    sunlight?: string;
    soil?: string;
    temperature?: string;
    fertilizing?: string;
  };
}

export default function Home(): React.ReactElement {
  const [plantData, setPlantData] = useState<PlantData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow bg-gradient-to-b from-green-50 to-green-100 pb-16">
        {/* Header Section */}
        <header className="bg-white shadow-sm mb-8">
          <div className="max-w-5xl mx-auto py-8 px-4">
            <div className="flex items-center justify-center space-x-2">
              <Leaf className="w-8 h-8 text-green-600" />
              <h1 className="text-4xl font-bold text-green-800">Plant Identifier</h1>
            </div>
            <p className="mt-4 text-center text-gray-600 text-lg">
              Upload a photo of any plant and get detailed information about it
            </p>
          </div>
        </header>

        <div className="max-w-5xl mx-auto px-4">
          {/* Upload Section */}
          <section className="bg-white rounded-lg shadow-md p-8 mb-8">
            <ImageUpload 
              setPlantData={setPlantData} 
              setIsLoading={setIsLoading}
              setSelectedImage={setSelectedImage}
            />
            {isLoading && (
              <div className="text-center mt-6">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
                <p className="mt-3 text-green-600 text-lg">Analyzing your plant...</p>
              </div>
            )}
          </section>

          {/* Results Section */}
          {plantData && selectedImage && (
            <section className="mb-8">
              <PlantInfo plantData={plantData} imageUrl={selectedImage} />
            </section>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
