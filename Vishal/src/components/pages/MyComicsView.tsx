import React from 'react';
import type { ComicStory } from '../../types/comiclingo';
import { 
  BookOpen, 
  Trash2, 
  Heart, 
  Play, 
  PlusCircle, 
  Calendar, 
  Layers, 
  Sparkles 
} from 'lucide-react';
import { playSoundEffect } from '../../utils/audio';

interface MyComicsViewProps {
  comics: ComicStory[];
  onOpenComic: (comic: ComicStory) => void;
  onDeleteComic: (id: string) => void;
  onToggleFavorite: (id: string) => void;
  onCreateNew: () => void;
}

export const MyComicsView: React.FC<MyComicsViewProps> = ({
  comics,
  onOpenComic,
  onDeleteComic,
  onToggleFavorite,
  onCreateNew,
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6 animate-slide-up">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b-2 border-slate-900 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Layers className="w-6 h-6 text-teal-900" />
            <h1 className="text-2xl sm:text-3xl font-extrabold font-comic text-slate-900">
              My Generated Comics
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Browse and replay your personalized AI comic stories anytime.
          </p>
        </div>

        <button
          onClick={() => {
            playSoundEffect('pop');
            onCreateNew();
          }}
          className="px-5 py-2.5 bg-coral-500 hover:bg-coral-600 text-white border-2 border-slate-900 rounded-xl font-extrabold text-xs sm:text-sm shadow-comic hover:-translate-y-0.5 transition-all flex items-center gap-2"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Create New Comic</span>
        </button>
      </div>

      {/* Comics Grid */}
      {comics.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {comics.map((comic) => (
            <div
              key={comic.id}
              className="bg-white border-3 border-slate-900 rounded-2xl p-5 shadow-comic hover:-translate-y-1 transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Header & Badges */}
                <div className="flex items-center justify-between mb-3">
                  <span className="bg-amber-100 text-amber-900 border border-slate-900 text-[10px] font-extrabold px-2 py-0.5 rounded-md">
                    {comic.situation}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => onToggleFavorite(comic.id)}
                      className="p-1 rounded-lg text-slate-400 hover:text-red-500"
                    >
                      <Heart className={`w-4 h-4 ${comic.isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
                    </button>
                    <button
                      onClick={() => onDeleteComic(comic.id)}
                      className="p-1 rounded-lg text-slate-400 hover:text-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Comic Mini Cover Visual */}
                <div className="h-36 bg-gradient-to-br from-teal-900 to-teal-800 rounded-xl border-2 border-slate-900 p-4 text-white flex flex-col justify-between mb-3 shadow-comic-sm relative overflow-hidden">
                  <div className="absolute right-2 top-2 opacity-15 pointer-events-none font-bangers text-6xl">
                    ISSUE #1
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-coral-400 uppercase tracking-wider">
                      {comic.comicStyle}
                    </span>
                    <h3 className="font-extrabold text-base font-comic leading-snug line-clamp-2 mt-0.5">
                      {comic.title}
                    </h3>
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-teal-200 font-medium">
                    <span>{comic.pages.length} Pages</span>
                    <span>{comic.difficulty} • {comic.ageGroup}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 line-clamp-2 font-medium">
                  {comic.summary}
                </p>
              </div>

              {/* Action Bar */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[10px] text-slate-400 font-mono">
                  {comic.vocabulary.length} vocab words
                </span>
                <button
                  onClick={() => {
                    playSoundEffect('click');
                    onOpenComic(comic);
                  }}
                  className="px-4 py-2 bg-teal-900 hover:bg-teal-950 text-white border-2 border-slate-900 rounded-xl font-extrabold text-xs shadow-comic-sm flex items-center gap-1.5"
                >
                  <Play className="w-3.5 h-3.5 fill-white" />
                  <span>Open Comic</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white border-3 border-dashed border-slate-400 rounded-3xl p-12 text-center space-y-4">
          <div className="w-16 h-16 bg-teal-100 rounded-2xl border-2 border-slate-900 mx-auto flex items-center justify-center shadow-comic-sm">
            <BookOpen className="w-8 h-8 text-teal-800" />
          </div>
          <h3 className="font-extrabold text-xl text-slate-800 font-comic">
            Your Comic Shelf is Empty
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
            Create your first AI English learning comic story and build an original library of situational adventures.
          </p>
          <button
            onClick={() => {
              playSoundEffect('pop');
              onCreateNew();
            }}
            className="px-6 py-3 bg-coral-500 hover:bg-coral-600 text-white border-2 border-slate-900 rounded-xl font-extrabold text-xs shadow-comic inline-flex items-center gap-2"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Generate My First Comic</span>
          </button>
        </div>
      )}

    </div>
  );
};
