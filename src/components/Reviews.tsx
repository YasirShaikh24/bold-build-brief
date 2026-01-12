import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const reviews = [
  {
    id: 1,
    name: 'Firdaus Sindhi',
    position: 'CEO',
    company: 'Beauty Solutions',
    avatar: '/avatars/firdaus.jpg',
    rating: 5,
    review: 'They not only delivered a top-notch website but also provided strategic insights that helped us improve our overall digital presence.'
  },
  {
    id: 2,
    name: 'Ajim Pathan',
    position: 'Product Manager',
    company: 'Tech Digital',
    avatar: '/avatars/ajim.jpg',
    rating: 4,
    review: 'The team understood our complex requirements and provided a user-friendly, high-performing website that stands out in the market.'
  },
  {
    id: 3,
    name: 'Azim Shaikh',
    position: 'Founder',
    company: 'GreenLeaf Enterprises',
    avatar: '/avatars/azim.jpg',
    rating: 5,
    review: 'Their innovative solutions helped streamline our operations, and the website design and development is both functional and visually stunning.'
  },
  {
    id: 4,
    name: 'Arpan Pawar',
    position: 'Director',
    company: 'Creative Studios',
    avatar: '/avatars/arpan.jpg',
    rating: 4,
    review: 'We were blown away by the creative approach and attention to detail. The team took our ideas and turned them into a stunning website.'
  },
  {
    id: 5,
    name: 'Rajendra Prasad',
    position: 'Manager',
    company: 'Business Solutions',
    avatar: '/avatars/rajendra.jpg',
    rating: 5,
    review: 'They delivered a customized solution that addressed all of our business needs. The website is sleek, functional, and improved our customer experience.'
  },
  {
    id: 6,
    name: 'Rahul Sharma',
    position: 'CTO',
    company: 'Digital Innovations',
    avatar: '/avatars/rahul.jpg',
    rating: 4,
    review: 'Outstanding work quality and professional service. The team delivered exactly what we needed within the timeline and exceeded our expectations.'
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
  },
};

export const Reviews = () => {
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const animated = sessionStorage.getItem('reviewsAnimated');
    if (!animated) {
      sessionStorage.setItem('reviewsAnimated', 'true');
    } else {
      setHasAnimated(true);
    }
  }, []);

  const handleBookAppointment = () => {
    const element = document.querySelector('#contact');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="reviews" className="py-16 md:py-24 lg:py-32 relative overflow-hidden">
      {/* Background Image - Same style as Portfolio */}
      <div className="absolute inset-0 z-0 px-2 sm:px-3 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
        <div 
          className="w-full h-full rounded-2xl sm:rounded-3xl md:rounded-[3rem] overflow-hidden"
          style={{
            backgroundImage: 'url(/reviews.png)',
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

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] md:w-[800px] h-[300px] md:h-[400px] bg-primary/10 rounded-full blur-[120px] md:blur-[150px] pointer-events-none z-[1]" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        <motion.div 
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm mb-6">
            <span className="w-2 h-2 rounded-full bg-primary" />
            Testimonial
          </span>
          
          <motion.h2 
            className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4"
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
              What
            </motion.span>
            <motion.span 
              className="inline-block mr-[0.25em] text-white"
              initial={hasAnimated ? { opacity: 1, filter: 'blur(0px)', x: 0 } : { opacity: 0, filter: 'blur(10px)', x: -25 }}
              whileInView={{ opacity: 1, filter: 'blur(0px)', x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: hasAnimated ? 0 : 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            >
              Our
            </motion.span>
            <motion.span 
              className="inline-block mr-[0.25em] text-white"
              initial={hasAnimated ? { opacity: 1, filter: 'blur(0px)', x: 0 } : { opacity: 0, filter: 'blur(10px)', x: -25 }}
              whileInView={{ opacity: 1, filter: 'blur(0px)', x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: hasAnimated ? 0 : 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            >
              Clients
            </motion.span>
            <motion.span 
              className="inline-block mr-[0.25em] text-white"
              initial={hasAnimated ? { opacity: 1, filter: 'blur(0px)', x: 0 } : { opacity: 0, filter: 'blur(10px)', x: -25 }}
              whileInView={{ opacity: 1, filter: 'blur(0px)', x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: hasAnimated ? 0 : 0.7, ease: [0.25, 0.1, 0.25, 1] }}
            >
              Say
            </motion.span>
            <br />
            <motion.span 
              className="inline-block mr-[0.25em] text-white/70"
              initial={hasAnimated ? { opacity: 1, filter: 'blur(0px)', x: 0 } : { opacity: 0, filter: 'blur(10px)', x: -25 }}
              whileInView={{ opacity: 1, filter: 'blur(0px)', x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: hasAnimated ? 0 : 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            >
              About
            </motion.span>
            <motion.span 
              className="inline-block mr-[0.25em] text-white/70"
              initial={hasAnimated ? { opacity: 1, filter: 'blur(0px)', x: 0 } : { opacity: 0, filter: 'blur(10px)', x: -25 }}
              whileInView={{ opacity: 1, filter: 'blur(0px)', x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: hasAnimated ? 0 : 0.9, ease: [0.25, 0.1, 0.25, 1] }}
            >
              InTence's
            </motion.span>
            <motion.span 
              className="inline-block mr-[0.25em] text-white/70"
              initial={hasAnimated ? { opacity: 1, filter: 'blur(0px)', x: 0 } : { opacity: 0, filter: 'blur(10px)', x: -25 }}
              whileInView={{ opacity: 1, filter: 'blur(0px)', x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: hasAnimated ? 0 : 1.0, ease: [0.25, 0.1, 0.25, 1] }}
            >
              Excellence
            </motion.span>
          </motion.h2>
          
          <p className="text-base md:text-lg lg:text-xl leading-relaxed text-white/60 max-w-2xl mx-auto mb-8">
            Hear from our happy clients! See how we've helped them achieve their goals and create lasting impact.
          </p>

          <button
            onClick={handleBookAppointment}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 via-purple-500 to-purple-400 text-white rounded-lg font-medium text-sm hover:from-purple-700 hover:via-purple-600 hover:to-purple-500 hover:shadow-[0_0_30px_rgba(139,92,246,0.6)] transition-all duration-300"
          >
            Book An Appointment
          </button>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {reviews.map((review) => (
            <motion.div
              key={review.id}
              variants={itemVariants}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="group relative overflow-hidden rounded-2xl p-6 bg-card/30 border border-border/20 hover:border-primary/30 backdrop-blur-sm transition-all duration-500 hover:scale-[1.02]"
            >
              {/* Avatar */}
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center overflow-hidden border-2 border-primary/20">
                  <img
                    src={review.avatar}
                    alt={review.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      target.parentElement!.innerHTML = `<span class="text-primary font-medium text-lg">${review.name.charAt(0)}</span>`;
                    }}
                  />
                </div>
                <div className="ml-3">
                  <h4 className="text-white font-medium text-sm">{review.name}</h4>
                  <p className="text-white/60 text-xs">{review.position}</p>
                  <p className="text-white/50 text-xs">{review.company}</p>
                </div>
              </div>

              {/* Star Rating */}
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <span 
                    key={i} 
                    className={`text-lg ${i < review.rating ? 'text-yellow-400' : 'text-gray-600'}`}
                  >
                    ★
                  </span>
                ))}
              </div>

              {/* Review Text */}
              <p className="text-white/80 text-sm leading-relaxed">
                "{review.review}"
              </p>

              {/* Decorative element */}
              <div className="absolute top-4 right-4 opacity-20">
                <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                </svg>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};