import React, { useState } from "react";
import { motion } from "framer-motion";
import { Play, Clock, ChevronRight, FileText, PlayCircle } from "lucide-react";

const lessons = [
  {
    id: 1,
    title: "Welcome",
    duration: "2:45",
    description: "Understand what this platform can do.",
    videoUrl: "https://vjs.zencdn.net/v/oceans.mp4",
  },
  {
    id: 2,
    title: "Getting Started",
    duration: "5:12",
    description: "Create your account and set up your profile.",
    videoUrl:
      "https://cdn.coverr.co/videos/coverr-typing-on-a-laptop-4482/1080p.mp4",
  },
  {
    id: 3,
    title: "Your First Post",
    duration: "4:20",
    description: "Learn how to submit your first video.",
    videoUrl: "https://cdn.pixabay.com/video/2024/05/26/213757_tiny.mp4",
  },
  {
    id: 4,
    title: "Tips & Tricks",
    duration: "3:35",
    description: "How to increase your views and earnings.",
    videoUrl: "https://vjs.zencdn.net/v/oceans.mp4",
  },
  {
    id: 5,
    title: "Next Steps",
    duration: "2:15",
    description: "Where to go from here.",
    videoUrl:
      "https://cdn.coverr.co/videos/coverr-typing-on-a-laptop-4482/1080p.mp4",
  },
];

const HowItWorks = () => {
  const [activeLessonId, setActiveLessonId] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);

  const activeLesson = lessons.find((l) => l.id === activeLessonId);

  const handleLessonClick = (id) => {
    setActiveLessonId(id);
    setIsPlaying(true);
  };

  return (
    <section
      className="py-24 bg-white border-t border-slate-100"
      id="video-guides"
    >
      <div className="container mx-auto px-6 text-center mb-16">
        <span className="text-[10px] font-black text-[#9B9B9B] uppercase tracking-widest   px-3 py-2  rounded  font-inter">
          Video Guide
        </span>
        <h2 className="text-3xl md:text-5xl font-medium mb-4 mt-2 font-inter tracking-tighter ">
          Learn Your Way Around
        </h2>
        <p className="text-[#9B9B9B] max-w-xl mx-auto font-inter">
          Follow our quick, step-by-step video guides and get comfortable using
          the platform in minutes, no guesswork needed.{" "}
        </p>
      </div>

      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto">
          {/* Video Player Area */}
          <div className="lg:w-2/3 aspect-video bg-black rounded-[2.5rem] overflow-hidden shadow-2xl relative group border border-slate-100/10">
            {isPlaying ? (
              <video
                src={activeLesson.videoUrl}
                autoPlay
                controls
                className="w-full h-full object-contain"
              />
            ) : (
              <>
                {/* Video Thumbnail */}
                <img
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop"
                  alt="Video Thumbnail"
                  className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-black/40 to-transparent" />

                <div className="absolute inset-0 flex items-center justify-center z-10">
                  <div
                    onClick={() => setIsPlaying(true)}
                    className="w-24 h-24 bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/20 hover:bg-white/20 transition-all cursor-pointer group/play"
                  >
                    <Play
                      size={32}
                      className="text-white fill-white ml-2 group-hover/play:scale-110 transition-transform"
                    />
                  </div>
                </div>
                {/* Simple video UI overlay */}
                <div className="absolute bottom-0 inset-x-0 p-8 bg-gradient-to-t from-black/80 to-transparent">
                  <div className="flex items-center gap-4 text-white/60 text-sm">
                    <div className="h-1 flex-1 bg-white/20 rounded-full overflow-hidden">
                      <div className="h-full bg-white w-1/3" />
                    </div>
                    <span>0:00 / {activeLesson.duration}</span>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Lessons List */}
          <div className="lg:w-1/3 space-y-4">
            <div className="text-xs font-bold text-[#9B9B9B]  tracking-widest mb-4 flex items-center justify-between">
              <span>What You'll Learn</span>
              <span className="text-[#9B9B9B]">5 Lessons</span>
            </div>
            <div className="space-y-2">
              {lessons.map((lesson) => (
                <button
                  key={lesson.id}
                  onClick={() => handleLessonClick(lesson.id)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center gap-4 group ${
                    activeLessonId === lesson.id
                      ? "bg-slate-900 border-slate-900 text-white shadow-lg"
                      : "bg-white border-slate-100 text-slate-900 hover:border-slate-300"
                  }`}
                >
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                      activeLessonId === lesson.id
                        ? "bg-white/10"
                        : "bg-slate-100"
                    }`}
                  >
                    {activeLessonId === lesson.id ? (
                      <Play size={20} className="fill-white" />
                    ) : (
                      <Play size={20} className="text-slate-400" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-0.5">
                      <span className="font-bold truncate text-sm">
                        {lesson.title}
                      </span>
                      <span
                        className={`text-[10px] font-bold ${activeLessonId === lesson.id ? "text-white/60" : "text-slate-400"}`}
                      >
                        {lesson.duration}
                      </span>
                    </div>
                    <p
                      className={`text-[10px] truncate ${activeLessonId === lesson.id ? "text-white/40" : "text-slate-400"}`}
                    >
                      {lesson.description}
                    </p>
                  </div>
                </button>
              ))}
            </div>

            <div className="flex justify-between gap-2">
              <button className="w-full mt-6 px-2 py-4 border border-slate-200 rounded-2xl flex items-center justify-center cursor-pointer gap-2 text-xs font-medium text-slate-600 hover:bg-slate-50 transition-colors">
                <FileText size={18} />
                Download Guide (PDF)
              </button>
              <button className="w-full mt-6 px-2 py-4 border border-slate-200 rounded-2xl flex items-center justify-center cursor-pointer gap-2 text-xs font-medium text-slate-600 hover:bg-slate-50 transition-colors">
                <PlayCircle size={18} />
                See Youtube Channel
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
