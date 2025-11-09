import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { FaChartLine } from 'react-icons/fa';
import { performanceData } from '../data/performance';

const Performance = () => {
  const [selectedQuery, setSelectedQuery] = useState(1);

  // Format data for charts
  const getChartData = (queryNum) => {
    const queryKey = `query${queryNum}`;
    const data = performanceData[queryKey];
    const dataSizes = [100, 1000, 10000, 100000];

    return dataSizes.map(size => ({
      dataSize: size,
      PostgreSQL: data.postgres?.[size] || null,
      Spark: data.spark?.[size] || null,
    }));
  };

  const formatYAxis = (value) => {
    if (value < 1) return `${(value * 1000).toFixed(0)}ms`;
    return `${value.toFixed(2)}s`;
  };

  const formatTooltip = (value) => {
    if (value === null) return 'N/A';
    if (value < 1) return `${(value * 1000).toFixed(2)}ms`;
    return `${value.toFixed(3)}s`;
  };

  return (
    <section id="performance" className="section gradient-bg">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
            Performance Analysis
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Execution time comparison across different data volumes
          </p>
        </motion.div>

        {/* Query Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <div className="card">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <FaChartLine className="text-blue-400" />
              Select Query to Analyze
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <button
                  key={num}
                  onClick={() => setSelectedQuery(num)}
                  className={`p-3 rounded-lg font-bold transition-all ${
                    selectedQuery === num
                      ? 'bg-blue-500 text-white'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  Query {num}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="card mb-8"
        >
          <h3 className="text-2xl font-bold mb-6 text-center">
            Query {selectedQuery} Performance
          </h3>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart
              data={getChartData(selectedQuery)}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis
                dataKey="dataSize"
                stroke="#94A3B8"
                label={{ value: 'Dataset Size (rows)', position: 'insideBottom', offset: -5, fill: '#94A3B8' }}
                tickFormatter={(value) => value.toLocaleString()}
              />
              <YAxis
                stroke="#94A3B8"
                label={{ value: 'Execution Time', angle: -90, position: 'insideLeft', fill: '#94A3B8' }}
                tickFormatter={formatYAxis}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1E293B',
                  border: '1px solid #475569',
                  borderRadius: '8px',
                }}
                labelStyle={{ color: '#F1F5F9' }}
                formatter={formatTooltip}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="PostgreSQL"
                stroke="#336791"
                strokeWidth={3}
                dot={{ fill: '#336791', r: 6 }}
                activeDot={{ r: 8 }}
                connectNulls
              />
              <Line
                type="monotone"
                dataKey="Spark"
                stroke="#F97316"
                strokeWidth={3}
                dot={{ fill: '#F97316', r: 6 }}
                activeDot={{ r: 8 }}
                connectNulls
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Performance Summary Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="card overflow-x-auto"
        >
          <h3 className="text-2xl font-bold mb-6">Performance Summary (100K rows)</h3>
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="text-left p-3">Query</th>
                <th className="text-right p-3">PostgreSQL</th>
                <th className="text-right p-3">Spark</th>
                <th className="text-right p-3">Winner</th>
                <th className="text-right p-3">Speedup</th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4, 5].map((queryNum) => {
                const queryKey = `query${queryNum}`;
                const data = performanceData[queryKey];
                const pgTime = data.postgres?.[100000];
                const sparkTime = data.spark?.[100000];
                const winner = pgTime && sparkTime
                  ? pgTime < sparkTime ? 'PostgreSQL' : 'Spark'
                  : pgTime ? 'PostgreSQL' : sparkTime ? 'Spark' : 'N/A';
                const speedup = pgTime && sparkTime
                  ? pgTime < sparkTime
                    ? (sparkTime / pgTime).toFixed(1)
                    : (pgTime / sparkTime).toFixed(1)
                  : 'N/A';

                return (
                  <tr key={queryNum} className="border-b border-slate-800 hover:bg-slate-800/50">
                    <td className="p-3 font-bold">Query {queryNum}</td>
                    <td className="p-3 text-right font-mono text-postgres-light">
                      {pgTime ? formatTooltip(pgTime) : 'N/A'}
                    </td>
                    <td className="p-3 text-right font-mono text-spark-light">
                      {sparkTime ? formatTooltip(sparkTime) : 'N/A'}
                    </td>
                    <td className="p-3 text-right font-bold">
                      <span className={winner === 'PostgreSQL' ? 'text-postgres-light' : 'text-spark-light'}>
                        {winner}
                      </span>
                    </td>
                    <td className="p-3 text-right font-bold text-green-400">
                      {speedup !== 'N/A' ? `${speedup}x` : 'N/A'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </motion.div>
      </div>
    </section>
  );
};

export default Performance;
