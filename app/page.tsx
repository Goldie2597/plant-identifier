// app/page.tsx
'use client';

import React from 'react';
import { useState } from 'react';
import ImageUpload from './components/ImageUpload';
import PlantInfo from './components/PlantInfo';

interface PlantData {
  name: string;
  description: string;
  careInstructions: string;
}

export default function Home(): React.ReactElement {
  const [plantData, setPlantData] = useState<PlantData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 p-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-green-800 text-center mb-6">
          Plant Identifier
        </h1>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <ImageUpload 
            setPlantData={setPlantData} 
            setIsLoading={setIsLoading}
          />
          {isLoading && <p className="text-center mt-4">Analyzing plant...</p>}
          {plantData && <PlantInfo plantData={plantData} />}
        </div>
      </div>
    </main>
  );
}
