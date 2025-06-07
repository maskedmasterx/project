import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface TermsModalProps {
  onClose: () => void;
}

export default function TermsModal({ onClose }: TermsModalProps) {
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="cyber-border bg-cyber-surface rounded-xl max-w-4xl w-full max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b border-cyber-border">
          <h2 className="text-2xl terminal-font font-bold text-primary">
            Terms and Conditions
          </h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-6 h-6" />
          </Button>
        </div>
        
        <div className="p-6 space-y-6 text-muted-foreground">
          <div>
            <h3 className="text-lg font-bold text-primary mb-3">1. No Refund Policy</h3>
            <p className="leading-relaxed">
              <strong className="text-red-500">IMPORTANT:</strong> All course purchases are final and non-refundable. 
              Once payment is processed and course access is granted, no refunds will be provided under any circumstances. 
              This policy is strictly enforced without exceptions.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-primary mb-3">2. Course Access & Delivery</h3>
            <p className="leading-relaxed">
              Course access will be provided within 24-48 hours after payment verification through UTR. 
              Access credentials and course materials will be sent to your registered email address and WhatsApp number. 
              Course access is valid for 1 year from the date of enrollment.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-primary mb-3">3. Business Model & Content Disclaimer</h3>
            <div className="bg-cyber-dark p-4 rounded-lg border border-red-500/30">
              <p className="leading-relaxed text-sm">
                <strong>Content Sourcing:</strong> CyberSec Academy operates as a course reselling platform. 
                We purchase premium cybersecurity courses from established educational platforms at full market prices 
                and offer them to students at significantly reduced rates (often 90% off) to make quality education accessible. 
                This business model allows us to democratize cybersecurity education while maintaining sustainable operations.
              </p>
              <p className="mt-3 leading-relaxed text-sm">
                <strong>Intellectual Property:</strong> All course content remains the intellectual property of the original creators. 
                We do not claim ownership of the educational materials but provide them through our platform under proper licensing agreements.
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold text-primary mb-3">4. Usage Rights & Restrictions</h3>
            <p className="leading-relaxed">
              Course content is licensed for personal educational use only. Students are strictly prohibited from:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
              <li>Sharing, copying, or redistributing course materials</li>
              <li>Reselling or sublicensing course content</li>
              <li>Using content for commercial purposes</li>
              <li>Sharing login credentials with others</li>
            </ul>
            <p className="mt-3 text-sm text-orange-500">
              Violation of these terms may result in immediate account termination and legal action.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-primary mb-3">5. Payment & Verification Process</h3>
            <p className="leading-relaxed">
              Payments must be made via UPI using the provided QR code. Students must submit the UTR (Unique Transaction Reference) 
              number for payment verification. False or fraudulent UTR submissions will result in order rejection and potential legal action.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-primary mb-3">6. Technical Support</h3>
            <p className="leading-relaxed">
              Technical support is provided via email (hacker340652@gmail.com) and WhatsApp (+91 8302718516) during business hours. 
              Support covers course access issues, login problems, and basic technical queries. Response time is typically 24-48 hours.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-primary mb-3">7. Ethical Use & Legal Compliance</h3>
            <p className="leading-relaxed">
              All cybersecurity knowledge gained from our courses must be used ethically and within legal boundaries. 
              Students are responsible for complying with local laws and regulations when applying learned skills. 
              CyberSec Academy promotes ethical hacking and responsible security practices only.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-primary mb-3">8. Limitation of Liability</h3>
            <p className="leading-relaxed">
              CyberSec Academy is not liable for any damages, losses, or consequences arising from the use of our courses or platform. 
              Students use the educational content at their own risk and responsibility.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-primary mb-3">9. Contact Information</h3>
            <div className="bg-cyber-dark p-4 rounded-lg">
              <p className="text-sm">
                <strong>Email:</strong> hacker340652@gmail.com<br />
                <strong>WhatsApp:</strong> +91 8302718516<br />
                <strong>Business Hours:</strong> 9:00 AM - 9:00 PM IST
              </p>
            </div>
          </div>

          <div className="border-t border-cyber-border pt-6">
            <p className="text-sm text-muted-foreground">
              By purchasing any course from CyberSec Academy, you acknowledge that you have read, understood, 
              and agree to all terms and conditions stated above. This agreement is effective immediately upon purchase 
              and remains in effect for the duration of your course access.
            </p>
            <p className="text-xs text-muted-foreground mt-4">
              Last updated: December 2024 | Version 1.2
            </p>
          </div>
        </div>

        <div className="p-6 border-t border-cyber-border text-center">
          <Button 
            onClick={onClose}
            className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-bold"
          >
            I Understand & Accept
          </Button>
        </div>
      </div>
    </div>
  );
}
