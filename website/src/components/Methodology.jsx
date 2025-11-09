import { motion } from 'framer-motion';
import { FaQuestionCircle, FaBalanceScale, FaLayerGroup, FaCode, FaChartBar, FaClock } from 'react-icons/fa';
import { MdSpeed, MdDataExploration } from 'react-icons/md';

const Methodology = () => {
  const whyCompare = [
    {
      icon: FaBalanceScale,
      title: 'Different Architectural Philosophies',
      description: 'PostgreSQL represents traditional monolithic databases, while Spark embodies distributed computing - fundamentally different approaches to data processing.',
      color: 'blue',
    },
    {
      icon: MdSpeed,
      title: 'Performance vs Scalability Trade-offs',
      description: 'Understanding when low-latency single-node optimization beats distributed processing overhead, and vice versa.',
      color: 'purple',
    },
    {
      icon: FaCode,
      title: 'Real-World Decision Making',
      description: 'Data engineers face this choice daily: Should we use our existing RDBMS or invest in a distributed framework?',
      color: 'orange',
    },
  ];

  const queryTypes = [
    {
      type: 'Simple Aggregations',
      queries: ['Query 1', 'Query 3'],
      icon: FaChartBar,
      complexity: 'Low',
      color: 'green',
      description: 'Basic GROUP BY, COUNT, and AVG operations testing fundamental query execution.',
      tests: ['Optimizer efficiency', 'Startup overhead', 'Basic aggregation speed'],
    },
    {
      type: 'Complex Transformations',
      queries: ['Query 2'],
      icon: FaLayerGroup,
      complexity: 'High',
      color: 'red',
      description: 'Window functions, array operations (UNNEST/explode), and multi-level CTEs.',
      tests: ['Advanced SQL features', 'Query plan optimization', 'Memory management'],
    },
    {
      type: 'Multi-table Joins',
      queries: ['Query 5', 'Query 6'],
      icon: MdDataExploration,
      complexity: 'Medium',
      color: 'yellow',
      description: 'Testing join algorithms and optimizer decisions with multiple table relationships.',
      tests: ['Join strategy selection', 'Foreign key traversal', 'Query plan complexity'],
    },
    {
      type: 'String Operations',
      queries: ['Query 4'],
      icon: FaCode,
      complexity: 'Low',
      color: 'green',
      description: 'Parsing and manipulating text data with split, array functions.',
      tests: ['String processing efficiency', 'UDF performance', 'Type conversion overhead'],
    },
  ];

  const testingVariables = [
    {
      icon: FaLayerGroup,
      title: 'Data Volume',
      value: '4 Scales',
      description: '100, 1K, 10K, 100K rows',
      detail: 'Tests how performance changes with data growth',
    },
    {
      icon: FaCode,
      title: 'Query Patterns',
      value: '6 Types',
      description: 'Aggregations, joins, windows, strings',
      detail: 'Covers diverse real-world query scenarios',
    },
    {
      icon: FaClock,
      title: 'Execution Time',
      value: 'End-to-end',
      description: 'Includes optimization + execution',
      detail: 'Captures total user-facing latency',
    },
  ];

  const complexityColors = {
    Low: 'border-green-400 bg-green-400/10',
    Medium: 'border-yellow-400 bg-yellow-400/10',
    High: 'border-red-400 bg-red-400/10',
  };

  return (
    <section id="methodology" className="section bg-slate-950">
      <div className="container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
            Why This Comparison?
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Understanding query performance across different complexity types and data volumes
          </p>
        </motion.div>

        {/* Why Compare Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-8">
            <FaQuestionCircle className="text-3xl text-blue-400" />
            <h3 className="text-3xl font-bold">The Motivation</h3>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {whyCompare.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card"
              >
                <item.icon className={`text-4xl text-${item.color}-400 mb-4`} />
                <h4 className="text-xl font-bold mb-3">{item.title}</h4>
                <p className="text-slate-300">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Query Complexity Analysis */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-8">
            <FaLayerGroup className="text-3xl text-purple-400" />
            <h3 className="text-3xl font-bold">Query Complexity Categories</h3>
          </div>

          <div className="space-y-6">
            {queryTypes.map((queryType, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card"
              >
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Icon and Title */}
                  <div className="flex items-start gap-4 md:w-1/3">
                    <queryType.icon className={`text-4xl text-${queryType.color}-400 mt-1`} />
                    <div>
                      <h4 className="text-2xl font-bold mb-2">{queryType.type}</h4>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {queryType.queries.map((q, idx) => (
                          <span key={idx} className="badge badge-postgres text-xs">
                            {q}
                          </span>
                        ))}
                      </div>
                      <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold border-2 ${complexityColors[queryType.complexity]}`}>
                        {queryType.complexity} Complexity
                      </div>
                    </div>
                  </div>

                  {/* Description and Tests */}
                  <div className="md:w-2/3">
                    <p className="text-slate-300 mb-4">{queryType.description}</p>
                    <div className="bg-slate-900 rounded-lg p-4 border border-slate-800">
                      <p className="text-sm font-bold mb-2 text-slate-400">What We're Testing:</p>
                      <ul className="space-y-1">
                        {queryType.tests.map((test, idx) => (
                          <li key={idx} className="text-sm text-slate-300 flex items-start gap-2">
                            <span className="text-blue-400 mt-1">•</span>
                            {test}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Testing Variables */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-8">
            <MdSpeed className="text-3xl text-orange-400" />
            <h3 className="text-3xl font-bold">Performance Variables</h3>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testingVariables.map((variable, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card text-center"
              >
                <variable.icon className="text-5xl text-blue-400 mx-auto mb-4" />
                <h4 className="text-xl font-bold mb-2">{variable.title}</h4>
                <div className="text-3xl font-bold gradient-text mb-2">{variable.value}</div>
                <p className="text-slate-400 text-sm mb-3">{variable.description}</p>
                <p className="text-xs text-slate-500">{variable.detail}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Key Insight Callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="card border-2 border-blue-500/30 bg-blue-500/5"
        >
          <div className="flex items-start gap-4">
            <FaQuestionCircle className="text-4xl text-blue-400 flex-shrink-0 mt-1" />
            <div>
              <h4 className="text-2xl font-bold mb-3">The Core Question</h4>
              <p className="text-lg text-slate-300 mb-4">
                At what data scale and query complexity does the overhead of distributed computing
                (Spark) become worthwhile compared to a well-optimized single-node database (PostgreSQL)?
              </p>
              <p className="text-slate-400">
                By testing across 4 data volumes and 6 query types with varying complexity, we can
                provide data-driven recommendations for system selection based on your specific workload characteristics.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Methodology;
