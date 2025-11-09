import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaBars, FaTimes } from 'react-icons/fa';
import { SiPostgresql, SiApachespark } from 'react-icons/si';
import { projectInfo } from '../data/teamInfo';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Overview', href: '#overview' },
    { name: 'Methodology', href: '#methodology' },
    { name: 'Dataset', href: '#dataset' },
    { name: 'Queries', href: '#queries' },
    { name: 'Performance', href: '#performance' },
    { name: 'Findings', href: '#findings' },
  ];

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-slate-900/95 backdrop-blur-lg border-b border-slate-800 shadow-lg'
            : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <a href="#" className="flex items-center gap-3 group">
              <div className="flex items-center gap-2">
                <SiPostgresql className="text-2xl text-postgres-light group-hover:scale-110 transition-transform" />
                <span className="text-slate-400 font-bold">vs</span>
                <SiApachespark className="text-2xl text-spark-light group-hover:scale-110 transition-transform" />
              </div>
              <span className="hidden md:block font-bold text-lg gradient-text">
                Performance Comparison
              </span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="px-4 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-all duration-200 font-medium"
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* GitHub Link */}
            <div className="flex items-center gap-4">
              <a
                href={projectInfo.githubRepo}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition-all duration-200 border border-slate-700 hover:border-slate-600"
              >
                <FaGithub className="text-xl" />
                <span className="font-medium">GitHub</span>
              </a>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-slate-800 transition-colors"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <FaTimes className="text-2xl" />
                ) : (
                  <FaBars className="text-2xl" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={false}
          animate={{
            height: isMobileMenuOpen ? 'auto' : 0,
            opacity: isMobileMenuOpen ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
          className="md:hidden overflow-hidden bg-slate-900/98 backdrop-blur-lg border-t border-slate-800"
        >
          <div className="container mx-auto px-4 py-4 space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={handleLinkClick}
                className="block px-4 py-3 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-all duration-200 font-medium"
              >
                {link.name}
              </a>
            ))}
            <a
              href={projectInfo.githubRepo}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleLinkClick}
              className="flex items-center gap-2 px-4 py-3 rounded-lg bg-slate-800 hover:bg-slate-700 transition-all duration-200 border border-slate-700"
            >
              <FaGithub className="text-xl" />
              <span className="font-medium">View on GitHub</span>
            </a>
          </div>
        </motion.div>
      </motion.nav>

      {/* Spacer to prevent content from being hidden under fixed navbar */}
      <div className="h-16"></div>
    </>
  );
};

export default Navbar;
