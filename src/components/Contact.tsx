import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Send, Mail, MapPin, Phone, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

// IMPORTANT: Make sure this matches your backend server URL
const API_URL = 'http://localhost:5000/api/contact';

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

    console.log('🚀 Submitting form...');
    console.log('📝 Form data:', formData);
    console.log('🔗 API URL:', API_URL);

    try {
      // First, test if the server is reachable
      console.log('🔍 Testing server connection...');
      
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      console.log('📡 Response status:', response.status);
      console.log('📡 Response ok:', response.ok);

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
      
      let errorMessage = 'Please try again later or email us directly at intence.it@gmail.com';
      let errorTitle = 'Failed to send message';

      if (error instanceof TypeError && error.message.includes('fetch')) {
        errorTitle = 'Cannot connect to server';
        errorMessage = 'Make sure the backend server is running on http://localhost:5000';
        console.error('💡 Tip: Run "npm run server" in a separate terminal');
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      toast({
        title: errorTitle,
        description: errorMessage,
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
    <section id="contact" className="py-16 md:py-32 relative overflow-hidden">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/10 rounded-full blur-[150px]" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10" ref={containerRef}>
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          {/* Left Column - Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1"
          >
            <motion.span 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-primary text-sm font-medium uppercase tracking-widest mb-4 block"
            >
              Get in Touch
            </motion.span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 md:mb-6">
              Let's Build Something{' '}
              <span className="text-gradient">InTence</span>
            </h2>
            <p className="text-muted-foreground text-base md:text-lg mb-8 md:mb-12">
              Ready to transform your ideas into powerful digital solutions?
            </p>

            {/* Contact Info */}
            <div className="space-y-4 md:space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                whileHover={{ x: 5 }}
                className="flex items-center gap-4"
              >
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs md:text-sm text-muted-foreground">Email</p>
                  <p className="font-medium text-sm md:text-base truncate">intence.it@gmail.com</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                whileHover={{ x: 5 }}
                className="flex items-center gap-4"
              >
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs md:text-sm text-muted-foreground">Phone</p>
                  <p className="font-medium text-sm md:text-base">+1 (555) 123-4567</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                whileHover={{ x: 5 }}
                className="flex items-center gap-4"
              >
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs md:text-sm text-muted-foreground">Location</p>
                  <p className="font-medium text-sm md:text-base">San Francisco, CA</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Column - Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="order-1 lg:order-2 w-full max-w-full"
          >
            <form onSubmit={handleSubmit} className="p-6 md:p-8 lg:p-10 rounded-2xl md:rounded-3xl bg-card border border-border/50 backdrop-blur-sm shadow-xl w-full">
              <div className="space-y-4 md:space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                    disabled={isSubmitting}
                    className="h-11 md:h-12 bg-secondary/30 border-border/50 focus:border-primary w-full"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                >
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    required
                    disabled={isSubmitting}
                    className="h-11 md:h-12 bg-secondary/30 border-border/50 focus:border-primary w-full"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                >
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Project Description
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your project..."
                    required
                    disabled={isSubmitting}
                    rows={5}
                    className="bg-secondary/30 border-border/50 focus:border-primary resize-none w-full"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 }}
                >
                  <Button
                    type="submit"
                    variant="hero"
                    size="xl"
                    className="w-full text-sm md:text-base"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 md:w-5 md:h-5 mr-2 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                        Let's Build Something InTence
                      </>
                    )}
                  </Button>
                </motion.div>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};