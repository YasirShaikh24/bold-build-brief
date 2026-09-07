import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Send, 
  ChevronDown, 
  Sparkles, 
  Phone, 
  PhoneCall, 
  MessageCircle, 
  Mail, 
  ExternalLink, 
  ArrowRight, 
  CheckCircle2, 
  MapPin, 
  Code2
} from 'lucide-react';

// ─────────────────── FEATURED PROJECTS LIST ───────────────────
const PROJECTS_LIST = [
  {
    title: 'ScaleSight',
    tag: 'Finance & Advisory',
    description: 'Virtual CFO suite, financial forecasting, and regulatory compliance tools.',
    tech: 'React • Node.js • Tailwind',
    url: 'https://www.scalesight.in',
    badge: 'Enterprise Finance',
  },
  {
    title: 'Firdaus Makeover',
    tag: 'Luxury Beauty Suite',
    description: 'Online booking calendar, digital gallery, and appointment workflow suite.',
    tech: 'React • Vite • Tailwind',
    url: 'https://firdausmakeover.com',
    badge: 'Luxury Booking',
  },
  {
    title: 'Shaden House',
    tag: 'Saudi Real Estate Showcase',
    description: 'Premium property listings, high-speed virtual showcase, and inquiry engine.',
    tech: 'React • Tailwind • Motion',
    url: 'https://www.shadenhouse.com',
    badge: 'Real Estate',
  },
  {
    title: 'Islamic Deeds Tracker',
    tag: 'Spiritual Productivity',
    description: 'Minimalist daily habit tracker, prayer logs, and personal analytics.',
    tech: 'Python • PostgreSQL • React',
    url: 'https://islamic-deeds-tracker.vercel.app/',
    badge: 'Productivity App',
  },
  {
    title: 'NOVA E-Commerce',
    tag: 'Modern Online Store',
    description: 'Ultra-fast storefront with instant product search, cart, and secure checkout.',
    tech: 'Node.js • Python • React',
    url: 'https://nova-ecommerce-website.netlify.app/',
    badge: 'E-Commerce',
  },
  {
    title: 'Sagir Trader',
    tag: 'Trading & Analytics Dashboard',
    description: 'Live financial markets monitor, portfolio tracking, and analytics portal.',
    tech: 'Java • React • PostgreSQL',
    url: 'https://sagir-trader.netlify.app',
    badge: 'FinTech',
  },
];

// ─────────────────── RICH WIDGETS ───────────────────

/** Direct Contact & Dialer Widget */
const ContactCardWidget = () => {
  return (
    <div className="mt-2.5 p-3 rounded-xl bg-gradient-to-b from-purple-950/40 to-black/70 border border-purple-500/30 space-y-2.5 shadow-xl">
      <div className="flex items-center justify-between border-b border-white/10 pb-2">
        <span className="text-xs font-semibold text-white flex items-center gap-1.5">
          <PhoneCall className="w-3.5 h-3.5 text-purple-400" />
          Direct Contact & Consultation
        </span>
        <span className="text-[9px] px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 font-medium">
          Available Now
        </span>
      </div>

      {/* Primary Dialer Button */}
      <a
        href="tel:+919265250494"
        className="w-full flex items-center justify-between p-2.5 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 hover:from-purple-500 hover:to-indigo-500 text-white font-medium text-xs shadow-lg shadow-purple-900/40 transition-all hover:scale-[1.02] active:scale-95 group cursor-pointer"
      >
        <span className="flex items-center gap-2">
          <span className="w-7 h-7 rounded-lg bg-white/20 flex items-center justify-center">
            <Phone className="w-3.5 h-3.5 text-white" />
          </span>
          <span className="flex flex-col text-left">
            <span className="font-semibold text-white">Call +91 92652 50494</span>
            <span className="text-[9px] text-white/75">Tap to open phone dialer</span>
          </span>
        </span>
        <span className="text-[10px] bg-white/20 group-hover:bg-white/30 px-2 py-1 rounded-lg text-white font-medium flex items-center gap-1">
          Dial 📞
        </span>
      </a>

      {/* WhatsApp Button */}
      <a
        href="https://wa.me/919265250494"
        target="_blank"
        rel="noopener noreferrer"
        className="w-full flex items-center justify-between p-2 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-200 text-xs transition-all hover:scale-[1.01] cursor-pointer"
      >
        <span className="flex items-center gap-2">
          <MessageCircle className="w-4 h-4 text-emerald-400" />
          <span>WhatsApp Chat</span>
        </span>
        <span className="text-[10px] text-emerald-400 font-mono">+91 92652 50494 ↗</span>
      </a>

      {/* Email Button */}
      <a
        href="mailto:intence.it@gmail.com"
        className="w-full flex items-center justify-between p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white/90 text-xs transition-all cursor-pointer"
      >
        <span className="flex items-center gap-2">
          <Mail className="w-4 h-4 text-purple-300" />
          <span>Email InTence</span>
        </span>
        <span className="text-[10px] text-white/60 font-mono">intence.it@gmail.com ↗</span>
      </a>

      <div className="pt-1 text-[10px] text-white/50 flex items-center justify-between">
        <span className="flex items-center gap-1">
          <MapPin className="w-3 h-3 text-white/40" /> Vadodara, Gujarat, India
        </span>
        <span className="text-purple-300/80">Global Delivery</span>
      </div>
    </div>
  );
};

/** Live Projects Showcase Widget */
const ProjectsCardWidget = ({ onNavigateToPortfolio }: { onNavigateToPortfolio?: () => void }) => {
  return (
    <div className="mt-2.5 space-y-2">
      <div className="flex items-center justify-between text-xs font-semibold text-white px-0.5">
        <span className="flex items-center gap-1.5">
          <Code2 className="w-3.5 h-3.5 text-purple-400" />
          Featured Live Projects
        </span>
        <span className="text-[9px] text-white/50">Verified Production Apps</span>
      </div>

      <div className="space-y-1.5 max-h-[220px] overflow-y-auto pr-1" style={{ scrollbarWidth: 'thin' }}>
        {PROJECTS_LIST.map((proj) => (
          <div
            key={proj.title}
            className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10 hover:border-purple-500/40 transition-all flex flex-col gap-1.5"
          >
            <div className="flex items-start justify-between gap-1.5">
              <div>
                <div className="flex items-center gap-1.5">
                  <p className="text-xs font-semibold text-white">{proj.title}</p>
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-purple-500/15 text-purple-300 border border-purple-500/25">
                    {proj.badge}
                  </span>
                </div>
                <p className="text-[10px] text-white/60 leading-snug mt-0.5">{proj.description}</p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1 border-t border-white/5 text-[9px]">
              <span className="text-purple-300/80 font-mono">{proj.tech}</span>
              <a
                href={proj.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-purple-500/20 hover:bg-purple-500/35 text-purple-200 border border-purple-500/30 transition-colors font-medium cursor-pointer"
              >
                <span>Visit Live</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </a>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={onNavigateToPortfolio}
        className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-medium text-xs flex items-center justify-center gap-1.5 shadow-md shadow-purple-950/40 transition-all hover:scale-[1.02] active:scale-95 cursor-pointer mt-1"
      >
        <span>🎨</span>
        <span>View Full Portfolio Section</span>
        <ArrowRight className="w-3 h-3" />
      </button>
    </div>
  );
};

/** Handcrafted Human Software Engineering Widget */
const HandcraftedEngineeringWidget = () => {
  return (
    <div className="mt-2.5 p-3 rounded-xl bg-gradient-to-b from-indigo-950/30 via-black/50 to-purple-950/20 border border-indigo-500/30 space-y-2">
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 text-xs">
          🛡️
        </div>
        <div>
          <p className="text-xs font-semibold text-white">100% Handcrafted by Senior Engineers</p>
          <p className="text-[9px] text-emerald-400">Zero AI-generated code in client production software</p>
        </div>
      </div>

      <div className="space-y-1 text-[10px] text-white/80 bg-white/[0.03] p-2 rounded-lg border border-white/5">
        <p className="flex items-center gap-1.5">
          <CheckCircle2 className="w-3 h-3 text-emerald-400 flex-shrink-0" />
          <span>Architected, written & peer-reviewed by real software engineers</span>
        </p>
        <p className="flex items-center gap-1.5">
          <CheckCircle2 className="w-3 h-3 text-emerald-400 flex-shrink-0" />
          <span>Airtight enterprise security & zero hallucinated dependencies</span>
        </p>
        <p className="flex items-center gap-1.5">
          <Sparkles className="w-3 h-3 text-purple-400 flex-shrink-0" />
          <span>We DO build custom AI models & chatbots FOR our clients</span>
        </p>
      </div>

      <div className="grid grid-cols-2 gap-1.5 pt-1">
        <a
          href="tel:+919265250494"
          className="flex items-center justify-center gap-1 py-1.5 px-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-[10px] font-medium transition-all cursor-pointer"
        >
          <Phone className="w-3 h-3" />
          <span>Call Engineers</span>
        </a>
        <a
          href="https://wa.me/919265250494"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1 py-1.5 px-2 rounded-lg bg-emerald-600/30 hover:bg-emerald-600/50 border border-emerald-500/40 text-emerald-200 text-[10px] font-medium transition-all cursor-pointer"
        >
          <MessageCircle className="w-3 h-3" />
          <span>WhatsApp Chat</span>
        </a>
      </div>
    </div>
  );
};

// ─────────────────── CLIENT-SIDE DYNAMIC & FAST RESPONSES ───────────────────
function getFastResponse(queryText: string): string | null {
  const q = (queryText || '').toLowerCase().trim();

  // Contact / phone / call / whatsapp / reach
  if (
    q === 'contact' ||
    q.includes('contact') ||
    q.includes('phone') ||
    q.includes('number') ||
    q.includes('call') ||
    q.includes('dial') ||
    q.includes('email') ||
    q.includes('whatsapp') ||
    q.includes('reach') ||
    q.includes('touch')
  ) {
    return `You can connect directly with the **InTence** engineering team:\n\n- **Phone / Direct Call**: [+91 92652 50494](tel:+919265250494)\n- **WhatsApp**: [Chat on WhatsApp](https://wa.me/919265250494)\n- **Email**: [intence.it@gmail.com](mailto:intence.it@gmail.com)\n\nWe provide free initial architecture consultations for mobile apps, web systems, and custom AI software. Feel free to tap the call or WhatsApp button below!`;
  }

  // Quick greetings
  if (q === 'hi' || q === 'hello' || q === 'hey' || q === 'hola' || q === 'start') {
    return `Hello! 👋 How can I help you today? You can ask me about our **iOS & Android mobile apps**, **custom AI systems**, **database architectures**, or explore our **live client projects**!`;
  }

  return null;
}

function getLocalClientFallback(queryText: string): string {
  const fast = getFastResponse(queryText);
  if (fast) return fast;

  const q = (queryText || '').toLowerCase().trim();

  if (q.includes('mobile') || q.includes('ios') || q.includes('android')) {
    return `Yes, absolutely! At **InTence**, we build custom mobile applications for **iOS and Android** using React Native and Flutter. We develop everything handcrafted with clean code, offline sync, and fast performance.\n\nAre you looking to build a new mobile app or expand a web platform to mobile?`;
  }

  if (q.includes('ai') || q.includes('artificial intelligence')) {
    return `At **InTence**, we do **not** rely on AI-generated code to write our clients' software—every line is handcrafted by senior software engineers for security, speed, and reliability.\n\nHowever, we **build custom AI solutions, chatbots, and automation systems FOR our clients**! Would you like to add AI capabilities to your business?`;
  }

  if (q.includes('project') || q.includes('portfolio') || q.includes('work')) {
    return `We've built live solutions like **[ScaleSight](https://www.scalesight.in)** (Virtual CFO & finance suite), **[Firdaus Makeover](https://firdausmakeover.com)** (luxury booking suite), and **[Shaden House](https://www.shadenhouse.com)** (real estate showcase).\n\nWould you like to explore our live projects or discuss your concept?`;
  }

  return `Hello! 👋 I'm **InTence AI**.\n\nWe build custom **mobile apps (iOS & Android)**, **web applications & SaaS**, **management systems (CRM/ERP)**, and **custom AI solutions**.\n\nHow can I help you today?`;
}

// ─────────────────── SERVER CHAT CALL WITH FAST TIMEOUT ───────────────────
async function callServerChatApi(
  history: { role: string; content: string }[]
): Promise<string> {
  const lastUserMsg = history[history.length - 1]?.content || '';

  // Return fast response immediately for quick intents
  const fast = getFastResponse(lastUserMsg);
  if (fast) {
    return fast;
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000); // 6s strict timeout for fast responsiveness

    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: history,
      }),
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (!res.ok) {
      throw new Error(`Server status ${res.status}`);
    }

    const data = await res.json();
    if (data?.reply) {
      return data.reply;
    }
    return getLocalClientFallback(lastUserMsg);
  } catch {
    return getLocalClientFallback(lastUserMsg);
  }
}

// ─────────────────── TYPES ───────────────────
interface Message {
  id: number;
  role: 'bot' | 'user';
  text: string;
  time: string;
  isError?: boolean;
}

// ─────────────────── CONVERSATIONAL CHAT RENDERER ───────────────────
function RenderText({ text, onNavigateToPortfolio }: { text: string; onNavigateToPortfolio?: () => void }) {
  // Strip obsolete widget codes if present
  const cleanText = text
    .replace(/\[CONTACT_CARD_WIDGET\]/g, '')
    .replace(/\[PROJECTS_CARD_WIDGET\]/g, '')
    .replace(/\[HANDCRAFTED_ENGINEERING_WIDGET\]/g, '')
    .replace(/\[VIEW_PORTFOLIO_BUTTON\]/g, '')
    .trim();

  const containsContact =
    text.includes('+91 92652 50494') ||
    text.toLowerCase().includes('tel:+919265250494') ||
    text.toLowerCase().includes('intence.it@gmail.com');

  const containsProjects =
    text.toLowerCase().includes('scalesight') ||
    text.toLowerCase().includes('firdaus') ||
    text.toLowerCase().includes('portfolio');

  const processLine = (line: string): string => {
    return line
      // Markdown links: [Text](url)
      .replace(
        /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g,
        '<a href="$2" target="_blank" rel="noopener noreferrer" style="color:#a78bfa;text-decoration:underline;font-weight:500;">$1</a>'
      )
      // Markdown links: [Text](tel:...)
      .replace(
        /\[([^\]]+)\]\((tel:[^\s)]+)\)/g,
        '<a href="$2" style="color:#a78bfa;text-decoration:underline;font-weight:500;">$1</a>'
      )
      // Markdown links: [Text](mailto:...)
      .replace(
        /\[([^\]]+)\]\((mailto:[^\s)]+)\)/g,
        '<a href="$2" style="color:#a78bfa;text-decoration:underline;font-weight:500;">$1</a>'
      )
      // Bold
      .replace(/\*\*(.+?)\*\*/g, '<strong style="color:#fff;font-weight:600;">$1</strong>')
      // Italic
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      // Raw phone numbers → tel:
      .replace(
        /(?<!href=["']|\()(\+91[\s-]?\d{5}[\s-]?\d{5})/g,
        '<a href="tel:+919265250494" style="color:#a78bfa;text-decoration:underline;font-weight:500;">$1</a>'
      )
      // WhatsApp wa.me links
      .replace(
        /(https?:\/\/wa\.me\/[^\s<]+)/g,
        '<a href="$1" target="_blank" rel="noopener noreferrer" style="color:#34d399;text-decoration:underline;font-weight:500;">WhatsApp</a>'
      )
      // Raw emails
      .replace(
        /(?<!href=["']|\()([a-zA-Z0-9._%+-]+@gmail\.com)/g,
        '<a href="mailto:$1" style="color:#a78bfa;text-decoration:underline;font-weight:500;">$1</a>'
      );
  };

  const lines = cleanText.split('\n');

  return (
    <div className="space-y-2 w-full text-left">
      {lines.map((line, i) => {
        const trimmed = line.trim();
        if (!trimmed) {
          return <div key={i} className="h-1.5" />;
        }

        const isBullet = trimmed.startsWith('- ') || trimmed.startsWith('* ');
        const content = isBullet ? trimmed.slice(2) : trimmed;

        return (
          <div key={i} className={`flex items-start gap-2 ${isBullet ? 'pl-2' : ''}`}>
            {isBullet && (
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2 flex-shrink-0" />
            )}
            <p
              className="text-xs sm:text-[13px] leading-relaxed text-white/90 flex-1"
              dangerouslySetInnerHTML={{ __html: processLine(content) }}
            />
          </div>
        );
      })}

      {/* Clean, compact quick-action buttons when contact info is mentioned */}
      {containsContact && (
        <div className="pt-2 mt-2 border-t border-white/10 flex flex-wrap items-center gap-2">
          <a
            href="tel:+919265250494"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-600/30 hover:bg-purple-600/50 border border-purple-500/40 text-purple-200 text-xs font-medium transition-all"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Call (+91 92652 50494)</span>
          </a>
          <a
            href="https://wa.me/919265250494"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600/30 hover:bg-emerald-600/50 border border-emerald-500/40 text-emerald-200 text-xs font-medium transition-all"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>WhatsApp</span>
          </a>
          <a
            href="mailto:intence.it@gmail.com"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600/30 hover:bg-blue-600/50 border border-blue-500/40 text-blue-200 text-xs font-medium transition-all"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Email</span>
          </a>
        </div>
      )}

      {/* Optional single button to view portfolio if projects mentioned */}
      {containsProjects && onNavigateToPortfolio && (
        <div className="pt-2">
          <button
            onClick={onNavigateToPortfolio}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-purple-600/40 to-indigo-600/40 hover:from-purple-600/60 hover:to-indigo-600/60 border border-purple-500/30 text-white text-xs font-medium transition-all"
          >
            <ExternalLink className="w-3.5 h-3.5 text-purple-300" />
            <span>View All Live Projects</span>
          </button>
        </div>
      )}
    </div>
  );
}

// ─────────────────── QUICK CHIPS ───────────────────
const CHIPS = [
  'Do you use AI to build software? 🛡️',
  'What services do you offer? 💼',
  'Show me your projects 🚀',
  'Contact details & phone 📞',
  'How much does it cost? 💰',
  'How do I get started? ✨',
];

// ─────────────────── COMPONENT ───────────────────
export const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: 'bot',
      text: "Hey! 👋 Welcome to **InTence**. I'm your digital concierge.\n\nAsk me anything about our custom software engineering, mobile apps, custom AI systems, database architectures, live projects, or get direct contact details.\n\nHow can I help you today?",
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
  const chatWindowRef = useRef<HTMLDivElement>(null);
  const toggleButtonRef = useRef<HTMLDivElement>(null);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Focus input on open
  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 280);
  }, [isOpen]);

  // Close on click outside any part of screen or on Escape key
  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      const target = e.target as Node;
      if (
        chatWindowRef.current &&
        !chatWindowRef.current.contains(target) &&
        toggleButtonRef.current &&
        !toggleButtonRef.current.contains(target)
      ) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('touchstart', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('touchstart', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || isTyping) return;
    const now = () =>
      new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const userText = text.trim();
    setMessages(prev => [
      ...prev,
      { id: Date.now(), role: 'user', text: userText, time: now() },
    ]);
    setInput('');
    setIsTyping(true);

    const newHistory = [
      ...geminiHistory,
      { role: 'user', content: userText },
    ];

    // Check fast client-side responses for immediate, eco-friendly <150ms answers
    const fast = getFastResponse(userText);
    if (fast) {
      setTimeout(() => {
        setMessages(prev => [
          ...prev,
          { id: Date.now() + 1, role: 'bot', text: fast, time: now() },
        ]);
        setGeminiHistory([
          ...newHistory,
          { role: 'assistant', content: fast },
        ]);
        setIsTyping(false);
      }, 150);
      return;
    }

    try {
      const reply = await callServerChatApi(newHistory);
      setMessages(prev => [
        ...prev,
        { id: Date.now() + 1, role: 'bot', text: reply, time: now() },
      ]);
      setGeminiHistory([
        ...newHistory,
        { role: 'assistant', content: reply },
      ]);
    } catch {
      const fallbackReply = getLocalClientFallback(userText);
      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          role: 'bot',
          text: fallbackReply,
          time: now(),
        },
      ]);
      setGeminiHistory([
        ...newHistory,
        { role: 'assistant', content: fallbackReply },
      ]);
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
    }, 320);
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
      {/* ── FULL SCREEN BACKDROP: Click ANYWHERE on screen to close chatbot ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[1.5px] cursor-pointer"
            aria-label="Close chat on click outside"
          />
        )}
      </AnimatePresence>

      {/* ── TOGGLE BUTTON — bottom-right ── */}
      <div ref={toggleButtonRef} className="fixed bottom-8 right-8 z-50">
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, type: 'spring', stiffness: 260, damping: 20 }}
          onClick={() => setIsOpen(prev => !prev)}
          aria-label="Open InTence AI Chat"
          className="relative w-14 h-14 rounded-full flex items-center justify-center hover:scale-110 active:scale-90 transition-transform duration-200 overflow-hidden cursor-pointer"
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
            Ask InTence Assistant
          </motion.div>
        )}
      </div>

      {/* ── CHAT WINDOW ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={chatWindowRef}
            initial={{ opacity: 0, y: 18, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 320, damping: 30 }}
            className="fixed right-4 sm:right-8 z-50 w-[calc(100vw-2rem)] sm:w-[410px] max-w-[420px]"
            style={{
              bottom: 'calc(3.5rem + 2.5rem)',
              height: '560px',
              maxHeight: 'calc(100vh - 9rem)',
            }}
          >
            <div
              className="flex flex-col h-full rounded-2xl overflow-hidden"
              style={{
                background:
                  'linear-gradient(160deg,rgba(10,10,16,0.98) 0%,rgba(7,7,12,0.99) 100%)',
                border: '1px solid rgba(139,92,246,0.25)',
                boxShadow:
                  '0 20px 60px rgba(0,0,0,0.85),0 0 0 1px rgba(139,92,246,0.12),inset 0 1px 0 rgba(255,255,255,0.06)',
                backdropFilter: 'blur(28px)',
              }}
            >
              {/* HEADER */}
              <div
                className="flex items-center gap-3 px-4 py-3 flex-shrink-0"
                style={{
                  background:
                    'linear-gradient(135deg,rgba(139,92,246,0.14),rgba(99,102,241,0.08))',
                  borderBottom: '1px solid rgba(139,92,246,0.16)',
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
                  <div className="flex items-center gap-1.5">
                    <p className="text-white font-semibold text-sm leading-tight">
                      InTence AI
                    </p>
                    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-medium bg-emerald-500/15 text-emerald-400 border border-emerald-500/25">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Active
                    </span>
                  </div>
                  <p
                    className="text-[11px]"
                    style={{ color: 'rgba(167,139,250,0.85)' }}
                  >
                    Official Digital Concierge • 24/7 Available
                  </p>
                </div>

                <button
                  onClick={() => setIsOpen(false)}
                  className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors flex-shrink-0 cursor-pointer"
                >
                  <ChevronDown className="w-4 h-4 text-white/60" />
                </button>
              </div>

              {/* MESSAGES */}
              <div
                className="flex-1 overflow-y-auto px-3.5 sm:px-4 py-3 space-y-3"
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
                      className={`flex flex-col gap-0.5 ${
                        msg.role === 'user' ? 'max-w-[80%] items-end' : 'w-full max-w-[94%] sm:max-w-[92%] items-start'
                      }`}
                    >
                      <div
                        className="px-3.5 py-2.5 w-full"
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
                                border: '1px solid rgba(255,255,255,0.08)',
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
                        style={{ color: 'rgba(255,255,255,0.3)' }}
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
                          border: '1px solid rgba(255,255,255,0.08)',
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

              {/* QUICK CHIPS — only on initial screen */}
              {messages.length <= 1 && (
                <div
                  className="px-4 pb-2 flex-shrink-0"
                  style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
                >
                  <p
                    className="text-[11px] mb-1.5 pt-2"
                    style={{ color: 'rgba(255,255,255,0.38)' }}
                  >
                    Quick suggestions:
                  </p>
                  <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
                    {CHIPS.map(chip => (
                      <button
                        key={chip}
                        onClick={() => sendMessage(chip)}
                        className="flex-shrink-0 text-[11px] px-2.5 py-1 rounded-full border transition-colors duration-150 cursor-pointer"
                        style={{
                          background: 'rgba(139,92,246,0.09)',
                          borderColor: 'rgba(139,92,246,0.22)',
                          color: '#c4b5fd',
                        }}
                      >
                        {chip}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* INPUT FORM */}
              <form
                onSubmit={handleSubmit}
                className="flex items-center gap-2 p-3 flex-shrink-0"
                style={{
                  background: 'rgba(255,255,255,0.02)',
                  borderTop: '1px solid rgba(139,92,246,0.12)',
                }}
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  placeholder="Ask about software, AI, projects, or call us..."
                  className="flex-1 bg-white/5 text-white placeholder-white/30 text-xs sm:text-sm px-3.5 py-2.5 rounded-xl outline-none focus:ring-1 focus:ring-purple-500/50 border border-white/10 transition-all"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isTyping}
                  aria-label="Send Message"
                  className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed hover:scale-105 active:scale-95 flex-shrink-0 cursor-pointer"
                  style={{
                    background: input.trim()
                      ? 'linear-gradient(135deg,#8B5CF6,#6366F1)'
                      : 'rgba(255,255,255,0.07)',
                    boxShadow: input.trim()
                      ? '0 2px 10px rgba(139,92,246,0.4)'
                      : 'none',
                  }}
                >
                  <Send className="w-4 h-4 text-white" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes chatPulse {
          0%, 100% { transform: scale(1); opacity: 0.35; }
          50% { transform: scale(1.35); opacity: 0; }
        }
        @keyframes chatBounce {
          0%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-5px); }
        }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </>
  );
};

export default Chatbot;
