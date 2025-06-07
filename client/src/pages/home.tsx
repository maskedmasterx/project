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
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-2 h-2 bg-primary rounded-full animate-pulse"></div>
          <div className="absolute top-40 right-20 w-1 h-1 bg-cyan-500 rounded-full animate-pulse"></div>
          <div className="absolute bottom-20 left-1/4 w-1 h-1 bg-primary rounded-full animate-pulse"></div>
          <div className="absolute bottom-40 right-1/3 w-2 h-2 bg-cyan-500 rounded-full animate-pulse"></div>
        </div>
        
        <div className="container mx-auto px-4 text-center z-10">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl terminal-font font-bold mb-6">
              <span className="text-primary neon-glow">&gt;</span>
              <span className="text-foreground">HACK</span>
              <span className="text-primary">_THE_</span>
              <span className="text-cyan-500">MATRIX</span>
              <span className="animate-pulse text-primary">|</span>
            </h1>
            
            <div className="text-xl md:text-2xl text-muted-foreground mb-8 terminal-font typing-effect">
              Master Elite Cybersecurity Skills • Affordable Premium Courses
            </div>
            
            <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
              <Button 
                onClick={scrollToCourses}
                className="bg-primary text-primary-foreground px-8 py-4 rounded-lg font-semibold hover:bg-primary/80 transition-all duration-300 transform hover:scale-105 neon-glow"
              >
                <Code className="w-5 h-5 mr-2" />
                Start Learning
              </Button>
              <Button 
                variant="outline"
                onClick={() => setShowPaymentModal(true)}
                className="border-cyan-500 text-cyan-500 px-8 py-4 rounded-lg font-semibold hover:bg-cyan-500/10 transition-all duration-300"
              >
                <Terminal className="w-5 h-5 mr-2" />
                Quick Payment
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
