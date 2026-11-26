import React, { useState } from 'react';
import {
  ArrowLeft, CheckCircle2, Eye, Edit3, Image as ImageIcon,
  Clock, Tag, AlertCircle, RefreshCw
} from 'lucide-react';
import TiptapEditor from './TiptapEditor.js';

interface BlogEditorStudioProps {
  initialBlog: any | null;
  onSave: (blogData: any) => Promise<void>;
  onClose: () => void;
}

const PRESET_IMAGES = [
  { label: 'Konark Temple', url: '/banners/konark_temple.png' },
  { label: 'Puri Jagannath', url: '/banners/jagannath_temple.png' },
  { label: 'Chilika Lake', url: '/banners/chilika_lake.png' },
  { label: 'Marine Drive', url: '/banners/hero_marine_drive_panoramic.jpg' },
  { label: 'Luxury Fleet', url: '/banners/travel_fleet.png' },
  { label: 'Bhubaneswar City', url: '/banners/bhubaneswar_city.png' },
];

const SUGGESTED_TAGS = [
  'Puri Jagannath', 'Konark Sun Temple', 'Chilika Dolphins', 'Golden Triangle',
  'Road Trip Guide', 'Force Urbania', 'Odisha Tourism', 'Marine Drive', 'VIP Pilgrimage'
];

export default function BlogEditorStudio({ initialBlog, onSave, onClose }: BlogEditorStudioProps) {
  const isEditing = Boolean(initialBlog);

  const [title, setTitle] = useState(initialBlog?.title || '');
  const [slug, setSlug] = useState(initialBlog?.slug || '');
  const [summary, setSummary] = useState(initialBlog?.summary || '');
  const [content, setContent] = useState(initialBlog?.content || '');
  const [image, setImage] = useState(initialBlog?.image || '/banners/konark_temple.png');
  const [author, setAuthor] = useState(initialBlog?.author || 'Shibani Editorial Desk');
  const [date, setDate] = useState(initialBlog?.date || new Date().toISOString().split('T')[0]);
  const [tags, setTags] = useState<string[]>(initialBlog?.tags || ['Odisha Tourism', 'Travel Guide']);
  const [tagInput, setTagInput] = useState('');
  const [category, setCategory] = useState(initialBlog?.category || 'Odisha Travel Guide');

  const [viewMode, setViewMode] = useState<'editor' | 'preview'>('editor');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  // Auto-generate slug from title
  const handleGenerateSlug = () => {
    if (!title) return;
    const generated = title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-');
    setSlug(generated);
  };

  // Add tag
  const handleAddTag = (newTag: string) => {
    const trimmed = newTag.trim();
    if (trimmed && !tags.includes(trimmed)) {
      setTags([...tags, trimmed]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(t => t !== tagToRemove));
  };

  // Word count & read time estimation
  const wordCount = content.replace(/<[^>]*>/g, ' ').trim().split(/\s+/).filter(Boolean).length;
  const readTimeMinutes = Math.max(1, Math.ceil(wordCount / 200));

  const handleFormSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!title.trim()) {
      setError('Please provide an article title.');
      return;
    }
    if (!slug.trim()) {
      setError('Please provide a URL slug.');
      return;
    }
    if (!content.trim() || content === '<p></p>') {
      setError('Please write some content in the editor.');
      return;
    }

    setSaving(true);
    setError('');

    try {
      await onSave({
        title,
        slug,
        summary: summary || title,
        content,
        image,
        author,
        date,
        tags,
        category,
      });
    } catch (err: any) {
      setError(err?.message || 'Failed to save blog post.');
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#F8FAF9] text-slate-800 flex flex-col font-sans select-none overflow-hidden">
      
      {/* ── 1. STUDIO TOP ACTION BAR (Clean White / Emerald Theme) ── */}
      <header className="bg-white border-b border-slate-200 px-4 sm:px-8 py-3.5 flex items-center justify-between gap-3 shrink-0 z-20 shadow-xs">
        
        {/* Left: Back + Status */}
        <div className="flex items-center gap-3 min-w-0">
          <button
            type="button"
            onClick={onClose}
            className="p-2 sm:px-3.5 sm:py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 transition-colors cursor-pointer flex items-center gap-2 text-xs font-bold shrink-0"
            title="Return to Blogs list"
          >
            <ArrowLeft className="w-4 h-4 text-[#006837]" />
            <span className="hidden sm:inline">Back to Blog List</span>
          </button>

          <div className="h-6 w-px bg-slate-200 hidden sm:block" />

          <div className="truncate text-left">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#006837] block leading-none">
              {isEditing ? 'Editing Article' : '✨ New Article Studio'}
            </span>
            <h1 className="text-sm sm:text-base font-black text-slate-900 truncate max-w-xs sm:max-w-md mt-0.5">
              {title || 'Untitled Blog Post'}
            </h1>
          </div>
        </div>

        {/* Center: View Switcher (Editor vs Live Reader Preview) */}
        <div className="hidden md:flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-bold">
          <button
            type="button"
            onClick={() => setViewMode('editor')}
            className={`px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
              viewMode === 'editor'
                ? 'bg-white text-[#006837] shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Edit3 className="w-3.5 h-3.5 text-[#006837]" />
            <span>Editor Studio</span>
          </button>

          <button
            type="button"
            onClick={() => setViewMode('preview')}
            className={`px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
              viewMode === 'preview'
                ? 'bg-white text-[#006837] shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Eye className="w-3.5 h-3.5 text-amber-600" />
            <span>Live Reader Preview</span>
          </button>
        </div>

        {/* Right: Word Count & Save Action */}
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          <div className="hidden lg:flex items-center gap-2 text-xs text-slate-500 font-mono bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
            <Clock className="w-3.5 h-3.5 text-amber-600" />
            <span>~{readTimeMinutes} min read</span>
            <span className="text-slate-300">•</span>
            <span>{wordCount} words</span>
          </div>

          <button
            type="button"
            onClick={() => handleFormSubmit()}
            disabled={saving}
            className="px-5 sm:px-6 py-2.5 rounded-xl bg-[#006837] hover:bg-[#008746] text-white font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer active:scale-95 disabled:opacity-50"
          >
            {saving ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Publishing...</span>
              </>
            ) : (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-200" />
                <span>Save &amp; Publish</span>
              </>
            )}
          </button>
        </div>

      </header>

      {/* Error alert if any */}
      {error && (
        <div className="bg-rose-50 border-b border-rose-200 px-6 py-2.5 text-rose-800 text-xs flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span className="font-semibold">{error}</span>
          </div>
          <button onClick={() => setError('')} className="text-rose-600 hover:text-rose-900 text-xs font-bold underline">
            Dismiss
          </button>
        </div>
      )}

      {/* ── 2. MAIN BODY VIEW ── */}
      <div className="flex-1 overflow-y-auto">
        
        {viewMode === 'editor' ? (
          <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start text-left">
              
              {/* ── Left Writing Canvas (8 cols) ── */}
              <div className="lg:col-span-8 space-y-6">
                
                {/* Title */}
                <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 shadow-xs">
                  <label className="block text-[11px] font-black uppercase tracking-wider text-[#006837] mb-2">
                    Article Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    onBlur={() => { if (!slug) handleGenerateSlug(); }}
                    placeholder="e.g. Complete 3-Day Puri & Konark Itinerary by Cab (2026)"
                    className="w-full bg-transparent text-2xl sm:text-3xl font-black text-slate-900 placeholder-slate-300 focus:outline-none border-b-2 border-slate-200 focus:border-[#006837] pb-3 transition-colors"
                  />

                  {/* Slug field */}
                  <div className="mt-4 flex items-center gap-2 text-xs flex-wrap">
                    <span className="text-slate-400 font-mono text-[11px]">shibanitravels.com/blog/</span>
                    <input
                      type="text"
                      required
                      value={slug}
                      onChange={e => setSlug(e.target.value)}
                      placeholder="complete-puri-konark-guide"
                      className="flex-1 min-w-[200px] bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-800 font-mono focus:bg-white focus:border-[#006837] outline-none"
                    />
                    <button
                      type="button"
                      onClick={handleGenerateSlug}
                      className="px-3 py-1.5 rounded-xl bg-emerald-50 text-[#006837] text-xs font-bold border border-emerald-200 hover:bg-emerald-100 cursor-pointer transition-colors"
                      title="Auto generate slug from title"
                    >
                      Generate Slug
                    </button>
                  </div>
                </div>

                {/* Excerpt / Summary */}
                <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs">
                  <label className="block text-[11px] font-black uppercase tracking-wider text-slate-700 mb-2">
                    Short Excerpt / Search Teaser
                  </label>
                  <textarea
                    rows={2}
                    value={summary}
                    onChange={e => setSummary(e.target.value)}
                    placeholder="A quick 1-2 sentence preview for search results, social sharing, and blog cards..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-3.5 text-xs sm:text-sm text-slate-800 focus:bg-white focus:border-[#006837] outline-none leading-relaxed transition-colors"
                  />
                </div>

                {/* TipTap Rich Text Editor */}
                <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-3">
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-[11px] font-black uppercase tracking-wider text-slate-700">
                      Article Story (TipTap Rich Editor)
                    </label>
                    <span className="text-[10px] text-slate-400 font-mono">
                      Headings • Formatting • Quotes • Bullet Lists
                    </span>
                  </div>

                  <TiptapEditor
                    value={content}
                    onChange={setContent}
                    placeholder="Write your insightful travel story, temple timings, highway tips, recommended hotels, and road circuits here..."
                    minHeight="420px"
                    maxHeight="650px"
                  />
                </div>

              </div>

              {/* ── Right Metadata Panel (4 cols) ── */}
              <div className="lg:col-span-4 space-y-6">
                
                {/* 1. Featured Cover Image */}
                <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-3.5">
                  <div className="flex items-center justify-between">
                    <label className="text-[11px] font-black uppercase tracking-wider text-[#006837] flex items-center gap-1.5">
                      <ImageIcon className="w-4 h-4 text-[#006837]" />
                      Cover Image
                    </label>
                    <span className="text-[10px] text-slate-400 font-mono">16:9 Landscape</span>
                  </div>

                  {/* Preview container */}
                  <div className="w-full h-44 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 relative shadow-inner">
                    {image ? (
                      <img src={image} alt="Blog preview" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-400 text-xs">
                        No image specified
                      </div>
                    )}
                  </div>

                  {/* Image URL input */}
                  <div>
                    <input
                      type="text"
                      required
                      value={image}
                      onChange={e => setImage(e.target.value)}
                      placeholder="/banners/konark_temple.png or https://..."
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:bg-white focus:border-[#006837] outline-none font-mono"
                    />
                  </div>

                  {/* Preset Quick Images */}
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1.5">
                      Quick Odisha Presets:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {PRESET_IMAGES.map((p, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setImage(p.url)}
                          className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all border cursor-pointer ${
                            image === p.url
                              ? 'bg-[#006837] text-white border-[#006837] shadow-xs'
                              : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100 hover:text-slate-900'
                          }`}
                        >
                          {p.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 2. Publishing Info */}
                <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-4">
                  <label className="block text-[11px] font-black uppercase tracking-wider text-slate-700">
                    Publishing Details
                  </label>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 mb-1">Author Name</label>
                    <input
                      type="text"
                      value={author}
                      onChange={e => setAuthor(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:bg-white focus:border-[#006837] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 mb-1">Publish Date</label>
                    <input
                      type="date"
                      value={date}
                      onChange={e => setDate(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:bg-white focus:border-[#006837] outline-none cursor-pointer"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 mb-1">Category</label>
                    <select
                      value={category}
                      onChange={e => setCategory(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:bg-white focus:border-[#006837] outline-none cursor-pointer"
                    >
                      <option value="Odisha Travel Guide">Odisha Travel Guide</option>
                      <option value="Spiritual Yatras & Temples">Spiritual Yatras &amp; Temples</option>
                      <option value="Coastal & Marine Drives">Coastal &amp; Marine Drives</option>
                      <option value="Eco-Tourism & Wildlife">Eco-Tourism &amp; Wildlife</option>
                      <option value="Fleet & Luxury Coaches">Fleet &amp; Luxury Coaches</option>
                    </select>
                  </div>
                </div>

                {/* 3. Tags Manager */}
                <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-[11px] font-black uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5 text-[#006837]" />
                      Tags
                    </label>
                    <span className="text-[10px] text-slate-400 font-bold">{tags.length} added</span>
                  </div>

                  {/* Active tags */}
                  <div className="flex flex-wrap gap-1.5 min-h-[32px]">
                    {tags.map((t, i) => (
                      <span
                        key={i}
                        className="bg-emerald-50 border border-emerald-200 text-[#006837] text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow-xs"
                      >
                        #{t}
                        <button
                          type="button"
                          onClick={() => handleRemoveTag(t)}
                          className="hover:text-rose-600 font-bold text-sm cursor-pointer ml-0.5"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>

                  {/* Add custom tag */}
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={tagInput}
                      onChange={e => setTagInput(e.target.value)}
                      onKeyDown={e => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddTag(tagInput);
                        }
                      }}
                      placeholder="Add tag and hit Enter..."
                      className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:bg-white focus:border-[#006837] outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => handleAddTag(tagInput)}
                      className="px-3.5 py-2 rounded-xl bg-[#006837] text-white text-xs font-bold hover:bg-[#008746] cursor-pointer"
                    >
                      Add
                    </button>
                  </div>

                  {/* Suggested Tag Pills */}
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                      Quick Suggestions:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {SUGGESTED_TAGS.map((st, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => handleAddTag(st)}
                          className="px-2 py-0.5 rounded-md text-[10px] bg-slate-100 hover:bg-emerald-50 text-slate-600 hover:text-[#006837] border border-slate-200 cursor-pointer font-medium"
                        >
                          +{st}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 4. Google SERP Snippet Preview */}
                <div className="bg-slate-50 border border-slate-200 rounded-3xl p-5 shadow-xs space-y-1 text-left">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block mb-1">
                    Google Search Snippet Preview
                  </span>
                  <p className="text-xs text-emerald-700 font-mono truncate font-medium">
                    https://shibanitravels.com/blog/{slug || 'post-slug'}
                  </p>
                  <p className="text-sm font-bold text-blue-600 hover:underline line-clamp-1 cursor-pointer">
                    {title || 'Article Title - Shibani Travels'}
                  </p>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {summary || 'Read comprehensive travel tips and route circuits across Odisha with verified cab rentals and luxury coaches.'}
                  </p>
                </div>

              </div>

            </div>
          </div>
        ) : (
          /* ── 3. READER PREVIEW MODE (Clean Magazine Style) ── */
          <div className="max-w-4xl mx-auto p-4 sm:p-8 my-8 bg-white text-slate-900 rounded-3xl shadow-xl border border-slate-200 overflow-hidden text-left">
            
            {/* Featured Image */}
            <div className="h-64 sm:h-96 rounded-2xl overflow-hidden relative mb-8 shadow-md">
              <img src={image} alt={title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white text-left">
                <span className="px-3.5 py-1 rounded-full bg-[#E25822] text-xs font-bold uppercase tracking-wider inline-block mb-3 shadow-md">
                  {category}
                </span>
                <h1 className="text-2xl sm:text-4xl font-black text-white leading-tight drop-shadow-md">
                  {title || 'Article Title Preview'}
                </h1>
              </div>
            </div>

            {/* Author & Stats Strip */}
            <div className="flex items-center justify-between pb-6 border-b border-slate-200 mb-8 flex-wrap gap-4 text-xs text-slate-600 font-medium">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-100 text-[#006837] font-black flex items-center justify-center text-sm shadow-xs">
                  {author.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-slate-900">{author}</p>
                  <p className="text-[11px] text-slate-500">{date} • {readTimeMinutes} min read</p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 flex-wrap">
                {tags.map((t, i) => (
                  <span key={i} className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 font-bold text-[11px] border border-slate-200">
                    #{t}
                  </span>
                ))}
              </div>
            </div>

            {/* Content Display */}
            <div
              className="prose prose-slate max-w-none text-left leading-relaxed text-sm sm:text-base space-y-4"
              dangerouslySetInnerHTML={{ __html: content }}
            />

            {/* Booking Banner Callout */}
            <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-[#00381B] to-[#004D26] text-white flex flex-col sm:flex-row items-center justify-between gap-4 text-left shadow-lg">
              <div>
                <h4 className="text-lg font-black text-white">Planning this trip to {title.split(' ')[0] || 'Odisha'}?</h4>
                <p className="text-xs text-green-100/80 mt-1">Book a certified cab or luxury tempo traveller with 28+ years trusted chauffeur services.</p>
              </div>
              <button
                type="button"
                onClick={() => setViewMode('editor')}
                className="px-5 py-2.5 rounded-full bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs uppercase tracking-wider shrink-0 transition-colors cursor-pointer shadow-md"
              >
                Return to Editor
              </button>
            </div>

          </div>
        )}

      </div>

    </div>
  );
}
