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
          className="absolute top-3 right-3 md:top-12 md:right-12 text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* First Column - Markdown Maker */}
          <div className="md:col-span-3 space-y-6">
            <div>
              <h3 className="text-sm md:text-sm font-thin uppercase text-cyan-400 mb-2 md:mb-3">What the heck is this?</h3>
              <p className="text-gray-300 text-xs md:text-sm leading-relaxed">
                Markdown Maker is a WordPress plugin that lets users convert your content into formats easily understandable by AI agents, copilots, and GPTs.
              </p>
            </div>

            <div>
              <h3 className="text-sm md:text-sm font-thin uppercase text-cyan-400 mb-2 md:mb-3">Why is this a dream feature?</h3>
              <p className="text-gray-300 text-xs md:text-sm leading-relaxed">
                I've got multiple clients asking for it. Bolt <a href="https://x.com/boltdotnew/status/1960410197580767285" className="text-cyan-400 hover:text-cyan-300 underline" target="_blank" rel="noopener noreferrer">asked for my favorite Dream Feature</a>. This is it.
              </p>
            </div>

            <div>
              <h3 className="text-sm md:text-sm font-thin uppercase text-cyan-400 mb-2 md:mb-3">How does it work?</h3>
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
                {' '}and run it on your WP site. Need help?{' '}
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
          <div className="md:col-span-2 space-y-6 bg-cyan-400/20 rounded-xl p-4">

          <div className="flex md:flex-col gap-4 items-center justify-center">
            {/* Bolt Logo - Large and Branded */}
            <div className="flex flex-col items-center text-center space-y-4 shrink-0">
              <img src="/bolt.svg" alt="Bolt" className="w-24 h-24 md:w-32 md:h-32 animate-rock" style={{ filter: 'drop-shadow(0 0 20px #000000)' }} />
            </div>

            <div className="space-y-4">
              <p className="text-gray-300 text-xs leading-relaxed text-center">
                Bolt.new is the easiest way to use AI to make apps, websites, and software.
              </p>

            </div>
            </div>

            <a
              href="https://bolt.new"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 px-6 py-3 bg-cyan-400 text-black rounded-lg font-medium hover:bg-cyan-300 transition-colors mt-6"
            >
              <Zap className="w-5 h-5" />
              Check out Bolt
            </a>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default BoltModal;
