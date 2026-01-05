import { Github, Twitter, Linkedin, Instagram, TrendingUp } from 'lucide-react';

const socialLinks = [
  { icon: Github, href: '#', label: 'GitHub' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Instagram, href: '#', label: 'Instagram' },
];

const footerLinks = [
  {
    title: 'Company',
    links: ['About', 'Careers', 'Blog', 'Press'],
  },
  {
    title: 'Services',
    links: ['Web Development', 'Mobile Apps', 'UI/UX Design', 'Consulting'],
  },
  {
    title: 'Resources',
    links: ['Documentation', 'Case Studies', 'FAQ', 'Support'],
  },
];

export const Footer = () => {
  return (
    <footer className="py-20 border-t border-white/5 relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url(/src/assets/footer.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />
      
      {/* Dark overlay for better text readability */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          background: 'rgba(0, 0, 0, 0.3)',
        }}
      />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-5 gap-12 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <a
              href="#hero"
              className="inline-flex items-center gap-3 mb-6"
            >
              {/* Logo Icon */}
              <div className="w-10 h-10 rounded-xl bg-[#8B5CF6] flex items-center justify-center shadow-lg">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <span className="font-display text-3xl font-bold tracking-wider text-white">
                InTence
              </span>
            </a>
            <p className="text-gray-400 mb-8 max-w-sm">
              Building powerful digital experiences through innovative software
              development and cutting-edge technology.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 hover:text-[#8B5CF6] hover:bg-white/10 transition-all duration-300"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Links Columns */}
          {footerLinks.map((column) => (
            <div key={column.title}>
              <h4 className="font-display font-semibold mb-6 text-white">{column.title}</h4>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-[#8B5CF6] transition-colors duration-300"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} InTence. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-gray-400">
            <a href="#" className="hover:text-[#8B5CF6] transition-colors duration-300">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-[#8B5CF6] transition-colors duration-300">
              Terms of Service
            </a>
            <a href="#" className="hover:text-[#8B5CF6] transition-colors duration-300">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};