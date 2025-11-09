import { motion } from 'framer-motion';
import { SiPostgresql, SiApachespark } from 'react-icons/si';
import { FaCheckCircle } from 'react-icons/fa';

const Overview = () => {
  const postgresFeatures = [
    'Traditional RDBMS with ACID guarantees',
    'Optimized for complex joins and transactions',
    'Excellent for structured relational data',
    'Lower overhead for small-medium datasets',
    'Mature ecosystem and tooling',
  ];

  const sparkFeatures = [
    'Distributed computing framework',
    'Designed for big data processing',
    'Fault-tolerant and scalable',
    'In-memory computation capabilities',
    'Flexible data processing (batch/stream)',
  ];

  return (
    <section id="overview" className="section gradient-bg">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
            System Overview
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Comparing two fundamentally different approaches to data processing
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* PostgreSQL Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="card hover:border-postgres-light"
          >
            <div className="mb-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-full postgres-gradient flex items-center justify-center">
                  <SiPostgresql className="text-3xl text-white" />
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-postgres-light">PostgreSQL</h3>
                  <p className="text-slate-400">Relational Database</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {postgresFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-3"
                >
                  <FaCheckCircle className="text-postgres-light mt-1 flex-shrink-0" />
                  <span className="text-slate-300">{feature}</span>
                </motion.div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-slate-700">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-postgres-light">RDBMS</div>
                  <div className="text-sm text-slate-400">Architecture</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-postgres-light">SQL</div>
                  <div className="text-sm text-slate-400">Query Language</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Apache Spark Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="card hover:border-spark-light"
          >
            <div className="mb-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-full spark-gradient flex items-center justify-center">
                  <SiApachespark className="text-3xl text-white" />
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-spark-light">Apache Spark</h3>
                  <p className="text-slate-400">Distributed Processing</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {sparkFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-3"
                >
                  <FaCheckCircle className="text-spark-light mt-1 flex-shrink-0" />
                  <span className="text-slate-300">{feature}</span>
                </motion.div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-slate-700">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-spark-light">Distributed</div>
                  <div className="text-sm text-slate-400">Architecture</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-spark-light">PySpark</div>
                  <div className="text-sm text-slate-400">API Used</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Why Compare Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 card text-center"
        >
          <h3 className="text-2xl font-bold mb-4 gradient-text">Why This Comparison Matters</h3>
          <p className="text-lg text-slate-300 max-w-3xl mx-auto">
            Understanding when to use a traditional RDBMS versus a distributed processing framework
            is crucial for building scalable data systems. This analysis provides real-world
            performance benchmarks across different query patterns and data volumes, helping you
            make informed architectural decisions.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Overview;
