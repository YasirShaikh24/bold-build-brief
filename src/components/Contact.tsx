import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Send, Mail, MapPin, Phone, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

// ✅ PERFECT: Works on BOTH localhost AND production
const API_URL = import.meta.env.VITE_API_URL || '/api/contact';

export const Contact = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });
  const { toast } = useToast();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    console.log('🚀 Submitting form to:', API_URL);
    console.log('📝 Form data:', formData);

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      console.log('📡 Response status:', response.status);

      const data = await response.json();
      console.log('📦 Response data:', data);

      if (response.ok && data.success) {
        console.log('✅ Form submitted successfully!');
        
        toast({
          title: "Message sent successfully!",
          description: "We'll get back to you within 24 hours.",
          duration: 5000,
        });

        // Reset form
        setFormData({ name: '', email: '', message: '' });
      } else {
        throw new Error(data.message || 'Failed to send message');
      }
    } catch (error) {
      console.error('❌ Error submitting form:', error);
      
      toast({
        title: "Failed to send message",
        description: error instanceof Error ? error.message : 'Please try again or email us directly at intence.it@gmail.com',
        variant: "destructive",
        duration: 7000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section id="contact" className="py-12 md:py-32 relative overflow-hidden">
  {/* Hard-constrained background glow to prevent overflow */}
  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[280px] md:w-[800px] h-[280px] md:h-[400px] bg-primary/10 rounded-full blur-[80px] md:blur-[150px] pointer-events-none" />

  <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10" ref={containerRef}>
    <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
      
      {/* Left Column - Info (Order 2 on mobile to show form first) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="order-2 lg:order-1 w-full"
      >
        <span className="text-primary text-xs md:text-sm font-medium uppercase tracking-widest mb-3 block">
          Get in Touch
        </span>
        <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
          Let's Build Something <span className="text-gradient">InTence</span>
        </h2>
        <p className="text-muted-foreground text-base md:text-lg mb-8 max-w-md">
          Ready to transform your ideas into powerful digital solutions?
        </p>

        {/* Contact Info - Grid for better mobile layout */}
        <div className="grid grid-cols-1 gap-4 md:gap-6">
          {[
            { icon: Mail, label: 'Email', value: 'intence.it@gmail.com' },
            { icon: Phone, label: 'Phone', value: '+1 (555) 123-4567' },
            { icon: MapPin, label: 'Location', value: 'San Francisco, CA' }
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-secondary/5 border border-border/20">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <item.icon className="w-5 h-5 text-primary" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{item.label}</p>
                <p className="font-medium text-sm md:text-base truncate">{item.value}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Right Column - Form (Order 1 on mobile) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="order-1 lg:order-2 w-full max-w-full overflow-hidden"
      >
        <form 
          onSubmit={handleSubmit} 
          className="p-5 sm:p-8 rounded-3xl bg-card/40 border border-border/40 backdrop-blur-md w-full"
        >
          <div className="space-y-5">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2 ml-1">Name</label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter Your Name"
                required
                className="h-12 bg-secondary/10 border-border/40 focus:ring-primary/20 w-full text-base rounded-xl"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2 ml-1">Email</label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter Your Mail Id (your@gmail.com)"
                required
                className="h-12 bg-secondary/10 border-border/40 focus:ring-primary/20 w-full text-base rounded-xl"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2 ml-1">Project Description</label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us about your project..."
                required
                rows={4}
                className="bg-secondary/10 border-border/40 focus:ring-primary/20 resize-none w-full text-base rounded-xl py-3 min-h-[120px]"
              />
            </div>

            <Button
              type="submit"
              variant="hero"
              size="xl"
              className="w-full h-14 text-base font-bold rounded-xl active:scale-95 transition-all touch-manipulation"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <Send className="w-5 h-5 mr-2" />
                  Send Message
                </>
              )}
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  </div>
</section>
  );
};