import { useEffect, useRef, useState } from 'react';
import { Mail, MapPin, Send, Github, Linkedin, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';

const socialLinks = [
  { icon: Github, href: 'https://github.com/smrithipiedy', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com/in/smrithipiedy', label: 'LinkedIn' },
];

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("https://formsubmit.co/ajax/smrithipiedy49@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast({
          title: 'Message sent!',
          description: "Thanks for reaching out. I'll get back to you soon!",
        });
        (e.target as HTMLFormElement).reset();
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: "Something went wrong. Please try again later or email me directly.",
        variant: 'destructive',
      });
    }

    setIsSubmitting(false);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-24 md:py-32"
    >
      <div className="container mx-auto px-6">
        {/* Section Header - UNIFORM SIZE */}
        <div className={`mb-16 text-center transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <p className="mb-2 font-mono text-sm text-primary">{'// contact'}</p>
          <h2 className="text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
            Get In Touch<span className="text-primary">.</span>
          </h2>
          <p className="mx-auto mt-4 text-muted-foreground">
            Cool ideas, collabs, or even just a good convo — I’m in. Hit me up!
          </p>
        </div>

        <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-2">
          {/* Contact Info */}
          <div
            className={`transition-all duration-700 delay-200 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}
          >
            <div className="mb-8">
              <h3 className="mb-6 text-xl font-semibold text-foreground">
                Let's connect
              </h3>

              <div className="space-y-4">
                <a
                  href="mailto:smrithipiedy49@gmail.com"
                  className="group flex items-center gap-4 rounded-lg border border-border bg-card/50 p-4 transition-all duration-300 hover:border-primary/50 hover:bg-card"
                >
                  <div className="rounded-lg bg-primary/10 p-3">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium text-foreground group-hover:text-primary">
                      smrithipiedy49@gmail.com
                    </p>
                  </div>
                </a>

                <div className="flex items-center gap-4 rounded-lg border border-border bg-card/50 p-4">
                  <div className="rounded-lg bg-primary/10 p-3">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Location</p>
                    <p className="font-medium text-foreground">Chennai, Tamil Nadu, India</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <p className="mb-4 text-sm text-muted-foreground">Find me on</p>
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group rounded-lg border border-border bg-card/50 p-3 transition-all duration-300 hover:border-primary hover:bg-primary/10"
                    aria-label={social.label}
                  >
                    <social.icon className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-primary" />
                  </a>
                ))}
              </div>
            </div>

            {/* Code decoration */}
            <div className="mt-8 hidden rounded-lg border border-border bg-card/30 p-4 font-mono text-sm lg:block">
              <p className="text-muted-foreground">
                <span className="text-pink-soft">const</span>{' '}
                <span className="text-cyan-code">status</span> ={' '}
                <span className="text-primary">"Open to opportunities"</span>;
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div
            className={`relative z-20 transition-all duration-700 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0 pointer-events-none'}`}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-2 block text-sm text-muted-foreground">
                    Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Your name"
                    required
                    className="border-border bg-card/50 focus:border-primary"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="mb-2 block text-sm text-muted-foreground">
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your@email.com"
                    required
                    className="border-border bg-card/50 focus:border-primary"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="mb-2 block text-sm text-muted-foreground">
                  Subject
                </label>
                <Input
                  id="subject"
                  name="subject"
                  placeholder="What's this about?"
                  required
                  className="border-border bg-card/50 focus:border-primary"
                />
              </div>

              <div>
                <label htmlFor="message" className="mb-2 block text-sm text-muted-foreground">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Tell me about your project..."
                  rows={5}
                  required
                  className="resize-none border-border bg-card/50 focus:border-primary"
                />
              </div>

              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="group w-full bg-primary font-mono text-primary-foreground transition-all hover:shadow-lg hover:shadow-primary/25"
              >
                {isSubmitting ? (
                  'Sending...'
                ) : (
                  <>
                    send_message()
                    <Send className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section >
  );
};

export default Contact;
