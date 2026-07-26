import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, ChevronDown } from 'lucide-react';

// ─── API key comes from .env — never exposed in the UI ───
const GROQ_KEY = import.meta.env.VITE_GROQ_KEY as string | undefined;
const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions';
const GROQ_MODEL = 'llama-3.3-70b-versatile';

// ─────────────────── SYSTEM PROMPT ───────────────────
const SYSTEM_PROMPT = `You are InTence's friendly AI assistant on their official website. You represent InTence with warmth, professionalism, and genuine personality.

ABOUT INTENCE:
- Company: InTence — a software development agency
- Tagline: "Redefining the Future."
- Description: A dynamic team built on creativity, collaboration, and excellence
- Location: Vadodara, Gujarat, India
- Email: intence.it@gmail.com
- Phone: +91 92652 50494
- WhatsApp: https://wa.me/919265250494
- Instagram: https://www.instagram.com/intence.in
- Facebook: https://www.facebook.com/share/17gSLJ3PMS/
- LinkedIn: https://www.linkedin.com/company/intence-company

SERVICES:
1. Custom Software Development – tailor-made software for real business workflows
2. Web & Web Application Development – modern responsive websites and secure web apps
3. Business Automation Solutions – automate repetitive processes, reduce errors
4. Database & Backend Engineering – secure scalable backend architectures
5. Management Systems – ERP, CRM, inventory, billing, custom management systems
6. Maintenance Support & Optimization – continuous support and performance optimization

PROJECTS BUILT (always include the live link when mentioning a project):
- ScaleSight – Finance & Compliance Advisory (React, Node.js) – https://www.scalesight.in
- Firdaus Makeover – Beauty Platform (React, Tailwind) – https://firdausmakeover.com
- Shaden House – Luxury Property Website (React, Vite) – https://www.shadenhouse.com
- Islamic Deeds Tracker – Faith & Productivity App (Python, React, PostgreSQL) – https://islamic-deeds-tracker.vercel.app/
- NOVA – E-Commerce Website (Node.js, Python, React) – https://nova-ecommerce-website.netlify.app/
- Sagir Trader – Enterprise Trading Dashboard (Java, React, PostgreSQL) – https://sagir-trader.netlify.app

PORTFOLIO PAGE: https://intence.in/#work (direct link to the portfolio section on the main site)

IMPORTANT — When someone asks about projects or portfolio:
1. List each project with its live link (the URL will be auto-converted to a clickable link)
2. End your response with this exact line on its own: [VIEW_PORTFOLIO_BUTTON]

TECH STACK:
- Frontend: React, Vue.js, TypeScript, Tailwind CSS
- Backend: Node.js, Python, Java, Flask
- Databases: PostgreSQL, MySQL, MongoDB
- Design: Figma | Mobile: React Native

PERSONALITY:
- Be warm, friendly, conversational — like a helpful team member
- Handle casual chat naturally: greetings, "how are you", small talk — respond genuinely and with personality
- Keep responses concise — use bullet points for lists
- Use occasional relevant emojis (don't overdo it)
- Pricing is project-based — always invite them to contact for a free consultation
- Never be dismissive — always be helpful and positive
- If asked something unrelated to InTence, briefly help but gently steer back
- Keep responses under 180 words unless detail is truly needed`;

// ─────────────────── GROQ CALL ───────────────────
async function callGroq(
  history: { role: string; content: string }[]
): Promise<string> {
  const res = await fetch(GROQ_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${GROQ_KEY || ''}`,
    },
    body: JSON.stringify({
      model: GROQ_MODEL,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        ...history,
      ],
      max_tokens: 350,
      temperature: 0.85,
    }),
  });
  if (!res.ok) {
    const e = await res.json().catch(() => ({}));
    throw new Error(e?.error?.message || `Error ${res.status}`);
  }
  const data = await res.json();
  return (
    data?.choices?.[0]?.message?.content?.trim() ||
    "I couldn't get a response. Please try again!"
  );
}

// ─────────────────── TYPES ───────────────────
interface Message {
  id: number;
  role: 'bot' | 'user';
  text: string;
  time: string;
  isError?: boolean;
}

// ─────────────────── MARKDOWN + SMART LINKS RENDERER ───────────────────
function RenderText({ text, onNavigateToPortfolio }: { text: string; onNavigateToPortfolio?: () => void }) {
  const processLine = (line: string): string => {
    return line
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      // phone numbers → tel:
      .replace(
        /(\+?\d[\d\s\-().]{7,}\d)/g,
        (m) => {
          const digits = m.replace(/\D/g, '');
          return `<a href="tel:+${digits}" style="color:#a78bfa;text-decoration:underline;cursor:pointer;" target="_blank" rel="noopener">${m}</a>`;
        }
      )
      // WhatsApp links
      .replace(
        /(https?:\/\/wa\.me\/[^\s<]+)/g,
        (m) => `<a href="${m}" style="color:#25d366;text-decoration:underline;cursor:pointer;" target="_blank" rel="noopener">WhatsApp</a>`
      )
      // email addresses
      .replace(
        /([a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,})/g,
        (m) => `<a href="mailto:${m}" style="color:#a78bfa;text-decoration:underline;cursor:pointer;">${m}</a>`
      )
      // generic URLs (skip wa.me already handled above)
      .replace(
        /((?<!href=["'])https?:\/\/(?!wa\.me)[^\s<]+)/g,
        (m) => `<a href="${m}" style="color:#818cf8;text-decoration:underline;cursor:pointer;" target="_blank" rel="noopener">${m}</a>`
      );
  };

  const lines = text.split('\n');
  const hasPortfolioButton = lines.some(l => l.trim() === '[VIEW_PORTFOLIO_BUTTON]');
  const filteredLines = lines.filter(l => l.trim() !== '[VIEW_PORTFOLIO_BUTTON]');

  return (
    <div className="space-y-1">
      {filteredLines.map((line, i) => (
        <p
          key={i}
          className="text-sm leading-relaxed"
          style={{ color: 'rgba(255,255,255,0.88)' }}
          dangerouslySetInnerHTML={{ __html: processLine(line) || '&nbsp;' }}
        />
      ))}
      {hasPortfolioButton && (
        <div className="mt-3">
          <button
            onClick={onNavigateToPortfolio}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 hover:scale-105 active:scale-95"
            style={{
              background: 'linear-gradient(135deg,#8B5CF6,#6366F1)',
              color: '#fff',
              boxShadow: '0 4px 14px rgba(139,92,246,0.4)',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            <span>🎨</span>
            View Full Portfolio
          </button>
        </div>
      )}
    </div>
  );
}

// ─────────────────── QUICK CHIPS ───────────────────
const CHIPS = [
  'Hi! How are you? 👋',
  'What services do you offer?',
  'Show me your projects',
  'How much does it cost?',
  'How do I get started?',
  'What tech do you use?',
];

// ─────────────────── COMPONENT ───────────────────
export const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: 'bot',
      text: "Hey! 👋 I'm InTence's AI assistant.\n\nAsk me anything — about our services, projects, tech, pricing, or just say hi! How can I help you today?",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [geminiHistory, setGeminiHistory] = useState<
    { role: string; content: string }[]
  >([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Focus input on open
  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 280);
  }, [isOpen]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || isTyping) return;
    const now = () =>
      new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setMessages(prev => [
      ...prev,
      { id: Date.now(), role: 'user', text: text.trim(), time: now() },
    ]);
    setInput('');
    setIsTyping(true);

    const newHistory = [
      ...geminiHistory,
      { role: 'user', content: text.trim() },
    ];

    try {
      const reply = await callGroq(newHistory);
      setMessages(prev => [
        ...prev,
        { id: Date.now() + 1, role: 'bot', text: reply, time: now() },
      ]);
      setGeminiHistory([
        ...newHistory,
        { role: 'assistant', content: reply },
      ]);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Something went wrong.';
      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          role: 'bot',
          text: `Oops, something went wrong. Please try again or reach us at intence.it@gmail.com 😊`,
          time: now(),
          isError: true,
        },
      ]);
      console.error('[Chatbot]', msg);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  // Close chatbot and scroll to #work section on the same page
  const navigateToPortfolio = () => {
    setIsOpen(false);
    setTimeout(() => {
      const section = document.getElementById('work');
      if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 320); // wait for close animation to finish
  };

  // Bot avatar image helper
  const BotAvatar = ({ size = 'sm' }: { size?: 'sm' | 'md' }) => {
    const cls = size === 'md' ? 'w-9 h-9' : 'w-6 h-6';
    return (
      <div
        className={`${cls} rounded-full overflow-hidden flex-shrink-0`}
        style={{ boxShadow: '0 0 10px rgba(139,92,246,0.4)' }}
      >
        <img
          src="/chatbot.png"
          alt="InTence AI"
          className="w-full h-full object-cover"
          onError={e => {
            (e.currentTarget as HTMLImageElement).style.display = 'none';
            const p = e.currentTarget.parentElement;
            if (p) p.style.background = 'linear-gradient(135deg,#8B5CF6,#6366F1)';
          }}
        />
      </div>
    );
  };

  return (
    <>
      {/* ── TOGGLE BUTTON — bottom-right ── */}
      <div className="fixed bottom-8 right-8 z-50">
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, type: 'spring', stiffness: 260, damping: 20 }}
          onClick={() => setIsOpen(prev => !prev)}
          aria-label="Open InTence AI Chat"
          className="relative w-14 h-14 rounded-full flex items-center justify-center hover:scale-110 active:scale-90 transition-transform duration-200 overflow-hidden"
          style={{ boxShadow: '0 6px 24px rgba(139,92,246,0.55)' }}
        >
          {!isOpen && (
            <span
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{
                background: 'rgba(139,92,246,0.35)',
                animation: 'chatPulse 2.2s infinite',
              }}
            />
          )}
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="x"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.16 }}
                className="w-full h-full rounded-full flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg,#8B5CF6,#6366F1)' }}
              >
                <X className="w-5 h-5 text-white" />
              </motion.div>
            ) : (
              <motion.div
                key="img"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.16 }}
                className="w-full h-full rounded-full"
              >
                <img
                  src="/chatbot.png"
                  alt="InTence AI"
                  className="w-full h-full rounded-full object-cover"
                  onError={e => {
                    (e.currentTarget as HTMLImageElement).style.display = 'none';
                    const p = e.currentTarget.parentElement;
                    if (p)
                      p.style.background = 'linear-gradient(135deg,#8B5CF6,#6366F1)';
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>

        {/* Tooltip */}
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.9 }}
            className="absolute right-16 top-1/2 -translate-y-1/2 whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-semibold pointer-events-none"
            style={{
              background:
                'linear-gradient(135deg,rgba(139,92,246,0.92),rgba(99,102,241,0.92))',
              color: '#fff',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(139,92,246,0.3)',
              boxShadow: '0 4px 15px rgba(139,92,246,0.3)',
            }}
          >
            Ask InTence AI
          </motion.div>
        )}
      </div>

      {/* ── CHAT WINDOW ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 320, damping: 30 }}
            className="fixed right-4 sm:right-8 z-50 w-[calc(100vw-2rem)] sm:w-[370px] max-w-[390px]"
            style={{
              bottom: 'calc(3.5rem + 2.5rem)',
              height: '520px',
              maxHeight: 'calc(100vh - 10rem)',
            }}
          >
            <div
              className="flex flex-col h-full rounded-2xl overflow-hidden"
              style={{
                background:
                  'linear-gradient(160deg,rgba(10,10,16,0.98) 0%,rgba(7,7,12,0.99) 100%)',
                border: '1px solid rgba(139,92,246,0.22)',
                boxShadow:
                  '0 20px 60px rgba(0,0,0,0.75),0 0 0 1px rgba(139,92,246,0.08),inset 0 1px 0 rgba(255,255,255,0.04)',
                backdropFilter: 'blur(24px)',
              }}
            >
              {/* HEADER */}
              <div
                className="flex items-center gap-3 px-4 py-3 flex-shrink-0"
                style={{
                  background:
                    'linear-gradient(135deg,rgba(139,92,246,0.12),rgba(99,102,241,0.06))',
                  borderBottom: '1px solid rgba(139,92,246,0.12)',
                }}
              >
                <div className="relative">
                  <BotAvatar size="md" />
                  <span
                    className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2"
                    style={{ background: '#22c55e', borderColor: '#0a0a10' }}
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-white font-semibold text-sm leading-tight">
                    InTence AI
                  </p>
                  <p
                    className="text-[11px]"
                    style={{ color: 'rgba(167,139,250,0.85)' }}
                  >
                    Always here to help • Online
                  </p>
                </div>

                <button
                  onClick={() => setIsOpen(false)}
                  className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors flex-shrink-0"
                >
                  <ChevronDown className="w-4 h-4 text-white/50" />
                </button>
              </div>

              {/* MESSAGES */}
              <div
                className="flex-1 overflow-y-auto px-4 py-3 space-y-3"
                style={{
                  scrollbarWidth: 'thin',
                  scrollbarColor: 'rgba(139,92,246,0.25) transparent',
                }}
              >
                {messages.map(msg => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.22 }}
                    className={`flex gap-2 ${
                      msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                    }`}
                  >
                    {msg.role === 'bot' && (
                      <div className="mt-1">
                        <BotAvatar size="sm" />
                      </div>
                    )}
                    <div
                      className={`flex flex-col gap-0.5 max-w-[82%] ${
                        msg.role === 'user' ? 'items-end' : 'items-start'
                      }`}
                    >
                      <div
                        className="px-3.5 py-2.5"
                        style={
                          msg.role === 'user'
                            ? {
                                background:
                                  'linear-gradient(135deg,#8B5CF6,#6366F1)',
                                borderRadius: '16px 16px 4px 16px',
                                boxShadow:
                                  '0 3px 10px rgba(139,92,246,0.3)',
                              }
                            : msg.isError
                            ? {
                                background: 'rgba(239,68,68,0.08)',
                                border: '1px solid rgba(239,68,68,0.18)',
                                borderRadius: '16px 16px 16px 4px',
                              }
                            : {
                                background: 'rgba(255,255,255,0.05)',
                                border: '1px solid rgba(255,255,255,0.07)',
                                borderRadius: '16px 16px 16px 4px',
                              }
                        }
                      >
                        {msg.role === 'user' ? (
                          <p className="text-sm text-white leading-relaxed">
                            {msg.text}
                          </p>
                        ) : (
                          <RenderText text={msg.text} onNavigateToPortfolio={navigateToPortfolio} />
                        )}
                      </div>
                      <span
                        className="text-[10px] px-1"
                        style={{ color: 'rgba(255,255,255,0.22)' }}
                      >
                        {msg.time}
                      </span>
                    </div>
                  </motion.div>
                ))}

                {/* Typing dots */}
                <AnimatePresence>
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex gap-2"
                    >
                      <BotAvatar size="sm" />
                      <div
                        className="px-3.5 py-2.5 flex items-center gap-1.5"
                        style={{
                          background: 'rgba(255,255,255,0.05)',
                          border: '1px solid rgba(255,255,255,0.07)',
                          borderRadius: '16px 16px 16px 4px',
                        }}
                      >
                        {[0, 1, 2].map(i => (
                          <span
                            key={i}
                            className="w-1.5 h-1.5 rounded-full"
                            style={{
                              background: '#8B5CF6',
                              animation: `chatBounce 1.2s ${i * 0.2}s infinite`,
                            }}
                          />
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                <div ref={messagesEndRef} />
              </div>

              {/* QUICK CHIPS — only on first open */}
              {messages.length <= 1 && (
                <div
                  className="px-4 pb-2 flex-shrink-0"
                  style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}
                >
                  <p
                    className="text-[10px] uppercase tracking-wider mb-2 mt-2.5"
                    style={{ color: 'rgba(255,255,255,0.28)' }}
                  >
                    Quick questions
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {CHIPS.map(chip => (
                      <button
                        key={chip}
                        onClick={() => sendMessage(chip)}
                        className="text-xs px-2.5 py-1.5 rounded-full transition-all duration-200 hover:scale-105 active:scale-95"
                        style={{
                          background: 'rgba(139,92,246,0.1)',
                          border: '1px solid rgba(139,92,246,0.28)',
                          color: 'rgba(196,181,253,0.9)',
                        }}
                      >
                        {chip}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* INPUT */}
              <form
                onSubmit={handleSubmit}
                className="flex items-center gap-2 px-4 py-3 flex-shrink-0"
                style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
              >
                <input
                  ref={inputRef}
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  placeholder="Ask anything…"
                  disabled={isTyping}
                  className="flex-1 bg-transparent border-none outline-none text-sm text-white placeholder:text-white/25 disabled:opacity-50"
                  style={{ minWidth: 0 }}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isTyping}
                  className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-200 hover:scale-110 active:scale-90 disabled:opacity-30 disabled:cursor-not-allowed"
                  style={{
                    background: input.trim()
                      ? 'linear-gradient(135deg,#8B5CF6,#6366F1)'
                      : 'rgba(139,92,246,0.15)',
                    boxShadow: input.trim()
                      ? '0 3px 10px rgba(139,92,246,0.4)'
                      : 'none',
                  }}
                >
                  <Send className="w-3.5 h-3.5 text-white" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes chatPulse {
          0%   { transform: scale(1);    opacity: 0.55; }
          50%  { transform: scale(1.65); opacity: 0; }
          100% { transform: scale(1);    opacity: 0; }
        }
        @keyframes chatBounce {
          0%, 60%, 100% { transform: translateY(0); }
          30%           { transform: translateY(-5px); }
        }
      `}</style>
    </>
  );
};

export default Chatbot;
