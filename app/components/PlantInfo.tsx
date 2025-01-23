// app/components/PlantInfo.tsx
'use client';

interface PlantInfoProps {
  plantData: {
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
  };
}

export default function PlantInfo({ plantData }: PlantInfoProps) {
  return (
    <div className="mt-6 p-4 bg-green-50 rounded-lg">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-green-800">{plantData.name.common}</h2>
        <p className="text-sm italic text-green-600">{plantData.name.scientific}</p>
      </div>
      
      <div className="space-y-4">
        <div>
          <h3 className="font-semibold text-green-700">Description</h3>
          <p className="text-gray-700">{plantData.description}</p>
        </div>
        
        <div>
          <h3 className="font-semibold text-green-700 mb-2">Care Instructions</h3>
          <div className="space-y-2">
            {Object.entries(plantData.careInstructions).map(([key, value]) => (
              <div key={key}>
                <span className="font-medium text-green-600 capitalize">{key}: </span>
                <span className="text-gray-700">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}