import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import CourseCard from "@/components/course-card";
import PaymentModal from "@/components/payment-modal";
import AdminPanel from "@/components/admin-panel";
import TermsModal from "@/components/terms-modal";
import { Button } from "@/components/ui/button";
import { Shield, Terminal, Code, Bug, Cpu, Database } from "lucide-react";
import { useSoundEffects } from "@/hooks/use-sound-effects";
import type { Course } from "@shared/schema";
import qrCodeImage from "@assets/govind_1749263559605.jpg";

export default function Home() {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [matrixChars, setMatrixChars] = useState<Array<{ id: number; char: string; left: number; delay: number }>>([]);

  const { playSound } = useSoundEffects();
  const { data: courses = [], isLoading } = useQuery<Course[]>({
    queryKey: ["/api/courses"],
  });

  // Matrix rain effect
  useEffect(() => {
    const chars = '01';
    const newMatrixChars = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      char: chars[Math.floor(Math.random() * chars.length)],
      left: Math.random() * 100,
      delay: Math.random() * 20,
    }));
    setMatrixChars(newMatrixChars);
  }, []);

  const handleCourseSelect = (course: Course) => {
    setSelectedCourse(course);
    setShowPaymentModal(true);
  };

  const scrollToCourses = () => {
    document.getElementById('courses')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-cyber-dark relative overflow-x-hidden">
      {/* Matrix Rain Background */}
      <div className="matrix-rain">
        {matrixChars.map((item) => (
          <div
            key={item.id}
            className="matrix-char"
            style={{
              left: `${item.left}%`,
              animationDelay: `${item.delay}s`,
            }}
          >
            {item.char}
          </div>
        ))}
      </div>

      {/* Floating Particles */}
      <div className="floating-particles">
        {Array.from({ length: 20 }, (_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 20}s`,
              animationDuration: `${15 + Math.random() * 10}s`,
            }}
          />
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
                scrollToCourses();
              }}
              className="text-muted-foreground hover:text-primary transition-colors duration-300"
            >
              Courses
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
            <button 
              onClick={() => {
                playSound('click');
                setShowTermsModal(true);
              }}
              className="text-muted-foreground hover:text-primary transition-colors duration-300"
            >
              Terms
            </button>
          </div>
          
          <Button
            onClick={() => {
              playSound('click');
              setShowAdminPanel(true);
            }}
            variant="outline"
            className="border-cyan-500 text-cyan-500 hover:bg-cyan-500/10"
          >
            <Terminal className="w-4 h-4 mr-2" />
            Admin
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20 matrix-bg">
        {/* Enhanced Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-3 h-3 bg-primary rounded-full animate-pulse glow-pulse"></div>
          <div className="absolute top-40 right-20 w-2 h-2 bg-cyan-500 rounded-full animate-ping"></div>
          <div className="absolute bottom-20 left-1/4 w-2 h-2 bg-primary rounded-full animate-bounce"></div>
          <div className="absolute bottom-40 right-1/3 w-3 h-3 bg-cyan-500 rounded-full animate-pulse glow-pulse"></div>
          <div className="absolute top-1/3 left-1/2 w-1 h-1 bg-pink-500 rounded-full animate-ping"></div>
          <div className="absolute bottom-1/3 left-20 w-1 h-1 bg-yellow-500 rounded-full animate-bounce"></div>
        </div>

        {/* Animated Grid Background */}
        <div className="absolute inset-0 animated-grid opacity-10"></div>
        
        <div className="container mx-auto px-4 text-center z-10 relative">
          <div className="max-w-5xl mx-auto">
            {/* Enhanced Title with Stagger Animation */}
            <div className="mb-8">
              <h1 className="text-5xl md:text-8xl terminal-font font-bold mb-6 stagger-animation">
                <span className="text-primary neon-glow animate-bounce inline-block">&gt;</span>
                <span className="text-foreground glitch-text inline-block">HACK</span>
                <span className="text-primary pulse-text inline-block">_THE_</span>
                <span className="text-cyan-500 rainbow-text inline-block">MATRIX</span>
                <span className="animate-pulse text-primary text-6xl md:text-8xl inline-block">|</span>
              </h1>
            </div>
            
            {/* Enhanced Subtitle */}
            <div className="relative mb-12">
              <div className="text-xl md:text-3xl text-muted-foreground terminal-font typing-effect-enhanced gradient-text">
                Master Elite Cybersecurity Skills • Affordable Premium Courses
              </div>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-primary to-transparent animate-pulse"></div>
            </div>
            
            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 max-w-4xl mx-auto">
              <div className="cyber-border bg-cyber-surface/30 p-4 rounded-lg hover:cyber-glow transition-all duration-300 transform hover:scale-105">
                <div className="text-2xl font-bold text-primary terminal-font">50K+</div>
                <div className="text-sm text-muted-foreground">Students</div>
              </div>
              <div className="cyber-border bg-cyber-surface/30 p-4 rounded-lg hover:cyber-glow transition-all duration-300 transform hover:scale-105">
                <div className="text-2xl font-bold text-cyan-500 terminal-font">100+</div>
                <div className="text-sm text-muted-foreground">Courses</div>
              </div>
              <div className="cyber-border bg-cyber-surface/30 p-4 rounded-lg hover:cyber-glow transition-all duration-300 transform hover:scale-105">
                <div className="text-2xl font-bold text-pink-500 terminal-font">24/7</div>
                <div className="text-sm text-muted-foreground">Support</div>
              </div>
              <div className="cyber-border bg-cyber-surface/30 p-4 rounded-lg hover:cyber-glow transition-all duration-300 transform hover:scale-105">
                <div className="text-2xl font-bold text-yellow-500 terminal-font">90%</div>
                <div className="text-sm text-muted-foreground">Discount</div>
              </div>
            </div>
            
            {/* Enhanced Buttons */}
            <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
              <Button 
                onClick={scrollToCourses}
                className="bg-gradient-to-r from-primary via-cyan-500 to-primary bg-size-200 bg-pos-0 hover:bg-pos-100 text-primary-foreground px-10 py-5 rounded-xl font-bold transition-all duration-500 transform hover:scale-110 neon-glow-intense shadow-2xl relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                <Code className="w-6 h-6 mr-3" />
                START LEARNING NOW
              </Button>
              <Button 
                variant="outline"
                onClick={() => setShowPaymentModal(true)}
                className="border-2 border-cyan-500 text-cyan-500 px-10 py-5 rounded-xl font-bold hover:bg-cyan-500/20 transition-all duration-300 transform hover:scale-105 hover:shadow-cyan-500/50 hover:shadow-2xl relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/20 to-cyan-500/0 translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
                <Terminal className="w-6 h-6 mr-3" />
                QUICK PAYMENT
              </Button>
            </div>
          </div>
        </div>

        {/* Floating Tech Icons */}
        <div className="absolute top-32 left-16 text-primary opacity-20 animate-pulse">
          <Code className="w-8 h-8" />
        </div>
        <div className="absolute bottom-32 right-16 text-pink-500 opacity-20 animate-pulse">
          <Bug className="w-6 h-6" />
        </div>
        <div className="absolute top-1/2 left-8 text-cyan-500 opacity-20 animate-pulse">
          <Cpu className="w-6 h-6" />
        </div>
        <div className="absolute bottom-1/3 right-8 text-primary opacity-20 animate-pulse">
          <Database className="w-7 h-7" />
        </div>
      </section>

      {/* Courses Section */}
      <section id="courses" className="py-20 relative">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl terminal-font font-bold text-center mb-16">
            <span className="text-primary">[</span>
            <span className="text-foreground">PREMIUM_COURSES</span>
            <span className="text-primary">]</span>
          </h2>
          
          {isLoading ? (
            <div className="text-center">
              <div className="terminal-font text-primary">Loading courses...</div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {courses.map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  onSelect={handleCourseSelect}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Payment Section with QR Code Preview */}
      <section className="py-20 bg-cyber-surface/30">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl terminal-font font-bold text-center mb-16">
            <span className="text-cyan-500">&lt;</span>
            <span className="text-foreground">SECURE_PAYMENT</span>
            <span className="text-cyan-500">/&gt;</span>
          </h2>
          
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <div className="text-center">
              <div className="bg-white p-6 rounded-2xl inline-block shadow-2xl border-4 border-primary/50 neon-glow">
                <img 
                  src={qrCodeImage} 
                  alt="Payment QR Code" 
                  className="w-64 h-64 mx-auto"
                />
              </div>
              <p className="text-primary terminal-font mt-4 text-lg">Scan to Pay with UPI</p>
              <p className="text-muted-foreground text-sm mt-2">All major UPI apps supported</p>
            </div>
            
            <div className="cyber-border bg-cyber-surface/50 p-8 rounded-xl">
              <h3 className="text-2xl terminal-font font-bold text-primary mb-6">Quick Start</h3>
              <div className="space-y-4">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Shield className="w-4 h-4 mr-2 text-primary" />
                  Select your course
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Terminal className="w-4 h-4 mr-2 text-primary" />
                  Scan QR & pay via UPI
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Code className="w-4 h-4 mr-2 text-primary" />
                  Submit UTR for verification
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Database className="w-4 h-4 mr-2 text-primary" />
                  Get course access in 24hrs
                </div>
              </div>
              
              <Button
                onClick={() => setShowPaymentModal(true)}
                className="w-full mt-6 bg-gradient-to-r from-primary to-cyan-500 text-primary-foreground py-3 rounded-lg font-bold hover:from-cyan-500 hover:to-primary transition-all duration-300"
              >
                <Shield className="w-5 h-5 mr-2" />
                Start Purchase
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-cyber-surface/50 border-t border-cyber-border py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div className="mb-6 md:mb-0">
              <h3 className="text-2xl terminal-font font-bold text-primary mb-2">CyberSec Academy</h3>
              <p className="text-muted-foreground">Making elite cybersecurity education accessible</p>
            </div>
            
            <div className="flex space-x-6">
              <button className="text-cyan-500 hover:text-primary transition-colors duration-300">
                <Terminal className="w-6 h-6" />
              </button>
              <button className="text-cyan-500 hover:text-primary transition-colors duration-300">
                <Shield className="w-6 h-6" />
              </button>
              <button className="text-cyan-500 hover:text-primary transition-colors duration-300">
                <Code className="w-6 h-6" />
              </button>
            </div>
          </div>
          
          <div className="border-t border-cyber-border pt-8">
            <p className="text-muted-foreground text-sm">&copy; 2024 CyberSec Academy. All rights reserved.</p>
            <p className="text-muted-foreground text-xs mt-2">Ethical hacking education for cybersecurity professionals</p>
          </div>
        </div>
      </footer>

      {/* Modals */}
      {showPaymentModal && (
        <PaymentModal
          course={selectedCourse}
          onClose={() => {
            setShowPaymentModal(false);
            setSelectedCourse(null);
          }}
        />
      )}

      {showAdminPanel && (
        <AdminPanel onClose={() => setShowAdminPanel(false)} />
      )}

      {showTermsModal && (
        <TermsModal onClose={() => setShowTermsModal(false)} />
      )}
    </div>
  );
}
