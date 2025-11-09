import { motion } from 'framer-motion';
import { FaLightbulb, FaCheckCircle, FaDatabase, FaFire } from 'react-icons/fa';
import { SiPostgresql, SiApachespark } from 'react-icons/si';

const Findings = () => {
  const keyFindings = [
    {
      icon: FaCheckCircle,
      title: 'PostgreSQL Dominates on Small-Medium Datasets',
      description: 'PostgreSQL showed up to 959x faster execution on smaller datasets (100-10K rows) due to minimal overhead and optimized query planning.',
      color: 'blue',
    },
    {
      icon: FaLightbulb,
      title: 'Spark Overhead Significant for Simple Queries',
      description: 'Apache Spark has a consistent ~0.2-0.4s initialization overhead that makes it slower for simple queries, even at 100K rows.',
      color: 'orange',
    },
    {
      icon: FaDatabase,
      title: 'Complex Aggregations Favor PostgreSQL',
      description: 'Window functions, CTEs, and complex joins (Query 2) performed better in PostgreSQL, with its sophisticated query optimizer.',
      color: 'purple',
    },
    {
      icon: FaFire,
      title: 'String Operations Show Spark Potential',
      description: 'For string parsing operations (Query 4), Spark became competitive at larger scales, showing 7x better performance at 100K rows.',
      color: 'pink',
    },
  ];

  const recommendations = [
    {
      system: 'PostgreSQL',
      icon: SiPostgresql,
      color: 'postgres',
      useCases: [
        'Datasets under 1M rows',
        'Complex relational queries with joins',
        'ACID transaction requirements',
        'Low-latency query needs',
        'Traditional OLTP workloads',
      ],
    },
    {
      system: 'Apache Spark',
      icon: SiApachespark,
      color: 'spark',
      useCases: [
        'Datasets over 10M rows',
        'Batch processing workflows',
        'Machine learning pipelines',
        'Distributed data sources',
        'Fault-tolerant processing needs',
      ],
    },
  ];

  return (
    <section id="findings" className="section bg-slate-900">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
            Key Findings & Recommendations
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Insights from analyzing 6 queries across 4 different data sizes
          </p>
        </motion.div>

        {/* Key Findings Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {keyFindings.map((finding, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="card"
            >
              <finding.icon className={`text-4xl text-${finding.color}-400 mb-4`} />
              <h3 className="text-xl font-bold mb-3">{finding.title}</h3>
              <p className="text-slate-300">{finding.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Recommendations */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-3xl font-bold text-center mb-8">When to Use Each System</h3>
          <div className="grid md:grid-cols-2 gap-8">
            {recommendations.map((rec, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className={`card hover:border-${rec.color}-light`}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-16 h-16 rounded-full ${rec.color}-gradient flex items-center justify-center`}>
                    <rec.icon className="text-3xl text-white" />
                  </div>
                  <h4 className={`text-2xl font-bold text-${rec.color}-light`}>{rec.system}</h4>
                </div>
                <div className="space-y-3">
                  {rec.useCases.map((useCase, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <FaCheckCircle className={`text-${rec.color}-light mt-1 flex-shrink-0`} />
                      <span className="text-slate-300">{useCase}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Decision Tree */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="card text-center"
        >
          <h3 className="text-2xl font-bold mb-6">Quick Decision Guide</h3>
          <div className="max-w-2xl mx-auto space-y-4 text-left">
            <div className="p-4 bg-slate-800 rounded-lg border-l-4 border-postgres">
              <p className="font-bold mb-2">Choose PostgreSQL if:</p>
              <p className="text-slate-300">
                Your data fits on a single machine, you need low-latency queries, and you're working
                with structured relational data requiring ACID guarantees.
              </p>
            </div>
            <div className="p-4 bg-slate-800 rounded-lg border-l-4 border-spark">
              <p className="font-bold mb-2">Choose Apache Spark if:</p>
              <p className="text-slate-300">
                You're processing massive datasets (10M+ rows), need fault tolerance across distributed
                systems, or are building ML/batch processing pipelines.
              </p>
            </div>
            <div className="p-4 bg-slate-800 rounded-lg border-l-4 border-purple-400">
              <p className="font-bold mb-2">Consider a Hybrid Approach if:</p>
              <p className="text-slate-300">
                You need PostgreSQL for OLTP and real-time queries, while using Spark for ETL,
                analytics, and batch processing on the same data.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Findings;
