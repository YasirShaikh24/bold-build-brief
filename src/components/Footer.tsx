import { motion } from 'framer-motion';
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
    <footer className="py-20 border-t border-border/50 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute bottom-0 left-0 w-full h-[400px] bg-gradient-to-t from-primary/5 to-transparent" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-5 gap-12 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <motion.a
              href="#hero"
              className="inline-flex items-center gap-3 mb-6"
              whileHover={{ scale: 1.05 }}
            >
              {/* Logo Icon */}
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
                <TrendingUp className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-display text-3xl font-bold tracking-wider text-gradient">
                InTence
              </span>
            </motion.a>
            <p className="text-muted-foreground mb-8 max-w-sm">
              Building powerful digital experiences through innovative software
              development and cutting-edge technology.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-lg bg-secondary/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          {footerLinks.map((column) => (
            <div key={column.title}>
              <h4 className="font-display font-semibold mb-6">{column.title}</h4>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-muted-foreground hover:text-primary transition-colors link-underline"
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
        <div className="pt-8 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} InTence. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};