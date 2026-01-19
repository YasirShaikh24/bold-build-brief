import { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Send, Mail, MapPin, Phone, Loader2, ChevronDown, MessageCircle, Instagram, Facebook, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const API_URL = '/api/contact';

// Custom hook for mouse tracking
const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const updateMousePosition = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return { mousePosition, updateMousePosition };
};

// Mouse-following button component
const MouseFollowButton = ({ 
  mousePosition, 
  isVisible, 
  text 
}: { 
  mousePosition: { x: number; y: number }; 
  isVisible: boolean; 
  text: string;
}) => {
  return (
    <div
      className={`absolute pointer-events-none z-30 transition-opacity duration-200 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{
        left: mousePosition.x,
        top: mousePosition.y,
        transform: 'translate(-50%, -50%)',
      }}
    >
      <div className="px-4 py-2 bg-white text-black rounded-full font-semibold text-sm shadow-lg whitespace-nowrap">
        {text}
      </div>
    </div>
  );
};

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

const contactOptions = [
  {
    id: 'whatsapp',
    icon: MessageCircle,
    title: 'WhatsApp',
    description: 'Chat with us instantly',
    link: 'https://wa.me/919265250494?text=Hello!%20I%27m%20interested%20in%20partnering%20with%20your%20agency.',
    iconColor: 'text-green-400',
    bgGlow: 'bg-green-500/10',
    glowColor: 'radial-gradient(circle at center, rgba(34, 197, 94, 0.45) 0%, rgba(34, 197, 94, 0.25) 30%, rgba(34, 197, 94, 0.12) 55%, rgba(34, 197, 94, 0.04) 70%, rgba(0, 0, 0, 0) 85%)',
    buttonText: 'SEND MESSAGE',
  },
  {
    id: 'call',
    icon: Phone,
    title: 'Call Us',
    description: 'Speak directly with our team',
    link: 'tel:+919265250494',
    iconColor: 'text-blue-400',
    bgGlow: 'bg-blue-500/10',
    glowColor: 'radial-gradient(circle at center, rgba(59, 130, 246, 0.45) 0%, rgba(59, 130, 246, 0.25) 30%, rgba(59, 130, 246, 0.12) 55%, rgba(59, 130, 246, 0.04) 70%, rgba(0, 0, 0, 0) 85%)',
    buttonText: 'CALL NOW',
  },
  {
    id: 'email',
    icon: Mail,
    title: 'Email',
    description: 'Send us a detailed message',
    link: 'mailto:intence.it@gmail.com',
    iconColor: 'text-purple-400',
    bgGlow: 'bg-purple-500/10',
    glowColor: 'radial-gradient(circle at center, rgba(124, 58, 237, 0.45) 0%, rgba(124, 58, 237, 0.25) 30%, rgba(124, 58, 237, 0.12) 55%, rgba(124, 58, 237, 0.04) 70%, rgba(0, 0, 0, 0) 85%)',
    buttonText: 'SEND EMAIL',
  },
  {
    id: 'instagram',
    icon: Instagram,
    title: 'Instagram',
    description: 'Follow us for updates',
    link: 'https://www.instagram.com/intence.in?igsh=eXZweWsxMHAzbnZ0',
    iconColor: 'text-pink-400',
    bgGlow: 'bg-pink-500/10',
    glowColor: 'radial-gradient(circle at center, rgba(236, 72, 153, 0.45) 0%, rgba(236, 72, 153, 0.25) 30%, rgba(236, 72, 153, 0.12) 55%, rgba(236, 72, 153, 0.04) 70%, rgba(0, 0, 0, 0) 85%)',
    buttonText: 'FOLLOW NOW',
  },
  {
    id: 'facebook',
    icon: Facebook,
    title: 'Facebook',
    description: 'Like and follow our page',
    link: 'https://www.facebook.com/share/17gSLJ3PMS/',
    iconColor: 'text-blue-500',
    bgGlow: 'bg-blue-600/10',
    glowColor: 'radial-gradient(circle at center, rgba(37, 99, 235, 0.45) 0%, rgba(37, 99, 235, 0.25) 30%, rgba(37, 99, 235, 0.12) 55%, rgba(37, 99, 235, 0.04) 70%, rgba(0, 0, 0, 0) 85%)',
    buttonText: 'LIKE PAGE',
  },
  {
    id: 'linkedin',
    icon: Linkedin,
    title: 'LinkedIn',
    description: 'Connect professionally',
    link: 'https://www.linkedin.com/in/intence-it-7b29413a4',
    iconColor: 'text-cyan-400',
    bgGlow: 'bg-cyan-500/10',
    glowColor: 'radial-gradient(circle at center, rgba(6, 182, 212, 0.45) 0%, rgba(6, 182, 212, 0.25) 30%, rgba(6, 182, 212, 0.12) 55%, rgba(6, 182, 212, 0.04) 70%, rgba(0, 0, 0, 0) 85%)',
    buttonText: 'CONNECT NOW',
  },
];

export const ContactForm = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });
  const { mousePosition, updateMousePosition } = useMousePosition();
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(countryCodes[0]);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  useEffect(() => {
    const animated = sessionStorage.getItem('contactAnimated');
    if (!animated) {
      sessionStorage.setItem('contactAnimated', 'true');
    } else {
      setHasAnimated(true);
    }
  }, []);

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
        
        alert("Message sent successfully! We'll get back to you within 24 hours.");

        setFormData({ name: '', email: '', phone: '', message: '' });
        setSelectedCountry(countryCodes[0]);
      } else {
        throw new Error(data.message || 'Failed to send message');
      }
    } catch (error) {
      console.error('❌ Error submitting form:', error);
      
      alert(error instanceof Error ? error.message : 'Failed to send message. Please try again or email us directly at intence.it@gmail.com');
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
    <div className="min-h-screen bg-black">
      {/* Premium Background with Glowing Effects */}
      <div className="fixed inset-0 z-0">
        {/* Base dark gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-purple-950/20 to-black" />
        
        {/* Animated glowing orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/30 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/30 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '6s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/20 rounded-full blur-[150px] animate-pulse" style={{ animationDuration: '8s' }} />
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
        
        {/* Top gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 pt-20 pb-12 px-4 sm:px-6 lg:px-12" ref={containerRef}>
        <div className="container mx-auto max-w-7xl">
          {/* Header */}
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-3 md:mb-4 px-4">
              <motion.h1 
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 sm:mb-6"
                initial={hasAnimated ? { opacity: 1, filter: 'blur(0px)', x: 0 } : { opacity: 0, filter: 'blur(12px)', x: -30 }}
                animate={isInView ? { opacity: 1, filter: 'blur(0px)', x: 0 } : {}}
                transition={{ duration: 1.2, delay: hasAnimated ? 0 : 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <motion.span 
                  className="inline-block mr-[0.25em] text-white"
                  initial={hasAnimated ? { opacity: 1, filter: 'blur(0px)', x: 0 } : { opacity: 0, filter: 'blur(10px)', x: -25 }}
                  animate={isInView ? { opacity: 1, filter: 'blur(0px)', x: 0 } : {}}
                  transition={{ duration: 0.9, delay: hasAnimated ? 0 : 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  Get
                </motion.span>
                <motion.span 
                  className="inline-block mr-[0.25em] text-white"
                  initial={hasAnimated ? { opacity: 1, filter: 'blur(0px)', x: 0 } : { opacity: 0, filter: 'blur(10px)', x: -25 }}
                  animate={isInView ? { opacity: 1, filter: 'blur(0px)', x: 0 } : {}}
                  transition={{ duration: 0.9, delay: hasAnimated ? 0 : 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  In
                </motion.span>
                <motion.span 
                  className="inline-block text-white"
                  initial={hasAnimated ? { opacity: 1, filter: 'blur(0px)', x: 0 } : { opacity: 0, filter: 'blur(10px)', x: -25 }}
                  animate={isInView ? { opacity: 1, filter: 'blur(0px)', x: 0 } : {}}
                  transition={{ duration: 0.9, delay: hasAnimated ? 0 : 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  Touch
                </motion.span>
                <br />
                <motion.span 
                  className="inline-block mr-[0.25em] text-white"
                  initial={hasAnimated ? { opacity: 1, filter: 'blur(0px)', x: 0 } : { opacity: 0, filter: 'blur(10px)', x: -25 }}
                  animate={isInView ? { opacity: 1, filter: 'blur(0px)', x: 0 } : {}}
                  transition={{ duration: 0.9, delay: hasAnimated ? 0 : 0.7, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  Let's
                </motion.span>
                <motion.span 
                  className="inline-block mr-[0.25em] text-white"
                  initial={hasAnimated ? { opacity: 1, filter: 'blur(0px)', x: 0 } : { opacity: 0, filter: 'blur(10px)', x: -25 }}
                  animate={isInView ? { opacity: 1, filter: 'blur(0px)', x: 0 } : {}}
                  transition={{ duration: 0.9, delay: hasAnimated ? 0 : 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  Create
                </motion.span>
                <motion.span 
                  className="inline-block mr-[0.25em] text-white"
                  initial={hasAnimated ? { opacity: 1, filter: 'blur(0px)', x: 0 } : { opacity: 0, filter: 'blur(10px)', x: -25 }}
                  animate={isInView ? { opacity: 1, filter: 'blur(0px)', x: 0 } : {}}
                  transition={{ duration: 0.9, delay: hasAnimated ? 0 : 0.9, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  Something
                </motion.span>
                <motion.span 
                  className="inline-block text-white"
                  initial={hasAnimated ? { opacity: 1, filter: 'blur(0px)', x: 0 } : { opacity: 0, filter: 'blur(10px)', x: -25 }}
                  animate={isInView ? { opacity: 1, filter: 'blur(0px)', x: 0 } : {}}
                  transition={{ duration: 0.9, delay: hasAnimated ? 0 : 1.0, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  Amazing
                </motion.span>
              </motion.h1>
            </div>
            
            <motion.p 
              className="text-base sm:text-lg md:text-xl text-white/60 max-w-2xl mx-auto px-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Ready to transform your ideas into powerful digital solutions? Fill out the form below or choose your preferred contact method.
            </motion.p>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="order-1 lg:order-2 w-full max-w-full overflow-hidden mb-16"
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
              
              <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
                {/* Name Field */}
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

                {/* Email Field */}
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
                    placeholder="your@email.com"
                    required
                    className="h-12 text-base rounded-xl w-full"
                    style={{
                      background: 'rgba(30, 30, 35, 0.6)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      color: '#e5e7eb'
                    }}
                  />
                </div>

                {/* Phone Field with Country Code */}
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
                            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/10 transition-colors text-left"
                          >
                            <span className="text-xl leading-none">{country.flag}</span>
                            <span className="text-sm font-medium text-gray-200">{country.dialCode}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Message Field */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2 ml-1 text-gray-200">
                    Your Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your project..."
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

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full h-14 text-base font-bold rounded-xl transition-all duration-300 active:scale-95"
                  style={{
                    background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
                    border: 'none',
                    color: 'white'
                  }}
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
              </form>
            </div>
          </motion.div>

          {/* Contact Options Cards */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12 text-white px-4">
              Or reach us through
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto">
              {contactOptions.map((option, index) => {
                const Icon = option.icon;
                return (
                  <motion.a
                    key={option.id}
                    href={option.link}
                    target={option.id !== 'call' && option.id !== 'email' ? '_blank' : undefined}
                    rel={option.id !== 'call' && option.id !== 'email' ? 'noopener noreferrer' : undefined}
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 1 + index * 0.1 }}
                    className="group relative p-5 sm:p-6 rounded-2xl border transition-all duration-300 hover:scale-105 cursor-pointer overflow-hidden"
                    style={{
                      backgroundColor: '#111214',
                      borderColor: 'rgba(124, 58, 237, 0.25)',
                      boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)',
                    }}
                    onMouseMove={updateMousePosition}
                    onMouseEnter={() => setHoveredCard(option.id)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    {/* Glow effect on hover - with specific color for each card */}
                    <div 
                      className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300 -z-10"
                      style={{
                        background: option.glowColor,
                      }}
                    />
                    
                    {/* Dark overlay on hover */}
                    <div className={`absolute inset-0 bg-black/20 transition-opacity duration-300 ${
                      hoveredCard === option.id ? 'opacity-100' : 'opacity-0'
                    }`} />
                    
                    {/* Mouse-following Button - only on larger screens */}
                    <div className="hidden md:block">
                      <MouseFollowButton 
                        mousePosition={mousePosition} 
                        isVisible={hoveredCard === option.id}
                        text={option.buttonText}
                      />
                    </div>
                    
                    {/* Icon */}
                    <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl ${option.bgGlow} border border-white/20 flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300 relative z-10`}>
                      <Icon className={`w-6 h-6 sm:w-7 sm:h-7 ${option.iconColor}`} />
                    </div>
                    
                    {/* Content */}
                    <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 relative z-10">{option.title}</h3>
                    <p className="text-sm text-white/60 relative z-10">{option.description}</p>
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* Location Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="mt-12 sm:mt-20 text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl">
              <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
              <span className="text-sm sm:text-base text-white/80">Gujarat, India</span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;