import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar } from 'recharts';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../utils/db';
import { analyzeDataset } from '../utils/analysis';

export function Dashboard() {
  const datasets = useLiveQuery(() => db.datasets.toArray());
  
  if (!datasets?.length) {
    return null;
  }

  const currentDataset = datasets[datasets.length - 1];
  const analysis = analyzeDataset(currentDataset);

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-6">Analysis Dashboard</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Summary Statistics */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium mb-4">Summary Statistics</h3>
          <div className="space-y-4">
            {Object.entries(analysis.summary).map(([column, stats]: [string, any]) => (
              <div key={column} className="border-b pb-2">
                <h4 className="font-medium">{column}</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>Mean: {stats.mean.toFixed(2)}</div>
                  <div>Count: {stats.count}</div>
                  <div>Min: {stats.min.toFixed(2)}</div>
                  <div>Max: {stats.max.toFixed(2)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Correlation Matrix */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium mb-4">Correlation Matrix</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr>
                  <th className="px-2 py-1"></th>
                  {Object.keys(analysis.correlations).map(col => (
                    <th key={col} className="px-2 py-1">{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Object.entries(analysis.correlations).map(([row, cols]: [string, any]) => (
                  <tr key={row}>
                    <td className="font-medium px-2 py-1">{row}</td>
                    {Object.entries(cols).map(([col, value]: [string, number]) => (
                      <td key={col} className="px-2 py-1">
                        {value.toFixed(2)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Data Visualization */}
        <div className="bg-white rounded-lg shadow p-6 col-span-2">
          <h3 className="text-lg font-medium mb-4">Data Visualization</h3>
          <div className="space-y-6">
            {Object.keys(analysis.summary).map(column => (
              <div key={column}>
                <h4 className="font-medium mb-2">{column} Distribution</h4>
                <BarChart width={600} height={300} data={currentDataset.data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey={column} />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey={column} fill="#3b82f6" />
                </BarChart>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}