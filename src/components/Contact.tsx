import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Send, Mail, MapPin, Phone, Loader2, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const API_URL = import.meta.env.VITE_API_URL || '/api/contact';

const countryCodes = [
  { code: 'IN', dialCode: '+91', flag: '🇮🇳', name: 'India' },
  { code: 'US', dialCode: '+1', flag: '🇺🇸', name: 'United States' },
  { code: 'GB', dialCode: '+44', flag: '🇬🇧', name: 'United Kingdom' },
  { code: 'CA', dialCode: '+1', flag: '🇨🇦', name: 'Canada' },
  { code: 'AU', dialCode: '+61', flag: '🇦🇺', name: 'Australia' },
  { code: 'DE', dialCode: '+49', flag: '🇩🇪', name: 'Germany' },
  { code: 'FR', dialCode: '+33', flag: '🇫🇷', name: 'France' },
  { code: 'IT', dialCode: '+39', flag: '🇮🇹', name: 'Italy' },
  { code: 'ES', dialCode: '+34', flag: '🇪🇸', name: 'Spain' },
  { code: 'NL', dialCode: '+31', flag: '🇳🇱', name: 'Netherlands' },
  { code: 'CH', dialCode: '+41', flag: '🇨🇭', name: 'Switzerland' },
  { code: 'SE', dialCode: '+46', flag: '🇸🇪', name: 'Sweden' },
  { code: 'NO', dialCode: '+47', flag: '🇳🇴', name: 'Norway' },
  { code: 'DK', dialCode: '+45', flag: '🇩🇰', name: 'Denmark' },
  { code: 'FI', dialCode: '+358', flag: '🇫🇮', name: 'Finland' },
  { code: 'PL', dialCode: '+48', flag: '🇵🇱', name: 'Poland' },
  { code: 'BE', dialCode: '+32', flag: '🇧🇪', name: 'Belgium' },
  { code: 'AT', dialCode: '+43', flag: '🇦🇹', name: 'Austria' },
  { code: 'IE', dialCode: '+353', flag: '🇮🇪', name: 'Ireland' },
  { code: 'PT', dialCode: '+351', flag: '🇵🇹', name: 'Portugal' },
  { code: 'GR', dialCode: '+30', flag: '🇬🇷', name: 'Greece' },
  { code: 'NZ', dialCode: '+64', flag: '🇳🇿', name: 'New Zealand' },
  { code: 'SG', dialCode: '+65', flag: '🇸🇬', name: 'Singapore' },
  { code: 'HK', dialCode: '+852', flag: '🇭🇰', name: 'Hong Kong' },
  { code: 'MY', dialCode: '+60', flag: '🇲🇾', name: 'Malaysia' },
  { code: 'TH', dialCode: '+66', flag: '🇹🇭', name: 'Thailand' },
  { code: 'PH', dialCode: '+63', flag: '🇵🇭', name: 'Philippines' },
  { code: 'ID', dialCode: '+62', flag: '🇮🇩', name: 'Indonesia' },
  { code: 'VN', dialCode: '+84', flag: '🇻🇳', name: 'Vietnam' },
  { code: 'JP', dialCode: '+81', flag: '🇯🇵', name: 'Japan' },
  { code: 'KR', dialCode: '+82', flag: '🇰🇷', name: 'South Korea' },
  { code: 'CN', dialCode: '+86', flag: '🇨🇳', name: 'China' },
  { code: 'TW', dialCode: '+886', flag: '🇹🇼', name: 'Taiwan' },
  { code: 'AE', dialCode: '+971', flag: '🇦🇪', name: 'United Arab Emirates' },
  { code: 'SA', dialCode: '+966', flag: '🇸🇦', name: 'Saudi Arabia' },
  { code: 'IL', dialCode: '+972', flag: '🇮🇱', name: 'Israel' },
  { code: 'TR', dialCode: '+90', flag: '🇹🇷', name: 'Turkey' },
  { code: 'ZA', dialCode: '+27', flag: '🇿🇦', name: 'South Africa' },
  { code: 'BR', dialCode: '+55', flag: '🇧🇷', name: 'Brazil' },
  { code: 'MX', dialCode: '+52', flag: '🇲🇽', name: 'Mexico' },
  { code: 'AR', dialCode: '+54', flag: '🇦🇷', name: 'Argentina' },
  { code: 'CL', dialCode: '+56', flag: '🇨🇱', name: 'Chile' },
  { code: 'CO', dialCode: '+57', flag: '🇨🇴', name: 'Colombia' },
  { code: 'RU', dialCode: '+7', flag: '🇷🇺', name: 'Russia' },
  { code: 'UA', dialCode: '+380', flag: '🇺🇦', name: 'Ukraine' },
  { code: 'EG', dialCode: '+20', flag: '🇪🇬', name: 'Egypt' },
  { code: 'NG', dialCode: '+234', flag: '🇳🇬', name: 'Nigeria' },
  { code: 'KE', dialCode: '+254', flag: '🇰🇪', name: 'Kenya' },
  { code: 'BD', dialCode: '+880', flag: '🇧🇩', name: 'Bangladesh' },
  { code: 'PK', dialCode: '+92', flag: '🇵🇰', name: 'Pakistan' },
  { code: 'LK', dialCode: '+94', flag: '🇱🇰', name: 'Sri Lanka' },
];

export const Contact = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });
  const { toast } = useToast();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(countryCodes[0]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const submissionData = {
      name: formData.name,
      email: formData.email,
      phone: `${selectedCountry.dialCode} ${formData.phone}`,
      country: selectedCountry.name,
      message: formData.message,
    };

    console.log('🚀 Submitting form to:', API_URL);
    console.log('📝 Form data:', submissionData);

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(submissionData),
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

        setFormData({ name: '', email: '', phone: '', message: '' });
        setSelectedCountry(countryCodes[0]);
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
    const { name, value } = e.target;
    
    if (name === 'phone') {
      const numbersOnly = value.replace(/[^0-9]/g, '');
      setFormData((prev) => ({
        ...prev,
        [name]: numbersOnly,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleCountrySelect = (country: typeof countryCodes[0]) => {
    setSelectedCountry(country);
    setShowCountryDropdown(false);
  };

  return (
    <section id="contact" className="py-12 md:py-32 relative overflow-hidden">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[280px] md:w-[800px] h-[280px] md:h-[400px] bg-primary/10 rounded-full blur-[80px] md:blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10" ref={containerRef}>
        <motion.div 
  className="text-center mb-8 md:mb-12"
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6 }}
>
  <span className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs md:text-sm mb-4 md:mb-6">
    <span className="w-2 h-2 rounded-full bg-primary" />
    Contact Us
  </span>
  
  <div className="mb-3 md:mb-4 px-4">
    <motion.h2 
      className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4"
      initial={{ opacity: 0, filter: 'blur(12px)', x: -30 }}
      whileInView={{ opacity: 1, filter: 'blur(0px)', x: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 1.2, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <motion.span 
        className="inline-block mr-[0.25em] text-white"
        initial={{ opacity: 0, filter: 'blur(10px)', x: -25 }}
        whileInView={{ opacity: 1, filter: 'blur(0px)', x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
      >
        Let's
      </motion.span>
      <motion.span 
        className="inline-block mr-[0.25em] text-white"
        initial={{ opacity: 0, filter: 'blur(10px)', x: -25 }}
        whileInView={{ opacity: 1, filter: 'blur(0px)', x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      >
        Transform
      </motion.span>
      <motion.span 
        className="inline-block mr-[0.25em] text-white"
        initial={{ opacity: 0, filter: 'blur(10px)', x: -25 }}
        whileInView={{ opacity: 1, filter: 'blur(0px)', x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      >
        Your
      </motion.span>
      <br />
      <motion.span 
        className="inline-block mr-[0.25em] text-white/70"
        initial={{ opacity: 0, filter: 'blur(10px)', x: -25 }}
        whileInView={{ opacity: 1, filter: 'blur(0px)', x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, delay: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
      >
        Vision
      </motion.span>
      <motion.span 
        className="inline-block mr-[0.25em] text-white/70"
        initial={{ opacity: 0, filter: 'blur(10px)', x: -25 }}
        whileInView={{ opacity: 1, filter: 'blur(0px)', x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, delay: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
      >
        into Reality
      </motion.span>
    </motion.h2>
  </div>
  
  <div className="max-w-4xl mx-auto mb-4 md:mb-6 px-4">
    <p className="text-base md:text-lg lg:text-xl leading-relaxed text-white/60">
      Ready to transform your ideas into powerful digital solutions? Get in touch with our team and let's discuss how we can help elevate your business.
    </p>
  </div>
  
</motion.div>




        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          
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

            <div className="grid grid-cols-1 gap-4 md:gap-6">
              {[
                { icon: Mail, label: 'Email', value: 'intence.it@gmail.com', href: 'mailto:intence.it@gmail.com' },
                { icon: Phone, label: 'Phone', value: '+91 92652 50494', href: 'tel:+919265250494' },
                { icon: Phone, label: 'WhatsApp', value: '+91 92652 50494', href: 'https://wa.me/919265250494?text=Hello!%20I%27m%20interested%20in%20partnering%20with%20your%20agency%20to%20scale%20my%20brand.%20Could%20you%20share%20your%20onboarding%20process%20and%20current%20availability%3F', isWhatsApp: true },
                { icon: MapPin, label: 'Location', value: 'Gujarat, India', href: null }
              ].map((item, i) => {
                const Container = item.href ? 'a' : 'div';
                const containerProps = item.href ? { href: item.href } : {};
                
                return (
                  <Container 
                    key={i} 
                    {...containerProps}
                    className={`flex items-center gap-4 p-4 rounded-xl bg-secondary/5 border border-border/20 ${item.href ? 'cursor-pointer hover:bg-secondary/10 hover:border-primary/30 transition-all active:scale-95' : ''}`}
                    {...(item.href && item.isWhatsApp ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  >
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${item.isWhatsApp ? 'bg-green-500/10' : 'bg-primary/10'}`}>
                      {item.isWhatsApp ? (
                        <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                        </svg>
                      ) : (
                        <item.icon className="w-5 h-5 text-primary" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{item.label}</p>
                      <p className="font-medium text-sm md:text-base truncate">{item.value}</p>
                    </div>
                  </Container>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="order-1 lg:order-2 w-full max-w-full overflow-hidden"
          >
            <div className="relative p-5 sm:p-8 rounded-3xl w-full" style={{
              background: 'linear-gradient(135deg, rgba(20, 20, 25, 0.95) 0%, rgba(15, 15, 20, 0.98) 100%)',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(20px)'
            }}>
              {/* Subtle gradient overlay effect */}
              <div className="absolute inset-0 rounded-3xl pointer-events-none" style={{
                background: 'radial-gradient(circle at top right, rgba(139, 92, 246, 0.03), transparent 50%), radial-gradient(circle at bottom left, rgba(59, 130, 246, 0.03), transparent 50%)'
              }} />
              
              <div className="space-y-5 relative z-10">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2 ml-1 text-gray-200">
                    Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter Your Name"
                    required
                    className="h-12 text-base rounded-xl w-full"
                    style={{
                      background: 'rgba(30, 30, 35, 0.6)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      color: '#e5e7eb'
                    }}
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2 ml-1 text-gray-200">
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter Your Mail Id (your@gmail.com)"
                    required
                    className="h-12 text-base rounded-xl w-full"
                    style={{
                      background: 'rgba(30, 30, 35, 0.6)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      color: '#e5e7eb'
                    }}
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-2 ml-1 text-gray-200">
                    Mobile Number
                  </label>
                  <div className="relative">
                    <div className="flex items-stretch h-12 rounded-xl overflow-hidden" style={{
                      background: 'rgba(30, 30, 35, 0.6)',
                      border: '1px solid rgba(255, 255, 255, 0.08)'
                    }}>
                      <button
                        type="button"
                        onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                        className="flex items-center gap-2 px-3 border-r flex-shrink-0 hover:bg-white/5 transition-colors"
                        style={{
                          background: 'rgba(40, 40, 45, 0.6)',
                          borderRight: '1px solid rgba(255, 255, 255, 0.08)'
                        }}
                      >
                        <span className="text-xl leading-none">{selectedCountry.flag}</span>
                        <span className="text-sm font-medium whitespace-nowrap text-gray-200">{selectedCountry.dialCode}</span>
                        <ChevronDown className="w-4 h-4 text-gray-400" />
                      </button>

                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Enter Your Mobile Number"
                        required
                        className="flex-1 px-4 bg-transparent border-none outline-none text-base"
                        style={{ color: '#e5e7eb' }}
                      />
                    </div>

                    {showCountryDropdown && (
                      <div className="absolute top-full left-0 right-0 mt-2 rounded-xl shadow-lg max-h-60 overflow-y-auto z-50" style={{
                        background: 'rgba(20, 20, 25, 0.98)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        backdropFilter: 'blur(20px)'
                      }}>
                        {countryCodes.map((country) => (
                          <button
                            key={country.code}
                            type="button"
                            onClick={() => handleCountrySelect(country)}
                            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors text-left"
                          >
                            <span className="text-xl leading-none">{country.flag}</span>
                            <span className="text-sm font-medium text-gray-200">{country.dialCode}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <p className="text-xs mt-2 ml-1" style={{ color: '#9ca3af' }}>
                    Select your country code using the flag selector and enter your mobile number (numbers only, no spaces or symbols)
                  </p>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2 ml-1 text-gray-200">
                    Your Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Type Your Message Here..."
                    required
                    rows={4}
                    className="resize-none w-full text-base rounded-xl py-3 min-h-[120px]"
                    style={{
                      background: 'rgba(30, 30, 35, 0.6)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      color: '#e5e7eb'
                    }}
                  />
                </div>

                <Button
                  onClick={handleSubmit}
                  variant="hero"
                  size="xl"
                  className="w-full h-14 text-base font-bold rounded-xl active:scale-95 transition-all touch-manipulation"
                  disabled={isSubmitting}
                  style={{
                    background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
                    border: 'none',
                    color: 'white'
                  }}
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
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};