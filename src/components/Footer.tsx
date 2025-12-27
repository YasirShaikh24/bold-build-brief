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
    <footer className="py-16 lg:py-20 border-t border-border bg-background">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-5 gap-12 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <a href="#hero" className="inline-flex items-center gap-3 mb-6">
              {/* Logo Icon */}
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg">
                <TrendingUp className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-display text-3xl font-bold tracking-wider text-foreground">
                InTence
              </span>
            </a>
            <p className="text-muted-foreground mb-8 max-w-sm">
              Building powerful digital experiences through innovative software
              development and cutting-edge technology.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-lg bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          {footerLinks.map((column) => (
            <div key={column.title}>
              <h4 className="font-display font-semibold mb-6 text-foreground">{column.title}</h4>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-muted-foreground hover:text-primary transition-colors"
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
        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
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
