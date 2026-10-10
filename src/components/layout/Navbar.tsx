import React, { useState } from 'react';
import type { 
  AppView, 
  UserProfile 
} from '../../types/comiclingo';
import { 
  Sparkles, 
  Flame, 
  Trophy, 
  BookOpen, 
  Layers, 
  User, 
  Users, 
  TrendingUp, 
  Bookmark, 
  Menu, 
  X, 
  Home,
  PlusCircle,
  LogOut
} from 'lucide-react';
import { playSoundEffect } from '../../utils/audio';

interface NavbarProps {
  currentView: AppView;
  setCurrentView: (view: AppView) => void;
  user: UserProfile;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  setCurrentView,
  user,
  onLogout,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNav = (view: AppView) => {
    playSoundEffect('click');
    setCurrentView(view);
    setMobileMenuOpen(false);
  };

  const navItems = [
    { label: 'Dashboard', view: 'dashboard' as AppView, icon: Home },
    { label: 'Character Studio', view: 'character-studio' as AppView, icon: Users, badge: 'AI' },
    { label: 'My Comics', view: 'my-comics' as AppView, icon: Layers },
    { label: 'Vocabulary Bank', view: 'vocab-bank' as AppView, icon: Bookmark },
    { label: 'Progress', view: 'progress' as AppView, icon: TrendingUp },
    { label: 'Achievements', view: 'achievements' as AppView, icon: Trophy },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b-2 border-slate-900 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo / Brand */}
          <div 
            onClick={() => handleNav('dashboard')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-10 h-10 rounded-xl bg-teal-900 border-2 border-slate-900 flex items-center justify-center shadow-comic-sm group-hover:rotate-3 transition-transform">
              <span className="font-bangers text-coral-500 text-2xl tracking-wider">CL</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl tracking-tight text-teal-900 font-comic">
                  ComicLingo
                </span>
                <span className="bg-coral-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-md border border-slate-900 tracking-wider">
                  AI
                </span>
              </div>
              <p className="text-[10px] text-slate-500 font-semibold tracking-wide hidden sm:block">
                Learn English. Live the Story.
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.view;
              return (
                <button
                  key={item.view}
                  onClick={() => handleNav(item.view)}
                  className={`relative flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-bold transition-all ${
                    isActive
                      ? 'bg-teal-900 text-white shadow-comic-sm -translate-y-0.5 border border-slate-900'
                      : 'text-slate-700 hover:text-teal-900 hover:bg-slate-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="bg-coral-500 text-white text-[9px] px-1.5 py-0.2 rounded-full font-extrabold animate-pulse">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Gamification Stats & Profile CTA */}
          <div className="flex items-center gap-2 sm:gap-4">
            
            {/* Daily Streak */}
            <div 
              title="Daily Learning Streak"
              className="flex items-center gap-1.5 px-2.5 py-1 bg-amber-50 border-2 border-slate-900 rounded-full shadow-comic-sm text-xs font-extrabold text-amber-800"
            >
              <Flame className="w-4 h-4 text-orange-500 fill-orange-500 animate-bounce-subtle" />
              <span>{user.streak}d</span>
            </div>

            {/* XP Level */}
            <div 
              title="Total Learning XP"
              className="flex items-center gap-1.5 px-2.5 py-1 bg-teal-50 border-2 border-slate-900 rounded-full shadow-comic-sm text-xs font-extrabold text-teal-900"
            >
              <Sparkles className="w-3.5 h-3.5 text-teal-600 fill-teal-600" />
              <span>{user.xp} XP</span>
              <span className="text-[10px] bg-teal-800 text-white px-1.5 rounded-full">Lvl {user.level}</span>
            </div>

            {/* Create Comic CTA Button */}
            <button
              onClick={() => handleNav('personalization')}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 bg-coral-500 hover:bg-coral-600 text-white border-2 border-slate-900 rounded-xl font-extrabold text-xs shadow-comic hover:-translate-y-0.5 transition-all"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Create Comic</span>
            </button>

            {/* Profile / Settings */}
            <button
              onClick={() => handleNav('profile-settings')}
              title="Profile & Settings"
              className={`p-1.5 rounded-xl border-2 border-slate-900 transition-all ${
                currentView === 'profile-settings' ? 'bg-teal-900 text-white shadow-comic-sm' : 'bg-white hover:bg-slate-100 text-slate-800'
              }`}
            >
              <User className="w-4 h-4" />
            </button>

            {/* Landing Page Preview */}
            <button
              onClick={() => handleNav('landing-page')}
              title="View Landing Page"
              className="hidden xl:block text-xs font-bold text-slate-500 hover:text-teal-900 underline px-1"
            >
              Overview
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 rounded-lg border-2 border-slate-900 bg-white"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t-2 border-slate-900 bg-paper-100 p-4 space-y-2 animate-in slide-in-from-top-4 duration-200">
          <button
            onClick={() => handleNav('personalization')}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-coral-500 text-white border-2 border-slate-900 rounded-xl font-extrabold text-sm shadow-comic"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Create New AI Comic</span>
          </button>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.view;
            return (
              <button
                key={item.view}
                onClick={() => handleNav(item.view)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-bold border-2 ${
                  isActive ? 'bg-teal-900 text-white border-slate-900' : 'bg-white border-slate-300 text-slate-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
                {item.badge && (
                  <span className="ml-auto bg-coral-500 text-white text-[9px] px-1.5 py-0.5 rounded-full font-bold">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}

          <div className="pt-2 border-t border-slate-300 flex justify-between items-center text-xs">
            <button
              onClick={() => handleNav('landing-page')}
              className="font-bold text-teal-800 underline"
            >
              About ComicLingo
            </button>
            <button
              onClick={onLogout}
              className="flex items-center gap-1 font-bold text-coral-600 hover:text-coral-700"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log out</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
