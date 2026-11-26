import React, { useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import {
  Bold, Italic, Strikethrough, Heading1, Heading2, Heading3,
  List, ListOrdered, Quote, Code, Undo, Redo, RotateCcw
} from 'lucide-react';

interface TiptapEditorProps {
  value: string;
  onChange: (content: string) => void;
  placeholder?: string;
  minHeight?: string;
  maxHeight?: string;
}

export default function TiptapEditor({
  value,
  onChange,
  placeholder = 'Write your blog story here...',
  minHeight = '320px',
  maxHeight = '560px',
}: TiptapEditorProps) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: value || '',
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-slate max-w-none p-4 sm:p-6 text-sm sm:text-base text-slate-800 outline-none focus:outline-none leading-relaxed font-sans',
        placeholder,
      },
    },
  });

  // Sync content if editingItem changes externally
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value || '');
    }
  }, [value, editor]);

  if (!editor) {
    return (
      <div className="w-full h-40 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 text-xs font-medium">
        Loading Rich Editor...
      </div>
    );
  }

  return (
    <div className="w-full bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs focus-within:border-[#006837] focus-within:ring-2 focus-within:ring-[#006837]/15 transition-all text-left">
      {/* ── Toolbar (Crisp Clean White / Light Gray) ── */}
      <div className="flex flex-wrap items-center gap-1 p-2 bg-slate-50 border-b border-slate-200 select-none">
        {/* Bold */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
            editor.isActive('bold') ? 'bg-[#006837] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/70'
          }`}
          title="Bold (Ctrl+B)"
        >
          <Bold className="w-3.5 h-3.5" />
        </button>

        {/* Italic */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
            editor.isActive('italic') ? 'bg-[#006837] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/70'
          }`}
          title="Italic (Ctrl+I)"
        >
          <Italic className="w-3.5 h-3.5" />
        </button>

        {/* Strike */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`p-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
            editor.isActive('strike') ? 'bg-[#006837] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/70'
          }`}
          title="Strikethrough"
        >
          <Strikethrough className="w-3.5 h-3.5" />
        </button>

        <span className="w-px h-4 bg-slate-300 mx-1" />

        {/* H1 */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={`p-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
            editor.isActive('heading', { level: 1 }) ? 'bg-[#006837] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/70'
          }`}
          title="Heading 1"
        >
          <Heading1 className="w-3.5 h-3.5" />
        </button>

        {/* H2 */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`p-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
            editor.isActive('heading', { level: 2 }) ? 'bg-[#006837] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/70'
          }`}
          title="Heading 2"
        >
          <Heading2 className="w-3.5 h-3.5" />
        </button>

        {/* H3 */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`p-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
            editor.isActive('heading', { level: 3 }) ? 'bg-[#006837] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/70'
          }`}
          title="Heading 3"
        >
          <Heading3 className="w-3.5 h-3.5" />
        </button>

        <span className="w-px h-4 bg-slate-300 mx-1" />

        {/* Bullet List */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
            editor.isActive('bulletList') ? 'bg-[#006837] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/70'
          }`}
          title="Bullet List"
        >
          <List className="w-3.5 h-3.5" />
        </button>

        {/* Ordered List */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
            editor.isActive('orderedList') ? 'bg-[#006837] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/70'
          }`}
          title="Numbered List"
        >
          <ListOrdered className="w-3.5 h-3.5" />
        </button>

        {/* Blockquote */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`p-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
            editor.isActive('blockquote') ? 'bg-[#006837] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/70'
          }`}
          title="Blockquote"
        >
          <Quote className="w-3.5 h-3.5" />
        </button>

        {/* Code block */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={`p-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
            editor.isActive('codeBlock') ? 'bg-[#006837] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/70'
          }`}
          title="Code Block"
        >
          <Code className="w-3.5 h-3.5" />
        </button>

        <span className="w-px h-4 bg-slate-300 mx-1" />

        {/* Undo */}
        <button
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          className="p-1.5 rounded-lg text-xs text-slate-500 hover:text-slate-900 hover:bg-slate-200/70 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
          title="Undo (Ctrl+Z)"
        >
          <Undo className="w-3.5 h-3.5" />
        </button>

        {/* Redo */}
        <button
          type="button"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          className="p-1.5 rounded-lg text-xs text-slate-500 hover:text-slate-900 hover:bg-slate-200/70 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
          title="Redo (Ctrl+Y)"
        >
          <Redo className="w-3.5 h-3.5" />
        </button>

        {/* Clear formatting */}
        <button
          type="button"
          onClick={() => editor.chain().focus().unsetAllMarks().clearNodes().run()}
          className="p-1.5 rounded-lg text-xs text-slate-500 hover:text-amber-600 hover:bg-slate-200/70 transition-colors cursor-pointer ml-auto"
          title="Clear formatting"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* ── Editor Canvas (White & Crisp) ── */}
      <div style={{ minHeight, maxHeight }} className="overflow-y-auto bg-white">
        <EditorContent editor={editor} style={{ minHeight }} />
      </div>
    </div>
  );
}
