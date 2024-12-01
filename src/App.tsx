import React from 'react';
import { FileUpload } from './components/FileUpload';
import { DatasetList } from './components/DatasetList';
import { Dashboard } from './components/Dashboard';
import { BarChart3 } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex items-center">
          <BarChart3 className="w-8 h-8 text-blue-500 mr-3" />
          <h1 className="text-3xl font-bold text-gray-900">Data Analysis Dashboard</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <FileUpload />
        <DatasetList />
        <Dashboard />
      </main>
    </div>
  );
}

export default App;