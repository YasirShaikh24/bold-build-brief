import { Github, Twitter, Linkedin, Instagram } from 'lucide-react';

const socialLinks = [
  { icon: Github, href: '#', label: 'GitHub' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Instagram, href: 'https://www.instagram.com/intence.in?igsh=eXZweWsxMHAzbnZ0', label: 'Instagram' },
];

const footerLinks = [
  { title: 'Company', links: ['About', 'Careers', 'Blog', 'Press'] },
  { title: 'Services', links: ['Web Development', 'Mobile Apps', 'UI/UX Design', 'Consulting'] },
  { title: 'Resources', links: ['Documentation', 'Case Studies', 'FAQ', 'Support'] },
];

export const Footer = () => {
  return (
    <footer className="py-20 border-t border-white/5 relative overflow-hidden">

      {/* Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url(/footer.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div className="absolute inset-0 z-0 bg-black/30" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-5 gap-12 mb-16">

          {/* Brand Column – LOGO ONLY */}
          <div className="lg:col-span-2">
            <img
              src="/logo1.png"
              alt="InTence Logo"
              className="h-24 w-auto mb-6"   // ⬅️ increased size
            />

            <p className="text-gray-400 mb-8 max-w-sm">
              Building powerful digital experiences through innovative software
              development and cutting-edge technology.
            </p>

            <div className="flex items-center gap-4">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 hover:text-[#8B5CF6] hover:bg-white/10"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {footerLinks.map((column) => (
            <div key={column.title}>
              <h4 className="font-semibold mb-6 text-white">{column.title}</h4>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-gray-400 hover:text-[#8B5CF6]">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between gap-4">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} InTence. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-gray-400">
            <a href="#" className="hover:text-[#8B5CF6]">Privacy Policy</a>
            <a href="#" className="hover:text-[#8B5CF6]">Terms</a>
            <a href="#" className="hover:text-[#8B5CF6]">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
