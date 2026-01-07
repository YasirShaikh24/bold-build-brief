import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Send, Mail, MapPin, Phone, Loader2, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

// ✅ PERFECT: Works on BOTH localhost AND production
const API_URL = import.meta.env.VITE_API_URL || '/api/contact';

// Country codes with flags and dial codes
const countryCodes = [
  { code: 'IN', dialCode: '+91', flag: '🇮🇳' },
  { code: 'US', dialCode: '+1', flag: '🇺🇸' },
  { code: 'GB', dialCode: '+44', flag: '🇬🇧' },
  { code: 'CA', dialCode: '+1', flag: '🇨🇦' },
  { code: 'AU', dialCode: '+61', flag: '🇦🇺' },
  { code: 'DE', dialCode: '+49', flag: '🇩🇪' },
  { code: 'FR', dialCode: '+33', flag: '🇫🇷' },
  { code: 'IT', dialCode: '+39', flag: '🇮🇹' },
  { code: 'ES', dialCode: '+34', flag: '🇪🇸' },
  { code: 'NL', dialCode: '+31', flag: '🇳🇱' },
  { code: 'CH', dialCode: '+41', flag: '🇨🇭' },
  { code: 'SE', dialCode: '+46', flag: '🇸🇪' },
  { code: 'NO', dialCode: '+47', flag: '🇳🇴' },
  { code: 'DK', dialCode: '+45', flag: '🇩🇰' },
  { code: 'FI', dialCode: '+358', flag: '🇫🇮' },
  { code: 'PL', dialCode: '+48', flag: '🇵🇱' },
  { code: 'BE', dialCode: '+32', flag: '🇧🇪' },
  { code: 'AT', dialCode: '+43', flag: '🇦🇹' },
  { code: 'IE', dialCode: '+353', flag: '🇮🇪' },
  { code: 'PT', dialCode: '+351', flag: '🇵🇹' },
  { code: 'GR', dialCode: '+30', flag: '🇬🇷' },
  { code: 'NZ', dialCode: '+64', flag: '🇳🇿' },
  { code: 'SG', dialCode: '+65', flag: '🇸🇬' },
  { code: 'HK', dialCode: '+852', flag: '🇭🇰' },
  { code: 'MY', dialCode: '+60', flag: '🇲🇾' },
  { code: 'TH', dialCode: '+66', flag: '🇹🇭' },
  { code: 'PH', dialCode: '+63', flag: '🇵🇭' },
  { code: 'ID', dialCode: '+62', flag: '🇮🇩' },
  { code: 'VN', dialCode: '+84', flag: '🇻🇳' },
  { code: 'JP', dialCode: '+81', flag: '🇯🇵' },
  { code: 'KR', dialCode: '+82', flag: '🇰🇷' },
  { code: 'CN', dialCode: '+86', flag: '🇨🇳' },
  { code: 'TW', dialCode: '+886', flag: '🇹🇼' },
  { code: 'AE', dialCode: '+971', flag: '🇦🇪' },
  { code: 'SA', dialCode: '+966', flag: '🇸🇦' },
  { code: 'IL', dialCode: '+972', flag: '🇮🇱' },
  { code: 'TR', dialCode: '+90', flag: '🇹🇷' },
  { code: 'ZA', dialCode: '+27', flag: '🇿🇦' },
  { code: 'BR', dialCode: '+55', flag: '🇧🇷' },
  { code: 'MX', dialCode: '+52', flag: '🇲🇽' },
  { code: 'AR', dialCode: '+54', flag: '🇦🇷' },
  { code: 'CL', dialCode: '+56', flag: '🇨🇱' },
  { code: 'CO', dialCode: '+57', flag: '🇨🇴' },
  { code: 'RU', dialCode: '+7', flag: '🇷🇺' },
  { code: 'UA', dialCode: '+380', flag: '🇺🇦' },
  { code: 'EG', dialCode: '+20', flag: '🇪🇬' },
  { code: 'NG', dialCode: '+234', flag: '🇳🇬' },
  { code: 'KE', dialCode: '+254', flag: '🇰🇪' },
  { code: 'BD', dialCode: '+880', flag: '🇧🇩' },
  { code: 'PK', dialCode: '+92', flag: '🇵🇰' },
  { code: 'LK', dialCode: '+94', flag: '🇱🇰' },
];

export const Contact = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });
  const { toast } = useToast();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(countryCodes[0]); // Default to India
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Combine country code with phone number for submission
    const submissionData = {
      name: formData.name,
      email: formData.email,
      phone: `${selectedCountry.dialCode} ${formData.phone}`,
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

        // Reset form
        setFormData({ name: '', email: '', phone: '', message: '' });
        setSelectedCountry(countryCodes[0]); // Reset to India
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
    
    // Only allow numbers for phone field
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
            <div className="p-5 sm:p-8 rounded-3xl bg-card/40 border border-border/40 backdrop-blur-md w-full">
              <div className="space-y-5">
                {/* Name Field */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2 ml-1">
                    Name
                  </label>
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

                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2 ml-1">
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
                    className="h-12 bg-secondary/10 border-border/40 focus:ring-primary/20 w-full text-base rounded-xl"
                  />
                </div>

                {/* Mobile Number Field with Country Code Selector */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-2 ml-1">
                    Mobile Number
                  </label>
                  <div className="relative">
                    <div className="flex items-stretch h-12 rounded-xl overflow-hidden bg-secondary/10 border border-border/40 focus-within:ring-2 focus-within:ring-primary/20 transition-all">
                      {/* Country Code Selector Button */}
                      <button
                        type="button"
                        onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                        className="flex items-center gap-2 px-3 bg-secondary/20 border-r border-border/40 hover:bg-secondary/30 transition-colors flex-shrink-0"
                      >
                        <span className="text-xl leading-none">{selectedCountry.flag}</span>
                        <span className="text-sm font-medium whitespace-nowrap">{selectedCountry.dialCode}</span>
                        <ChevronDown className="w-4 h-4 text-muted-foreground" />
                      </button>

                      {/* Phone Number Input */}
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="e.g., 9876543210"
                        required
                        className="flex-1 px-4 bg-transparent border-none outline-none text-base text-foreground placeholder:text-muted-foreground"
                      />
                    </div>

                    {/* Country Dropdown Menu */}
                    {showCountryDropdown && (
                      <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border/40 rounded-xl shadow-lg max-h-60 overflow-y-auto z-50 backdrop-blur-md">
                        {countryCodes.map((country) => (
                          <button
                            key={country.code}
                            type="button"
                            onClick={() => handleCountrySelect(country)}
                            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-secondary/20 transition-colors text-left"
                          >
                            <span className="text-xl leading-none">{country.flag}</span>
                            <span className="text-sm font-medium">{country.dialCode}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  {/* Helper Text */}
                  <p className="text-xs text-muted-foreground mt-2 ml-1">
                    Select your country code using the flag selector and enter your mobile number (numbers only, no spaces or symbols)
                  </p>
                </div>

                {/* Project Description Field */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2 ml-1">
                    Project Description
                  </label>
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

                {/* Submit Button */}
                <Button
                  onClick={handleSubmit}
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
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};