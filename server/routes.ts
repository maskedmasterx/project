import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertCourseSchema, insertStudentSchema, insertOrderSchema } from "@shared/schema";
import { z } from "zod";

const purchaseSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  mobile: z.string().min(10),
  courseId: z.number(),
  utrNumber: z.string().min(12),
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all courses
  app.get("/api/courses", async (req, res) => {
    try {
      const courses = await storage.getCourses();
      res.json(courses);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch courses" });
    }
  });

  // Get single course
  app.get("/api/courses/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const course = await storage.getCourse(id);
      if (!course) {
        return res.status(404).json({ message: "Course not found" });
      }
      res.json(course);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch course" });
    }
  });

  // Create course (admin only)
  app.post("/api/courses", async (req, res) => {
    try {
      const courseData = insertCourseSchema.parse(req.body);
      const course = await storage.createCourse(courseData);
      res.status(201).json(course);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid course data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create course" });
    }
  });

  // Update course (admin only)
  app.patch("/api/courses/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updateData = insertCourseSchema.partial().parse(req.body);
      const course = await storage.updateCourse(id, updateData);
      if (!course) {
        return res.status(404).json({ message: "Course not found" });
      }
      res.json(course);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid course data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update course" });
    }
  });

  // Delete course (admin only)
  app.delete("/api/courses/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deleteCourse(id);
      if (!success) {
        return res.status(404).json({ message: "Course not found" });
      }
      res.json({ message: "Course deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete course" });
    }
  });

  // Purchase course
  app.post("/api/purchase", async (req, res) => {
    try {
      const purchaseData = purchaseSchema.parse(req.body);
      
      // Check if course exists
      const course = await storage.getCourse(purchaseData.courseId);
      if (!course) {
        return res.status(404).json({ message: "Course not found" });
      }

      // Check if student exists, create if not
      let student = await storage.getStudentByEmail(purchaseData.email);
      if (!student) {
        student = await storage.createStudent({
          name: purchaseData.name,
          email: purchaseData.email,
          mobile: purchaseData.mobile,
        });
      }

      // Create order
      const order = await storage.createOrder({
        studentId: student.id,
        courseId: purchaseData.courseId,
        utrNumber: purchaseData.utrNumber,
        amount: course.price,
        status: "pending",
      });

      // Send WhatsApp notification (would integrate with actual WhatsApp API)
      const whatsappMessage = `🔥 NEW COURSE ENROLLMENT 🔥

Student: ${purchaseData.name}
Email: ${purchaseData.email}
Mobile: ${purchaseData.mobile}
Course: ${course.title}
Amount: ₹${course.price}
UTR: ${purchaseData.utrNumber}
Order ID: ${order.id}

Please verify payment and provide course access.`;

      console.log("WhatsApp message to 8302718516:", whatsappMessage);
      console.log("Email notification to hacker340652@gmail.com:", {
        student: purchaseData.name,
        course: course.title,
        amount: course.price,
        utr: purchaseData.utrNumber,
      });

      res.status(201).json({ 
        message: "Purchase submitted successfully", 
        orderId: order.id,
        whatsappUrl: `https://wa.me/918302718516?text=${encodeURIComponent(whatsappMessage)}`
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid purchase data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to process purchase" });
    }
  });

  // Get all orders (admin only)
  app.get("/api/orders", async (req, res) => {
    try {
      const orders = await storage.getOrders();
      res.json(orders);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch orders" });
    }
  });

  // Update order status (admin only)
  app.patch("/api/orders/:id/status", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { status } = req.body;
      const order = await storage.updateOrderStatus(id, status);
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
      res.json(order);
    } catch (error) {
      res.status(500).json({ message: "Failed to update order status" });
    }
  });

  // Get students (admin only)
  app.get("/api/students", async (req, res) => {
    try {
      const students = await storage.getStudents();
      res.json(students);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch students" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
