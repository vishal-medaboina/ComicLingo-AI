import React, { useState } from 'react';
import type { UserProfile } from '../../types/comiclingo';
import { StorageService, DEFAULT_USER } from '../../services/storageService';
import { Sparkles, Eye, EyeOff, BookOpen, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { CharacterAvatar } from '../character/CharacterAvatar';
import { PRESET_CHARACTERS } from '../../services/characterAiService';
import { playSoundEffect } from '../../utils/audio';

interface AuthModalProps {
  onSuccess: (user: UserProfile) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ onSuccess }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in both email and password.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setIsLoading(true);
    playSoundEffect('click');

    setTimeout(() => {
      const existingUser = StorageService.getUser();
      const authenticatedUser: UserProfile = {
        ...existingUser,
        name: isSignUp ? (name.trim() || 'Learner') : (existingUser.name || 'Alex Mercer'),
        email: email.trim(),
      };

      StorageService.saveUser(authenticatedUser);
      StorageService.setSessionActive(true);
      setIsLoading(false);
      playSoundEffect('triumph');
      onSuccess(authenticatedUser);
    }, 500);
  };

  const handleQuickDemoLogin = () => {
    playSoundEffect('pop');
    setIsLoading(true);
    setTimeout(() => {
      StorageService.saveUser(DEFAULT_USER);
      StorageService.setSessionActive(true);
      setIsLoading(false);
      playSoundEffect('triumph');
      onSuccess(DEFAULT_USER);
    }, 350);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-pattern py-12">
      <div className="max-w-md w-full bg-white border-3 border-slate-900 rounded-2xl shadow-comic-lg overflow-hidden animate-slide-up">
        
        {/* Comic Header Banner */}
        <div className="bg-teal-900 text-white p-6 relative border-b-3 border-slate-900 overflow-hidden">
          <div className="absolute -right-6 -bottom-6 opacity-20 pointer-events-none">
            <span className="font-bangers text-8xl text-coral-400">POW!</span>
          </div>
          
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-coral-500 border-2 border-slate-900 flex items-center justify-center shadow-comic-sm">
              <span className="font-bangers text-white text-2xl">CL</span>
            </div>
            <div>
              <h1 className="font-extrabold text-2xl font-comic tracking-tight flex items-center gap-2">
                ComicLingo AI
              </h1>
              <p className="text-xs text-teal-200 font-semibold">
                Learn English. Live the Story.
              </p>
            </div>
          </div>

          <div className="mt-4 bg-teal-850/80 p-3 rounded-xl border border-teal-700 flex items-center gap-3">
            <CharacterAvatar 
              character={PRESET_CHARACTERS[3]} // Bolt-3000
              size="xs" 
              action="wave" 
              expression="happy"
            />
            <p className="text-xs text-teal-100 font-medium">
              "Welcome! Ready to practice real English through adaptive generative comic stories?"
            </p>
          </div>
        </div>

        {/* Form Body */}
        <div className="p-6">
          <div className="flex justify-between items-center mb-6 border-b-2 border-slate-200 pb-3">
            <button
              type="button"
              onClick={() => { setIsSignUp(false); setError(''); }}
              className={`font-extrabold text-sm pb-1 transition-all ${
                !isSignUp ? 'text-teal-900 border-b-2 border-teal-900 font-comic' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              Sign In to Continue
            </button>
            <button
              type="button"
              onClick={() => { setIsSignUp(true); setError(''); }}
              className={`font-extrabold text-sm pb-1 transition-all ${
                isSignUp ? 'text-teal-900 border-b-2 border-teal-900 font-comic' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              Create Free Account
            </button>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border-2 border-red-500 rounded-xl text-xs font-bold text-red-700 flex items-center gap-2">
              <span>⚠️</span>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <div>
                <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1">
                  Your Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Alex Mercer"
                  className="w-full px-3.5 py-2.5 rounded-xl border-2 border-slate-900 bg-paper-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-700 text-sm font-semibold shadow-comic-sm"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full px-3.5 py-2.5 rounded-xl border-2 border-slate-900 bg-paper-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-700 text-sm font-semibold shadow-comic-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  className="w-full px-3.5 py-2.5 rounded-xl border-2 border-slate-900 bg-paper-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-700 text-sm font-semibold shadow-comic-sm pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-slate-500 hover:text-slate-800"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-teal-900 hover:bg-teal-950 text-white border-2 border-slate-900 rounded-xl font-extrabold text-sm shadow-comic hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <span>Loading Account...</span>
              ) : (
                <>
                  <span>{isSignUp ? 'Join ComicLingo AI' : 'Sign In'}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Evaluator 1-Click Access */}
          <div className="mt-5 pt-4 border-t-2 border-dashed border-slate-200 text-center">
            <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
              ⚡ Evaluator Quick Test Access
            </p>
            <button
              type="button"
              onClick={handleQuickDemoLogin}
              disabled={isLoading}
              className="w-full py-2.5 px-4 bg-amber-400 hover:bg-amber-500 text-slate-950 border-2 border-slate-900 rounded-xl font-extrabold text-xs shadow-comic hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-amber-900 fill-amber-900" />
              <span>Instant Demo Account (1-Click Login)</span>
            </button>
          </div>

          <div className="mt-4 flex items-center justify-center gap-2 text-[11px] text-slate-500 font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-teal-700" />
            <span>Local sandbox authentication & storage enabled</span>
          </div>
        </div>
      </div>
    </div>
  );
};
