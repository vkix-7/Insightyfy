export interface DatasetMetadata {
  id?: number;
  name: string;
  columns: string[];
  rowCount: number;
  uploadDate: Date;
}

export interface Dataset extends DatasetMetadata {
  data: Record<string, any>[];
}