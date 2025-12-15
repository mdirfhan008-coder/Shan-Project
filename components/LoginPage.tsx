import React, { useState } from 'react';
import { LayoutGrid, ArrowLeft, Mail, Lock, User, Github, Twitter } from 'lucide-react';

interface LoginPageProps {
  onLogin: () => void;
  onBack: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin, onBack }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login/signup delay
    setTimeout(() => {
        onLogin();
    }, 500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white/60 backdrop-blur-xl rounded-3xl shadow-2xl shadow-indigo-500/10 border border-white/80 p-8 relative overflow-hidden">
        
        {/* Decorative elements inside card */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-fuchsia-400 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-indigo-400 rounded-full blur-3xl opacity-20"></div>

        <button 
          onClick={onBack}
          className="absolute top-6 left-6 text-slate-400 hover:text-slate-600 transition-colors"
        >
          <ArrowLeft size={20} />
        </button>

        <div className="text-center mb-8 mt-4">
          <div className="w-12 h-12 bg-gradient-to-tr from-violet-600 to-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-500/30 mx-auto mb-4">
            <LayoutGrid size={24} />
          </div>
          <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight mb-2">
            {isSignUp ? 'Create Account' : 'Welcome Back'}
          </h2>
          <p className="text-slate-500 font-medium">
            {isSignUp ? 'Join ProCraft to start designing.' : 'Sign in to access your templates.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-slate-400 group-focus-within:text-violet-500 transition-colors" />
              </div>
              <input
                type="text"
                className="block w-full pl-11 pr-4 py-3 bg-white/70 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 transition-all"
                placeholder="Full Name"
                required
              />
            </div>
          )}
          
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-slate-400 group-focus-within:text-violet-500 transition-colors" />
            </div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full pl-11 pr-4 py-3 bg-white/70 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 transition-all"
              placeholder="Email Address"
              required
            />
          </div>

          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-slate-400 group-focus-within:text-violet-500 transition-colors" />
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full pl-11 pr-4 py-3 bg-white/70 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 transition-all"
              placeholder="Password"
              required
            />
          </div>

          {!isSignUp && (
            <div className="flex justify-end">
              <a href="#" className="text-sm font-semibold text-violet-600 hover:text-violet-700">Forgot Password?</a>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3.5 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all flex items-center justify-center gap-2 mt-2"
          >
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </button>
        </form>

        <div className="my-6 flex items-center gap-4">
          <div className="h-px bg-slate-200 flex-1"></div>
          <span className="text-xs font-semibold text-slate-400 uppercase">Or continue with</span>
          <div className="h-px bg-slate-200 flex-1"></div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button className="flex items-center justify-center gap-2 py-2.5 border border-slate-200 rounded-xl hover:bg-white hover:border-slate-300 transition-colors bg-white/50">
            <Github className="w-5 h-5 text-slate-700" />
            <span className="text-sm font-semibold text-slate-600">Github</span>
          </button>
          <button className="flex items-center justify-center gap-2 py-2.5 border border-slate-200 rounded-xl hover:bg-white hover:border-slate-300 transition-colors bg-white/50">
            <Twitter className="w-5 h-5 text-sky-500" />
            <span className="text-sm font-semibold text-slate-600">Twitter</span>
          </button>
        </div>

        <div className="mt-8 text-center">
          <p className="text-slate-500 text-sm font-medium">
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button 
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-violet-600 font-bold hover:underline"
            >
              {isSignUp ? 'Sign In' : 'Sign Up'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};