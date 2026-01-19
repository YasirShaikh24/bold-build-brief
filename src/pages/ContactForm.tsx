import { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';

const API_URL = import.meta.env.VITE_API_URL || '/api/contact';

// Simple SVG Icons
const SendIcon = ({ className = "w-5 h-5 mr-2" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
  </svg>
);

const ChevronDownIcon = ({ className = "w-4 h-4 text-gray-400" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

const LoaderIcon = ({ className = "w-5 h-5 animate-spin" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);

const MapPinIcon = ({ className = "w-4 h-4 sm:w-5 sm:h-5 text-purple-400" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const MessageCircleIcon = ({ className = "w-6 h-6 sm:w-7 sm:h-7" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
  </svg>
);

const PhoneIcon = ({ className = "w-6 h-6 sm:w-7 sm:h-7" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);

const MailIcon = ({ className = "w-6 h-6 sm:w-7 sm:h-7" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const ExternalLinkIcon = ({ className = "w-6 h-6 sm:w-7 sm:h-7" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
  </svg>
);

const countryCodes = [
  { code: 'IN', dialCode: '+91', flag: '🇮🇳', name: 'India' },
  { code: 'US', dialCode: '+1', flag: '🇺🇸', name: 'United States' },
  { code: 'GB', dialCode: '+44', flag: '🇬🇧', name: 'United Kingdom' },
  { code: 'CA', dialCode: '+1', flag: '🇨🇦', name: 'Canada' },
  { code: 'AU', dialCode: '+61', flag: '🇦🇺', name: 'Australia' },
  { code: 'DE', dialCode: '+49', flag: '🇩🇪', name: 'Germany' },
  { code: 'FR', dialCode: '+33', flag: '🇫🇷', name: 'France' },
  { code: 'IT', dialCode: '+39', flag: '��🇹', name: 'Italy' },
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
  { code: 'NZ', dialCode: '+64', flag: '��🇿', name: 'New Zealand' },
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
    icon: MessageCircleIcon,
    title: 'WhatsApp',
    description: 'Chat with us instantly',
    link: 'https://wa.me/919265250494?text=Hello!%20I%27m%20interested%20in%20partnering%20with%20your%20agency.',
    iconColor: 'text-green-400',
    bgGlow: 'bg-green-500/10',
    glowColor: 'radial-gradient(circle at center, rgba(34, 197, 94, 0.45) 0%, rgba(34, 197, 94, 0.25) 30%, rgba(34, 197, 94, 0.12) 55%, rgba(34, 197, 94, 0.04) 70%, rgba(0, 0, 0, 0) 85%)',
  },
  {
    id: 'call',
    icon: PhoneIcon,
    title: 'Call Us',
    description: 'Speak directly with our team',
    link: 'tel:+919265250494',
    iconColor: 'text-blue-400',
    bgGlow: 'bg-blue-500/10',
    glowColor: 'radial-gradient(circle at center, rgba(59, 130, 246, 0.45) 0%, rgba(59, 130, 246, 0.25) 30%, rgba(59, 130, 246, 0.12) 55%, rgba(59, 130, 246, 0.04) 70%, rgba(0, 0, 0, 0) 85%)',
  },
  {
    id: 'email',
    icon: MailIcon,
    title: 'Email',
    description: 'Send us a detailed message',
    link: 'mailto:intence.it@gmail.com',
    iconColor: 'text-purple-400',
    bgGlow: 'bg-purple-500/10',
    glowColor: 'radial-gradient(circle at center, rgba(124, 58, 237, 0.45) 0%, rgba(124, 58, 237, 0.25) 30%, rgba(124, 58, 237, 0.12) 55%, rgba(124, 58, 237, 0.04) 70%, rgba(0, 0, 0, 0) 85%)',
  },
  {
    id: 'instagram',
    icon: ExternalLinkIcon,
    title: 'Instagram',
    description: 'Follow us for updates',
    link: 'https://www.instagram.com/intence.in?igsh=eXZweWsxMHAzbnZ0',
    iconColor: 'text-pink-400',
    bgGlow: 'bg-pink-500/10',
    glowColor: 'radial-gradient(circle at center, rgba(236, 72, 153, 0.45) 0%, rgba(236, 72, 153, 0.25) 30%, rgba(236, 72, 153, 0.12) 55%, rgba(236, 72, 153, 0.04) 70%, rgba(0, 0, 0, 0) 85%)',
  },
  {
    id: 'facebook',
    icon: ExternalLinkIcon,
    title: 'Facebook',
    description: 'Like and follow our page',
    link: 'https://www.facebook.com/share/17gSLJ3PMS/',
    iconColor: 'text-blue-500',
    bgGlow: 'bg-blue-600/10',
    glowColor: 'radial-gradient(circle at center, rgba(37, 99, 235, 0.45) 0%, rgba(37, 99, 235, 0.25) 30%, rgba(37, 99, 235, 0.12) 55%, rgba(37, 99, 235, 0.04) 70%, rgba(0, 0, 0, 0) 85%)',
  },
  {
    id: 'linkedin',
    icon: ExternalLinkIcon,
    title: 'LinkedIn',
    description: 'Connect professionally',
    link: 'https://www.linkedin.com/in/intence-it-7b29413a4',
    iconColor: 'text-cyan-400',
    bgGlow: 'bg-cyan-500/10',
    glowColor: 'radial-gradient(circle at center, rgba(6, 182, 212, 0.45) 0%, rgba(6, 182, 212, 0.25) 30%, rgba(6, 182, 212, 0.12) 55%, rgba(6, 182, 212, 0.04) 70%, rgba(0, 0, 0, 0) 85%)',
  },
];

export const ContactForm = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });
  const { toast } = useToast();

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
    <div className="min-h-screen bg-black">
      <Navigation />
      
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
      <div className="relative z-10 pt-20 sm:pt-32 pb-20 px-4 sm:px-6 lg:px-12" ref={containerRef}>
        <div className="container mx-auto max-w-7xl">
          {/* Header */}
          <motion.div 
            className="text-center mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-3 md:mb-4 px-2 sm:px-4">
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
              className="text-base sm:text-lg md:text-xl text-white/60 max-w-2xl mx-auto px-2"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Ready to transform your ideas into powerful digital solutions? Fill out the form below or choose your preferred contact method.
            </motion.p>
          </motion.div>

          {/* Contact Form - Full Width Mobile Layout like Contact.tsx */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="w-full max-w-full overflow-hidden mb-16 sm:mb-20"
          >
            <div className="relative p-5 sm:p-8 rounded-3xl w-full" 
              style={{
                background: 'linear-gradient(135deg, rgba(20, 20, 25, 0.95) 0%, rgba(15, 15, 20, 0.98) 100%)',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(20px)'
              }}
            >
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
                        <ChevronDownIcon />
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

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full h-14 text-base font-bold rounded-xl active:scale-95 transition-all touch-manipulation"
                  disabled={isSubmitting}
                  style={{
                    background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
                    border: 'none',
                    color: 'white'
                  }}
                >
                  {isSubmitting ? (
                    <LoaderIcon />
                  ) : (
                    <>
                      <SendIcon />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </div>
          </motion.div>

          {/* Contact Options Cards - Mobile Optimized */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="px-2 sm:px-0"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12 text-white">
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
                    className="group relative p-4 sm:p-6 rounded-xl sm:rounded-2xl border transition-all duration-300 hover:scale-105 cursor-pointer"
                    style={{
                      backgroundColor: '#111214',
                      borderColor: 'rgba(124, 58, 237, 0.25)',
                      boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)',
                    }}
                  >
                    {/* Glow effect on hover - with specific color for each card */}
                    <div 
                      className="absolute inset-0 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300 -z-10"
                      style={{
                        background: option.glowColor,
                      }}
                    />
                    
                    {/* Icon */}
                    <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl ${option.bgGlow} border border-white/20 flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className={`w-6 h-6 sm:w-7 sm:h-7 ${option.iconColor}`} />
                    </div>
                    
                    {/* Content */}
                    <h3 className="text-lg sm:text-xl font-semibold text-white mb-1 sm:mb-2">{option.title}</h3>
                    <p className="text-sm text-white/60">{option.description}</p>
                    
                    {/* Arrow indicator */}
                    <div className="absolute top-4 sm:top-6 right-4 sm:right-6 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-white/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* Location Info - Mobile Optimized */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="mt-16 sm:mt-20 text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl">
              <MapPinIcon />
              <span className="text-sm sm:text-base text-white/80">Gujarat, India</span>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ContactForm;