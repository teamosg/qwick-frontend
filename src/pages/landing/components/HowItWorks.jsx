import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Clock, ChevronRight, FileText } from 'lucide-react';

const lessons = [
  { id: 1, title: 'Welcome', duration: '2:45', description: 'Understand what this platform can do.' },
  { id: 2, title: 'Getting Started', duration: '5:12', description: 'Create your account and set up your profile.' },
  { id: 3, title: 'Your First Post', duration: '4:20', description: 'Learn how to submit your first video.' },
  { id: 4, title: 'Tips & Tricks', duration: '3:35', description: 'How to increase your views and earnings.' },
  { id: 5, title: 'Next Steps', duration: '2:15', description: 'Where to go from here.' },
];

const HowItWorks = () => {
  const [activeLesson, setActiveLesson] = useState(1);

  return (
    <section className="py-24 bg-white border-t border-slate-100">
      <div className="container mx-auto px-6 text-center mb-16">
        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-4 font-outfit">Video Guide</span>
        <h2 className="text-3xl md:text-5xl font-bold mb-6 font-silkscreen tracking-tighter uppercase">Learn your way around</h2>
        <p className="text-slate-500 max-w-xl mx-auto font-outfit">
          Watch our short guide to get started with the platform. Quick, easy, and straight to the point.
        </p>
      </div>

      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto">
          {/* Video Player Area */}
          <div className="lg:w-2/3 aspect-video bg-black rounded-[2rem] overflow-hidden shadow-2xl relative group">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center group-hover:scale-110 transition-transform cursor-pointer">
                <Play size={32} className="text-white fill-white ml-2" />
              </div>
            </div>
            {/* Simple video UI overlay */}
            <div className="absolute bottom-0 inset-x-0 p-8 bg-gradient-to-t from-black/80 to-transparent">
              <div className="flex items-center gap-4 text-white/60 text-sm">
                <div className="h-1 flex-1 bg-white/20 rounded-full overflow-hidden">
                    <div className="h-full bg-white w-1/3" />
                </div>
                <span>1:24 / 4:20</span>
              </div>
            </div>
          </div>

          {/* Lessons List */}
          <div className="lg:w-1/3 space-y-4">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center justify-between">
                <span>What you'll learn</span>
                <span className="text-slate-300">5 Lessons</span>
            </div>
            <div className="space-y-2">
              {lessons.map((lesson) => (
                <button 
                  key={lesson.id}
                  onClick={() => setActiveLesson(lesson.id)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center gap-4 group ${
                    activeLesson === lesson.id 
                    ? 'bg-slate-900 border-slate-900 text-white shadow-lg' 
                    : 'bg-white border-slate-100 text-slate-900 hover:border-slate-300'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                    activeLesson === lesson.id ? 'bg-white/10' : 'bg-slate-100'
                  }`}>
                    {activeLesson === lesson.id ? <Play size={20} className="fill-white" /> : <Play size={20} className="text-slate-400" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-0.5">
                      <span className="font-bold truncate text-sm">{lesson.title}</span>
                      <span className={`text-[10px] font-bold ${activeLesson === lesson.id ? 'text-white/60' : 'text-slate-400'}`}>
                        {lesson.duration}
                      </span>
                    </div>
                    <p className={`text-[10px] truncate ${activeLesson === lesson.id ? 'text-white/40' : 'text-slate-400'}`}>
                      {lesson.description}
                    </p>
                  </div>
                </button>
              ))}
            </div>
            
            <button className="w-full mt-6 py-4 border border-slate-200 rounded-2xl flex items-center justify-center gap-2 text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors">
                <FileText size={18} />
                Download Guide (PDF)
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
