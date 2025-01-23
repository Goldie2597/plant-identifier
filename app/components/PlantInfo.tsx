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
  imageUrl: string;
}

export default function PlantInfo({ plantData, imageUrl }: PlantInfoProps) {
  return (
    <div className="mt-6 p-6 bg-white rounded-lg shadow-lg">
      {/* Plant Name Section */}
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold text-green-800">{plantData.name.common}</h2>
        <p className="text-md italic text-green-600">{plantData.name.scientific}</p>
      </div>

      {/* Image Section */}
      <div className="mb-8">
        <div className="max-w-2xl mx-auto p-4 bg-gradient-to-b from-green-50 to-white rounded-xl border-2 border-green-100 shadow-xl">
          <div className="rounded-lg overflow-hidden shadow-md">
            <img
              src={imageUrl}
              alt={plantData.name.common}
              className="w-full h-[400px] object-contain bg-white"
            />
          </div>
          <p className="mt-2 text-center text-sm text-green-600 italic">
            {plantData.name.common} ({plantData.name.scientific})
          </p>
        </div>
      </div>

      {/* Description Section */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-green-700 mb-3">About this Plant</h3>
        <p className="text-gray-700 leading-relaxed">{plantData.description}</p>
      </div>

      {/* Care Instructions Table */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold text-green-700 mb-4">Care Guide</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead className="bg-green-50">
              <tr>
                <th className="px-6 py-3 border-b text-left text-sm font-semibold text-green-800">Aspect</th>
                <th className="px-6 py-3 border-b text-left text-sm font-semibold text-green-800">Requirements</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(plantData.careInstructions).map(([key, value]) => (
                <tr key={key} className="hover:bg-gray-50">
                  <td className="px-6 py-4 border-b text-sm font-medium text-green-700 capitalize">
                    {key}
                  </td>
                  <td className="px-6 py-4 border-b text-sm text-gray-700">
                    {value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Tips Section */}
      <div className="mt-8 p-4 bg-green-50 rounded-lg">
        <h3 className="text-lg font-semibold text-green-700 mb-2">Pro Tips 🌿</h3>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>Monitor the soil moisture regularly</li>
          <li>Rotate the plant periodically for even growth</li>
          <li>Clean the leaves to remove dust and maintain health</li>
          <li>Watch for signs of pests or disease</li>
        </ul>
      </div>
    </div>
  );
}