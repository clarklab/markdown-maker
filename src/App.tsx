import { useState, useEffect, useRef } from 'react';
import { Copy, Zap, FileText, Github } from 'lucide-react';
import RippleButton from './components/RippleButton';
import TypingText from './components/TypingText';

function App() {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const vantaRef = useRef<any>(null);
  
  const phrases = ['agents', 'LLMs', 'copilots', 'GPTs', 'tools'];
  
  useEffect(() => {
    const currentPhrase = phrases[currentPhraseIndex];
    
    if (isTyping) {
      if (displayText.length < currentPhrase.length) {
        const timeout = setTimeout(() => {
          setDisplayText(currentPhrase.slice(0, displayText.length + 1));
        }, 100);
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => {
          setIsTyping(false);
        }, 2000);
        return () => clearTimeout(timeout);
      }
    } else {
      if (displayText.length > 0) {
        const timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, 50);
        return () => clearTimeout(timeout);
      } else {
        setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
        setIsTyping(true);
      }
    }
  }, [displayText, isTyping, currentPhraseIndex, phrases]);

  // Vanta.js background effect
  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).VANTA) {
      vantaRef.current = (window as any).VANTA.HALO({
        el: ".hero",
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00
      });
    }
    
    return () => {
      if (vantaRef.current) {
        vantaRef.current.destroy();
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white font-mono">
      {/* Hero Section */}
      <div className="hero relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-gray-900 to-pink-900/40"></div>
        
        
        {/* Navigation */}
        <nav className="relative z-10 flex items-center justify-between px-3 md:px-6 pt-3 md:py-8 lg:px-8">
          <div className="flex items-center space-x-2">
            <img src="/mm.svg" alt="Markdown Maker" className=" h-6 md:h-8 w-6 md:w-8" />
            <span className="text-sm md:text-xl font-extralight">Markdown Maker</span>
          </div>
            <RippleButton
              as="a"
              href="https://github.com/clarklab/markdown-maker-wp-plugin/releases/tag/v1.0.0" 
              className="inline-flex items-center px-2.5 md:px-5 py-3 bg-cyan-400 text-gray-900 rounded-lg text-xs md:text-lg font-medium hover:bg-cyan-300 transition-colors"
            >
              Get WP Plugin
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor" className="w-5 md:w-6 h-5 md:h-6 ml-1 md:ml-3">
                <path d="m720-80 120-120-28-28-72 72v-164h-40v164l-72-72-28 28L720-80ZM480-800 243-663l237 137 237-137-237-137ZM120-321v-318q0-22 10.5-40t29.5-29l280-161q10-5 19.5-8t20.5-3q11 0 21 3t19 8l280 161q19 11 29.5 29t10.5 40v159h-80v-116L479-434 200-596v274l240 139v92L160-252q-19-11-29.5-29T120-321ZM720 0q-83 0-141.5-58.5T520-200q0-83 58.5-141.5T720-400q83 0 141.5 58.5T920-200q0 83-58.5 141.5T720 0ZM480-491Z"/>
              </svg>
            </RippleButton>
        </nav>

        {/* Hero Content */}
        <div className="hero relative z-10 px-6 py-12 lg:px-8 lg:py-24">
          
          <div className="mx-auto max-w-5xl text-center">
            <h1 className="text-3xl md:text-4xl font-extralight tracking-tight sm:text-6xl lg:text-7xl">
              Make your WordPress site talk to{' '}
              <span className="bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent">
                {displayText}
                <span className="animate-pulse">|</span>
              </span>
            </h1>
            <p className="mt-6 text-sm md:text-lg leading-4.5 md:leading-8 text-gray-300 max-w-2xl mx-auto">
              Search traffic is down. Users don't read. AI is eating your lunch. Give your site a fighting chance by making it easy for your user's AI agents or workflows to read & understand.
            </p>
            <div className="mt-10 flex flex-col md:flex-row items-center justify-center gap-x-4 gap-y-4">
            <RippleButton
              as="a"
              href="https://github.com/clarklab/markdown-maker-wp-plugin/releases/tag/v1.0.0" 
              className="inline-flex items-center px-6 py-4 bg-cyan-400 text-gray-900 rounded-lg text-base md:text-xl font-medium hover:bg-cyan-300 transition-colors"
            >
              Get WP Plugin
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor" className="w-6 h-6 ml-3">
                <path d="m720-80 120-120-28-28-72 72v-164h-40v164l-72-72-28 28L720-80ZM480-800 243-663l237 137 237-137-237-137ZM120-321v-318q0-22 10.5-40t29.5-29l280-161q10-5 19.5-8t20.5-3q11 0 21 3t19 8l280 161q19 11 29.5 29t10.5 40v159h-80v-116L479-434 200-596v274l240 139v92L160-252q-19-11-29.5-29T120-321ZM720 0q-83 0-141.5-58.5T520-200q0-83 58.5-141.5T720-400q83 0 141.5 58.5T920-200q0 83-58.5 141.5T720 0ZM480-491Z"/>
              </svg>
            </RippleButton>
              <a 
                href="https://github.com/clarklab/markdown-maker-wp-plugin" 
                className="group inline-flex items-center px-4 py-2 text-gray-300 hover:text-cyan-400 transition-colors"
              >
                <span className="text-cyan-400 inline-block pr-1 group-hover:-translate-x-1 transition-transform duration-300">[</span> View on GitHub <span className="text-cyan-400 pl-1 pl-1 group-hover:translate-x-1 transition-transform duration-300">]</span>
              </a>
            </div>
          </div>
        </div>



        {/* Code Preview */}
        <div className="relative z-10 px-6 pb-20 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <div className="rounded-lg bg-gray-800 p-6 shadow-2xl border border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <span className="text-xs text-gray-400">converted.md</span>
              </div>
              <TypingText 
                text={`# My WordPress Post

Welcome to my blog post about **AI and WordPress**.

This content was automatically converted from WordPress 
to markdown format using Markdown Maker.

## Key Benefits
- Clean formatting
- AI-ready structure
- Copy-paste friendly`}
                className="markdown-preview text-sm md:text-base text-gray-300 overflow-x-auto"
                speed={30}
                delay={1000}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 lg:px-8 bg-gray-800">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-3xl font-extralight tracking-tight sm:text-4xl">
              Built for the{' '}
              <span className="bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent">AI Era</span>
            </h2>
            <p className="mt-4 text-sm md:text-lg text-gray-400 max-w-2xl mx-auto">
              We built a real WordPress plugin (yes really!) to make converting your WordPress content to markdown easy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3">
            {/* Feature 1 */}
            <div className="group relative bg-gray-900 rounded-t-xl md:rounded-l-xl md:rounded-tr-none p-8 border-2 border-gray-700 hover:border-cyan-400/50 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-400/10 relative top-[2px] md:top-0 md:left-[2px] hover:z-10">
              <div className="mb-6">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-500 to-cyan-400 text-gray-900">
                  <Zap className="h-6 w-6" />
                </div>
              </div>
              <h3 className="text-xl font-extralight mb-4 group-hover:text-cyan-400 transition-colors">
                One-Click Conversion
              </h3>
              <p className="text-sm md:text-base text-gray-400">
                Convert any WordPress post or page to clean markdown format with a single click. 
                No complex settings or configurations required. No loading time or waiting.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group relative bg-gray-900 rounded-none md:rounded-none p-8 border-2 border-gray-700 border-t-0 border-t-2 hover:border-pink-400/50 transition-all duration-300 hover:shadow-xl hover:shadow-pink-400/10 hover:z-10">
              <div className="mb-6">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br from-pink-500 to-pink-400 text-gray-900">
                  <Copy className="h-6 w-6" />
                </div>
              </div>
              <h3 className="text-xl font-extralight mb-4 group-hover:text-pink-400 transition-colors">
                Copy-Paste Perfect
              </h3>
              <p className="text-sm md:text-base text-gray-400">
                Converted text is optimized for LLMs and AI agents. Clean, accurate formatting 
                ensures your content works perfectly with ChatGPT, Claude, Perplexity, and more.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group relative bg-gray-900 rounded-b-xl md:rounded-r-xl md:rounded-bl-none p-8 border-2 border-gray-700 border-t-2 hover:border-cyan-400/50 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-400/10 relative -top-[2px] md:-top-0 md:-left-[2px] hover:z-10">
              <div className="mb-6">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-500 to-pink-400 text-gray-900">
                  <FileText className="h-6 w-6" />
                </div>
              </div>
              <h3 className="text-xl font-extralight mb-4 group-hover:text-cyan-400 transition-colors">
                No AI Guarentee
              </h3>
              <p className="text-sm md:text-base text-gray-400">
                We wrote the plugin and made this site with an AI agent (yes really!), but the plugin is old fashioned vanilla javascript. No AI, no API calls. Bulletproof.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-2xl md:text-3xl font-extralight tracking-tight sm:text-4xl mb-4">
            Simple as <span className="bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent">1-2-3</span>
          </h2>
          <p className="text-gray-400 mb-16 max-w-3xl mx-auto">
            Don't let your best content go to waste because users don't want to read. Let their bots read it instead. Better scraped than sorry.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500 to-cyan-400 text-gray-900 flex items-center justify-center text-2xl font-extralight mb-4">
                1
              </div>
              <h3 className="text-xl font-extralight mb-2">Install Plugin</h3>
              <p className="text-gray-400">Download and activate Markdown Maker in your WordPress admin</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-500 to-pink-400 text-gray-900 flex items-center justify-center text-2xl font-extralight mb-4">
                2
              </div>
              <h3 className="text-xl font-extralight mb-2">Add Buttons</h3>
              <p className="text-gray-400">Use our developer-friendly plugin and functions to match any theme natively</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500 to-pink-400 text-gray-900 flex items-center justify-center text-2xl font-extralight mb-4">
                3
              </div>
              <h3 className="text-xl font-extralight mb-2">Copy & Go!</h3>
              <p className="text-gray-400">Get clean markdown ready for agents, LLMs, documentation, or any purpose</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 lg:px-8 bg-gradient-to-r from-gray-800 to-gray-900">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-extralight tracking-tight sm:text-4xl mb-6">
            Ready to streamline <br></br>your{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent">
              users' AI workflow?
            </span>
          </h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Join the team of content creators who use Markdown Maker to bridge 
            their WordPress content with modern AI tooling.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <RippleButton
              as="a"
              href="https://github.com/clarklab/markdown-maker-wp-plugin/releases/tag/v1.0.0" 
              className="inline-flex items-center justify-center px-5 py-3 bg-cyan-400 text-gray-900 rounded-lg text-lg font-medium hover:bg-cyan-300 transition-colors"
            >
              Get WP Plugin
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor" className="w-6 h-6 ml-3">
                <path d="m720-80 120-120-28-28-72 72v-164h-40v164l-72-72-28 28L720-80ZM480-800 243-663l237 137 237-137-237-137ZM120-321v-318q0-22 10.5-40t29.5-29l280-161q10-5 19.5-8t20.5-3q11 0 21 3t19 8l280 161q19 11 29.5 29t10.5 40v159h-80v-116L479-434 200-596v274l240 139v92L160-252q-19-11-29.5-29T120-321ZM720 0q-83 0-141.5-58.5T520-200q0-83 58.5-141.5T720-400q83 0 141.5 58.5T920-200q0 83-58.5 141.5T720 0ZM480-491Z"/>
              </svg>
            </RippleButton>
            <RippleButton
              as="a"
              href="https://github.com/clarklab/markdown-maker-wp-plugin/"
              className="inline-flex items-center justify-center rounded-lg border border-gray-600 px-8 py-4 text-lg font-extralight text-gray-300 hover:bg-gray-700 hover:text-white transition-all duration-200"
            >
              View Documentation
            </RippleButton>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 py-12 px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <FileText className="h-6 w-6 text-cyan-400" />
                <span className="text-lg font-extralight">Markdown Maker</span>
              </div>
              <p className="text-gray-400 mb-4 max-w-md">
                The ultimate WordPress plugin for converting your content to AI-ready markdown format.
              </p>
              <div className="flex space-x-4 items-center">
                <a href="https://github.com/clarklab/markdown-maker-wp-plugin" className="text-gray-400 hover:text-cyan-400 transition-colors">
                  <Github className="h-5 w-5" />
                </a>
                <a className="text-xl text-gray-400 hover:text-cyan-400 transition-colors" href="https://x.com/clarklab">𝕏</a>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-extralight text-gray-200 tracking-wider uppercase mb-4">
                Product
              </h3>
              <ul className="space-y-3">
                <li><a href="#features" className="text-gray-400 hover:text-white transition-colors">Features</a></li>
                <li><a href="#how-it-works" className="text-gray-400 hover:text-white transition-colors">How It Works</a></li>
                <li><a href="https://github.com/clarklab/markdown-maker-wp-plugin/releases" className="text-gray-400 hover:text-white transition-colors">Changelog</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-extralight text-gray-200 tracking-wider uppercase mb-4">
                Support
              </h3>
              <ul className="space-y-3">
                <li><a href="https://github.com/clarklab/markdown-maker-wp-plugin" className="text-gray-400 hover:text-white transition-colors">Documentation</a></li>
                <li><a href="https://x.com/clarklab" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400 text-sm">
            <p>&copy; 2025 Markdown Maker. All rights reserved. Made by <a href="https://wims.vc" className="text-white hover:text-gray-300 transition-colors">wims.vc</a></p>
          </div>
        </div>
      </footer>
      
      {/* Floating Bolt */}
      <div className="fixed bottom-4 left-4 md:bottom-6 md:left-6 z-50">
        <a href="https://bolt.new" target="_blank" rel="noopener noreferrer">
          <img 
            src="/bolt.svg" 
            alt="Bolt" 
            className="w-16 h-16 md:w-24 md:h-24 animate-rock cursor-pointer hover:scale-105 transition-transform duration-200"
            style={{ filter: 'drop-shadow(0 0 20px #06b6d4)' }}
          />
        </a>
      </div>
    </div>
  );
}

export default App;