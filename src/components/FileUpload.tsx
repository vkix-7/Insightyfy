import React, { useCallback, useState } from 'react';
import { Upload, Trash2, PlayCircle } from 'lucide-react';
import Papa from 'papaparse';
import { Button } from './Button';
import { Toast } from './Toast';
import { useDataset } from '../hooks/useDataset';

export function FileUpload() {
  const { handleUpload, deleteDataset, isUploaded } = useDataset();
  const [showToast, setShowToast] = useState(false);

  const handleFileUpload = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      complete: async (results) => {
        const dataset = {
          name: file.name,
          columns: Object.keys(results.data[0]),
          data: results.data,
          rowCount: results.data.length,
          uploadDate: new Date()
        };

        const success = await handleUpload(dataset);
        if (success) {
          setShowToast(true);
        }
      }
    });
  }, [handleUpload]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this dataset?')) {
      await deleteDataset();
    }
  };

  const handleStartAnalysis = () => {
    // Analysis logic will be implemented later
    console.log('Starting analysis...');
  };

  return (
    <div className="w-full max-w-xl mx-auto space-y-6">
      <div className="p-6">
        <label className="flex flex-col items-center px-4 py-6 bg-white rounded-lg shadow-lg cursor-pointer hover:bg-gray-50 transition-colors">
          <Upload className="w-12 h-12 text-blue-500 mb-2" />
          <span className="text-lg font-medium text-gray-700">Upload CSV File</span>
          <span className="text-sm text-gray-500 mt-1">Drag and drop or click to select</span>
          <input
            type="file"
            className="hidden"
            accept=".csv"
            onChange={handleFileUpload}
          />
        </label>
      </div>

      <div className="flex justify-center space-x-4">
        <Button
          onClick={handleStartAnalysis}
          disabled={!isUploaded}
          className="flex items-center"
        >
          <PlayCircle className="w-5 h-5 mr-2" />
          Start Analysis
        </Button>

        <Button
          variant="warning"
          onClick={handleDelete}
          disabled={!isUploaded}
          className="flex items-center"
        >
          <Trash2 className="w-5 h-5 mr-2" />
          Delete Dataset
        </Button>
      </div>

      {showToast && (
        <Toast
          message="Dataset successfully uploaded"
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
}