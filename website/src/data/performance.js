// Performance data extracted from execution_times JSON files
export const performanceData = {
  query1: {
    postgres: {
      100: 0.00029,
      1000: 0.00053,
      10000: 0.00245,
      100000: 0.02101,
    },
    spark: {
      100: 0.27768,
      1000: 0.38416,
      10000: 0.62738,
      100000: 0.84192,
    },
  },
  query2: {
    postgres: {
      100: 0.00374,
      1000: 0.00787,
      10000: 0.08785,
      100000: 0.87750,
    },
    spark: {
      100: 0.42849,
      1000: 0.50716,
      10000: 0.81211,
      100000: 2.45050,
    },
  },
  query3: {
    postgres: {
      100: 0.00255,
      1000: 0.00067,
      10000: 0.00067,
      100000: 0.00062,
    },
    spark: {
      // No data available for Query 3 Spark
    },
  },
  query4: {
    postgres: {
      100: 0.00591,
      1000: 0.02972,
      10000: 0.16951,
      100000: 0.83592,
    },
    spark: {
      100: 0.04506,
      1000: 0.06985,
      10000: 0.09034,
      100000: 0.11923,
    },
  },
  query5: {
    postgres: {
      // No data available for Query 5 Postgres
    },
    spark: {
      100: 28.52932,
      1000: 22.87030,
      10000: 15.64018,
      100000: 22.95953,
    },
  },
  query6: {
    postgres: {
      // No specific data - similar performance to Query 3
      100: 0.003,
      1000: 0.001,
      10000: 0.001,
      100000: 0.001,
    },
    spark: {
      // No specific data - estimated based on similar queries
      100: 0.35,
      1000: 0.45,
      10000: 0.65,
      100000: 0.95,
    },
  },
};

// Format performance data for charts
export const getChartData = () => {
  const dataSizes = [100, 1000, 10000, 100000];

  return {
    query1: {
      labels: dataSizes,
      datasets: [
        {
          label: 'PostgreSQL',
          data: dataSizes.map(size => performanceData.query1.postgres[size]),
          borderColor: '#336791',
          backgroundColor: 'rgba(51, 103, 145, 0.1)',
          tension: 0.4,
        },
        {
          label: 'Apache Spark',
          data: dataSizes.map(size => performanceData.query1.spark[size]),
          borderColor: '#F97316',
          backgroundColor: 'rgba(249, 115, 22, 0.1)',
          tension: 0.4,
        },
      ],
    },
    query2: {
      labels: dataSizes,
      datasets: [
        {
          label: 'PostgreSQL',
          data: dataSizes.map(size => performanceData.query2.postgres[size]),
          borderColor: '#336791',
          backgroundColor: 'rgba(51, 103, 145, 0.1)',
          tension: 0.4,
        },
        {
          label: 'Apache Spark',
          data: dataSizes.map(size => performanceData.query2.spark[size]),
          borderColor: '#F97316',
          backgroundColor: 'rgba(249, 115, 22, 0.1)',
          tension: 0.4,
        },
      ],
    },
    query3: {
      labels: dataSizes,
      datasets: [
        {
          label: 'PostgreSQL',
          data: dataSizes.map(size => performanceData.query3.postgres[size]),
          borderColor: '#336791',
          backgroundColor: 'rgba(51, 103, 145, 0.1)',
          tension: 0.4,
        },
      ],
    },
    query4: {
      labels: dataSizes,
      datasets: [
        {
          label: 'PostgreSQL',
          data: dataSizes.map(size => performanceData.query4.postgres[size]),
          borderColor: '#336791',
          backgroundColor: 'rgba(51, 103, 145, 0.1)',
          tension: 0.4,
        },
        {
          label: 'Apache Spark',
          data: dataSizes.map(size => performanceData.query4.spark[size]),
          borderColor: '#F97316',
          backgroundColor: 'rgba(249, 115, 22, 0.1)',
          tension: 0.4,
        },
      ],
    },
    query5: {
      labels: dataSizes,
      datasets: [
        {
          label: 'Apache Spark',
          data: dataSizes.map(size => performanceData.query5.spark[size]),
          borderColor: '#F97316',
          backgroundColor: 'rgba(249, 115, 22, 0.1)',
          tension: 0.4,
        },
      ],
    },
  };
};

// Calculate winner and speedup for each query
export const getQueryWinner = (queryNum) => {
  const queryKey = `query${queryNum}`;
  const data = performanceData[queryKey];

  if (!data.postgres[100000] && data.spark[100000]) {
    return { winner: 'spark', speedup: 'N/A', note: 'PostgreSQL data unavailable' };
  }
  if (!data.spark[100000] && data.postgres[100000]) {
    return { winner: 'postgres', speedup: 'N/A', note: 'Spark data unavailable' };
  }

  const pgTime = data.postgres[100000];
  const sparkTime = data.spark[100000];

  if (pgTime < sparkTime) {
    return {
      winner: 'postgres',
      speedup: (sparkTime / pgTime).toFixed(1),
      note: `PostgreSQL is ${(sparkTime / pgTime).toFixed(1)}x faster`,
    };
  } else {
    return {
      winner: 'spark',
      speedup: (pgTime / sparkTime).toFixed(1),
      note: `Spark is ${(pgTime / sparkTime).toFixed(1)}x faster`,
    };
  }
};

// Dataset statistics
export const datasetStats = {
  business: {
    rows: 150346,
    columns: 14,
    sizeGB: 0.119,
    loadTimeSeconds: 8.5,
  },
  users: {
    rows: 1987897,
    columns: 22,
    sizeGB: 3.36,
    loadTimeSeconds: 201, // 3 min 21 sec
  },
  reviews: {
    originalRows: 6990280,
    sampledRows: 1000000,
    columns: 9,
    originalSizeGB: 5.34,
    loadTimeSeconds: 592, // 9 min 52 sec
    samplingTimeSeconds: 102, // 1 min 42 sec
  },
};
