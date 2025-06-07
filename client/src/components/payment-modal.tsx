import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { X, Shield, CreditCard } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useSoundEffects } from "@/hooks/use-sound-effects";
import { apiRequest } from "@/lib/queryClient";
import type { Course } from "@shared/schema";
import qrCodeImage from "@assets/govind_1749263559605.jpg";

interface PaymentModalProps {
  course: Course | null;
  onClose: () => void;
}

export default function PaymentModal({ course, onClose }: PaymentModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    utrNumber: "",
    termsAccepted: false,
  });
  const { toast } = useToast();
  const { playSound } = useSoundEffects();
  const queryClient = useQueryClient();

  const purchaseMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      if (!course) throw new Error("No course selected");
      
      const response = await apiRequest("POST", "/api/purchase", {
        name: data.name,
        email: data.email,
        mobile: data.mobile,
        courseId: course.id,
        utrNumber: data.utrNumber,
      });
      return response.json();
    },
    onSuccess: (data) => {
      playSound('success');
      toast({
        title: "Payment Submitted Successfully!",
        description: "You will receive course access within 24 hours. Check your WhatsApp for confirmation.",
      });
      
      // Open WhatsApp
      if (data.whatsappUrl) {
        window.open(data.whatsappUrl, '_blank');
      }
      
      queryClient.invalidateQueries({ queryKey: ["/api/orders"] });
      onClose();
    },
    onError: () => {
      playSound('error');
      toast({
        title: "Payment Submission Failed",
        description: "Please check your details and try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.termsAccepted) {
      playSound('error');
      toast({
        title: "Terms Required",
        description: "Please accept the terms and conditions.",
        variant: "destructive",
      });
      return;
    }
    playSound('click');
    purchaseMutation.mutate(formData);
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (!course) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="cyber-border bg-cyber-surface rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b border-cyber-border">
          <h2 className="text-2xl terminal-font font-bold text-primary">
            Complete Purchase
          </h2>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={onClose}
            className="text-muted-foreground hover:text-red-500"
          >
            <X className="w-6 h-6" />
          </Button>
        </div>
        
        <div className="p-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Payment QR Code */}
            <div className="text-center">
              <h4 className="text-lg terminal-font font-bold mb-4 text-primary">Scan & Pay</h4>
              <div className="bg-white p-4 rounded-lg inline-block shadow-xl">
                <img 
                  src={qrCodeImage} 
                  alt="Payment QR Code" 
                  className="w-48 h-48 mx-auto"
                />
              </div>
              <p className="text-sm text-muted-foreground mt-2 terminal-font">Scan with any UPI app</p>
              <div className="mt-4 p-3 bg-primary/20 rounded-lg">
                <p className="text-xs terminal-font text-primary">
                  Course: {course.title}
                </p>
                <p className="text-lg font-bold text-primary">
                  Amount: ₹{course.price}
                </p>
              </div>
            </div>

            {/* Student Details Form */}
            <div>
              <h4 className="text-lg terminal-font font-bold mb-4 text-primary">Student Details</h4>
              <form onSubmit={handleSubmit} className="space-y-4">
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
                  <Label className="text-sm terminal-font text-foreground">Mobile Number *</Label>
                  <Input
                    type="tel"
                    value={formData.mobile}
                    onChange={(e) => handleInputChange("mobile", e.target.value)}
                    required
                    className="bg-cyber-dark border-cyber-border text-foreground focus:border-primary"
                    placeholder="+91 9876543210"
                  />
                </div>
                
                <div>
                  <Label className="text-sm terminal-font text-foreground">UTR Number *</Label>
                  <Input
                    type="text"
                    value={formData.utrNumber}
                    onChange={(e) => handleInputChange("utrNumber", e.target.value)}
                    required
                    className="bg-cyber-dark border-cyber-border text-foreground focus:border-primary"
                    placeholder="12-digit UTR number from payment"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Enter the UTR number you receive after UPI payment
                  </p>
                </div>
                
                {/* Terms and Conditions */}
                <div className="pt-4 border-t border-cyber-border space-y-3">
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="terms"
                      checked={formData.termsAccepted}
                      onCheckedChange={(checked) => handleInputChange("termsAccepted", checked === true)}
                      className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                    />
                    <Label htmlFor="terms" className="text-sm text-muted-foreground leading-relaxed">
                      I accept the Terms and Conditions including the no-refund policy. I understand this is a reselling service offering premium courses at discounted rates to make education accessible.
                    </Label>
                  </div>
                  
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      playSound('click');
                      window.open('/terms', '_blank');
                    }}
                    className="w-full border-cyan-500/30 text-cyan-500 hover:bg-cyan-500/10 hover:border-cyan-500 transition-all duration-300 text-sm"
                  >
                    <Shield className="w-4 h-4 mr-2" />
                    Read Full Terms & Conditions
                  </Button>
                </div>

                <Button 
                  type="submit" 
                  disabled={purchaseMutation.isPending}
                  className="w-full bg-gradient-to-r from-primary to-cyan-500 text-primary-foreground py-3 rounded-lg font-bold hover:from-cyan-500 hover:to-primary transition-all duration-300"
                >
                  {purchaseMutation.isPending ? (
                    <>Processing...</>
                  ) : (
                    <>
                      <CreditCard className="w-4 h-4 mr-2" />
                      VERIFY PAYMENT & ENROLL
                    </>
                  )}
                </Button>
                
                <p className="text-xs text-muted-foreground text-center terminal-font">
                  *After submission, you'll receive course access details via WhatsApp & Email within 24 hours
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
