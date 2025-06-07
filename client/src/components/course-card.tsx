import { Shield, Clock, Users, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSoundEffects } from "@/hooks/use-sound-effects";
import type { Course } from "@shared/schema";

interface CourseCardProps {
  course: Course;
  onSelect: (course: Course) => void;
}

export default function CourseCard({ course, onSelect }: CourseCardProps) {
  const { playSound } = useSoundEffects();
  
  const getDifficultyColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'beginner': return 'text-green-500';
      case 'intermediate': return 'text-cyan-500';
      case 'advanced': return 'text-orange-500';
      case 'expert': return 'text-red-500';
      default: return 'text-primary';
    }
  };

  const getDifficultyIcon = (level: string) => {
    switch (level.toLowerCase()) {
      case 'beginner': return '◆';
      case 'intermediate': return '◆◆';
      case 'advanced': return '◆◆◆';
      case 'expert': return '◆◆◆◆';
      default: return '◆';
    }
  };

  return (
    <div 
      className="cyber-border bg-cyber-surface/50 rounded-xl overflow-hidden hover:cyber-glow transition-all duration-500 transform hover:scale-105 hover:rotate-1 group relative course-card-glow"
      onMouseEnter={() => playSound('hover')}
    >
      {/* Course Image */}
      {course.imageUrl && (
        <div className="relative h-48 overflow-hidden">
          <img 
            src={course.imageUrl} 
            alt={course.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-cyber-dark/80 to-transparent"></div>
          <span className={`absolute top-4 left-4 bg-cyber-dark/90 px-3 py-1 rounded-full text-sm terminal-font font-bold ${getDifficultyColor(course.level)}`}>
            {getDifficultyIcon(course.level)} {course.level}
          </span>
          <div className="absolute top-4 right-4 text-right">
            <div className="text-xl font-bold text-primary bg-cyber-dark/90 px-2 py-1 rounded">₹{course.price}</div>
            <div className="text-xs text-muted-foreground line-through bg-cyber-dark/70 px-2 py-1 rounded mt-1">₹{course.originalPrice}</div>
          </div>
        </div>
      )}
      
      {/* Course Content */}
      <div className="p-6">
        {/* Fallback for courses without images */}
        {!course.imageUrl && (
          <div className="flex justify-between items-start mb-4">
            <span className={`bg-cyber-dark px-3 py-1 rounded-full text-sm terminal-font font-bold ${getDifficultyColor(course.level)}`}>
              {getDifficultyIcon(course.level)} {course.level}
            </span>
            <div className="text-right">
              <div className="text-2xl font-bold text-primary">₹{course.price}</div>
              <div className="text-sm text-muted-foreground line-through">₹{course.originalPrice}</div>
            </div>
          </div>
        )}
        
        <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
          {course.title}
        </h3>
        <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
          {course.description}
        </p>
        
        <div className="mb-4">
          <div className="flex items-center text-sm text-cyan-500 mb-2">
            <Clock className="w-4 h-4 mr-2" />
            <span>{course.duration}</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {course.features.slice(0, 4).map((feature, index) => (
              <div key={index} className="text-xs text-muted-foreground flex items-center">
                <Shield className="w-3 h-3 text-primary mr-2" />
                {feature}
              </div>
            ))}
          </div>
        </div>
        
        <Button 
          onClick={() => {
            playSound('click');
            onSelect(course);
          }}
          className="w-full bg-gradient-to-r from-primary to-cyan-500 text-primary-foreground py-3 rounded-lg font-semibold hover:from-cyan-500 hover:to-primary transition-all duration-300 transform hover:scale-105"
        >
          <Shield className="w-4 h-4 mr-2" />
          ACCESS COURSE
        </Button>
      </div>
    </div>
  );
}