import { Shield, Users, Award, Target, Globe, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSoundEffects } from "@/hooks/use-sound-effects";

export default function About() {
  const { playSound } = useSoundEffects();

  const achievements = [
    {
      icon: Users,
      number: "50,000+",
      title: "Students Trained",
      description: "Elite cybersecurity professionals worldwide"
    },
    {
      icon: Award,
      number: "500+",
      title: "Industry Certifications",
      description: "Recognized by leading security organizations"
    },
    {
      icon: Target,
      number: "98%",
      title: "Success Rate",
      description: "Students securing cybersecurity roles"
    },
    {
      icon: Globe,
      number: "100+",
      title: "Countries Reached",
      description: "Global cybersecurity education impact"
    }
  ];

  const testimonials = [
    {
      name: "Arjun Patel",
      role: "Senior Penetration Tester",
      company: "InfoSec Corp",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      content: "CyberSec Academy transformed my career. The hands-on approach and real-world scenarios prepared me for actual penetration testing challenges. Highly recommended!"
    },
    {
      name: "Priya Sharma",
      role: "Cybersecurity Analyst",
      company: "TechGuard Solutions",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
      content: "The quality of courses at such affordable prices is incredible. I landed my dream job in cybersecurity within 3 months of completing the ethical hacking course."
    },
    {
      name: "Rohit Kumar",
      role: "Security Consultant",
      company: "CyberDefense Ltd",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      content: "Outstanding curriculum and expert instructors. The courses are regularly updated with latest security trends. Best investment for cybersecurity professionals."
    },
    {
      name: "Sneha Gupta",
      role: "Forensics Specialist",
      company: "Digital Investigation Agency",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      content: "The digital forensics course exceeded my expectations. Practical labs and industry-relevant content made learning engaging and effective."
    }
  ];

  return (
    <div className="min-h-screen bg-cyber-dark relative overflow-x-hidden">
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-cyber-dark via-cyber-surface to-cyber-dark">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl terminal-font font-bold mb-6">
              <span className="text-primary">[</span>
              <span className="text-foreground">ABOUT_US</span>
              <span className="text-primary">]</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
              Democratizing Elite Cybersecurity Education for the Next Generation of Ethical Hackers
            </p>
            
            <div className="cyber-border bg-cyber-surface/50 p-8 rounded-xl mb-12">
              <h2 className="text-2xl terminal-font font-bold text-primary mb-4">Our Mission</h2>
              <p className="text-muted-foreground leading-relaxed">
                At CyberSec Academy, we believe that high-quality cybersecurity education should be accessible to everyone. 
                We bridge the gap between expensive premium courses and affordable learning by offering industry-leading 
                content at fraction of the cost, enabling aspiring cybersecurity professionals to build successful careers 
                without financial barriers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-20 bg-cyber-surface/30">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl terminal-font font-bold text-center mb-16">
            <span className="text-cyan-500">&lt;</span>
            <span className="text-foreground">ACHIEVEMENTS</span>
            <span className="text-cyan-500">/&gt;</span>
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {achievements.map((achievement, index) => (
              <div 
                key={index}
                className="cyber-border bg-cyber-surface/50 p-6 rounded-xl text-center hover:cyber-glow transition-all duration-300"
                onMouseEnter={() => playSound('hover')}
              >
                <achievement.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                <div className="text-3xl font-bold text-primary terminal-font mb-2">
                  {achievement.number}
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">
                  {achievement.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {achievement.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl terminal-font font-bold text-center mb-16">
              <span className="text-primary">{"<"}</span>
              <span className="text-foreground">OUR_STORY</span>
              <span className="text-primary">{"/>"}</span>
            </h2>
            
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="cyber-border bg-cyber-surface/50 p-8 rounded-xl">
                <h3 className="text-2xl font-bold text-primary mb-4 terminal-font">The Problem</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Quality cybersecurity education was locked behind expensive paywalls, with courses costing 
                  ₹15,000-₹50,000+. Talented individuals were unable to access world-class training due to 
                  financial constraints, creating barriers to entering the cybersecurity field.
                </p>
                
                <h3 className="text-2xl font-bold text-cyan-500 mb-4 terminal-font">The Solution</h3>
                <p className="text-muted-foreground leading-relaxed">
                  We invest in premium courses from leading platforms and redistribute them at 90% discounts, 
                  making elite cybersecurity education accessible to everyone. Our sustainable model helps 
                  thousands achieve their cybersecurity dreams.
                </p>
              </div>
              
              <div className="space-y-6">
                <div className="cyber-border bg-cyber-dark p-6 rounded-xl">
                  <Zap className="w-8 h-8 text-yellow-500 mb-3" />
                  <h4 className="text-lg font-bold text-foreground mb-2">Innovation Driven</h4>
                  <p className="text-sm text-muted-foreground">
                    Cutting-edge curriculum updated with latest security trends and threats
                  </p>
                </div>
                
                <div className="cyber-border bg-cyber-dark p-6 rounded-xl">
                  <Shield className="w-8 h-8 text-primary mb-3" />
                  <h4 className="text-lg font-bold text-foreground mb-2">Ethical Focus</h4>
                  <p className="text-sm text-muted-foreground">
                    Promoting responsible hacking and ethical cybersecurity practices
                  </p>
                </div>
                
                <div className="cyber-border bg-cyber-dark p-6 rounded-xl">
                  <Users className="w-8 h-8 text-cyan-500 mb-3" />
                  <h4 className="text-lg font-bold text-foreground mb-2">Community First</h4>
                  <p className="text-sm text-muted-foreground">
                    Building a global community of cybersecurity professionals
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-cyber-surface/20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl terminal-font font-bold text-center mb-16">
            <span className="text-primary">{"{"}</span>
            <span className="text-foreground">TESTIMONIALS</span>
            <span className="text-primary">{"}"}</span>
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className="cyber-border bg-cyber-surface/50 p-6 rounded-xl hover:cyber-glow transition-all duration-300"
                onMouseEnter={() => playSound('hover')}
              >
                <div className="flex items-center mb-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full border-2 border-primary mr-4"
                  />
                  <div>
                    <h4 className="font-bold text-foreground">{testimonial.name}</h4>
                    <p className="text-sm text-primary">{testimonial.role}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.company}</p>
                  </div>
                </div>
                <p className="text-muted-foreground italic leading-relaxed">
                  "{testimonial.content}"
                </p>
                <div className="flex text-yellow-500 mt-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="cyber-border bg-cyber-surface/50 p-12 rounded-xl max-w-4xl mx-auto">
            <h2 className="text-3xl terminal-font font-bold text-primary mb-6">
              Ready to Start Your Cybersecurity Journey?
            </h2>
            <p className="text-muted-foreground mb-8 text-lg">
              Join thousands of successful cybersecurity professionals who started their careers with us
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Button 
                onClick={() => {
                  playSound('click');
                  window.location.href = '/';
                }}
                className="bg-primary text-primary-foreground px-8 py-4 rounded-lg font-bold hover:bg-primary/80 transition-all duration-300"
              >
                <Shield className="w-5 h-5 mr-2" />
                Browse Courses
              </Button>
              <Button 
                variant="outline"
                onClick={() => {
                  playSound('click');
                  window.open('https://wa.me/918302718516', '_blank');
                }}
                className="border-cyan-500 text-cyan-500 px-8 py-4 rounded-lg font-bold hover:bg-cyan-500/10 transition-all duration-300"
              >
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}