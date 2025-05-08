import React from 'react';
import { Github } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-gray-900 mt-8 py-6 shadow-inner transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Cat Facts Explorer. All rights reserved.
          </p>
          
          <div className="flex items-center space-x-4">
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200"
            >
              <Github className="h-5 w-5" />
            </a>
            
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Powered by <a 
                href="https://catfact.ninja/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                Cat Fact API
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;