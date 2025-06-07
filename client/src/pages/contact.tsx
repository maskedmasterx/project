
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useSoundEffects } from "@/hooks/use-sound-effects";
import { 
  Mail, 
  MessageSquare, 
  Phone, 
  Clock, 
  MapPin, 
  Send,
  Shield,
  Terminal,
  Code,
  Users,
  Zap,
  Globe
} from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { playSound } = useSoundEffects();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    playSound('click');

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      playSound('success');
      toast({
        title: "Message Sent Successfully!",
        description: "We'll get back to you within 24 hours. Check your WhatsApp for quick responses.",
      });
      
      // Create WhatsApp message
      const whatsappMessage = `Hi! I'm ${formData.name} (${formData.email})\n\nSubject: ${formData.subject}\n\nMessage: ${formData.message}`;
      const whatsappUrl = `https://wa.me/918302718516?text=${encodeURIComponent(whatsappMessage)}`;
      window.open(whatsappUrl, '_blank');
      
      // Reset form
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 1500);
  };

  const contactMethods = [
    {
      icon: MessageSquare,
      title: "WhatsApp",
      value: "+91 8302718516",
      description: "Instant support & quick responses",
      action: () => window.open('https://wa.me/918302718516', '_blank'),
      color: "text-green-500"
    },
    {
      icon: Mail,
      title: "Email",
      value: "hacker340652@gmail.com",
      description: "Detailed queries & course information",
      action: () => window.open('mailto:hacker340652@gmail.com', '_blank'),
      color: "text-primary"
    },
    {
      icon: Phone,
      title: "Phone",
      value: "+91 8302718516",
      description: "Direct call for urgent matters",
      action: () => window.open('tel:+918302718516', '_blank'),
      color: "text-cyan-500"
    }
  ];

  const faqs = [
    {
      question: "How quickly will I get course access?",
      answer: "Course access is provided within 24 hours after payment verification and UTR submission."
    },
    {
      question: "Are courses updated regularly?",
      answer: "Yes, all courses are updated quarterly with latest cybersecurity trends and tools."
    },
    {
      question: "Do you provide certificates?",
      answer: "Yes, completion certificates are provided for all courses upon finishing the curriculum."
    },
    {
      question: "Can I get a refund?",
      answer: "All sales are final. Please check our Terms & Conditions for detailed refund policy."
    }
  ];

  return (
    <div className="min-h-screen bg-cyber-dark relative overflow-x-hidden">
      {/* Matrix Rain Background */}
      <div className="matrix-rain">
        {Array.from({ length: 50 }, (_, i) => (
          <div
            key={i}
            className="matrix-char"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 20}s`,
            }}
          >
            {Math.random() > 0.5 ? '0' : '1'}
          </div>
        ))}
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-cyber-dark/90 backdrop-blur-md border-b border-cyber-border z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-cyber-surface rounded-lg flex items-center justify-center border border-cyber-border">
              <Shield className="text-primary text-xl" />
            </div>
            <div>
              <h1 className="text-xl terminal-font font-bold text-primary glitch-text">CyberSec Academy</h1>
              <p className="text-xs text-muted-foreground">Elite Hacking Education</p>
            </div>
          </div>
          
          <div className="hidden md:flex space-x-8">
            <button 
              onClick={() => {
                playSound('click');
                window.location.href = '/';
              }}
              className="text-muted-foreground hover:text-primary transition-colors duration-300"
            >
              Home
            </button>
            <button 
              onClick={() => {
                playSound('click');
                window.location.href = '/about';
              }}
              className="text-muted-foreground hover:text-primary transition-colors duration-300"
            >
              About
            </button>
            <button className="text-primary">
              Contact Us
            </button>
          </div>
          
          <Button
            onClick={() => {
              playSound('click');
              window.location.href = '/';
            }}
            variant="outline"
            className="border-cyan-500 text-cyan-500 hover:bg-cyan-500/10"
          >
            <Terminal className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-cyber-dark via-cyber-surface to-cyber-dark">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl terminal-font font-bold mb-6">
              <span className="text-primary">&lt;</span>
              <span className="text-foreground">CONTACT_US</span>
              <span className="text-primary">/&gt;</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
              Get in Touch with Our Cybersecurity Experts
            </p>
            
            <div className="cyber-border bg-cyber-surface/50 p-8 rounded-xl mb-12">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <Clock className="w-8 h-8 text-primary mx-auto mb-2" />
                  <div className="text-sm text-muted-foreground">Response Time</div>
                  <div className="text-lg font-bold text-primary terminal-font">&lt; 2 Hours</div>
                </div>
                <div className="text-center">
                  <Users className="w-8 h-8 text-cyan-500 mx-auto mb-2" />
                  <div className="text-sm text-muted-foreground">Support Available</div>
                  <div className="text-lg font-bold text-cyan-500 terminal-font">24/7</div>
                </div>
                <div className="text-center">
                  <Globe className="w-8 h-8 text-pink-500 mx-auto mb-2" />
                  <div className="text-sm text-muted-foreground">Languages</div>
                  <div className="text-lg font-bold text-pink-500 terminal-font">Hindi & English</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-20 bg-cyber-surface/20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl terminal-font font-bold text-center mb-16">
            <span className="text-cyan-500">{"{"}</span>
            <span className="text-foreground">CONTACT_METHODS</span>
            <span className="text-cyan-500">{"}"}</span>
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
            {contactMethods.map((method, index) => (
              <div 
                key={index}
                className="cyber-border bg-cyber-surface/50 p-6 rounded-xl text-center hover:cyber-glow transition-all duration-300 cursor-pointer"
                onClick={() => {
                  playSound('click');
                  method.action();
                }}
                onMouseEnter={() => playSound('hover')}
              >
                <method.icon className={`w-12 h-12 ${method.color} mx-auto mb-4`} />
                <h3 className="text-xl font-bold text-foreground mb-2 terminal-font">
                  {method.title}
                </h3>
                <div className={`text-lg font-mono mb-2 ${method.color}`}>
                  {method.value}
                </div>
                <p className="text-sm text-muted-foreground">
                  {method.description}
                </p>
                <Button
                  className="mt-4 bg-gradient-to-r from-primary to-cyan-500 text-primary-foreground px-6 py-2 rounded-lg font-bold hover:from-cyan-500 hover:to-primary transition-all duration-300"
                >
                  Connect Now
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl terminal-font font-bold text-center mb-16">
              <span className="text-primary">[</span>
              <span className="text-foreground">SEND_MESSAGE</span>
              <span className="text-primary">]</span>
            </h2>
            
            <div className="grid md:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div className="cyber-border bg-cyber-surface/50 p-8 rounded-xl">
                <h3 className="text-2xl terminal-font font-bold text-primary mb-6">Quick Message</h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label className="text-sm terminal-font text-foreground">Full Name *</Label>
                    <Input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      required
                      className="bg-cyber-dark border-cyber-border text-foreground focus:border-primary"
                      placeholder="Enter your full name"
                    />
                  </div>
                  
                  <div>
                    <Label className="text-sm terminal-font text-foreground">Email Address *</Label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      required
                      className="bg-cyber-dark border-cyber-border text-foreground focus:border-primary"
                      placeholder="your.email@example.com"
                    />
                  </div>
                  
                  <div>
                    <Label className="text-sm terminal-font text-foreground">Subject *</Label>
                    <Input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => handleInputChange("subject", e.target.value)}
                      required
                      className="bg-cyber-dark border-cyber-border text-foreground focus:border-primary"
                      placeholder="Course inquiry, Support, etc."
                    />
                  </div>
                  
                  <div>
                    <Label className="text-sm terminal-font text-foreground">Message *</Label>
                    <Textarea
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      required
                      className="bg-cyber-dark border-cyber-border text-foreground focus:border-primary min-h-[120px]"
                      placeholder="Tell us about your query, course requirements, or any questions..."
                    />
                  </div>
                  
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-primary to-cyan-500 text-primary-foreground py-3 rounded-lg font-bold hover:from-cyan-500 hover:to-primary transition-all duration-300"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </div>

              {/* Contact Info & FAQ */}
              <div className="space-y-8">
                {/* Contact Info */}
                <div className="cyber-border bg-cyber-dark p-6 rounded-xl">
                  <h3 className="text-xl terminal-font font-bold text-primary mb-4">Contact Information</h3>
                  <div className="space-y-4 text-sm">
                    <div className="flex items-center">
                      <Mail className="w-4 h-4 text-primary mr-3" />
                      <span className="text-muted-foreground">hacker340652@gmail.com</span>
                    </div>
                    <div className="flex items-center">
                      <MessageSquare className="w-4 h-4 text-green-500 mr-3" />
                      <span className="text-muted-foreground">+91 8302718516 (WhatsApp)</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 text-cyan-500 mr-3" />
                      <span className="text-muted-foreground">9:00 AM - 9:00 PM IST</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 text-pink-500 mr-3" />
                      <span className="text-muted-foreground">Remote Support Worldwide</span>
                    </div>
                  </div>
                </div>

                {/* Quick Links */}
                <div className="cyber-border bg-cyber-dark p-6 rounded-xl">
                  <h3 className="text-xl terminal-font font-bold text-cyan-500 mb-4">Quick Actions</h3>
                  <div className="space-y-3">
                    <Button
                      onClick={() => {
                        playSound('click');
                        window.location.href = '/#courses';
                      }}
                      variant="outline"
                      className="w-full justify-start border-primary text-primary hover:bg-primary/10"
                    >
                      <Code className="w-4 h-4 mr-2" />
                      Browse Courses
                    </Button>
                    <Button
                      onClick={() => {
                        playSound('click');
                        window.open('https://wa.me/918302718516?text=Hi! I need help with course selection.', '_blank');
                      }}
                      variant="outline"
                      className="w-full justify-start border-green-500 text-green-500 hover:bg-green-500/10"
                    >
                      <MessageSquare className="w-4 h-4 mr-2" />
                      WhatsApp Support
                    </Button>
                    <Button
                      onClick={() => {
                        playSound('click');
                        window.location.href = '/about';
                      }}
                      variant="outline"
                      className="w-full justify-start border-cyan-500 text-cyan-500 hover:bg-cyan-500/10"
                    >
                      <Shield className="w-4 h-4 mr-2" />
                      About Us
                    </Button>
                  </div>
                </div>

                {/* FAQ */}
                <div className="cyber-border bg-cyber-dark p-6 rounded-xl">
                  <h3 className="text-xl terminal-font font-bold text-yellow-500 mb-4">Frequently Asked</h3>
                  <div className="space-y-4">
                    {faqs.map((faq, index) => (
                      <div key={index} className="border-b border-cyber-border/50 pb-3 last:border-b-0">
                        <div className="text-sm font-medium text-foreground mb-1">
                          {faq.question}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {faq.answer}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Office Hours */}
      <section className="py-20 bg-cyber-surface/30">
        <div className="container mx-auto px-4 text-center">
          <div className="cyber-border bg-cyber-surface/50 p-12 rounded-xl max-w-4xl mx-auto">
            <h2 className="text-3xl terminal-font font-bold text-primary mb-6">
              Our Support Hours
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-foreground mb-4">Regular Support</h3>
                <div className="text-2xl font-bold text-cyan-500 terminal-font mb-2">9:00 AM - 9:00 PM</div>
                <div className="text-muted-foreground">Monday to Sunday (IST)</div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground mb-4">Emergency Support</h3>
                <div className="text-2xl font-bold text-green-500 terminal-font mb-2">24/7 Available</div>
                <div className="text-muted-foreground">WhatsApp Only</div>
              </div>
            </div>
            <div className="mt-8">
              <Button
                onClick={() => {
                  playSound('click');
                  window.open('https://wa.me/918302718516', '_blank');
                }}
                className="bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-4 rounded-lg font-bold hover:from-green-600 hover:to-green-700 transition-all duration-300"
              >
                <MessageSquare className="w-5 h-5 mr-2" />
                Contact Now on WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
