import { courses, students, orders, type Course, type InsertCourse, type Student, type InsertStudent, type Order, type InsertOrder } from "@shared/schema";

export interface IStorage {
  // Course operations
  getCourses(): Promise<Course[]>;
  getCourse(id: number): Promise<Course | undefined>;
  createCourse(course: InsertCourse): Promise<Course>;
  updateCourse(id: number, course: Partial<InsertCourse>): Promise<Course | undefined>;
  deleteCourse(id: number): Promise<boolean>;

  // Student operations
  getStudents(): Promise<Student[]>;
  getStudent(id: number): Promise<Student | undefined>;
  getStudentByEmail(email: string): Promise<Student | undefined>;
  createStudent(student: InsertStudent): Promise<Student>;

  // Order operations
  getOrders(): Promise<Order[]>;
  getOrder(id: number): Promise<Order | undefined>;
  createOrder(order: InsertOrder): Promise<Order>;
  updateOrderStatus(id: number, status: string): Promise<Order | undefined>;
  getOrdersByStudent(studentId: number): Promise<Order[]>;
}

export class MemStorage implements IStorage {
  private courses: Map<number, Course> = new Map();
  private students: Map<number, Student> = new Map();
  private orders: Map<number, Order> = new Map();
  private currentCourseId = 1;
  private currentStudentId = 1;
  private currentOrderId = 1;

  constructor() {
    // Initialize with default courses
    this.seedCourses();
  }

  private seedCourses() {
    const defaultCourses: InsertCourse[] = [
      {
        title: "Ethical Hacking Fundamentals",
        description: "Complete introduction to ethical hacking with hands-on labs and real-world scenarios. Learn penetration testing, vulnerability assessment, and security analysis.",
        price: 999,
        originalPrice: 15999,
        duration: "40+ Hours",
        level: "Beginner",
        features: ["Network Security", "Web App Testing", "Linux Basics", "Tool Mastery", "OWASP Top 10", "Certificate"],
        imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=250&fit=crop",
        isActive: true,
      },
      {
        title: "Advanced Penetration Testing",
        description: "Deep dive into advanced penetration testing techniques and methodologies. Master professional-grade security testing.",
        price: 1499,
        originalPrice: 24999,
        duration: "60+ Hours",
        level: "Advanced",
        features: ["Advanced Exploits", "Buffer Overflows", "Privilege Escalation", "Report Writing", "Enterprise Testing", "Certificate"],
        imageUrl: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=250&fit=crop",
        isActive: true,
      },
      {
        title: "Web Application Security",
        description: "Comprehensive web application security testing and secure coding practices. Learn to identify and fix web vulnerabilities.",
        price: 799,
        originalPrice: 12999,
        duration: "35+ Hours",
        level: "Intermediate",
        features: ["SQL Injection", "XSS Attacks", "Authentication Bypass", "API Security", "Secure Coding", "Certificate"],
        imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=250&fit=crop",
        isActive: true,
      },
      {
        title: "Network Security Mastery",
        description: "Master network security concepts, protocols, and implementation strategies. Build robust network defenses.",
        price: 1199,
        originalPrice: 18999,
        duration: "45+ Hours",
        level: "Intermediate",
        features: ["Firewall Configuration", "IDS/IPS Setup", "VPN Security", "Network Forensics", "Wireshark Analysis", "Certificate"],
        imageUrl: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=400&h=250&fit=crop",
        isActive: true,
      },
      {
        title: "Digital Forensics Investigation",
        description: "Professional digital forensics investigation techniques, evidence collection, and court-ready reporting.",
        price: 1299,
        originalPrice: 21999,
        duration: "50+ Hours",
        level: "Advanced",
        features: ["Evidence Acquisition", "File System Analysis", "Memory Forensics", "Mobile Forensics", "Report Writing", "Certificate"],
        imageUrl: "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=400&h=250&fit=crop",
        isActive: true,
      },
      {
        title: "Cloud Security Architecture",
        description: "Comprehensive cloud security for AWS, Azure, GCP including compliance, monitoring, and incident response.",
        price: 1599,
        originalPrice: 25999,
        duration: "55+ Hours",
        level: "Expert",
        features: ["Multi-Cloud Security", "Compliance", "DevSecOps", "Container Security", "Serverless Security", "Certificate"],
        imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=250&fit=crop",
        isActive: true,
      },
    ];

    defaultCourses.forEach(course => {
      this.createCourse(course);
    });
  }

  // Course operations
  async getCourses(): Promise<Course[]> {
    return Array.from(this.courses.values()).filter(course => course.isActive);
  }

  async getCourse(id: number): Promise<Course | undefined> {
    return this.courses.get(id);
  }

  async createCourse(insertCourse: InsertCourse): Promise<Course> {
    const id = this.currentCourseId++;
    const course: Course = {
      ...insertCourse,
      id,
      isActive: insertCourse.isActive ?? true,
      imageUrl: insertCourse.imageUrl ?? null,
      createdAt: new Date(),
    };
    this.courses.set(id, course);
    return course;
  }

  async updateCourse(id: number, updateData: Partial<InsertCourse>): Promise<Course | undefined> {
    const course = this.courses.get(id);
    if (!course) return undefined;

    const updatedCourse = { ...course, ...updateData };
    this.courses.set(id, updatedCourse);
    return updatedCourse;
  }

  async deleteCourse(id: number): Promise<boolean> {
    const course = this.courses.get(id);
    if (!course) return false;

    const updatedCourse = { ...course, isActive: false };
    this.courses.set(id, updatedCourse);
    return true;
  }

  // Student operations
  async getStudents(): Promise<Student[]> {
    return Array.from(this.students.values());
  }

  async getStudent(id: number): Promise<Student | undefined> {
    return this.students.get(id);
  }

  async getStudentByEmail(email: string): Promise<Student | undefined> {
    return Array.from(this.students.values()).find(student => student.email === email);
  }

  async createStudent(insertStudent: InsertStudent): Promise<Student> {
    const id = this.currentStudentId++;
    const student: Student = {
      ...insertStudent,
      id,
      createdAt: new Date(),
    };
    this.students.set(id, student);
    return student;
  }

  // Order operations
  async getOrders(): Promise<Order[]> {
    return Array.from(this.orders.values());
  }

  async getOrder(id: number): Promise<Order | undefined> {
    return this.orders.get(id);
  }

  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const id = this.currentOrderId++;
    const order: Order = {
      ...insertOrder,
      id,
      status: insertOrder.status ?? "pending",
      createdAt: new Date(),
    };
    this.orders.set(id, order);
    return order;
  }

  async updateOrderStatus(id: number, status: string): Promise<Order | undefined> {
    const order = this.orders.get(id);
    if (!order) return undefined;

    const updatedOrder = { ...order, status };
    this.orders.set(id, updatedOrder);
    return updatedOrder;
  }

  async getOrdersByStudent(studentId: number): Promise<Order[]> {
    return Array.from(this.orders.values()).filter(order => order.studentId === studentId);
  }
}

export const storage = new MemStorage();
