import React, { useState } from 'react';
import type { UserProfile, AgeGroup, EnglishLevel, ComicStyle, Situation } from '../../types/comiclingo';
import { 
  User, 
  Settings, 
  Save, 
  Volume2, 
  Sliders, 
  LogOut, 
  ShieldCheck, 
  Key,
  CheckCircle2
} from 'lucide-react';
import { playSoundEffect } from '../../utils/audio';

interface ProfileSettingsViewProps {
  user: UserProfile;
  onUpdateUser: (user: UserProfile) => void;
  onLogout: () => void;
}

export const ProfileSettingsView: React.FC<ProfileSettingsViewProps> = ({
  user,
  onUpdateUser,
  onLogout,
}) => {
  const [name, setName] = useState(user.name);
  const [ageGroup, setAgeGroup] = useState<AgeGroup>(user.ageGroup);
  const [englishLevel, setEnglishLevel] = useState<EnglishLevel>(user.englishLevel);
  const [comicStyle, setComicStyle] = useState<ComicStyle>(user.comicStyle);
  const [situation, setSituation] = useState<Situation>(user.situation);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [apiKey, setApiKey] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playSoundEffect('triumph');
    const updated: UserProfile = {
      ...user,
      name: name.trim() || user.name,
      ageGroup,
      englishLevel,
      comicStyle,
      situation,
    };
    onUpdateUser(updated);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8 animate-slide-up">
      
      {/* Header */}
      <div className="border-b-2 border-slate-900 pb-4 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <User className="w-6 h-6 text-teal-900" />
            <h1 className="text-2xl sm:text-3xl font-extrabold font-comic text-slate-900">
              Profile & Learning Preferences
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Manage your personal learning goals, age category, and experience settings.
          </p>
        </div>

        <button
          onClick={onLogout}
          className="px-4 py-2 border-2 border-slate-900 rounded-xl text-xs font-extrabold text-coral-600 hover:bg-red-50 shadow-comic-sm flex items-center gap-1.5"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Log Out</span>
        </button>
      </div>

      {savedSuccess && (
        <div className="p-4 bg-teal-100 border-2 border-teal-700 text-teal-950 rounded-2xl text-xs font-bold flex items-center gap-2 shadow-comic-sm animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-teal-700" />
          <span>Preferences updated successfully!</span>
        </div>
      )}

      {/* Main Form */}
      <form onSubmit={handleSubmit} className="bg-white border-3 border-slate-900 rounded-3xl p-6 sm:p-8 shadow-comic-lg space-y-6">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider block mb-1">
              Your Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border-2 border-slate-900 bg-paper-50 font-bold text-xs shadow-comic-sm focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider block mb-1">
              Email Address
            </label>
            <input
              type="email"
              disabled
              value={user.email}
              className="w-full px-3.5 py-2.5 rounded-xl border-2 border-slate-300 bg-slate-100 font-bold text-xs text-slate-500 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider block mb-1">
              Age Adaptation Group
            </label>
            <select
              value={ageGroup}
              onChange={(e) => setAgeGroup(e.target.value as AgeGroup)}
              className="w-full px-3.5 py-2.5 rounded-xl border-2 border-slate-900 bg-paper-50 font-bold text-xs shadow-comic-sm focus:outline-none"
            >
              <option value="5-10">5–10 Years (Simple English & Phonics)</option>
              <option value="10-15">10–15 Years (School & Everyday Idioms)</option>
              <option value="15+">15+ Years (Professional & Adult Situations)</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider block mb-1">
              English Proficiency Level
            </label>
            <select
              value={englishLevel}
              onChange={(e) => setEnglishLevel(e.target.value as EnglishLevel)}
              className="w-full px-3.5 py-2.5 rounded-xl border-2 border-slate-900 bg-paper-50 font-bold text-xs shadow-comic-sm focus:outline-none"
            >
              <option value="Beginner">Beginner</option>
              <option value="Elementary">Elementary</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Upper-Intermediate">Upper-Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider block mb-1">
              Default Comic Art Style
            </label>
            <select
              value={comicStyle}
              onChange={(e) => setComicStyle(e.target.value as ComicStyle)}
              className="w-full px-3.5 py-2.5 rounded-xl border-2 border-slate-900 bg-paper-50 font-bold text-xs shadow-comic-sm focus:outline-none"
            >
              <option value="Graphic Novel">Graphic Novel</option>
              <option value="Anime-Inspired">Anime-Inspired</option>
              <option value="Classic Comic">Classic Comic</option>
              <option value="Cartoon">Cartoon</option>
              <option value="Storybook">Storybook</option>
              <option value="Comedy">Comedy</option>
              <option value="Cinematic">Cinematic</option>
              <option value="Realistic">Realistic</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider block mb-1">
              Preferred Practice Scenario
            </label>
            <select
              value={situation}
              onChange={(e) => setSituation(e.target.value as Situation)}
              className="w-full px-3.5 py-2.5 rounded-xl border-2 border-slate-900 bg-paper-50 font-bold text-xs shadow-comic-sm focus:outline-none"
            >
              <option value="Job Interview">Job Interview</option>
              <option value="Workplace">Workplace</option>
              <option value="Airport">Airport</option>
              <option value="Food & Restaurant">Food & Restaurant</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Technology">Technology</option>
              <option value="School & College">School & College</option>
              <option value="Travel">Travel</option>
            </select>
          </div>
        </div>

        {/* Audio & Accessibility Settings */}
        <div className="pt-4 border-t-2 border-slate-200 space-y-4">
          <h3 className="font-extrabold text-sm text-slate-900 uppercase tracking-wider flex items-center gap-2">
            <Volume2 className="w-4 h-4 text-teal-800" />
            <span>Sound & Accessibility Settings</span>
          </h3>

          <div className="flex items-center justify-between p-3.5 bg-paper-100 rounded-xl border border-slate-300">
            <div>
              <span className="text-xs font-bold text-slate-800 block">Spoken Audio Narration</span>
              <span className="text-[11px] text-slate-500">Auto-read comic dialogue via Web Speech API</span>
            </div>
            <input
              type="checkbox"
              checked={soundEnabled}
              onChange={(e) => setSoundEnabled(e.target.checked)}
              className="w-5 h-5 rounded accent-teal-800 cursor-pointer"
            />
          </div>
        </div>

        {/* External API Key Configuration Option */}
        <div className="pt-4 border-t-2 border-slate-200 space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-extrabold text-xs text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <Key className="w-4 h-4 text-amber-600" />
              <span>Optional External GenAI Key (Gemini / OpenAI)</span>
            </span>
            <span className="text-[10px] bg-teal-100 text-teal-900 px-2 py-0.5 rounded font-extrabold">
              Offline Demo Mode Active
            </span>
          </div>
          <p className="text-[11px] text-slate-500">
            ComicLingo runs completely out-of-the-box with local generative simulation. You can optionally link a Gemini or OpenAI key.
          </p>
          <input
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="AIzaSy... or sk-..."
            className="w-full px-3.5 py-2.5 rounded-xl border-2 border-slate-900 bg-paper-50 font-mono text-xs shadow-comic-sm focus:outline-none"
          />
        </div>

        {/* Save Button */}
        <div className="pt-4 flex justify-end">
          <button
            type="submit"
            className="px-8 py-3 bg-teal-900 hover:bg-teal-950 text-white border-2 border-slate-900 rounded-xl font-extrabold text-xs shadow-comic hover:-translate-y-0.5 transition-all flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Save Preferences</span>
          </button>
        </div>

      </form>

    </div>
  );
};
