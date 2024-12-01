import React from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../utils/db';
import { FileSpreadsheet } from 'lucide-react';

export function DatasetList() {
  const datasets = useLiveQuery(() => db.metadata.toArray());

  if (!datasets?.length) {
    return null;
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <h2 className="text-xl font-semibold mb-4">Your Datasets</h2>
      <div className="grid gap-4">
        {datasets.map((dataset) => (
          <div key={dataset.id} className="bg-white rounded-lg shadow p-4 flex items-center">
            <FileSpreadsheet className="w-6 h-6 text-blue-500 mr-3" />
            <div>
              <h3 className="font-medium">{dataset.name}</h3>
              <p className="text-sm text-gray-500">
                {dataset.rowCount} rows • {dataset.columns.length} columns • 
                Uploaded {new Date(dataset.uploadDate).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}