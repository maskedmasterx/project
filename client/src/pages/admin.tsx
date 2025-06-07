
import { useState } from "react";
import AdminPanel from "@/components/admin-panel";
import { Button } from "@/components/ui/button";
import { Shield, Terminal } from "lucide-react";
import { useSoundEffects } from "@/hooks/use-sound-effects";

export default function Admin() {
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const { playSound } = useSoundEffects();

  return (
    <div className="min-h-screen bg-cyber-dark relative overflow-hidden">
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
              <p className="text-xs text-muted-foreground">Admin Portal</p>
            </div>
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

      {/* Admin Access Section */}
      <section className="min-h-screen flex items-center justify-center relative pt-20">
        <div className="container mx-auto px-4 text-center z-10 relative">
          <div className="max-w-2xl mx-auto">
            <div className="cyber-border bg-cyber-surface/30 p-12 rounded-xl">
              <div className="w-20 h-20 bg-cyber-surface rounded-lg flex items-center justify-center border border-cyber-border mx-auto mb-6 cyber-glow">
                <Shield className="text-primary text-3xl" />
              </div>
              
              <h1 className="text-4xl terminal-font font-bold mb-6 text-primary glitch-text">
                ADMIN ACCESS
              </h1>
              
              <p className="text-muted-foreground mb-8 text-lg">
                Secure administrative portal for course management and system control.
              </p>
              
              <Button
                onClick={() => {
                  playSound('click');
                  setShowAdminPanel(true);
                }}
                className="bg-gradient-to-r from-red-500 via-red-600 to-red-500 bg-size-200 bg-pos-0 hover:bg-pos-100 text-white px-10 py-5 rounded-xl font-bold transition-all duration-500 transform hover:scale-110 neon-glow-intense shadow-2xl relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                <Terminal className="w-6 h-6 mr-3" />
                ACCESS ADMIN PANEL
              </Button>
              
              <div className="mt-8 text-xs text-muted-foreground">
                <p className="text-red-500">⚠️ Authorized personnel only</p>
                <p>All access attempts are logged and monitored</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Admin Panel Modal */}
      {showAdminPanel && (
        <AdminPanel onClose={() => setShowAdminPanel(false)} />
      )}
    </div>
  );
}
