import { motion } from 'framer-motion';
import { FaDatabase, FaClock, FaFilter } from 'react-icons/fa';
import { datasetStats } from '../data/performance';

const Dataset = () => {
  return (
    <section id="dataset" className="section bg-slate-900">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
            Dataset & Processing
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Working with the Yelp Open Dataset - millions of real-world reviews and businesses
          </p>
        </motion.div>

        {/* Dataset Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {/* Business Data */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="card"
          >
            <div className="flex items-center gap-3 mb-4">
              <FaDatabase className="text-3xl text-blue-400" />
              <h3 className="text-2xl font-bold">Businesses</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-slate-400">Rows</span>
                <span className="font-bold text-blue-400">{datasetStats.business.rows.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Columns</span>
                <span className="font-bold">{datasetStats.business.columns}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Size</span>
                <span className="font-bold">{datasetStats.business.sizeGB} GB</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Load Time</span>
                <span className="font-bold flex items-center gap-1">
                  <FaClock className="text-sm" />
                  {datasetStats.business.loadTimeSeconds}s
                </span>
              </div>
            </div>
          </motion.div>

          {/* Users Data */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="card"
          >
            <div className="flex items-center gap-3 mb-4">
              <FaDatabase className="text-3xl text-purple-400" />
              <h3 className="text-2xl font-bold">Users</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-slate-400">Rows</span>
                <span className="font-bold text-purple-400">{datasetStats.users.rows.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Columns</span>
                <span className="font-bold">{datasetStats.users.columns}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Size</span>
                <span className="font-bold">{datasetStats.users.sizeGB} GB</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Load Time</span>
                <span className="font-bold flex items-center gap-1">
                  <FaClock className="text-sm" />
                  {Math.floor(datasetStats.users.loadTimeSeconds / 60)}m {datasetStats.users.loadTimeSeconds % 60}s
                </span>
              </div>
            </div>
          </motion.div>

          {/* Reviews Data */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="card border-pink-400/30"
          >
            <div className="flex items-center gap-3 mb-4">
              <FaDatabase className="text-3xl text-pink-400" />
              <h3 className="text-2xl font-bold">Reviews</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-slate-400">Original Rows</span>
                <span className="font-bold text-pink-400">{datasetStats.reviews.originalRows.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Sampled Rows</span>
                <span className="font-bold flex items-center gap-1">
                  <FaFilter className="text-sm text-pink-400" />
                  {datasetStats.reviews.sampledRows.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Size</span>
                <span className="font-bold">{datasetStats.reviews.originalSizeGB} GB</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Sampling Time</span>
                <span className="font-bold flex items-center gap-1">
                  <FaClock className="text-sm" />
                  {Math.floor(datasetStats.reviews.samplingTimeSeconds / 60)}m {datasetStats.reviews.samplingTimeSeconds % 60}s
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Sampling Strategy */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="card"
        >
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold mb-2 flex items-center justify-center gap-2">
              <FaFilter className="text-pink-400" />
              Intelligent Sampling Strategy
            </h3>
            <p className="text-slate-400">Reducing 7M reviews to 1M while maintaining data integrity</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-pink-400 mb-2">86%</div>
              <div className="text-slate-400">Reduction in dataset size</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-400 mb-2">100%</div>
              <div className="text-slate-400">Referential integrity maintained</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-400 mb-2">Random</div>
              <div className="text-slate-400">Chunk-based sampling method</div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-slate-800 rounded-lg border border-slate-700">
            <p className="text-sm text-slate-300">
              <span className="font-bold text-blue-400">Why sample?</span> The full 7M review dataset
              would take over 9 minutes to load. By intelligently sampling 1M reviews using pandas'
              chunked JSON reader, we achieved manageable processing times while preserving statistical
              significance and maintaining foreign key relationships with users and businesses.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Dataset;
