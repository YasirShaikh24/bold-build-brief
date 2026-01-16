import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: 'What do I need to get started?',
    answer: 'Simply reach out to us with your project idea. We\'ll schedule a consultation to understand your needs, then provide a detailed proposal with timeline and pricing. No upfront commitment required.',
  },
  {
    question: 'What kind of customization is available?',
    answer: 'We offer fully custom solutions tailored to your brand. From UI/UX design to backend architecture, every aspect can be customized. We don\'t use templates - everything is built from scratch for your specific needs.',
  },
  {
    question: 'How easy is it to edit for beginners?',
    answer: 'We build intuitive admin panels and provide comprehensive documentation. Our solutions include easy-to-use content management systems that allow non-technical team members to update content, images, and basic settings.',
  },
  {
    question: 'Let me know more about moneyback guarantee?',
    answer: 'We offer a satisfaction guarantee on all our projects. If you\'re not happy with the initial designs or direction, we\'ll work with you to make it right or provide a full refund within the first two weeks of the project.',
  },
  {
    question: 'Do I need to know how to code?',
    answer: 'Not at all! We handle all the technical aspects. You just need to share your vision, provide feedback, and we take care of the rest. We communicate in plain language and keep you informed every step of the way.',
  },
  {
    question: 'What will I get after the project is complete?',
    answer: 'You\'ll receive full ownership of all code, design files, and assets. We also provide documentation, training sessions, and ongoing support options. Your project will be deployed and ready for launch.',
  },
];

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const animated = sessionStorage.getItem('faqAnimated');
    if (!animated) {
      sessionStorage.setItem('faqAnimated', 'true');
    } else {
      setHasAnimated(true);
    }
  }, []);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 md:py-32 relative overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left Column - Header */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm mb-6">
              <HelpCircle className="w-4 h-4" />
              FAQ
            </span>
            
            <motion.h2 
              className="text-4xl md:text-5xl font-bold mb-4"
              initial={hasAnimated ? { opacity: 1, filter: 'blur(0px)', x: 0 } : { opacity: 0, filter: 'blur(12px)', x: -30 }}
              whileInView={hasAnimated ? { opacity: 1, filter: 'blur(0px)', x: 0 } : { opacity: 1, filter: 'blur(0px)', x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 1.2, delay: hasAnimated ? 0 : 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <motion.span 
                className="inline-block mr-[0.25em] text-white"
                initial={hasAnimated ? { opacity: 1, filter: 'blur(0px)', x: 0 } : { opacity: 0, filter: 'blur(10px)', x: -25 }}
                whileInView={{ opacity: 1, filter: 'blur(0px)', x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: hasAnimated ? 0 : 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              >
                Frequently
              </motion.span>
              <br />
              <motion.span 
                className="inline-block mr-[0.25em] text-white/70"
                initial={hasAnimated ? { opacity: 1, filter: 'blur(0px)', x: 0 } : { opacity: 0, filter: 'blur(10px)', x: -25 }}
                whileInView={{ opacity: 1, filter: 'blur(0px)', x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: hasAnimated ? 0 : 0.5, ease: [0.25, 0.1, 0.25, 1] }}
              >
                Asked
              </motion.span>
              <motion.span 
                className="inline-block mr-[0.25em] text-white/70"
                initial={hasAnimated ? { opacity: 1, filter: 'blur(0px)', x: 0 } : { opacity: 0, filter: 'blur(10px)', x: -25 }}
                whileInView={{ opacity: 1, filter: 'blur(0px)', x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: hasAnimated ? 0 : 0.6, ease: [0.25, 0.1, 0.25, 1] }}
              >
                Questions
              </motion.span>
            </motion.h2>
            
            <p className="text-white/60 text-lg max-w-md leading-relaxed">
              Have questions? Our FAQ section has you covered with quick answers
              to the most common inquiries.
            </p>
          </motion.div>

          {/* Right Column - Accordion */}
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="rounded-2xl bg-card/50 border border-border/50 overflow-hidden hover:border-primary/30 transition-all"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left"
                >
                  <span className="font-medium text-foreground pr-4">
                    {faq.question}
                  </span>
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    {openIndex === index ? (
                      <Minus className="w-4 h-4 text-primary" />
                    ) : (
                      <Plus className="w-4 h-4 text-primary" />
                    )}
                  </div>
                </button>
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                    >
                      <div className="px-6 pb-5 text-muted-foreground">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
