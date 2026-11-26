import React from 'react';
import { motion } from 'motion/react';
import { Calendar, MapPin, ArrowRight, Clock, User } from 'lucide-react';

const POSTS = [
  {
    slug: 'blog',
    category: 'Travel Guide',
    categoryColor: '#052B54',
    title: 'Puri–Konark–Chilika: The Ultimate 3-Day Odisha Triangle',
    desc: 'Discover the best route, timings, temple entry tips, and budget breakdown for the iconic Odisha travel triangle.',
    img: '/banners/jagannath_temple.png',
    date: 'June 28, 2026',
    author: 'Travel Team',
    readTime: '6 min read',
  },
  {
    slug: 'blog',
    category: 'Fleet Tips',
    categoryColor: '#E25822',
    title: 'Force Urbania vs Tempo Traveller: Which Wins for Group Tours?',
    desc: 'A detailed comparison of seating comfort, luggage space, AC performance, and value-for-money for group travel.',
    img: '/images/force_urbania.png',
    date: 'June 15, 2026',
    author: 'Fleet Expert',
    readTime: '5 min read',
  },
  {
    slug: 'blog',
    category: 'Destination',
    categoryColor: '#052B54',
    title: 'Daringbadi: Odisha\'s Hidden Hill Station — Complete Travel Guide',
    desc: 'Everything you need to know about the "Kashmir of Odisha" — weather, best time to visit, stays, and cab options.',
    img: '/images/daringbadi.png',
    date: 'May 30, 2026',
    author: 'Destination Expert',
    readTime: '8 min read',
  },
];

interface BlogPreviewProps {
  onNavigate: () => void;
}

export default function BlogPreview({ onNavigate }: BlogPreviewProps) {
  return (
    <section className="py-20" style={{ background: '#FAFAF7' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="section-tag mb-4">Travel Insights</div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
              Latest <span className="text-grad-brand">Travel Guides</span>
            </h2>
            <p className="text-slate-500 mt-2 text-sm max-w-lg leading-relaxed">
              Expert tips, route guides, and destination deep-dives from the Shibani Travels team.
            </p>
          </div>
          <button onClick={onNavigate}
            className="btn-outline px-5 py-2.5 flex items-center gap-2 self-start shrink-0 cursor-pointer">
            View All Articles <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Posts grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {POSTS.map((post, i) => (
            <motion.article key={post.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.1 }}
              className="group bg-white rounded-2xl overflow-hidden border border-slate-200/60 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col"
              onClick={onNavigate}>

              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img src={post.img} alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                {/* Category badge */}
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[9px] font-black uppercase text-white tracking-wider"
                  style={{ background: post.categoryColor }}>
                  {post.category}
                </span>
              </div>

              {/* Content */}
              <div className="p-5 flex-1 flex flex-col">
                {/* Meta */}
                <div className="flex items-center gap-3 text-[10px] text-slate-400 font-semibold mb-3">
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{post.date}</span>
                  <span className="w-1 h-1 rounded-full bg-slate-300" />
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{post.readTime}</span>
                  <span className="w-1 h-1 rounded-full bg-slate-300" />
                  <span className="flex items-center gap-1"><User className="w-3 h-3" />{post.author}</span>
                </div>

                <h3 className="text-[15px] font-black text-slate-900 group-hover:text-[#052B54] transition-colors leading-snug mb-2">
                  {post.title}
                </h3>
                <p className="text-[12px] text-slate-500 leading-relaxed flex-1">{post.desc}</p>

                {/* Read more */}
                <div className="flex items-center gap-1.5 mt-4 text-[11px] font-black text-[#052B54] group-hover:gap-2.5 transition-all">
                  Read Full Guide <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
