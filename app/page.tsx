// app/page.tsx
'use client';

import React from 'react';
import { useState } from 'react';
import ImageUpload from './components/ImageUpload';
import PlantInfo from './components/PlantInfo';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import { Leaf, Camera, Info, BookOpen, Sprout, Settings } from 'lucide-react';
import JasaLogo from './components/JasaLogo';

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
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="fixed inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-green-300/60 via-blue-400/60 to-purple-400/60 animate-gradient-xy"></div>
        <div className="absolute inset-0 bg-gradient-to-bl from-blue-300/60 via-green-400/60 to-teal-400/60 animate-gradient-xy animation-delay-2000"></div>
        <div className="absolute inset-0 backdrop-blur-[100px]"></div>
      </div>
      
      {/* Content Container */}
      <div className="relative flex flex-col min-h-screen z-10">
        <Navigation />
        
        <main className="flex-grow">
          {/* Header Section */}
          <header className="bg-white/30 backdrop-blur-md shadow-lg mb-8">
            <div className="max-w-5xl mx-auto py-8 px-4">
              <div className="bg-white/40 backdrop-blur-sm rounded-xl p-6 shadow-md hover:shadow-xl hover:bg-white/50 transition-all duration-300">
                <div className="flex flex-col items-center justify-center space-y-4">
                  <JasaLogo />
                  <h1 className="text-4xl font-bold text-green-800">
                    Plant Identifier by Just a spell away
                  </h1>
                </div>
              </div>
            </div>
          </header>

          <div className="max-w-5xl mx-auto px-4">
            {/* Upload Section */}
            <section className="bg-white/20 backdrop-blur-md rounded-lg shadow-lg p-8 mb-12">
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

            {/* Features Section */}
            {!plantData && (
              <section className="mb-12">
                <div className="max-w-md mx-auto bg-white/20 backdrop-blur-md rounded-xl shadow-lg p-6 mb-6 border border-white/30">
                  <h2 className="text-3xl font-bold text-green-800 text-center">How It Works</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Upload Card */}
                  <div className="bg-white/20 backdrop-blur-md rounded-lg p-6 shadow-lg hover:bg-white/30 transition-all">
                    <div className="flex items-center justify-center w-12 h-12 bg-green-100/50 rounded-lg mb-4">
                      <Camera className="w-6 h-6 text-green-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-green-800 mb-2">Take a Photo</h3>
                    <p className="text-green-700">
                      Simply upload a clear photo of any plant you want to identify. Our AI will analyze it instantly.
                    </p>
                  </div>

                  {/* Analysis Card */}
                  <div className="bg-white/20 backdrop-blur-md rounded-lg p-6 shadow-lg hover:bg-white/30 transition-all">
                    <div className="flex items-center justify-center w-12 h-12 bg-green-100/50 rounded-lg mb-4">
                      <BookOpen className="w-6 h-6 text-green-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-green-800 mb-2">Get Details</h3>
                    <p className="text-green-700">
                      Receive comprehensive information including plant name, scientific details, and description.
                    </p>
                  </div>

                  {/* Care Guide Card */}
                  <div className="bg-white/20 backdrop-blur-md rounded-lg p-6 shadow-lg hover:bg-white/30 transition-all">
                    <div className="flex items-center justify-center w-12 h-12 bg-green-100/50 rounded-lg mb-4">
                      <Sprout className="w-6 h-6 text-green-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-green-800 mb-2">Care Instructions</h3>
                    <p className="text-green-700">
                      Learn how to care for your plant with detailed watering, sunlight, and maintenance tips.
                    </p>
                  </div>
                </div>
              </section>
            )}

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
    </div>
  );
}
