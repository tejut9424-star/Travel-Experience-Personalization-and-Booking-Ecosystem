import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, X, Send, Bot, User, Trash2, Maximize2, Minimize2, ArrowRight } from 'lucide-react';
import { useChat } from '../../context/ChatContext';

interface AiChatDrawerProps {
  onNavigate: (tab: string, param?: any) => void;
}

export const AiChatDrawer: React.FC<AiChatDrawerProps> = ({ onNavigate }) => {
  const { isOpen, closeChat, toggleChat, messages, isThinking, sendMessage, clearChat } = useChat();
  const [inputText, setInputText] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isThinking, isOpen]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim()) {
      sendMessage(inputText);
      setInputText('');
    }
  };

  const handlePromptClick = (prompt: string) => {
    if (prompt.toLowerCase().includes('itinerary editor')) {
      onNavigate('itinerary-editor');
      return;
    }
    sendMessage(prompt);
  };

  if (!isOpen) {
    return (
      <button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3.5 bg-gradient-to-r from-brand-600 via-brand-500 to-teal-500 text-white font-bold text-sm rounded-full shadow-2xl shadow-brand-500/40 hover:scale-105 active:scale-95 transition-all group"
      >
        <div className="relative">
          <Sparkles className="w-5 h-5 animate-pulse" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-coral-400 rounded-full animate-ping" />
        </div>
        <span>Ask Tripora AI</span>
        <span className="hidden sm:inline-block bg-white/20 text-[10px] px-2 py-0.5 rounded-full font-mono">
          Online
        </span>
      </button>
    );
  }

  return (
    <div
      className={`fixed z-50 transition-all duration-300 shadow-2xl ${
        isExpanded
          ? 'inset-4 sm:inset-10 rounded-3xl bg-white border border-slate-200 flex flex-col overflow-hidden'
          : 'bottom-4 right-4 sm:bottom-6 sm:right-6 w-[94vw] sm:w-[440px] h-[640px] max-h-[88vh] rounded-3xl bg-white border border-slate-200/90 flex flex-col overflow-hidden'
      }`}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-navy-900 via-brand-900 to-brand-800 text-white px-5 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-400 to-teal-200 flex items-center justify-center text-navy-900 shadow-sm">
            <Bot className="w-5 h-5 text-navy-950" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-display font-bold text-sm text-white">Tripora Travel Copilot</h3>
              <span className="text-[9px] bg-brand-500/30 text-brand-200 border border-brand-400/30 px-1.5 py-0.2 rounded font-mono">
                GPT-4o / FastEngine
              </span>
            </div>
            <p className="text-[11px] text-slate-300">Grounded in verified live inventory & weather</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => clearChat()}
            className="p-1.5 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            title="Clear conversation"
          >
            <Trash2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="hidden sm:block p-1.5 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            title={isExpanded ? "Collapse" : "Expand"}
          >
            {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
          <button
            onClick={closeChat}
            className="p-1.5 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
        {messages.map(msg => (
          <div
            key={msg.id}
            className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.sender !== 'user' && (
              <div className="w-7 h-7 rounded-lg bg-brand-600 flex-shrink-0 flex items-center justify-center text-white text-xs mt-1 shadow-sm">
                <Sparkles className="w-3.5 h-3.5" />
              </div>
            )}

            <div className={`max-w-[85%] space-y-2 ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
              <div
                className={`p-3.5 rounded-2xl text-xs leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-gradient-to-r from-brand-600 to-teal-600 text-white rounded-tr-none shadow-sm'
                    : 'bg-white text-slate-800 border border-slate-200/80 rounded-tl-none shadow-sm whitespace-pre-line'
                }`}
              >
                {msg.text}
              </div>

              {/* Timestamp & Suggested Next Prompts */}
              <div className="flex items-center gap-2 px-1">
                <span className="text-[10px] text-slate-400">{msg.timestamp}</span>
              </div>

              {msg.suggestedPrompts && msg.suggestedPrompts.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {msg.suggestedPrompts.map((prompt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handlePromptClick(prompt)}
                      className="text-[11px] font-medium bg-white hover:bg-brand-50 text-brand-700 border border-brand-200/70 hover:border-brand-400 px-2.5 py-1.5 rounded-full transition-all flex items-center gap-1 shadow-2xs"
                    >
                      <span>{prompt}</span>
                      <ArrowRight className="w-3 h-3 text-brand-500" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {msg.sender === 'user' && (
              <div className="w-7 h-7 rounded-lg bg-navy-800 flex-shrink-0 flex items-center justify-center text-white text-xs mt-1">
                <User className="w-3.5 h-3.5" />
              </div>
            )}
          </div>
        ))}

        {isThinking && (
          <div className="flex gap-3 items-center">
            <div className="w-7 h-7 rounded-lg bg-brand-600 flex items-center justify-center text-white text-xs">
              <Sparkles className="w-3.5 h-3.5 animate-spin" />
            </div>
            <div className="bg-white border border-slate-200 px-4 py-3 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-2 text-xs text-slate-500">
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 bg-brand-500 rounded-full animate-bounce" />
                <span className="w-1.5 h-1.5 bg-brand-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 bg-brand-500 rounded-full animate-bounce [animation-delay:0.4s]" />
              </div>
              <span>Tripora AI analyzing route matrices & inventory...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Bar */}
      <form onSubmit={handleSend} className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
        <input
          type="text"
          value={inputText}
          onChange={e => setInputText(e.target.value)}
          placeholder="Ask anything (e.g., 'Plan 4 days in Bali for $800')..."
          className="flex-1 bg-slate-100/80 border border-slate-200/80 rounded-2xl px-4 py-3 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
        />
        <button
          type="submit"
          disabled={!inputText.trim() || isThinking}
          className="p-3 bg-brand-600 hover:bg-brand-500 disabled:opacity-40 text-white rounded-2xl transition-all shadow-glow flex-shrink-0"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
