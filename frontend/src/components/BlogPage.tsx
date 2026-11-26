import React, { useState, useEffect } from 'react';
import { Blog } from '../types';
import { Sparkles, Calendar, User, Tag, ArrowRight, BookOpen, ChevronRight, Home } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function BlogPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);

  useEffect(() => {
    fetch('/api/blogs')
      .then((res) => res.json())
      .then((data) => {
        setBlogs(data);
        setLoading(false);
      });
  }, []);

  return (
    <div className="bg-[#FAFDFB] min-h-screen text-slate-800 font-sans">
      
      {/* ══ FULL SCREEN ADVANCED BRAND BLOG HERO SHOWCASE ══ */}
      <div className="relative min-h-[50vh] flex flex-col justify-between pt-[104px] pb-12 overflow-hidden text-white bg-gradient-to-r from-[#00381B] via-[#004D26] to-[#00381B]">
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
          <img
            src="/banners/bhubaneswar_city.png"
            alt="Odisha Travel Guides"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-[3px]"
          style={{ background: 'linear-gradient(to right, transparent, #006837 30%, #D32F2F 50%, #006837 70%, transparent)' }} />

        {/* Top Breadcrumb Navigation */}
        <div className="max-w-7xl mx-auto w-full relative z-10 px-4 sm:px-6 lg:px-8 pt-2 pb-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-green-100 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/15 shadow-sm">
              <button onClick={() => window.location.href = '/'} className="flex items-center gap-1.5 hover:text-white transition-colors">
                <Home className="w-3.5 h-3.5 text-green-300" /> Home
              </button>
              <ChevronRight className="w-3.5 h-3.5 text-white/40" />
              <span className="text-amber-300 font-bold">Odisha Travel Guides</span>
            </div>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest text-green-200 bg-white/10 backdrop-blur-md border border-white/20 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
              Expert Travel Logs
            </div>
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center my-auto px-4">
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight mb-4 drop-shadow-md"
          >
            Odisha Travel Guides &{' '}
            <span className="text-amber-300 italic font-serif">
              Insider Routes
            </span>
          </motion.h1>
          <p className="text-green-100/90 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed font-medium">
            Discover road trip itineraries, temple timings, beach guides, and wildlife safari advice written by our senior chauffeurs and travel managers.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* Blog Posts Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2].map((n) => (
              <div key={n} className="bg-[#2a1b17]/40 h-80 rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : blogs.length === 0 ? (
          <p className="text-stone-400 text-sm">No blogs written yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {blogs.map((b) => (
              <div
                key={b.id}
                className="group bg-[#2b1b17]/80 border border-yellow-500/10 rounded-2xl overflow-hidden shadow-lg hover:border-yellow-500/30 transition-all duration-500 flex flex-col justify-between"
              >
                
                {/* Image */}
                <div className="h-56 overflow-hidden relative">
                  <img
                    src={b.image}
                    alt={b.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1e120f] via-transparent to-transparent opacity-60" />
                  
                  {/* Category tag */}
                  <span className="absolute top-4 left-4 bg-yellow-500 text-stone-950 font-bold px-3 py-1 rounded-md text-[10px] uppercase font-mono">
                    {b.tags[0] || 'Odisha'}
                  </span>
                </div>

                {/* Content info */}
                <div className="p-6 flex-1 flex flex-col justify-between text-left">
                  <div>
                    <div className="flex items-center gap-4 text-[10px] text-stone-400 font-mono mb-2">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-[#c5a059]" />
                        {b.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <User className="w-3.5 h-3.5 text-[#c5a059]" />
                        By {b.author}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-yellow-500 transition-colors leading-snug">
                      {b.title}
                    </h3>

                    <p className="text-xs text-stone-400 leading-relaxed mb-6">
                      {b.summary}
                    </p>
                  </div>

                  <button
                    onClick={() => setSelectedBlog(b)}
                    className="inline-flex items-center gap-1 text-xs font-bold text-yellow-500 hover:text-white transition-colors group-hover:underline"
                  >
                    Read Premium Article
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>

      {/* Expanded Blog Post Overlay */}
      <AnimatePresence>
        {selectedBlog && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-2 sm:p-4 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-[#241713] border border-yellow-500/20 max-w-3xl w-full rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
            >
              <div className="p-6 border-b border-yellow-500/10 flex items-center justify-between">
                <h3 className="text-base font-bold text-yellow-500 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-yellow-500" />
                  Luxury Guide Reader
                </h3>
                <button
                  onClick={() => setSelectedBlog(null)}
                  className="p-1.5 hover:bg-white/10 rounded-lg text-stone-400 hover:text-white text-sm"
                >
                  ✕ Close Guide
                </button>
              </div>

              <div className="overflow-y-auto p-6 sm:p-8 space-y-6 text-left max-h-[70vh]">
                <img
                  src={selectedBlog.image}
                  alt={selectedBlog.title}
                  className="w-full h-64 object-cover rounded-xl border border-yellow-500/10"
                />

                <div className="flex items-center gap-4 text-[10px] text-stone-400 font-mono">
                  <span>DATE: {selectedBlog.date}</span>
                  <span>AUTHOR: {selectedBlog.author}</span>
                </div>

                <h2 className="text-2xl font-black text-white">{selectedBlog.title}</h2>

                <div className="text-sm text-stone-300 space-y-4 leading-relaxed whitespace-pre-wrap">
                  {selectedBlog.content}
                </div>
              </div>

              <div className="p-4 bg-[#1e120f] border-t border-yellow-500/10 flex justify-end">
                <button
                  onClick={() => setSelectedBlog(null)}
                  className="bg-yellow-500 text-stone-950 font-bold px-5 py-2 rounded-xl text-xs"
                >
                  Close Reader
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
