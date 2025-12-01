"use client"
import { Store, Github, Twitter, Linkedin, Play, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../components/ui/button';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const router = useRouter();

    const checkStatus = () => {
        const token = localStorage.getItem('token');
        if(token){
          router.push('/user-dashboard')
        }else{
        router.push('/login')
        }
    }

  return (
    <div className="min-h-screen bg-black font-poppins overflow-hidden relative">
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          25% { transform: translateY(-20px) translateX(10px); }
          50% { transform: translateY(-40px) translateX(-10px); }
          75% { transform: translateY(-20px) translateX(10px); }
        }

        @keyframes pulse-glow {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }

        @keyframes move-left {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-pulse-glow {
          animation: pulse-glow 3s ease-in-out infinite;
        }

        .neon-bg {
          #0a0a0a
        }

        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .neon-box {
          background: rgba(147, 51, 234, 0.05);
          border: 1px solid rgba(168, 85, 247, 0.3);
          box-shadow: 0 0 20px rgba(168, 85, 247, 0.2), inset 0 0 20px rgba(168, 85, 247, 0.1);
        }

        .neon-glow {
          box-shadow: 0 0 30px rgba(168, 85, 247, 0.4), 0 0 60px rgba(139, 92, 246, 0.2);
        }
      `}</style>

      <div className="absolute inset-0 neon-bg"></div>

      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{animationDelay: '0s'}}></div>
      <div className="absolute top-40 right-10 w-72 h-72 bg-violet-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{animationDelay: '2s'}}></div>
      <div className="absolute -bottom-8 left-1/3 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{animationDelay: '4s'}}></div>

      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-purple-950/50 border-b border-purple-500/20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg neon-box flex items-center justify-center">
              <Store className="w-6 h-6 text-purple-400" />
            </div>
            <span className="text-lg font-bold bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent">StoreHub</span>
          </div>

          <nav className="hidden md:flex items-center gap-10">
            <a href="#home" className="text-gray-300 hover:text-purple-300 transition-colors font-medium text-sm">
              Home
            </a>
            <a href="#demo" className="text-gray-300 hover:text-purple-300 transition-colors font-medium text-sm">
              Demo
            </a>
            <Link href="/login" className="text-gray-300 hover:text-purple-300 transition-colors font-medium text-sm">
              Login
            </Link>
          </nav>

          <Button onClick={checkStatus} className="hidden md:block px-6 py-2.5 bg-gradient-to-r from-purple-600 to-violet-600 text-white font-semibold text-sm rounded-full hover:shadow-lg hover:shadow-purple-500/40 transition-all duration-300 hover:scale-105 neon-glow">
            Get Started
          </Button>
        </div>
      </header>

      <main className="relative z-10 min-h-screen flex items-center justify-center pt-32 pb-20 px-6">
        <div className="max-w-3xl w-full">
          <div className="flex flex-col items-center text-center space-y-6">
            <div className="inline-block">
              <div className="px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/30 flex items-center gap-2 neon-glow">
                <Sparkles className="w-4 h-4 text-purple-400 animate-pulse-glow" />
                <span className="text-sm text-purple-300 font-medium">For Admins • Store Owners • Users</span>
              </div>
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                <span className="text-white">Manage Stores,</span>
                <br />
                <span className="bg-gradient-to-r from-purple-400 via-violet-400 to-pink-400 bg-clip-text text-transparent">
                  Collect Ratings, Scale
                </span>
              </h1>

              <p className="text-base md:text-lg text-gray-300 font-light leading-relaxed max-w-2xl mx-auto">
                A unified platform for store management, real-time dashboards, and customer ratings. Streamline operations and grow your business faster.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4 w-full sm:w-auto justify-center">
              <Button variant={'saas'} onClick={checkStatus} className="group relative px-16 py-5">
                <span  className="relative z-10">Start Free Trial</span>
                <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Button>

              
            </div>
          </div>
        </div>
      </main>

      <footer className="relative z-10 bg-purple-950/30 border-t border-purple-500/20 py-8 mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex flex-col gap-2">
              <p className="text-gray-400 text-sm">
                © 2025 StoreHub. All rights reserved.
              </p>
              <div className="flex gap-6 text-xs flex-wrap justify-center md:justify-start">
                <a href="#" className="text-gray-500 hover:text-purple-400 transition-colors">Privacy</a>
                <a href="#" className="text-gray-500 hover:text-purple-400 transition-colors">Terms</a>
                <a href="#" className="text-gray-500 hover:text-purple-400 transition-colors">Docs</a>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <a href="#" className="text-gray-500 hover:text-purple-400 transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-purple-400 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-purple-400 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
