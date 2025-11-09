import { useState } from 'react';
import { motion } from 'framer-motion';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { FaCode, FaTrophy, FaBolt, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { SiPostgresql, SiApachespark } from 'react-icons/si';
import { getQueryWinner } from '../data/performance';

const QueryShowcase = ({ query }) => {
  const [showSql, setShowSql] = useState(false);
  const [showSpark, setShowSpark] = useState(false);
  const winner = getQueryWinner(query.id);

  const complexityColors = {
    Low: 'text-green-400 border-green-400',
    Medium: 'text-yellow-400 border-yellow-400',
    High: 'text-red-400 border-red-400',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="card mb-8"
    >
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl font-bold gradient-text">Q{query.id}</span>
              <h3 className="text-2xl font-bold">{query.title}</h3>
            </div>
            <p className="text-slate-400 mb-3">{query.objective}</p>
            <p className="text-slate-300">{query.description}</p>
          </div>
          <div className="ml-4">
            <div className={`badge ${complexityColors[query.complexity]}`}>
              {query.complexity}
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="flex flex-wrap gap-2">
          {query.features.map((feature, index) => (
            <span
              key={index}
              className="badge"
            >
              {feature}
            </span>
          ))}
        </div>
      </div>

      {/* Winner Badge */}
      {winner.winner && (
        <div className="mb-6 p-4 rounded-lg border-2 flex items-center gap-4"
          style={{
            borderColor: winner.winner === 'postgres' ? 'var(--postgres-color)' : 'var(--spark-color)',
            backgroundColor: winner.winner === 'postgres' ? 'rgba(51, 103, 145, 0.1)' : 'rgba(249, 115, 22, 0.1)',
          }}
        >
          <FaTrophy className={`text-3xl ${winner.winner === 'postgres' ? 'text-postgres-light' : 'text-spark-light'}`} />
          <div className="flex-1">
            <div className="font-bold text-lg flex items-center gap-2">
              {winner.winner === 'postgres' ? (
                <>
                  <SiPostgresql className="text-postgres-light" />
                  <span className="text-postgres-light">PostgreSQL Wins</span>
                </>
              ) : (
                <>
                  <SiApachespark className="text-spark-light" />
                  <span className="text-spark-light">Apache Spark Wins</span>
                </>
              )}
            </div>
            <div className="text-slate-300 flex items-center gap-2">
              <FaBolt className="text-yellow-400" />
              {winner.note}
            </div>
          </div>
        </div>
      )}

      {/* Code Sections */}
      <div className="space-y-4">
        {/* PostgreSQL Code */}
        <div>
          <button
            onClick={() => setShowSql(!showSql)}
            className="w-full flex items-center justify-between p-4 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors"
          >
            <div className="flex items-center gap-3">
              <SiPostgresql className="text-2xl text-postgres-light" />
              <span className="font-bold">PostgreSQL Query</span>
            </div>
            {showSql ? <FaChevronUp /> : <FaChevronDown />}
          </button>

          {showSql && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="mt-2"
            >
              <SyntaxHighlighter
                language="sql"
                style={vscDarkPlus}
                customStyle={{
                  borderRadius: '0.75rem',
                  padding: '1.5rem',
                  fontSize: '0.875rem',
                  maxHeight: '400px',
                  overflowY: 'auto',
                }}
              >
                {query.sqlCode}
              </SyntaxHighlighter>
            </motion.div>
          )}
        </div>

        {/* Spark Code */}
        <div>
          <button
            onClick={() => setShowSpark(!showSpark)}
            className="w-full flex items-center justify-between p-4 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors"
          >
            <div className="flex items-center gap-3">
              <SiApachespark className="text-2xl text-spark-light" />
              <span className="font-bold">Apache Spark (PySpark) Code</span>
            </div>
            {showSpark ? <FaChevronUp /> : <FaChevronDown />}
          </button>

          {showSpark && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="mt-2"
            >
              <SyntaxHighlighter
                language="python"
                style={vscDarkPlus}
                customStyle={{
                  borderRadius: '0.75rem',
                  padding: '1.5rem',
                  fontSize: '0.875rem',
                  maxHeight: '400px',
                  overflowY: 'auto',
                }}
              >
                {query.sparkCode}
              </SyntaxHighlighter>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default QueryShowcase;
