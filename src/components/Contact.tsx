import { useState } from 'react';
import { Send, Mail, MapPin, Phone, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

export const Contact = () => {
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

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
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
      console.error('Error:', error);
      toast({
        title: "Failed to send message",
        description: error instanceof Error ? error.message : "Please try again later or email us directly at intence.it@gmail.com",
        variant: "destructive",
        duration: 5000,
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
    <section id="contact" className="py-24 lg:py-32 bg-card/30">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Column - Info */}
          <div>
            <span className="text-primary text-sm font-medium uppercase tracking-widest mb-4 block">
              Get in Touch
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-foreground">
              Let's Build Something{' '}
              <span className="text-gradient">InTence</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-10">
              Ready to transform your ideas into powerful digital solutions? We're
              here to help you create exceptional experiences that drive results.
            </p>

            {/* Contact Info */}
            <div className="space-y-5">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium text-foreground">intence.it@gmail.com</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="font-medium text-foreground">+1 (555) 123-4567</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="font-medium text-foreground">San Francisco, CA</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div>
            <form
              onSubmit={handleSubmit}
              className="p-6 md:p-8 rounded-2xl bg-card border border-border"
            >
              <div className="space-y-5">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium mb-2 text-foreground"
                  >
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
                    className="h-12 bg-input border-border focus:border-primary text-foreground placeholder:text-muted-foreground"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-2 text-foreground"
                  >
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
                    className="h-12 bg-input border-border focus:border-primary text-foreground placeholder:text-muted-foreground"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium mb-2 text-foreground"
                  >
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
                    className="bg-input border-border focus:border-primary resize-none text-foreground placeholder:text-muted-foreground"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Let's Build Something InTence
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
