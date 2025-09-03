import React from 'react';
import { X, Zap } from 'lucide-react';

interface BoltModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BoltModal: React.FC<BoltModalProps> = ({ isOpen, onClose }) => {
  return (
    <div 
      className={`
        fixed inset-0 z-50 transition-all duration-500
        ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
      `}
      style={{ backgroundColor: 'rgba(6, 182, 212, 0.3)' }}
      onClick={onClose}
    >
      {/* Desktop: flex from bottom-left, Mobile: flex from bottom-center */}
      <div className="absolute inset-0 flex items-end justify-center md:items-end md:justify-start p-2 md:p-6 overflow-hidden">
        <div 
          className={`
            w-full max-w-4xl bg-black rounded-3xl border-2 border-cyan-400 p-4 md:p-8
            transform transition-all duration-500 ease-out
            max-h-[90vh] overflow-y-auto
            ${isOpen 
              ? 'translate-y-0 md:translate-x-0 opacity-100 scale-100' 
              : 'translate-y-full md:translate-y-full md:-translate-x-full opacity-0 scale-95'
            }
            md:max-w-4xl md:max-h-none md:overflow-visible
          `}
          onClick={(e) => e.stopPropagation()}
        >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-4">
          {/* First Column - Markdown Maker */}
          <div className="md:col-span-2 space-y-6">
            <div>
              <h3 className="text-sm md:text-lg font-thin uppercase text-cyan-400 mb-2 md:mb-3">What the heck is this?</h3>
              <p className="text-gray-300 text-xs md:text-sm leading-relaxed">
                Markdown Maker is a WordPress plugin that lets your users convert your content into formats easily understandable by AI agents, copilots, and GPTs.
              </p>
            </div>

            <div>
              <h3 className="text-sm md:text-lg font-thin uppercase text-cyan-400 mb-2 md:mb-3">Why is this a dream feature?</h3>
              <p className="text-gray-300 text-xs md:text-sm leading-relaxed">
                We've seen an increase not only in agent traffic, but in human users feeding content into agents. This is our take at embracing it, user first.
              </p>
            </div>

            <div>
              <h3 className="text-sm md:text-lg font-thin uppercase text-cyan-400 mb-2 md:mb-3">How does it work?</h3>
              <p className="text-gray-300 text-xs md:text-sm leading-relaxed">
                This is a standard PHP WordPress plugin (yes really!). You can{' '}
                <a 
                  href="https://github.com/clarklab/markdown-maker-wp-plugin/releases/tag/v1.0.0" 
                  className="text-cyan-400 hover:text-cyan-300 underline"
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  download the zip
                </a>
                {' '}and run it on your WordPress site. Need help?{' '}
                <a 
                  href="https://github.com/clarklab/markdown-maker-wp-plugin" 
                  className="text-cyan-400 hover:text-cyan-300 underline"
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  Ask me on GitHub
                </a>
              </p>
            </div>
          </div>

          {/* Second Column - Bolt */}
          <div className="space-y-6">
            {/* Bolt Logo - Large and Branded */}
            <div className="flex flex-col items-center text-center space-y-4">
              <img src="/bolt.svg" alt="Bolt" className="w-24 h-24 md:w-32 md:h-32" style={{ filter: 'drop-shadow(0 0 20px #06b6d4)' }} />
              <h2 className="text-lg md:text-3xl font-thin uppercase text-cyan-400">What is Bolt?</h2>
            </div>

            <div className="space-y-4">
              <p className="text-gray-300 text-xs md:text-sm leading-relaxed">
                Bolt.new is the easiest way to use AI to make apps, websites, and software. Prompt or code, create the way that makes sense to you.
              </p>

            </div>

            <a
              href="https://bolt.new"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-cyan-400 text-black rounded-lg font-medium hover:bg-cyan-300 transition-colors mt-6"
            >
              <Zap className="w-5 h-5" />
              Check out Bolt.new
            </a>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default BoltModal;
