import { motion } from 'framer-motion';
import { FaTable, FaKey, FaArrowRight } from 'react-icons/fa';
import erDiagram from '../assets/images/er_diagram.png';
import reviewsPipeline from '../assets/images/1_reviews_diagram.jpg';
import businessUsersPipeline from '../assets/images/2_business_users_diagram.jpg';

const Architecture = () => {
  const tables = [
    {
      name: 'yelp_business',
      icon: '🏢',
      color: 'blue',
      fields: ['business_id (PK)', 'name', 'city', 'state', 'stars', 'review_count', 'categories'],
    },
    {
      name: 'yelp_users',
      icon: '👤',
      color: 'purple',
      fields: ['user_id (PK)', 'name', 'review_count', 'yelping_since', 'friends', 'average_stars'],
    },
    {
      name: 'yelp_reviews',
      icon: '⭐',
      color: 'pink',
      fields: ['review_id (PK)', 'user_id (FK)', 'business_id (FK)', 'stars', 'date', 'text'],
    },
  ];

  return (
    <section id="architecture" className="section gradient-bg">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
            Database Architecture
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Normalized relational schema with foreign key relationships
          </p>
        </motion.div>

        {/* ER Diagram */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="card mb-12"
        >
          <h3 className="text-2xl font-bold mb-6 text-center">Entity-Relationship Diagram</h3>
          <div className="bg-white p-6 rounded-lg">
            <img
              src={erDiagram}
              alt="ER Diagram"
              className="w-full max-w-3xl mx-auto"
            />
          </div>
        </motion.div>

        {/* Tables Schema */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {tables.map((table, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="card"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-4xl">{table.icon}</span>
                <h3 className="text-xl font-bold font-mono">{table.name}</h3>
              </div>
              <div className="space-y-2">
                {table.fields.map((field, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 text-sm"
                  >
                    {field.includes('PK') && <FaKey className="text-yellow-400" />}
                    {field.includes('FK') && <FaKey className="text-blue-400" />}
                    {!field.includes('K)') && <FaTable className="text-slate-500" />}
                    <span className="text-slate-300 font-mono text-xs">{field}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Foreign Key Relationships */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="card mb-12"
        >
          <h3 className="text-2xl font-bold mb-6 text-center">Foreign Key Relationships</h3>
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 text-center">
            <div className="flex items-center gap-4">
              <div className="px-4 py-2 bg-pink-500/20 border border-pink-500/50 rounded-lg">
                <span className="font-mono text-pink-400">yelp_reviews</span>
              </div>
              <FaArrowRight className="text-blue-400" />
              <div className="px-4 py-2 bg-purple-500/20 border border-purple-500/50 rounded-lg">
                <span className="font-mono text-purple-400">yelp_users</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="px-4 py-2 bg-pink-500/20 border border-pink-500/50 rounded-lg">
                <span className="font-mono text-pink-400">yelp_reviews</span>
              </div>
              <FaArrowRight className="text-blue-400" />
              <div className="px-4 py-2 bg-blue-500/20 border border-blue-500/50 rounded-lg">
                <span className="font-mono text-blue-400">yelp_business</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Data Pipeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <h3 className="text-2xl font-bold text-center mb-6">Data Processing Pipeline</h3>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="card">
              <h4 className="text-xl font-bold mb-4">Reviews Pipeline</h4>
              <img
                src={reviewsPipeline}
                alt="Reviews Data Pipeline"
                className="w-full rounded-lg"
              />
            </div>
            <div className="card">
              <h4 className="text-xl font-bold mb-4">Business & Users Pipeline</h4>
              <img
                src={businessUsersPipeline}
                alt="Business and Users Data Pipeline"
                className="w-full rounded-lg"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Architecture;
