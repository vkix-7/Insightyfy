import { useState, useCallback } from 'react';
import { db } from '../utils/db';
import { Dataset } from '../types/dataset';

export function useDataset() {
  const [currentDataset, setCurrentDataset] = useState<Dataset | null>(null);
  const [isUploaded, setIsUploaded] = useState(false);

  const handleUpload = useCallback(async (dataset: Dataset) => {
    try {
      const id = await db.datasets.add(dataset);
      await db.metadata.add({
        ...dataset,
        id
      });
      setCurrentDataset({ ...dataset, id });
      setIsUploaded(true);
      return true;
    } catch (error) {
      console.error('Error saving dataset:', error);
      return false;
    }
  }, []);

  const deleteDataset = useCallback(async () => {
    if (!currentDataset?.id) return;
    
    try {
      await db.datasets.delete(currentDataset.id);
      await db.metadata.delete(currentDataset.id);
      setCurrentDataset(null);
      setIsUploaded(false);
    } catch (error) {
      console.error('Error deleting dataset:', error);
      throw error;
    }
  }, [currentDataset]);

  return {
    currentDataset,
    isUploaded,
    handleUpload,
    deleteDataset
  };
}