import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';

const API_URL = import.meta.env.VITE_API_URL || '/api/contact';

// Custom SVG Icons to replace lucide-react
const SendIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
  </svg>
);

const MailIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const MapPinIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const PhoneIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);

const Loader2Icon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);

const ChevronDownIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

// Additional icons for contact cards
const MessageCircleIcon = ({ className = "w-7 h-7" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
  </svg>
);

const InstagramIcon = ({ className = "w-7 h-7" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const FacebookIcon = ({ className = "w-7 h-7" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const LinkedinIcon = ({ className = "w-7 h-7" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

/* ---------------- Mouse Position Hook ---------------- */
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

/* ---------------- Mouse Follow Button ---------------- */
const MouseFollowButton = ({
  mousePosition,
  isVisible,
  text,
}: {
  mousePosition: { x: number; y: number };
  isVisible: boolean;
  text: string;
}) => (
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
    <div className="px-4 py-2 bg-white text-black rounded-full text-sm font-semibold shadow-lg">
      {text}
    </div>
  </div>
);

/* ---------------- Contact Cards Data ---------------- */
const contactCardsOptions = [
  {
    id: 'whatsapp',
    icon: MessageCircleIcon,
    title: 'WhatsApp',
    description: 'Chat with us instantly',
    link: 'https://wa.me/919265250494?text=Hello!%20I%27m%20interested%20in%20partnering%20with%20your%20agency.',
    iconColor: 'text-green-400',
    glow: 'rgba(34,197,94,0.45)',
    buttonText: 'SEND MESSAGE',
  },
  {
    id: 'call',
    icon: PhoneIcon,
    title: 'Call Us',
    description: 'Speak directly with our team',
    link: 'tel:+919265250494',
    iconColor: 'text-blue-400',
    glow: 'rgba(59,130,246,0.45)',
    buttonText: 'CALL NOW',
  },
  {
    id: 'email',
    icon: MailIcon,
    title: 'Email',
    description: 'Send us a message',
    link: 'mailto:intence.it@gmail.com',
    iconColor: 'text-purple-400',
    glow: 'rgba(124,58,237,0.45)',
    buttonText: 'SEND EMAIL',
  },
  {
    id: 'instagram',
    icon: InstagramIcon,
    title: 'Instagram',
    description: 'Follow us for updates',
    link: 'https://www.instagram.com/intence.in?igsh=eXZweWsxMHAzbnZ0',
    iconColor: 'text-pink-400',
    glow: 'rgba(236,72,153,0.45)',
    buttonText: 'FOLLOW',
  },
  {
    id: 'facebook',
    icon: FacebookIcon,
    title: 'Facebook',
    description: 'Like our page',
    link: 'https://www.facebook.com/share/17gSLJ3PMS/',
    iconColor: 'text-blue-500',
    glow: 'rgba(37,99,235,0.45)',
    buttonText: 'LIKE PAGE',
  },
  {
    id: 'linkedin',
    icon: LinkedinIcon,
    title: 'LinkedIn',
    description: 'Connect professionally',
    link: 'https://www.linkedin.com/company/intence-company',
    iconColor: 'text-cyan-400',
    glow: 'rgba(6,182,212,0.45)',
    buttonText: 'CONNECT',
  },
];

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

export const ContactForm = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });
  const { toast } = useToast();

  // Contact Cards functionality
  const { mousePosition, updateMousePosition } = useMousePosition();
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

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
    <div className="min-h-screen bg-black">
      <Navigation />
      
      <section id="contact" className="py-12 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div 
            className="w-full h-full overflow-hidden"
            style={{
              backgroundImage: 'url(/contact.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          >
            <div 
              className="w-full h-full"
              style={{
                background: 'rgba(0, 0, 0, 0.4)',
              }}
            />
          </div>
        </div>
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
                  { icon: MailIcon, label: 'Email', value: 'intence.it@gmail.com', href: 'mailto:intence.it@gmail.com' },
                  { icon: PhoneIcon, label: 'Phone', value: '+91 92652 50494', href: 'tel:+919265250494' },
                  { icon: PhoneIcon, label: 'WhatsApp', value: '+91 92652 50494', href: 'https://wa.me/919265250494?text=Hello!%20I%27m%20interested%20in%20partnering%20with%20your%20agency%20to%20scale%20my%20brand.%20Could%20you%20share%20your%20onboarding%20process%20and%20current%20availability%3F', isWhatsApp: true },
                  { icon: MapPinIcon, label: 'Location', value: 'Gujarat, India', href: null }
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
                
                <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
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
                          <ChevronDownIcon className="w-4 h-4 text-gray-400" />
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
                    type="submit"
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
                      <Loader2Icon className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        <SendIcon className="w-5 h-5 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Contact Cards Section */}
      <section className="py-16 md:py-24 bg-black relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Connect With Us
            </h2>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              Choose your preferred way to get in touch. We're here to help bring your ideas to life.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {contactCardsOptions.map((option, index) => {
              const Icon = option.icon;
             
              return (
                <motion.a
                  key={option.id}
                  href={option.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  onMouseMove={updateMousePosition}
                  onMouseEnter={() => setHoveredCard(option.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className="relative p-6 rounded-2xl border cursor-pointer overflow-hidden group transition-all duration-300 hover:scale-105"
                  style={{
                    backgroundColor: '#111214',
                    borderColor: 'rgba(124,58,237,0.25)',
                  }}
                >
                  {/* Glow Effect */}
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300 -z-10"
                    style={{
                      background: `radial-gradient(circle, ${option.glow} 0%, transparent 70%)`,
                    }}
                  />
                  
                  {/* Mouse Follow Button */}
                  <MouseFollowButton
                    mousePosition={mousePosition}
                    isVisible={hoveredCard === option.id}
                    text={option.buttonText}
                  />
                  
                  {/* Icon */}
                  <div className="w-14 h-14 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-4 relative z-10 group-hover:scale-110 transition-transform duration-300">
                    <Icon className={`w-7 h-7 ${option.iconColor}`} />
                  </div>
                  
                  {/* Text */}
                  <h3 className="text-xl font-semibold text-white relative z-10 mb-2">
                    {option.title}
                  </h3>
                  <p className="text-sm text-white/60 relative z-10">
                    {option.description}
                  </p>
                </motion.a>
              );
            })}
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default ContactForm;