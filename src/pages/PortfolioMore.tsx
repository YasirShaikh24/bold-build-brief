import { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';

// Project data - company format with 4 key points
const projects = [
  {
    id: 1,
    year: '2025',
    name: 'Shaden House',
    points: [
      'AI Videos',
      'Responsive Design', 
      'Custom Layouts',
      'Fast Loading'
    ],
    categories: ['Business', 'Company'],
    media: 'project1.mp4',
    mediaType: 'video'
  },
  {
  id: 2,
  year: '2024',
  name: 'LifeSync',
  description: 'LifeSync is an all-in-one personal productivity and tracking mobile app that helps users manage daily tasks, build habits, maintain journals, and track expenses in one place.',
  points: [
    'To-Do Task Management',
    'Daily Journal Writing',
    'Habit Tracking with Streaks',
    'Expense Tracking with Insights'
  ],
  categories: ['Productivity', 'Mobile App'],
    media: 'project6.png',
    mediaType: 'image'
  },
  {
    id: 3,
    year: '2025',
    name: 'Firdaus Makeover',
    points: [
      'Modern Typography',
      'User Friendly',
      'Flexible CMS',
      'SEO Optimized'
    ],
    categories: ['Business', 'Agency'],
    media: 'project2.png',
    mediaType: 'image'
  },
  {
    id: 4,
     year: '2026',
    name: 'E-Commerce App',
    points: [
      'Online Shopping App',
      'Product Listing & Details',
      'Cart & Checkout',
      'Modern UI'
    ],
    categories: ['E-Commerce', 'Mobile App'],
      media: 'project8.png',
      mediaType: 'image'
  },
  {
    id: 5,
    year: '2023',
    name: 'Grass Hawk Mole Trap',
    points: [
      'Creative Workflows',
      'Team Collaboration',
      'Asset Management',
      'Brand Consistency'
    ],
    categories: ['Creative', 'Studio'],
    media: 'project5.png',
    mediaType: 'image'
  },
    {
    id: 6,
    year: '2025',
    name: 'Habit Tracker',
    points: [
      'Daily Habit Tracking',
      'Streak & Consistency System',
      'Calendar-Based Habit View',
      'Minimal & User-Friendly UI'
    ],
    categories: ['Productivity', 'Habit Tracker'],
      media: 'project7.png',
      mediaType: 'image'
  },
  {
    id: 7,
    year: '2023',
    name: 'LifeLync',
    points: [
      'Easy Customization',
      'Interactive Elements',
      'Retina Ready',
      'High Performance'
    ],
    categories: ['Hospital', 'Agency'],
    media: 'project3.png',
    mediaType: 'image'
  },
  {
    id: 8,
    year: '2026',
  name: 'Islamic Deeds Tracker',
  points: [
    'Digital Tasbeeh Counter',
    'Multiple Deeds & Counters',
    'Progress & Target Tracking',
    'Minimal & Peaceful Dark UI'
  ],
  categories: ['Islamic App', 'Productivity', 'Web App'],
    media: 'project10.png',
    mediaType: 'image'
  },
  {
    id: 9,
     year: '2026',
      name: 'NOVA – E-Commerce Website',
      points: [
        'Modern Landing Page Design',
        'Product Listing & Shop Pages',
        'Premium Tech Store UI',
        'Responsive & Fast Performance'
      ],
      categories: ['E-Commerce', 'Website'],
    media: 'project9.png',
    mediaType: 'image'
  },
  {
    id: 11,
   year: '2023',
    name: 'Vibgyor Maple',
    points: [
      'Cloud Integration',
      'Real-time Analytics',
      'Secure Architecture',
      'Scalable Infrastructure'
    ],
    categories: ['SaaS', 'Enterprise'],
    media: 'project4.png',
    mediaType: 'image'
  },
  
];

export const PortfolioMore = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });
  const [hasAnimated, setHasAnimated] = useState(false);
  const [showMore, setShowMore] = useState(false);

  // Show first 6 projects initially, then all when showMore is true
  const visibleProjects = showMore ? projects : projects.slice(0, 6);

  useEffect(() => {
    const animated = sessionStorage.getItem('portfolioMoreAnimated');
    if (!animated) {
      sessionStorage.setItem('portfolioMoreAnimated', 'true');
    } else {
      setHasAnimated(true);
    }
  }, []);

  return (
    <div className="min-h-screen bg-black">
      <Navigation />
      
      {/* Background with radial gradient glow overlay */}
      <div 
        className="fixed inset-0 z-0" 
        style={{
          background: `radial-gradient(
            circle at top center,
            rgba(124, 58, 237, 0.25) 0%,
            rgba(124, 58, 237, 0.12) 25%,
            rgba(0, 0, 0, 0.85) 55%,
            #000000 75%
          )`,
          backgroundBlendMode: 'screen'
        }}
      />

      {/* Content */}
      <div className="relative z-10 pt-20 sm:pt-32 pb-20 px-4 sm:px-6 lg:px-12" ref={containerRef}>
        <div className="container mx-auto max-w-7xl">
          {/* Header with blur animation */}
          <motion.div 
            className="text-center mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-4 px-2 sm:px-4">
              <motion.h1 
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
                initial={hasAnimated ? { opacity: 1, filter: 'blur(0px)' } : { opacity: 0, filter: 'blur(12px)' }}
                animate={isInView ? { opacity: 1, filter: 'blur(0px)' } : {}}
                transition={{ duration: 1.2, delay: hasAnimated ? 0 : 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                style={{ color: '#FFFFFF' }}
              >
                <span>Explore Our Most</span>
                <br />
                <span>Remarkable Projects.</span>
              </motion.h1>
            </div>
            
            <motion.p 
              className="text-base sm:text-lg md:text-xl max-w-2xl mx-auto px-2"
              initial={hasAnimated ? { opacity: 1, filter: 'blur(0px)' } : { opacity: 0, filter: 'blur(8px)' }}
              animate={isInView ? { opacity: 1, filter: 'blur(0px)' } : {}}
              transition={{ duration: 1, delay: hasAnimated ? 0 : 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              style={{ color: 'rgba(255, 255, 255, 0.6)' }}
            >
              We craft customized solutions that empower both startups and established brands, driving success and delivering real impact.
            </motion.p>

            {/* CTA Button with gradient */}
            <motion.div
              initial={hasAnimated ? { opacity: 1, filter: 'blur(0px)' } : { opacity: 0, filter: 'blur(8px)' }}
              animate={isInView ? { opacity: 1, filter: 'blur(0px)' } : {}}
              transition={{ duration: 1, delay: hasAnimated ? 0 : 0.6, ease: [0.25, 0.1, 0.25, 1] }}
              className="mt-8"
            >
              <a
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 text-white rounded-full text-sm font-semibold transition-all duration-300 hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, #7C3AED, #5B21B6)',
                  boxShadow: '0 0 20px rgba(124, 58, 237, 0.6), 0 10px 30px rgba(124, 58, 237, 0.4)'
                }}
              >
                Build Your Product
              </a>
            </motion.div>
          </motion.div>

          {/* Projects - Mobile optimized cards */}
          <div className="space-y-4 sm:space-y-6 md:space-y-8 max-w-7xl mx-auto">
            {visibleProjects.map((project, index) => (
              <div key={project.id}>
                <motion.div
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  whileHover={{ scale: 1.005 }}
                  className="group relative overflow-hidden"
                  style={{
                    backgroundColor: '#0B0B0F',
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                    borderRadius: '16px',
                    boxShadow: `
                      0 0 0 1px rgba(124, 58, 237, 0.05),
                      0 20px 40px rgba(0, 0, 0, 0.6),
                      inset 0 0 30px rgba(124, 58, 237, 0.04)
                    `
                  }}
                >
                  {/* Card Content - Left Info, Right Image */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-center">
                    
                    {/* LEFT SIDE - Company Info with gradient background */}
                    <div
  className="p-5 sm:p-6 lg:p-8 space-y-4"
                      style={{
                        background: 'linear-gradient(180deg, #0F0F16, #09090D)',
                        boxShadow: 'inset 0 0 20px rgba(124, 58, 237, 0.08)'
                      }}
                    >
                      {/* Year */}
                      <motion.div 
                        className="text-xs font-medium tracking-wider uppercase"
                        style={{ color: 'rgba(255, 255, 255, 0.6)' }}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                      >
                        {project.year}
                      </motion.div>
                      
                      {/* Company Name */}
                      <motion.h3 
                        className="text-xl sm:text-2xl lg:text-3xl font-bold group-hover:text-purple-300 transition-colors duration-300"
                        style={{ color: '#FFFFFF' }}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                      >
                        {project.name}
                      </motion.h3>
                      
                      {/* 4 Key Points with glowing checkmarks */}
                      <motion.div 
                        className="space-y-2"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                      >
                        {project.points.map((point, pointIndex) => (
                          <div key={pointIndex} className="flex items-center gap-2">
                            <div 
                              className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
                              style={{
                                backgroundColor: '#7C3AED',
                                filter: 'drop-shadow(0 0 6px rgba(124, 58, 237, 0.7))'
                              }}
                            >
                              <svg className="w-2 h-2 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                            <span style={{ color: 'rgba(255, 255, 255, 0.6)' }} className="text-sm">{point}</span>
                          </div>
                        ))}
                      </motion.div>
                      
                      {/* Categories with purple glow */}
                      <motion.div 
                        className="flex flex-wrap gap-2 pt-1"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                      >
                        {project.categories.map((category, catIndex) => (
                          <span
                            key={catIndex}
                            className="px-3 py-1 rounded-full text-xs transition-all duration-300 hover:scale-105"
                            style={{
                              background: 'rgba(124, 58, 237, 0.15)',
                              color: '#C4B5FD',
                              border: '1px solid rgba(124, 58, 237, 0.3)'
                            }}
                          >
                            {category}
                          </span>
                        ))}
                      </motion.div>
                    </div>

                    {/* RIGHT SIDE - Single Image */}
                    <motion.div 
                      className="relative h-full min-h-[240px] sm:min-h-[280px] lg:min-h-[320px]"
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                    >
                      <div className="relative h-full group/image">
                        {/* Image container with dark background */}
                        <div 
                          className="relative h-full overflow-hidden"
                          style={{
                            backgroundColor: '#0A0A0A',
                            borderRadius: '0 16px 16px 0'
                          }}
                        >
                          <div className="h-full">
                            {project.mediaType === 'video' ? (
                              <video
                                src={`/${project.media}`}
                                className="w-full h-full object-cover group-hover/image:scale-105 transition-transform duration-700 ease-out"
                                style={{
                                  boxShadow: '0 30px 60px rgba(0, 0, 0, 0.8)'
                                }}
                                autoPlay
                                muted
                                loop
                                playsInline
                                disablePictureInPicture
                                onError={(e) => {
                                  const target = e.target as HTMLVideoElement;
                                  target.style.display = 'none';
                                  target.parentElement!.innerHTML = `
                                    <div class="w-full h-full flex items-center justify-center" style="background: linear-gradient(135deg, rgba(124, 58, 237, 0.1), rgba(0,0,0,0.8))">
                                      <div class="text-center px-6">
                                        <div class="w-14 h-14 mx-auto mb-3 rounded-full flex items-center justify-center" style="background: rgba(124, 58, 237, 0.2); box-shadow: 0 0 20px rgba(124, 58, 237, 0.4)">
                                          <svg class="w-7 h-7" style="color: #C4B5FD" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                          </svg>
                                        </div>
                                        <p style="color: #FFFFFF" class="text-base font-semibold">${project.name}</p>
                                        <p style="color: rgba(255, 255, 255, 0.6)" class="text-xs mt-1">Video - ${project.year}</p>
                                      </div>
                                    </div>
                                  `;
                                }}
                              />
                            ) : (
                              <img
                                src={`/${project.media}`}
                                alt={project.name}
                                className="w-full h-full object-cover group-hover/image:scale-105 transition-transform duration-700 ease-out"
                                style={{
                                  boxShadow: '0 30px 60px rgba(0, 0, 0, 0.8)'
                                }}
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.style.display = 'none';
                                  target.parentElement!.innerHTML = `
                                    <div class="w-full h-full flex items-center justify-center" style="background: linear-gradient(135deg, rgba(124, 58, 237, 0.1), rgba(0,0,0,0.8))">
                                      <div class="text-center px-6">
                                        <div class="w-14 h-14 mx-auto mb-3 rounded-full flex items-center justify-center" style="background: rgba(124, 58, 237, 0.2); box-shadow: 0 0 20px rgba(124, 58, 237, 0.4)">
                                          <svg class="w-7 h-7" style="color: #C4B5FD" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                          </svg>
                                        </div>
                                        <p style="color: #FFFFFF" class="text-base font-semibold">${project.name}</p>
                                        <p style="color: rgba(255, 255, 255, 0.6)" class="text-xs mt-1">${project.year}</p>
                                      </div>
                                    </div>
                                  `;
                                }}
                              />
                            )}
                          </div>
                          
                          {/* Subtle matte overlay */}
                          <div 
                            className="absolute inset-0 pointer-events-none"
                            style={{
                              background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.6) 100%)'
                            }}
                          />
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Hover glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/5 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                </motion.div>

                {/* Section divider glow between cards (except last) */}
                {index < visibleProjects.length - 1 && (
                  <div className="h-[2px] w-full my-6 sm:my-8" style={{
                    background: 'linear-gradient(90deg, transparent, rgba(124, 58, 237, 0.5), transparent)'
                  }} />
                )}
              </div>
            ))}
          </div>

          {/* View More Button - Show after project 6 if not showing more */}
          {!showMore && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-center mt-12 sm:mt-16"
            >
              <button
                onClick={() => setShowMore(true)}
                className="inline-flex items-center gap-3 px-8 py-4 text-white rounded-full text-base font-semibold transition-all duration-300 hover:scale-105 group"
                style={{
                  background: 'linear-gradient(135deg, #7C3AED, #5B21B6)',
                  boxShadow: '0 0 20px rgba(124, 58, 237, 0.6), 0 10px 30px rgba(124, 58, 237, 0.4)'
                }}
              >
                <span>View More Projects</span>
                <svg 
                  className="w-5 h-5 transition-transform duration-300 group-hover:translate-y-1" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </button>
            </motion.div>
          )}

          {/* Bottom Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-center mt-16 sm:mt-20"
          >
            <div className="inline-flex flex-col sm:flex-row items-center gap-4 px-6 sm:px-8 py-4 sm:py-5 rounded-2xl backdrop-blur-xl" style={{
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.06)'
            }}>
              <span className="text-base sm:text-lg" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                Ready to start your project?
              </span>
              <a
                href="/contact"
                className="px-6 py-3 text-white rounded-full text-sm font-semibold transition-all duration-300 hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, #7C3AED, #5B21B6)',
                  boxShadow: '0 0 20px rgba(124, 58, 237, 0.6), 0 10px 30px rgba(124, 58, 237, 0.4)'
                }}
              >
                Get In Touch
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PortfolioMore;