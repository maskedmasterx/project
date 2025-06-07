export const sendWhatsAppMessage = (phoneNumber: string, message: string) => {
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
  window.open(whatsappUrl, '_blank');
};

export const formatOrderMessage = (orderData: {
  orderId: number;
  studentName: string;
  studentEmail: string;
  studentMobile: string;
  courseName: string;
  coursePrice: number;
  utrNumber: string;
}) => {
  return `🔥 NEW COURSE ENROLLMENT 🔥

Order ID: #${orderData.orderId}
Student: ${orderData.studentName}
Email: ${orderData.studentEmail}
Mobile: ${orderData.studentMobile}
Course: ${orderData.courseName}
Amount: ₹${orderData.coursePrice}
UTR: ${orderData.utrNumber}
Time: ${new Date().toLocaleString()}

Please verify payment and provide course access.

---
CyberSec Academy
Elite Cybersecurity Education`;
};
