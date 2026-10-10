import React from 'react';
import { 
  Sparkles, 
  BookOpen, 
  Users, 
  Compass, 
  Zap, 
  ArrowRight, 
  ShieldCheck, 
  Flame, 
  Trophy, 
  MessageSquare,
  CheckCircle2,
  Play
} from 'lucide-react';
import { CharacterAvatar } from '../character/CharacterAvatar';
import { PRESET_CHARACTERS } from '../../services/characterAiService';
import { playSoundEffect } from '../../utils/audio';

interface LandingPageProps {
  onStartLearning: () => void;
  onSignIn: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onStartLearning,
  onSignIn,
}) => {
  return (
    <div className="space-y-16 py-8 animate-slide-up">
      
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-teal-950 via-teal-900 to-teal-850 text-white rounded-3xl border-4 border-slate-900 p-8 sm:p-12 shadow-comic-lg relative overflow-hidden">
          
          <div className="absolute right-4 bottom-2 opacity-10 pointer-events-none select-none font-bangers text-[180px] leading-none">
            COMIC
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-coral-500 rounded-full text-xs font-black tracking-wider border border-slate-900 shadow-comic-sm">
                <Sparkles className="w-3.5 h-3.5" />
                <span>AI-POWERED INTERACTIVE ENGLISH LEARNING</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-comic tracking-tight leading-tight">
                Learn English. <br />
                <span className="text-coral-400 underline decoration-4 decoration-amber-400">Live the Story.</span>
              </h1>

              <p className="text-base sm:text-lg text-teal-100 font-medium leading-relaxed max-w-xl">
                Ditch robotic textbook drills. ComicLingo AI creates original, adaptive comic stories where characters act out real conversations—from high-stakes job interviews to airport adventures.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => {
                    playSoundEffect('pop');
                    onStartLearning();
                  }}
                  className="px-8 py-4 bg-coral-500 hover:bg-coral-600 text-white border-3 border-slate-900 rounded-2xl font-extrabold text-sm sm:text-base shadow-comic hover:-translate-y-1 active:translate-y-0 transition-all flex items-center gap-2"
                >
                  <Sparkles className="w-5 h-5" />
                  <span>Start Learning Free</span>
                  <ArrowRight className="w-5 h-5" />
                </button>

                <button
                  onClick={() => {
                    playSoundEffect('click');
                    onSignIn();
                  }}
                  className="px-7 py-4 bg-white hover:bg-paper-100 text-teal-950 border-3 border-slate-900 rounded-2xl font-extrabold text-sm sm:text-base shadow-comic hover:-translate-y-1 active:translate-y-0 transition-all"
                >
                  Sign In to Account
                </button>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap items-center gap-4 pt-4 text-xs font-extrabold text-teal-200">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-coral-400" />
                  <span>Zero-Cost Sandbox Mode</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-coral-400" />
                  <span>Interactive Audio TTS</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-coral-400" />
                  <span>Adaptive Age 5 to 15+</span>
                </div>
              </div>
            </div>

            {/* Right Hero: Live Interactive Comic Panel Mockup */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-sm bg-white text-slate-900 rounded-3xl border-3 border-slate-900 p-5 shadow-comic-lg rotate-1 hover:rotate-0 transition-transform">
                <div className="flex items-center justify-between border-b-2 border-slate-200 pb-2 mb-3">
                  <span className="caption-box">LIVE INTERACTIVE SCENE</span>
                  <span className="text-[10px] font-bold text-coral-600 font-mono">PANEL 1 • INTERVIEW</span>
                </div>

                <div className="speech-bubble speech-bubble-bottom text-xs font-extrabold mb-3">
                  "Could you <span className="text-coral-600 underline">articulate</span> how you prioritize features under pressure?"
                </div>

                <div className="flex items-end justify-around py-3 bg-paper-100 rounded-2xl border border-slate-300">
                  <CharacterAvatar
                    character={PRESET_CHARACTERS[0]} // Alex
                    size="md"
                    action="talk"
                    expression="happy"
                  />
                  <CharacterAvatar
                    character={PRESET_CHARACTERS[1]} // Sarah
                    size="md"
                    action="nod"
                    expression="happy"
                    facing="left"
                  />
                </div>

                <div className="mt-3 speech-bubble speech-bubble-right text-xs font-semibold bg-teal-50">
                  "I take a <span className="text-coral-600 underline">pragmatic</span> approach: automated tests and clear team syncs."
                </div>

                <div className="mt-3 text-center">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Interactive Words • Voice Narration • Real Dialogue
                  </span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* How ComicLingo Works */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-extrabold uppercase tracking-wider text-coral-600 bg-coral-50 px-3 py-1 rounded-full border border-coral-200">
            THE METHODOLOGY
          </span>
          <h2 className="text-3xl font-extrabold font-comic text-slate-900">
            How ComicLingo AI Works
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Combining cognitive story immersion with generative intelligence for rapid English retention.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border-3 border-slate-900 rounded-3xl p-6 shadow-comic space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-teal-100 border-2 border-slate-900 flex items-center justify-center text-teal-900 font-bangers text-xl">
              01
            </div>
            <h3 className="text-xl font-extrabold font-comic text-slate-900">
              Personalized User Input
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              Choose your learner age group, English level, real-life context (Job Interview, Travel, Healthcare), and comic visual style.
            </p>
          </div>

          <div className="bg-white border-3 border-slate-900 rounded-3xl p-6 shadow-comic space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-coral-100 border-2 border-slate-900 flex items-center justify-center text-coral-600 font-bangers text-xl">
              02
            </div>
            <h3 className="text-xl font-extrabold font-comic text-slate-900">
              Generative Multi-Panel Comic
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              AI crafts an illustrated comic with consistent character appearances, expressive facial emotions, and authentic spoken dialogue.
            </p>
          </div>

          <div className="bg-white border-3 border-slate-900 rounded-3xl p-6 shadow-comic space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 border-2 border-slate-900 flex items-center justify-center text-amber-700 font-bangers text-xl">
              03
            </div>
            <h3 className="text-xl font-extrabold font-comic text-slate-900">
              Practice, Quiz & AI Evaluation
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              Click in-panel words to learn definitions, complete interactive dialogue drills, and receive AI speech evaluation feedback.
            </p>
          </div>
        </div>
      </section>

      {/* Why Stories Work */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-paper-200 border-3 border-slate-900 rounded-3xl p-8 sm:p-12 shadow-comic-lg flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-xl">
            <span className="text-xs font-extrabold text-teal-800 uppercase tracking-wider bg-teal-100 px-3 py-1 rounded-full border border-teal-300">
              SCIENTIFIC ADVANTAGE
            </span>
            <h2 className="text-3xl font-extrabold font-comic text-slate-900">
              Why Narrative Learning Beats Rote Memorization
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
              When language is tied to dramatic visual scenes, character facial expressions, and relatable conflict, neural recall surges by over 300%. You remember not just what a word means, but exactly when and how native speakers deploy it.
            </p>
          </div>

          <div className="p-6 bg-white border-2 border-slate-900 rounded-2xl shadow-comic max-w-xs text-center space-y-2">
            <div className="text-4xl font-extrabold text-coral-600 font-comic">3.4x</div>
            <h4 className="font-extrabold text-sm text-slate-900 font-comic">Higher Retention</h4>
            <p className="text-[11px] text-slate-500 font-medium">
              Compared to standard digital flashcard drill apps without narrative context.
            </p>
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-6">
        <div className="bg-gradient-to-r from-teal-900 to-teal-850 text-white rounded-3xl border-3 border-slate-900 p-8 sm:p-12 shadow-comic space-y-5">
          <h2 className="text-3xl sm:text-4xl font-extrabold font-comic">
            Ready to Live the Story?
          </h2>
          <p className="text-xs sm:text-sm text-teal-200 max-w-lg mx-auto">
            Step directly into the ComicLingo experience. Create original characters, read your first lesson, and master English confidence today.
          </p>
          <button
            onClick={() => {
              playSoundEffect('triumph');
              onStartLearning();
            }}
            className="px-8 py-3.5 bg-coral-500 hover:bg-coral-600 text-white border-2 border-slate-900 rounded-2xl font-extrabold text-sm shadow-comic hover:-translate-y-1 transition-all inline-flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>Launch ComicLingo AI Now</span>
          </button>
        </div>
      </section>

    </div>
  );
};
