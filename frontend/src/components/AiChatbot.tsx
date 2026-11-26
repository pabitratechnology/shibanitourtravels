import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Compass, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ChatMessage {
  role: 'user' | 'model';
  message: string;
}

export default function AiChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'model',
      message: 'Namaskar! Welcome to Shibani Tour & Travels, Bhubaneswar. I am your AI travel concierge. How can I assist with your journey across beautiful Odisha today?'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [sending, setSending] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || sending) return;

    const userMsg = inputValue.trim();
    setInputValue('');
    setSending(true);

    const updated = [...messages, { role: 'user', message: userMsg } as ChatMessage];
    setMessages(updated);

    fetch('/api/ai/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: updated })
    })
      .then((res) => res.json())
      .then((data) => {
        setMessages((prev) => [...prev, { role: 'model', message: data.reply }]);
        setSending(false);
      })
      .catch((err) => {
        console.error('Chat error:', err);
        setMessages((prev) => [
          ...prev,
          {
            role: 'model',
            message: 'Namaskar! My server is experiencing heavy group booking traffic, but our primary desk is always active at +91-9437100001. How can we serve your travel needs?'
          }
        ]);
        setSending(false);
      });
  };

  const suggestions = [
    'Force Urbania rate per km',
    'Best Puri-Konark itinerary',
    'Wedding car pricing',
    'Do you provide airport pick-up?'
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans text-left">
      
      {/* Floating Toggle Button */}
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          setHasUnread(false);
        }}
        id="chatbot-toggle-button"
        className="relative w-14 h-14 bg-[#052B54] hover:bg-[#113b14] text-white rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-105 active:scale-95 group cursor-pointer"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
        
        {/* Unread dot */}
        {hasUnread && !isOpen && (
          <span className="absolute top-0 right-0 block h-4 w-4 rounded-full bg-red-500 border-2 border-white text-[9px] font-bold text-white text-center leading-3">
            1
          </span>
        )}

        <span className="absolute right-16 top-3 bg-[#0b2512] text-white text-[10px] font-bold py-1.5 px-3 rounded shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none duration-300">
          Ask Travel AI
        </span>
      </button>

      {/* Expandable Chat Widget */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            id="chatbot-widget-container"
            className="absolute bottom-20 right-0 w-[360px] sm:w-[380px] h-[500px] bg-white border border-slate-200 rounded-2xl shadow-xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 bg-[#052B54] flex items-center justify-between text-white">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded bg-white/10 flex items-center justify-center">
                  <Compass className="w-4 h-4 text-white animate-spin-slow" />
                </div>
                <div>
                  <h4 className="text-xs font-bold flex items-center gap-1">
                    Shibani Travels Concierge
                    <Sparkles className="w-3 h-3 text-yellow-300" />
                  </h4>
                  <p className="text-[9px] text-slate-200">Offline Assistant • Instant Reply</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-300 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Message Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-xl px-3.5 py-2.5 text-xs leading-relaxed ${
                      m.role === 'user'
                        ? 'bg-[#052B54] text-white font-semibold rounded-tr-none shadow-sm'
                        : 'bg-white border border-slate-200 text-slate-700 rounded-tl-none shadow-sm'
                    }`}
                  >
                    {m.message}
                  </div>
                </div>
              ))}
              
              {sending && (
                <div className="flex justify-start">
                  <div className="bg-white border border-slate-200 text-slate-400 rounded-xl rounded-tl-none px-4 py-2.5 text-xs flex items-center gap-1.5 shadow-sm">
                    <span className="w-1.5 h-1.5 bg-[#052B54] rounded-full animate-bounce" />
                    <span className="w-1.5 h-1.5 bg-[#052B54] rounded-full animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 bg-[#052B54] rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggestions */}
            {messages.length === 1 && (
              <div className="p-3 border-t border-slate-100 bg-white">
                <p className="text-[9px] font-bold text-[#052B54] uppercase tracking-wider mb-1.5">Suggested Questions:</p>
                <div className="flex flex-wrap gap-1">
                  {suggestions.map((s, idx) => (
                    <button
                      key={idx}
                      onClick={() => setInputValue(s)}
                      className="text-[10px] text-slate-605 bg-slate-50 border border-slate-200 hover:border-slate-350 hover:bg-slate-100 px-2.5 py-1 rounded-md transition-colors cursor-pointer"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Form */}
            <form onSubmit={handleSend} className="p-3 bg-white border-t border-slate-200 flex gap-2">
              <input
                type="text"
                placeholder="Ask about tourist places, rental fares..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="input-field py-2 text-xs flex-1"
              />
              <button
                type="submit"
                className="bg-[#052B54] hover:bg-[#113b14] text-white p-2.5 rounded-lg transition-colors shrink-0 cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
