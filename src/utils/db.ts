import Dexie, { Table } from 'dexie';
import { Dataset, DatasetMetadata } from '../types/dataset';

export class DashboardDB extends Dexie {
  datasets!: Table<Dataset>;
  metadata!: Table<DatasetMetadata>;

  constructor() {
    super('DashboardDB');
    this.version(1).stores({
      datasets: '++id, name, uploadDate',
      metadata: '++id, name, uploadDate'
    });
  }
}

export const db = new DashboardDB();