import React from 'react';
import {
  ArrowRight, Check, Code2, Database, Globe, Layout, ShieldCheck, Zap,
  Server, Lock, FileKey, Users, Terminal, CreditCard, Mail
} from 'lucide-react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-blue-500 selection:text-white font-sans">
      {/* Background Gradients */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[128px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[128px]" />
      </div>

      {/* Header */}
      <header className="fixed top-0 w-full z-50 backdrop-blur-md border-b border-white/5 bg-black/50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white fill-current" />
            </div>
            <span className="font-bold text-xl tracking-tight">Antigravity</span>
          </a>
          <nav className="hidden md:flex gap-8 text-sm font-medium text-gray-400">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#stack" className="hover:text-white transition-colors">Stack</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
          </nav>
          <div className="flex items-center gap-4">
            <Link to="/login" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Log in</Link>
            <Link to="/register" className="bg-white text-black px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-gray-100 transition-colors">
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs font-medium text-blue-400 mb-8 animate-fade-in-up">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Production Ready v2.0
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">
            Ship your SaaS <br />
            <span className="text-white">with zero gravity.</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            The ultimate MERN stack boilerplate.
            Auth, Admin Dashboard, RBAC, Payments, and Database pre-configured.
            Stop building the foundation, start building the product.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/register" className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-semibold transition-all hover:scale-105 flex items-center justify-center gap-2 group">
              Get Started
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a href="https://github.com/shahriar-sakib-khan/anti-gravity-mern-starter" target="_blank" rel="noreferrer" className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 text-white rounded-full font-semibold backdrop-blur-sm transition-all border border-white/5">
              View on GitHub
            </a>
          </div>
        </div>

        {/* Tech Stack Grid */}
        <div id="stack" className="mt-24 max-w-7xl mx-auto">
            <p className="text-center text-sm font-medium text-gray-500 mb-8 uppercase tracking-widest">Powered by modern tech</p>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-8 items-center justify-center opacity-60 hover:opacity-100 transition-opacity duration-500">
                {[
                    { icon: Globe, name: "React 18" },
                    { icon: Zap, name: "Vite" },
                    { icon: Layout, name: "Tailwind" },
                    { icon: Code2, name: "TypeScript" },
                    { icon: Server, name: "Node.js" },
                    { icon: Terminal, name: "Express" },
                    { icon: Database, name: "MongoDB" },
                    { icon: Lock, name: "Argon2" },
                ].map((tech, i) => (
                    <div key={i} className="flex flex-col items-center gap-2 group">
                         <div className="p-3 bg-white/5 rounded-xl group-hover:bg-white/10 transition-colors">
                            <tech.icon className="w-6 h-6 text-gray-300 group-hover:text-white" />
                         </div>
                        <span className="text-xs font-medium text-gray-500 group-hover:text-gray-300">{tech.name}</span>
                    </div>
                ))}
            </div>
        </div>

        {/* Features Grid */}
        <div id="features" className="mt-40 max-w-7xl mx-auto">
           <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Everything included</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                  We've handled the boring stuff so you can focus on your unique value proposition.
              </p>
           </div>

           <div className="grid md:grid-cols-3 gap-8">
              {[
                  { icon: ShieldCheck, title: "Advanced Auth", desc: "JWT, Refresh Tokens, HttpOnly Cookies, and Argon2 Hashing out of the box." },
                  { icon: Users, title: "Role-Based Access", desc: "Granular Admin vs User roles. Protected routes and Admin Dashboard included." },
                  { icon: FileKey, title: "File Uploads", desc: "Integrated Cloudinary for scalable image and avatar storage via Multer." },
                  { icon: Database, title: "Data Management", desc: "Mongoose schemas with Seeding scripts and connection pooling." },
                  { icon: Layout, title: "Modern UI System", desc: "Beautiful components built with TailwindCSS, Sonner, and Lucide Icons." },
                  { icon: Code2, title: "Developer Experience", desc: "Full TypeScript support, TDD setup with Vitest, and Monorepo structure." }
              ].map((feature, i) => (
                  <div key={i} className="p-8 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all hover:-translate-y-1 duration-300 group">
                      <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mb-6 border border-blue-500/20 group-hover:border-blue-500/50 transition-colors">
                        <feature.icon className="w-6 h-6 text-blue-400 group-hover:text-blue-300 transition-colors" />
                      </div>
                      <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                      <p className="text-gray-400 leading-relaxed text-sm">{feature.desc}</p>
                  </div>
              ))}
           </div>
        </div>

        {/* Pricing Section */}
        <div id="pricing" className="mt-40 max-w-7xl mx-auto">
            <div className="text-center mb-16">
               <h2 className="text-3xl font-bold mb-4">Simple Pricing</h2>
               <p className="text-gray-400">Transparent pricing for every stage of your journey.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {/* Starter */}
                <div className="p-8 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors relative">
                    <h3 className="text-xl font-semibold mb-2">Hobby</h3>
                    <div className="text-3xl font-bold mb-6">$0<span className="text-lg text-gray-500 font-normal">/mo</span></div>
                    <ul className="space-y-4 mb-8 text-sm text-gray-400">
                        <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500" /> 5 Projects</li>
                        <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500" /> Basic Analytics</li>
                        <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500" /> Community Support</li>
                    </ul>
                    <button className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold transition-colors">
                        Get Started
                    </button>
                </div>

                {/* Pro */}
                <div className="p-8 rounded-2xl bg-gradient-to-b from-blue-900/20 to-blue-900/5 border border-blue-500/30 transform md:-translate-y-4 relative">
                    <div className="absolute top-0 right-0 bg-blue-500 text-xs font-bold px-3 py-1 rounded-bl-xl rounded-tr-xl">POPULAR</div>
                    <h3 className="text-xl font-semibold mb-2 text-blue-400">Pro</h3>
                    <div className="text-3xl font-bold mb-6">$29<span className="text-lg text-gray-500 font-normal">/mo</span></div>
                    <ul className="space-y-4 mb-8 text-sm text-gray-300">
                        <li className="flex items-center gap-2"><Check className="w-4 h-4 text-blue-400" /> Unlimited Projects</li>
                        <li className="flex items-center gap-2"><Check className="w-4 h-4 text-blue-400" /> Advanced Analytics</li>
                        <li className="flex items-center gap-2"><Check className="w-4 h-4 text-blue-400" /> Priority Support</li>
                        <li className="flex items-center gap-2"><Check className="w-4 h-4 text-blue-400" /> Custom Domain</li>
                    </ul>
                    <button className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-colors shadow-lg shadow-blue-900/20">
                        Start Free Trial
                    </button>
                </div>

                {/* Enterprise */}
                <div className="p-8 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
                    <h3 className="text-xl font-semibold mb-2">Enterprise</h3>
                    <div className="text-3xl font-bold mb-6">Custom</div>
                    <ul className="space-y-4 mb-8 text-sm text-gray-400">
                        <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500" /> Dedicated Infrastructure</li>
                        <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500" /> SLA Guarantee</li>
                        <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500" /> 24/7 Phone Support</li>
                    </ul>
                    <button className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold transition-colors">
                        Contact Sales
                    </button>
                </div>
            </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black/50 py-16 mt-32">
        <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                        <Zap className="w-6 h-6 text-white fill-current" />
                    </div>
                    <div>
                        <span className="font-bold tracking-tight text-xl block">Antigravity</span>
                        <span className="text-xs text-gray-500">MERN Stack Seed</span>
                    </div>
                </div>

                <div className="flex flex-col items-center md:items-end gap-2 text-sm text-gray-400">
                    <p className="font-medium text-white">Developed by Shahriar Khan Sakib</p>
                    <a href="mailto:shahriarsakib.khan@gmail.com" className="flex items-center gap-2 hover:text-blue-400 transition-colors">
                        <Mail className="w-4 h-4" /> shahriarsakib.khan@gmail.com
                    </a>
                </div>
            </div>

            <div className="border-t border-white/5 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-600">
                <p>© 2026 Antigravity. Open Source MIT License.</p>
                <div className="flex gap-6">
                    <a href="#" className="hover:text-gray-400">Privacy</a>
                    <a href="#" className="hover:text-gray-400">Terms</a>
                    <a href="#" className="hover:text-gray-400">Twitter</a>
                </div>
            </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
