import { motion } from 'framer-motion';
import QueryShowcase from './QueryShowcase';
import { queries } from '../data/queries';

const Queries = () => {
  return (
    <section id="queries" className="section bg-slate-900">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
            Query Analysis
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Six analytical queries comparing SQL and PySpark implementations with real performance data
          </p>
        </motion.div>

        <div className="space-y-8">
          {queries.map((query) => (
            <QueryShowcase key={query.id} query={query} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Queries;
