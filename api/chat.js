import { GoogleGenAI } from '@google/genai';

let aiClient = null;

function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  if (!aiClient) {
    aiClient = new GoogleGenAI({ apiKey });
  }
  return aiClient;
}

export const SYSTEM_PROMPT = `You are InTence AI, an intelligent, articulate, and conversational software engineering consultant for InTence (https://intence.in).
Your goal is to converse naturally, intelligently, and specifically — just like an expert human advisor or conversational AI (like Gemini / ChatGPT).

==================================================
CRITICAL DIRECTIVES:
==================================================
1. DYNAMIC & SPECIFIC CONVERSATION:
   - ALWAYS directly answer the user's specific question or request first.
   - NEVER dump a generic copy-paste brochure or repetitive boilerplate.
   - Keep answers natural, clear, conversational, and easy to understand ("chat-style", not complicated card blocks).
   - Tone: Friendly, articulate, technically sharp, transparent, and welcoming.

2. IN-DEPTH COMPANY KNOWLEDGE (Use when relevant to the user's question):
   - Company: InTence (Software Engineering & Development Company)
   - Location: Vadodara, Gujarat, India (serving international & local clients worldwide)
   - Phone / WhatsApp: +91 92652 50494 (Direct WhatsApp: https://wa.me/919265250494)
   - Email: intence.it@gmail.com
   - Website: https://intence.in
   - Social: Instagram (@intence.in), LinkedIn (intence-company), Facebook

3. CORE SERVICES:
   - Mobile App Development: Custom iOS & Android apps built with React Native and Flutter. Native speed, offline storage, push notifications, and intuitive UX.
   - Web Applications & SaaS: Scalable, responsive, modern web platforms with clean code, secure APIs, and cloud infrastructure.
   - Business Management Systems (ERP / CRM): Custom operational platforms, inventory management, billing, client portals, and workflow engines.
   - High-Speed Websites: Fast, SEO-optimized, conversion-focused websites for modern businesses.
   - Custom AI Solutions: Custom conversational AI agents, intelligent document search/parsing (PDFs, invoices), predictive analytics, and automated workflows.
   - Database Architecture: Scalable, secure data design using PostgreSQL, MySQL, MongoDB, and Cloud DBs.

4. REAL CLIENT PROJECTS (Mention relevant ones naturally when asked about work or portfolio):
   - ScaleSight (https://www.scalesight.in): Financial forecasting & Virtual CFO platform (React, Node.js, Tailwind).
   - Firdaus Makeover (https://firdausmakeover.com): Luxury beauty suite & online booking management (React, Vite, Tailwind).
   - Shaden House (https://www.shadenhouse.com): High-end Saudi Arabian luxury real estate showcase portal.
   - Islamic Deeds Tracker (https://islamic-deeds-tracker.vercel.app/): Spiritual habit tracker & analytics (Python, PostgreSQL, React).
   - NOVA (https://nova-ecommerce-website.netlify.app/): Modern e-commerce storefront with instant search and checkout.
   - Sagir Trader (https://sagir-trader.netlify.app): Financial markets monitoring & portfolio dashboard (Java, React, PostgreSQL).

5. PHILOSOPHY ON "DO YOU USE AI TO WRITE SOFTWARE?":
   - If asked whether InTence uses AI to write code:
     Explain with pride and technical clarity that InTence does NOT rely on AI-generated code for client production software. Every system is 100% handcrafted, architected, and reviewed by senior human software engineers. This ensures zero hallucinated dependencies, rock-solid security, high performance, and maintainable architecture.
   - Concurrently, InTence DOES build custom AI models, intelligent chatbots, and automated workflows FOR clients whose businesses benefit from smart AI capabilities.

6. FORMATTING:
   - Use clean, readable markdown (bolding key concepts, bullet lists where appropriate, and clean links).
   - Do NOT output custom card codes like [CONTACT_CARD_WIDGET] or [PROJECTS_CARD_WIDGET]. Just speak naturally in clean conversational text!
   - Keep answers concise and engaging (around 2-4 sentences or short digestible paragraphs) and end with a relevant, helpful follow-up question when appropriate.`;

/**
 * Intelligent fallback generator in case GEMINI_API_KEY is not configured
 * or if the external API call fails. Ensures 100% reliable uptime.
 */
export function generateLocalFallback(promptText, history = []) {
  const q = (promptText || '').toLowerCase().trim();

  // Mobile apps specific question
  if (q.includes('mobile') || q.includes('ios') || q.includes('android') || q.includes('flutter') || q.includes('react native')) {
    return `Yes, absolutely! At **InTence**, we build custom mobile applications for both **iOS and Android**.

We specialize in cross-platform development using **React Native** and **Flutter**, as well as native architectures. Whether you need a brand-new MVP from scratch, offline caching, real-time push notifications, or an enterprise mobile companion to your web platform, our human software engineers build everything by hand with clean, scalable code.

Are you looking to build a new mobile app or convert an existing web platform into an app? I'd love to learn more about what you have in mind!`;
  }

  // "Do you use AI to build software?"
  if (
    q.includes('use ai') ||
    q.includes('rely on ai') ||
    q.includes('ai generated') ||
    q.includes('ai write') ||
    q.includes('artificial intelligence')
  ) {
    return `At **InTence**, we take software craftsmanship and code reliability seriously:

- **100% Handcrafted by Engineers**: We do **not** rely on AI-generated code for our clients' production software. Every architecture, database schema, and interface is thoughtfully designed, coded, and peer-reviewed by experienced human engineers.
- **Enterprise Security & Quality**: This eliminates hallucinated packages, security loopholes, and messy unmaintainable code.
- **We Build AI for Clients**: While we don't use AI to write our software, we **specialize in engineering custom AI models, smart conversational assistants, and intelligent automation systems FOR our clients**!

Do you have a project in mind where you'd like to integrate smart custom AI or need bulletproof software built?`;
  }

  // Projects / Portfolio
  if (
    q.includes('project') ||
    q.includes('portfolio') ||
    q.includes('work') ||
    q.includes('showcase') ||
    q.includes('case study') ||
    q.includes('built')
  ) {
    return `We've built a variety of high-performance applications across different industries! Here are a few live highlights:

- **[ScaleSight](https://www.scalesight.in)**: Virtual CFO, financial forecasting, and regulatory compliance platform.
- **[Firdaus Makeover](https://firdausmakeover.com)**: Luxury beauty booking calendar and appointment management suite.
- **[Shaden House](https://www.shadenhouse.com)**: High-speed Saudi Arabian luxury real estate showcase.
- **[Islamic Deeds Tracker](https://islamic-deeds-tracker.vercel.app/)**: Spiritual productivity and daily analytics app.
- **[NOVA E-Commerce](https://nova-ecommerce-website.netlify.app/)**: Ultra-fast online shopping storefront.
- **[Sagir Trader](https://sagir-trader.netlify.app)**: Real-time financial markets monitor & portfolio analytics.

You can also explore the **Work / Portfolio** section right here on this page. Would you like to know more about any specific project or tech stack?`;
  }

  // Pricing / Cost
  if (q.includes('cost') || q.includes('price') || q.includes('pricing') || q.includes('rate') || q.includes('quote') || q.includes('how much')) {
    return `Our pricing is **transparent and milestone-based**, tailored specifically to your project's scope, architecture, and timeline:

- **100% Free Architecture Consultation**: We review your concept and provide a clear roadmap with zero commitment.
- **Fixed-Price Milestones**: You only pay as deliverables are reviewed and approved, with zero surprise fees.
- **Flexible Solutions**: From rapid early-stage MVPs to robust enterprise software systems.

If you share a brief overview of your project, our engineering team can provide an accurate estimate. Feel free to connect directly with us at **+91 92652 50494** or via **intence.it@gmail.com**!`;
  }

  // Contact / Phone / Email / Hire
  if (
    q.includes('contact') ||
    q.includes('phone') ||
    q.includes('call') ||
    q.includes('dial') ||
    q.includes('email') ||
    q.includes('whatsapp') ||
    q.includes('hire') ||
    q.includes('reach') ||
    q.includes('location') ||
    q.includes('address')
  ) {
    return `You can get in touch with the InTence engineering team directly anytime:

- **Direct Call / WhatsApp**: [+91 92652 50494](https://wa.me/919265250494) (available for direct calls and chat)
- **Official Email**: [intence.it@gmail.com](mailto:intence.it@gmail.com)
- **Location**: Vadodara, Gujarat, India (delivering globally to US, Middle East, Europe & India)
- **Website**: [intence.in](https://intence.in)

You can also submit the contact form at the bottom of this page. How can we help with your upcoming project?`;
  }

  // Web apps / Website / ERP / CRM
  if (q.includes('web') || q.includes('site') || q.includes('crm') || q.includes('erp') || q.includes('saas') || q.includes('database')) {
    return `Yes! We develop modern web platforms, SaaS applications, and custom business management systems (CRM/ERP).

Our web applications are built using modern technologies like **React, Next.js, Node.js, and PostgreSQL**, ensuring fast loading speeds, clean UI, and bank-grade data security. We also build custom management tools to streamline inventory, invoicing, employee operations, and customer records.

What kind of web platform or management tool are you looking to create?`;
  }

  // Greetings or general inquiry
  return `Hello! 👋 I'm **InTence AI**, your digital consultant.

We are a software engineering company specializing in **custom mobile apps (iOS & Android)**, **web applications & SaaS**, **ERP/CRM management systems**, and **custom AI solutions**.

How can I help you today? You can ask about our development process, tech stack, past live projects, or get in touch with our engineering team directly!`;
}

/**
 * Handle chat request using Gemini AI (with fallback).
 */
export async function handleChatRequest(messages) {
  const latestMessage = Array.isArray(messages) && messages.length > 0
    ? messages[messages.length - 1]
    : { content: '' };
  
  const userText = latestMessage.content || latestMessage.text || '';

  const ai = getGeminiClient();
  if (!ai) {
    console.log('ℹ️ [InTence AI] GEMINI_API_KEY not set, using accurate knowledge engine.');
    return generateLocalFallback(userText, messages);
  }

  try {
    // Format conversation history for @google/genai
    const formattedContents = (messages || []).map((m) => ({
      role: m.role === 'bot' || m.role === 'assistant' || m.role === 'model' ? 'model' : 'user',
      parts: [{ text: m.content || m.text || '' }],
    }));

    // Ensure at least one message is present
    if (formattedContents.length === 0) {
      formattedContents.push({ role: 'user', parts: [{ text: userText || 'Hello' }] });
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.1-flash-lite',
      contents: formattedContents,
      config: {
        systemInstruction: SYSTEM_PROMPT,
        temperature: 0.7,
      },
    });

    const reply = response.text?.trim();
    if (reply) {
      return reply;
    }
    return generateLocalFallback(userText, messages);
  } catch (err) {
    console.error('❌ [InTence AI] Gemini API error:', err);
    return generateLocalFallback(userText, messages);
  }
}

export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { messages } = req.body || {};
    const reply = await handleChatRequest(messages);
    return res.status(200).json({ reply });
  } catch (error) {
    console.error('Error in chat handler:', error);
    return res.status(200).json({
      reply: generateLocalFallback('hello', []),
    });
  }
}
