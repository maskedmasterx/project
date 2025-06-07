import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { X, Plus, Edit, Trash2, Users, BookOpen, DollarSign } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useSoundEffects } from "@/hooks/use-sound-effects";
import { apiRequest } from "@/lib/queryClient";
import type { Course, Order, Student } from "@shared/schema";

interface AdminPanelProps {
  onClose: () => void;
}

export default function AdminPanel({ onClose }: AdminPanelProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState("courses");
  const [showCourseForm, setShowCourseForm] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [courseForm, setCourseForm] = useState({
    title: "",
    description: "",
    price: "",
    originalPrice: "",
    duration: "",
    level: "",
    features: "",
  });

  const { toast } = useToast();
  const { playSound } = useSoundEffects();
  const queryClient = useQueryClient();

  const { data: courses = [] } = useQuery<Course[]>({
    queryKey: ["/api/courses"],
    enabled: isAuthenticated,
  });

  const { data: orders = [] } = useQuery<Order[]>({
    queryKey: ["/api/orders"],
    enabled: isAuthenticated,
  });

  const { data: students = [] } = useQuery<Student[]>({
    queryKey: ["/api/students"],
    enabled: isAuthenticated,
  });

  const createCourseMutation = useMutation({
    mutationFn: async (courseData: any) => {
      const response = await apiRequest("POST", "/api/courses", courseData);
      return response.json();
    },
    onSuccess: () => {
      toast({ title: "Course created successfully!" });
      queryClient.invalidateQueries({ queryKey: ["/api/courses"] });
      resetCourseForm();
    },
    onError: () => {
      toast({ title: "Failed to create course", variant: "destructive" });
    },
  });

  const updateCourseMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: any }) => {
      const response = await apiRequest("PATCH", `/api/courses/${id}`, data);
      return response.json();
    },
    onSuccess: () => {
      toast({ title: "Course updated successfully!" });
      queryClient.invalidateQueries({ queryKey: ["/api/courses"] });
      resetCourseForm();
    },
    onError: () => {
      toast({ title: "Failed to update course", variant: "destructive" });
    },
  });

  const deleteCourseMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await apiRequest("DELETE", `/api/courses/${id}`);
      return response.json();
    },
    onSuccess: () => {
      toast({ title: "Course deleted successfully!" });
      queryClient.invalidateQueries({ queryKey: ["/api/courses"] });
    },
    onError: () => {
      toast({ title: "Failed to delete course", variant: "destructive" });
    },
  });

  const handleLogin = () => {
    // Simple demo authentication
    if (password === "admin123") {
      setIsAuthenticated(true);
      playSound('success');
      toast({ title: "Admin access granted!" });
    } else {
      playSound('error');
      toast({ title: "Invalid password", variant: "destructive" });
    }
  };

  const resetCourseForm = () => {
    setCourseForm({
      title: "",
      description: "",
      price: "",
      originalPrice: "",
      duration: "",
      level: "",
      features: "",
    });
    setEditingCourse(null);
    setShowCourseForm(false);
  };

  const handleCourseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const courseData = {
      title: courseForm.title,
      description: courseForm.description,
      price: parseInt(courseForm.price),
      originalPrice: parseInt(courseForm.originalPrice),
      duration: courseForm.duration,
      level: courseForm.level,
      features: courseForm.features.split(',').map(f => f.trim()),
      isActive: true,
    };

    if (editingCourse) {
      updateCourseMutation.mutate({ id: editingCourse.id, data: courseData });
    } else {
      createCourseMutation.mutate(courseData);
    }
  };

  const handleEditCourse = (course: Course) => {
    setEditingCourse(course);
    setCourseForm({
      title: course.title,
      description: course.description,
      price: course.price.toString(),
      originalPrice: course.originalPrice.toString(),
      duration: course.duration,
      level: course.level,
      features: course.features.join(', '),
    });
    setShowCourseForm(true);
  };

  const handleDeleteCourse = (id: number) => {
    if (confirm('Are you sure you want to delete this course?')) {
      deleteCourseMutation.mutate(id);
    }
  };

  const stats = {
    totalStudents: students.length,
    totalCourses: courses.length,
    totalRevenue: orders.reduce((sum, order) => sum + order.amount, 0),
    pendingOrders: orders.filter(order => order.status === 'pending').length,
  };

  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="cyber-border bg-cyber-surface rounded-xl max-w-md w-full p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl terminal-font font-bold text-red-500">
              ADMIN ACCESS
            </h2>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-6 h-6" />
            </Button>
          </div>
          
          <div className="space-y-4">
            <div>
              <Label className="text-sm terminal-font text-foreground">Admin Password</Label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                className="bg-cyber-dark border-cyber-border text-foreground"
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
              />
            </div>
            <Button 
              onClick={handleLogin}
              className="w-full bg-red-500 hover:bg-red-600 text-white"
            >
              ACCESS GRANTED
            </Button>
            <div className="text-xs text-muted-foreground text-center space-y-1">
              <p>Demo password: <span className="text-primary terminal-font">admin123</span></p>
              <p className="text-red-500">⚠️ Production systems require secure authentication</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="cyber-border bg-cyber-surface rounded-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b border-cyber-border">
          <h2 className="text-2xl terminal-font font-bold text-primary">
            ADMIN CONTROL PANEL
          </h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-6 h-6" />
          </Button>
        </div>

        {/* Stats Dashboard */}
        <div className="p-6 border-b border-cyber-border">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="cyber-border bg-cyber-dark p-4 rounded-lg text-center">
              <Users className="w-8 h-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-primary">{stats.totalStudents}</div>
              <div className="text-xs text-muted-foreground">Total Students</div>
            </div>
            <div className="cyber-border bg-cyber-dark p-4 rounded-lg text-center">
              <BookOpen className="w-8 h-8 text-cyan-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-cyan-500">{stats.totalCourses}</div>
              <div className="text-xs text-muted-foreground">Active Courses</div>
            </div>
            <div className="cyber-border bg-cyber-dark p-4 rounded-lg text-center">
              <DollarSign className="w-8 h-8 text-green-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-500">₹{stats.totalRevenue.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground">Total Revenue</div>
            </div>
            <div className="cyber-border bg-cyber-dark p-4 rounded-lg text-center">
              <Users className="w-8 h-8 text-orange-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-orange-500">{stats.pendingOrders}</div>
              <div className="text-xs text-muted-foreground">Pending Orders</div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-cyber-border">
          {[
            { id: 'courses', label: 'Courses', icon: BookOpen },
            { id: 'orders', label: 'Orders', icon: DollarSign },
            { id: 'students', label: 'Students', icon: Users },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-6 py-4 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <tab.icon className="w-4 h-4 mr-2" />
              {tab.label}
            </button>
          ))}
        </div>

        <div className="p-6">
          {/* Courses Tab */}
          {activeTab === 'courses' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-foreground">Course Management</h3>
                <Button
                  onClick={() => setShowCourseForm(!showCourseForm)}
                  className="bg-primary text-primary-foreground"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Course
                </Button>
              </div>

              {showCourseForm && (
                <div className="cyber-border bg-cyber-dark p-6 rounded-lg mb-6">
                  <h4 className="text-lg font-bold text-primary mb-4">
                    {editingCourse ? 'Edit Course' : 'Add New Course'}
                  </h4>
                  <form onSubmit={handleCourseSubmit} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label>Course Title</Label>
                        <Input
                          value={courseForm.title}
                          onChange={(e) => setCourseForm({...courseForm, title: e.target.value})}
                          required
                          className="bg-cyber-surface border-cyber-border"
                        />
                      </div>
                      <div>
                        <Label>Level</Label>
                        <Input
                          value={courseForm.level}
                          onChange={(e) => setCourseForm({...courseForm, level: e.target.value})}
                          placeholder="e.g., Beginner, Intermediate, Advanced"
                          required
                          className="bg-cyber-surface border-cyber-border"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label>Description</Label>
                      <Textarea
                        value={courseForm.description}
                        onChange={(e) => setCourseForm({...courseForm, description: e.target.value})}
                        required
                        className="bg-cyber-surface border-cyber-border"
                        rows={3}
                      />
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <Label>Price (₹)</Label>
                        <Input
                          type="number"
                          value={courseForm.price}
                          onChange={(e) => setCourseForm({...courseForm, price: e.target.value})}
                          required
                          className="bg-cyber-surface border-cyber-border"
                        />
                      </div>
                      <div>
                        <Label>Original Price (₹)</Label>
                        <Input
                          type="number"
                          value={courseForm.originalPrice}
                          onChange={(e) => setCourseForm({...courseForm, originalPrice: e.target.value})}
                          required
                          className="bg-cyber-surface border-cyber-border"
                        />
                      </div>
                      <div>
                        <Label>Duration</Label>
                        <Input
                          value={courseForm.duration}
                          onChange={(e) => setCourseForm({...courseForm, duration: e.target.value})}
                          placeholder="e.g., 40+ Hours"
                          required
                          className="bg-cyber-surface border-cyber-border"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label>Features (comma-separated)</Label>
                      <Input
                        value={courseForm.features}
                        onChange={(e) => setCourseForm({...courseForm, features: e.target.value})}
                        placeholder="e.g., Network Security, Web Testing, Certificate"
                        required
                        className="bg-cyber-surface border-cyber-border"
                      />
                    </div>
                    
                    <div className="flex gap-4">
                      <Button type="submit" className="bg-primary text-primary-foreground">
                        {editingCourse ? 'Update Course' : 'Create Course'}
                      </Button>
                      <Button type="button" variant="outline" onClick={resetCourseForm}>
                        Cancel
                      </Button>
                    </div>
                  </form>
                </div>
              )}

              <div className="space-y-4">
                {courses.map((course) => (
                  <div key={course.id} className="cyber-border bg-cyber-dark p-4 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h4 className="text-lg font-bold text-foreground">{course.title}</h4>
                        <p className="text-muted-foreground text-sm mt-1">{course.description}</p>
                        <div className="flex gap-4 mt-2 text-sm">
                          <span className="text-primary">₹{course.price}</span>
                          <span className="text-cyan-500">{course.level}</span>
                          <span className="text-muted-foreground">{course.duration}</span>
                        </div>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEditCourse(course)}
                          className="border-cyan-500 text-cyan-500 hover:bg-cyan-500/10"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDeleteCourse(course.id)}
                          className="border-red-500 text-red-500 hover:bg-red-500/10"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Orders Tab */}
          {activeTab === 'orders' && (
            <div>
              <h3 className="text-xl font-bold text-foreground mb-6">Recent Orders</h3>
              <div className="space-y-4">
                {orders.map((order) => (
                  <div key={order.id} className="cyber-border bg-cyber-dark p-4 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-bold text-foreground">Order #{order.id}</div>
                        <div className="text-sm text-muted-foreground">
                          Course ID: {order.courseId} | Student ID: {order.studentId}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          UTR: {order.utrNumber} | Amount: ₹{order.amount}
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={`px-2 py-1 rounded text-xs font-bold ${
                          order.status === 'verified' 
                            ? 'bg-green-500/20 text-green-500'
                            : order.status === 'pending'
                            ? 'bg-orange-500/20 text-orange-500'
                            : 'bg-red-500/20 text-red-500'
                        }`}>
                          {order.status.toUpperCase()}
                        </span>
                        <div className="text-xs text-muted-foreground mt-1">
                          {new Date(order.createdAt!).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Students Tab */}
          {activeTab === 'students' && (
            <div>
              <h3 className="text-xl font-bold text-foreground mb-6">Student Management</h3>
              <div className="space-y-4">
                {students.map((student) => (
                  <div key={student.id} className="cyber-border bg-cyber-dark p-4 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-bold text-foreground">{student.name}</div>
                        <div className="text-sm text-muted-foreground">{student.email}</div>
                        <div className="text-sm text-muted-foreground">{student.mobile}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-muted-foreground">
                          Joined: {new Date(student.createdAt!).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
