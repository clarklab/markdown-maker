import { useState, useEffect, useRef } from 'react';
import { FileText, Github } from 'lucide-react';
import RippleButton from './components/RippleButton';
import TypingText from './components/TypingText';
import BoltModal from './components/BoltModal';

function App() {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [isBoltModalOpen, setIsBoltModalOpen] = useState(false);
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
        <div className="hero relative z-10 px-6 py-12 lg:px-8 lg:py-16">
          
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
                <div className="inline-flex items-center justify-center w-24 h-24 rounded-lg bg-gradient-to-br from-cyan-500 to-cyan-400 text-gray-900">
                  <svg className="h-16 w-16" viewBox="0 0 32 32" fill="none">
                    <path d="M20.9118 20.9144C26.7931 15.0331 29.3606 8.0651 26.6464 5.35096C23.9323 2.63681 16.9643 5.2043 11.083 11.0856C5.20173 16.9669 2.63425 23.9349 5.34839 26.649C8.06253 29.3632 15.0305 26.7957 20.9118 20.9144Z" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M26.6535 26.6561C29.3677 23.942 26.8002 16.974 20.9189 11.0927C15.0376 5.21141 8.06961 2.64393 5.35546 5.35807C2.64132 8.07221 5.2088 15.0402 11.0901 20.9215C16.9714 26.8028 23.9394 29.3703 26.6535 26.6561Z" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M11.09 11.09C13.8 13.8 13.8 18.2 11.09 20.92" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M20.92 20.92C18.21 18.21 13.81 18.21 11.09 20.92L5.36 26.65" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M20.92 11.09C18.21 13.8 18.21 18.2 20.92 20.92L26.65 26.65" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M5.35 5.35998L11.08 11.09C13.79 13.8 18.19 13.8 20.91 11.09L26.65 5.34998" stroke="currentColor" strokeWidth="1.5"/>
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-extralight mb-4 group-hover:text-cyan-400 transition-colors">
                One-Click Conversion
              </h3>
              <p className="text-sm text-gray-400">
                Convert any WordPress post or page to clean markdown format with a single click. 
                No complex settings or configurations required. No loading time or waiting.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group relative bg-gray-900 rounded-none md:rounded-none p-8 border-2 border-gray-700 border-t-0 border-t-2 hover:border-pink-400/50 transition-all duration-300 hover:shadow-xl hover:shadow-pink-400/10 hover:z-10">
              <div className="mb-6">
                <div className="inline-flex items-center justify-center w-24 h-24 rounded-lg bg-gradient-to-br from-pink-500 to-pink-400 text-gray-900">
                  <svg className="h-16 w-16" viewBox="0 0 32 32" fill="none">
                    <path d="M17.07 6.40997H25.33C25.48 6.40997 25.6 6.52997 25.6 6.67997V14.94" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M25.6 6.40997L18.14 13.87" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M4.26999 6.40997H12.53C12.68 6.40997 12.8 6.52997 12.8 6.67997V14.94" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M12.81 6.40997L5.34 13.87" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M4.26999 19.2H12.53C12.68 19.2 12.8 19.3199 12.8 19.4699V27.7299" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M12.81 19.2L5.34 26.67" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M17.07 19.2H25.33C25.48 19.2 25.6 19.3199 25.6 19.4699V27.7299" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M25.6 19.2L18.14 26.67" stroke="currentColor" strokeWidth="1.5"/>
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-extralight mb-4 group-hover:text-pink-400 transition-colors">
                Copy-Paste Perfect
              </h3>
              <p className="text-sm text-gray-400">
                Converted text is optimized for LLMs and AI agents. Clean, accurate formatting 
                ensures your content works perfectly with ChatGPT, Claude, Perplexity, and more.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group relative bg-gray-900 rounded-b-xl md:rounded-r-xl md:rounded-bl-none p-8 border-2 border-gray-700 border-t-2 hover:border-cyan-400/50 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-400/10 relative -top-[2px] md:-top-0 md:-left-[2px] hover:z-10">
              <div className="mb-6">
                <div className="inline-flex items-center justify-center w-24 h-24 rounded-lg bg-gradient-to-br from-cyan-500 to-pink-400 text-gray-900">
                  <svg className="h-16 w-16" viewBox="0 0 32 32" fill="none">
                    <path d="M26.41 26.4L5.34 5.34003" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M26.41 5.60999L5.34 26.67" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M29.87 16C22.21 16 16.01 9.79001 16.01 2.14001" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M2.14 16C9.8 16 16 9.79001 16 2.14001" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M2.14 16C9.8 16 16 22.21 16 29.86" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M29.87 16C22.21 16 16.01 22.21 16.01 29.86" stroke="currentColor" strokeWidth="1.5"/>
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-extralight mb-4 group-hover:text-cyan-400 transition-colors">
                No AI Guarentee
              </h3>
              <p className="text-sm text-gray-400">
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
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan-500 to-cyan-400 text-gray-900 flex items-center justify-center text-2xl font-extralight mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="M510.77-235.38v-440H360v-49.24h200v489.24h-49.23Z"/></svg>
              </div>
              <h3 className="text-xl font-extralight mb-2">Install Plugin</h3>
              <p className="text-sm text-gray-400">Download and activate Markdown Maker in your WordPress admin</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-pink-500 to-pink-400 text-gray-900 flex items-center justify-center text-2xl font-extralight mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="M340-235.38v-195.39q0-30.77 21.54-52.31 21.54-21.54 52.31-21.54h172.3q10.77 0 17.7-6.92 6.92-6.92 6.92-17.69v-121.54q0-10.77-6.92-17.69-6.93-6.92-17.7-6.92H340v-49.24h246.15q30.77 0 52.31 21.54Q660-681.54 660-650.77v121.54q0 30.77-21.54 52.31-21.54 21.54-52.31 21.54h-172.3q-10.77 0-17.7 6.92-6.92 6.92-6.92 17.69v146.15H660v49.24H340Z"/></svg>
              </div>
              <h3 className="text-xl font-extralight mb-2">Add Buttons</h3>
              <p className="text-sm text-gray-400">Use our developer-friendly plugin and functions to match any theme natively</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan-500 to-pink-400 text-gray-900 flex items-center justify-center text-2xl font-extralight mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="M355.38-235.38v-49.24h215.39q10.77 0 17.69-6.92 6.92-6.92 6.92-17.69v-121.54q0-10.77-6.92-17.69-6.92-6.92-17.69-6.92H395.38v-49.24h175.39q10.77 0 17.69-6.92 6.92-6.92 6.92-17.69v-121.54q0-10.77-6.92-17.69-6.92-6.92-17.69-6.92H355.38v-49.24h215.39q30.77 0 52.31 21.54 21.54 21.54 21.54 52.31v122.15q0 19.62-12.2 34.12-12.19 14.5-31.04 14.5 18.85 0 31.04 14.5 12.2 14.5 12.2 34.12v122.15q0 30.77-21.54 52.31-21.54 21.54-52.31 21.54H355.38Z"/></svg>
              </div>
              <h3 className="text-xl font-extralight mb-2">Copy & Go!</h3>
              <p className="text-sm text-gray-400">Get clean markdown ready for agents, LLMs, documentation, or any purpose</p>
            </div>
          </div>
        {/* FAQ Section */}
        <div className="mt-20 text-left bg-gray-800 rounded-xl p-8 md:p-16">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-5">
              <h2 className="text-3xl font-extralight tracking-tight text-gray-100 sm:text-4xl mb-4">
                Frequently asked questions
              </h2>
              <p className="text-gray-400 text-sm leading-relaxed">
                Can't find the answer you're looking for? Reach out to us on{' '}
                <a 
                  href="https://github.com/clarklab/markdown-maker-wp-plugin" 
                  className="font-medium text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  GitHub
                </a>.
              </p>
            </div>
            <div className="mt-10 lg:col-span-7 lg:mt-0">
              <dl className="space-y-8">
                <div>
                  <dt className="text-lg font-extralight text-gray-100 mb-2">
                    How do I use this plugin?
                  </dt>
                  <dd className="text-sm text-gray-400 leading-relaxed mb-4">
                    You can use this plugin to insert special "Copy as Markdown" buttons on your WordPress posts and pages. Then your users can take that content and paste it into their favorite AI tools.
                  </dd>
                  <dd className="text-sm text-gray-400 leading-relaxed">
                    This plugin is designed for developers. You need to manually add the provided functions to your theme templates where you want the copy/download functionality to appear. Use <code className="bg-gray-800 px-1 py-0.5 rounded text-cyan-400">markdown_maker_copy_link()</code> or <code className="bg-gray-800 px-1 py-0.5 rounded text-cyan-400">markdown_maker_download_link()</code> in your PHP templates.
                  </dd>
                </div>
                <div>
                  <dt className="text-lg font-extralight text-gray-100 mb-2">
                    Is the output compatible with LLMs?
                  </dt>
                  <dd className="text-sm text-gray-400 leading-relaxed">
                    Yes! The Markdown output is specifically formatted to be LLM-friendly with proper metadata headers, clean content structure, and context that helps AI agents understand your content better.
                  </dd>
                </div>
                <div>
                  <dt className="text-lg font-extralight text-gray-100 mb-2">
                    Where should I place the functions?
                  </dt>
                  <dd className="text-sm text-gray-400 leading-relaxed">
                    Common locations include single.php or page.php templates, custom post type templates, admin areas (with proper permissions checks), or within custom shortcodes and blocks.
                  </dd>
                </div>
                <div>
                  <dt className="text-lg font-extralight text-gray-100 mb-2">
                    Does this work with custom post types?
                  </dt>
                  <dd className="text-sm text-gray-400 leading-relaxed">
                    Yes, the plugin works with any public post type including custom post types. It will convert any WordPress content to clean, well-formatted Markdown.
                  </dd>
                </div>
                <div>
                  <dt className="text-lg font-extralight text-gray-100 mb-2">
                    What does the Markdown output include?
                  </dt>
                  <dd className="text-sm text-gray-400 leading-relaxed">
                    The output includes post metadata (title, author, date, URL), clean content conversion with proper formatting for headings, lists, links, and images, plus categories, tags, and excerpts when available.
                  </dd>
                </div>
              </dl>
            </div>
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
      <div className="fixed bottom-4 left-4 md:bottom-6 md:left-6 z-40">
        <button 
          className="bolt-badge"
          onClick={() => setIsBoltModalOpen(true)}
        >
          <img 
            src="/bolt.svg" 
            alt="Bolt" 
            className="w-16 h-16 md:w-24 md:h-24 animate-rock cursor-pointer hover:scale-105 transition-transform duration-200"
            style={{ filter: 'drop-shadow(0 0 20px #06b6d4)' }}
          />
        </button>
      </div>

      {/* Bolt Modal */}
      <BoltModal 
        isOpen={isBoltModalOpen} 
        onClose={() => setIsBoltModalOpen(false)} 
      />
    </div>
  );
}

export default App;