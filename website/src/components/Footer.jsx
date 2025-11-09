import { FaGithub, FaDatabase } from 'react-icons/fa';
import { SiPostgresql, SiApachespark } from 'react-icons/si';
import { projectInfo } from '../data/teamInfo';

const Footer = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 py-12">
      <div className="container">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Project Info */}
          <div>
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <FaDatabase className="text-blue-400" />
              {projectInfo.title}
            </h3>
            <p className="text-slate-400 mb-4">
              {projectInfo.description}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#overview" className="hover:text-blue-400 transition-colors">Overview</a></li>
              <li><a href="#methodology" className="hover:text-blue-400 transition-colors">Methodology</a></li>
              <li><a href="#dataset" className="hover:text-blue-400 transition-colors">Dataset</a></li>
              <li><a href="#queries" className="hover:text-blue-400 transition-colors">Queries</a></li>
              <li><a href="#performance" className="hover:text-blue-400 transition-colors">Performance</a></li>
              <li><a href="#findings" className="hover:text-blue-400 transition-colors">Findings</a></li>
            </ul>
          </div>

          {/* Technologies */}
          <div>
            <h3 className="text-xl font-bold mb-4">Technologies</h3>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 text-postgres-light">
                <SiPostgresql className="text-2xl" />
                <span>PostgreSQL</span>
              </div>
              <div className="flex items-center gap-2 text-spark-light">
                <SiApachespark className="text-2xl" />
                <span>Apache Spark</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-400">
            © 2024 PostgreSQL vs Apache Spark Analysis. All rights reserved.
          </p>
          <a
            href={projectInfo.githubRepo}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
          >
            <FaGithub className="text-xl" />
            <span>View Source Code</span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
