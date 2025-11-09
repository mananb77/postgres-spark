import { motion } from 'framer-motion';
import { FaEnvelope, FaGithub } from 'react-icons/fa';
import { SiPostgresql, SiApachespark, SiPython, SiReact } from 'react-icons/si';
import { teamMembers, projectInfo } from '../data/teamInfo';

const Team = () => {
  return (
    <section id="team" className="section gradient-bg">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
            Project Team
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Built by data engineers passionate about performance analysis
          </p>
        </motion.div>

        {/* Team Members */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="card text-center"
            >
              <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-3xl font-bold">
                {member.name.split(' ').map(n => n[0]).join('')}
              </div>
              <h3 className="text-xl font-bold mb-1">{member.name}</h3>
              <p className="text-slate-400 mb-3">{member.role}</p>
              <a
                href={`mailto:${member.email}`}
                className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
              >
                <FaEnvelope />
                {member.email}
              </a>
            </motion.div>
          ))}
        </div>

        {/* Technologies Used */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="card"
        >
          <h3 className="text-2xl font-bold mb-6 text-center">Technologies Used</h3>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="flex items-center gap-2 badge badge-postgres text-lg px-4 py-2">
              <SiPostgresql />
              PostgreSQL
            </div>
            <div className="flex items-center gap-2 badge badge-spark text-lg px-4 py-2">
              <SiApachespark />
              Apache Spark
            </div>
            <div className="flex items-center gap-2 badge text-lg px-4 py-2">
              <SiPython />
              Python
            </div>
            <div className="flex items-center gap-2 badge text-lg px-4 py-2">
              <SiReact />
              React
            </div>
          </div>
        </motion.div>

        {/* GitHub Link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <a
            href={projectInfo.githubRepo}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary inline-flex items-center gap-2"
          >
            <FaGithub className="text-xl" />
            View on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Team;
