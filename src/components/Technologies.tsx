const technologies = [
  { name: 'React', category: 'Frontend' },
  { name: 'Vue.js', category: 'Frontend' },
  { name: 'TypeScript', category: 'Language' },
  { name: 'Node.js', category: 'Backend' },
  { name: 'Python', category: 'Backend' },
  { name: 'Java', category: 'Backend' },
  { name: 'Flask', category: 'Framework' },
  { name: 'PostgreSQL', category: 'Database' },
  { name: 'MySQL', category: 'Database' },
  { name: 'MongoDB', category: 'Database' },
  { name: 'Figma', category: 'Design' },
];

export const Technologies = () => {
  return (
    <section id="tech" className="py-24 lg:py-32 bg-background">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, hsl(var(--foreground)) 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-primary text-sm font-medium uppercase tracking-widest mb-4 block">
            Technologies
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground">
            Our <span className="text-gradient">Tech Stack</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            We leverage cutting-edge technologies to build robust, scalable, and
            future-proof solutions for our clients.
          </p>
        </div>

        {/* Technologies Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {technologies.map((tech) => (
            <div
              key={tech.name}
              className="group p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors text-center"
            >
              <span className="font-display font-semibold text-foreground group-hover:text-primary transition-colors">
                {tech.name}
              </span>
              <span className="block text-xs text-muted-foreground mt-1">
                {tech.category}
              </span>
            </div>
          ))}
        </div>

        {/* Expertise areas */}
        <div className="mt-16 grid md:grid-cols-3 gap-6">
          {[
            {
              title: 'Frontend Excellence',
              description: 'Modern, responsive interfaces with React, Vue, and cutting-edge frameworks.',
            },
            {
              title: 'Backend Power',
              description: 'Scalable APIs and microservices with Node.js, Python, and Java ecosystems.',
            },
            {
              title: 'Database & Storage',
              description: 'Robust data management with PostgreSQL, MySQL, and MongoDB solutions.',
            },
          ].map((area) => (
            <div
              key={area.title}
              className="p-8 rounded-2xl bg-card border border-border hover:border-primary/30 transition-colors"
            >
              <h3 className="font-display text-xl font-semibold mb-3 text-primary">
                {area.title}
              </h3>
              <p className="text-muted-foreground">{area.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
