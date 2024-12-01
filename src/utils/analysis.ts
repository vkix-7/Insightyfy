import { Dataset } from '../types/dataset';

export function analyzeDataset(dataset: Dataset) {
  const numericColumns = dataset.columns.filter(column => 
    dataset.data.every(row => !isNaN(parseFloat(row[column])))
  );

  const analysis = {
    summary: {},
    correlations: {}
  };

  // Calculate basic statistics for numeric columns
  numericColumns.forEach(column => {
    const values = dataset.data.map(row => parseFloat(row[column]));
    analysis.summary[column] = {
      mean: values.reduce((a, b) => a + b, 0) / values.length,
      min: Math.min(...values),
      max: Math.max(...values),
      count: values.length
    };
  });

  // Calculate correlations between numeric columns
  numericColumns.forEach(col1 => {
    analysis.correlations[col1] = {};
    numericColumns.forEach(col2 => {
      if (col1 !== col2) {
        const correlation = calculateCorrelation(
          dataset.data.map(row => parseFloat(row[col1])),
          dataset.data.map(row => parseFloat(row[col2]))
        );
        analysis.correlations[col1][col2] = correlation;
      }
    });
  });

  return analysis;
}

function calculateCorrelation(x: number[], y: number[]): number {
  const n = x.length;
  const sum_x = x.reduce((a, b) => a + b, 0);
  const sum_y = y.reduce((a, b) => a + b, 0);
  const sum_xy = x.reduce((acc, curr, i) => acc + curr * y[i], 0);
  const sum_x2 = x.reduce((a, b) => a + b * b, 0);
  const sum_y2 = y.reduce((a, b) => a + b * b, 0);

  const numerator = n * sum_xy - sum_x * sum_y;
  const denominator = Math.sqrt((n * sum_x2 - sum_x * sum_x) * (n * sum_y2 - sum_y * sum_y));

  return denominator === 0 ? 0 : numerator / denominator;
}