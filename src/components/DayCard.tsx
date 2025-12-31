import { ChevronRight, MapPin, Camera, Utensils, Bed } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { DaySchedule } from '@/data/tripData';

interface DayCardProps {
  schedule: DaySchedule;
  index: number;
}

const DayCard = ({ schedule, index }: DayCardProps) => {
  const navigate = useNavigate();
  
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const weekdays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
    return `${date.getMonth() + 1}/${date.getDate()} ${weekdays[date.getDay()]}`;
  };

  // Count activity types
  const scenicCount = schedule.activities.filter(a => a.type === 'scenic' || a.type === 'photo').length;
  const mealCount = schedule.activities.filter(a => a.type === 'meal').length;
  const mustStops = schedule.activities.filter(a => a.isMustStop).length;

  const handleClick = () => {
    // {{BizHandler}} - 导航到日程详情页
    navigate(`/day/${schedule.id}`);
  };

  return (
    <div 
      className="group relative overflow-hidden rounded-2xl bg-card shadow-card transition-all duration-300 hover:shadow-elevated active:scale-[0.98] cursor-pointer animate-fade-up"
      style={{ animationDelay: `${index * 100}ms` }}
      onClick={handleClick}
    >
      {/* Cover Image */}
      <div className="relative h-36 overflow-hidden">
        <img 
          src={schedule.coverImage} 
          alt={schedule.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 gradient-hero" />
        
        {/* Day Badge */}
        <div className="absolute top-3 left-3">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full glass-dark">
            <span className="text-sm font-bold text-primary-foreground">Day {schedule.day}</span>
            <span className="text-xs text-primary-foreground/80">{formatDate(schedule.date)}</span>
          </div>
        </div>

        {/* Must Stop Badge */}
        {mustStops > 0 && (
          <div className="absolute top-3 right-3">
            <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-sunset text-accent-foreground">
              <Camera className="h-3 w-3" />
              <span className="text-xs font-medium">{mustStops}个必停点</span>
            </div>
          </div>
        )}

        {/* Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-lg font-bold text-primary-foreground leading-tight">
            {schedule.title}
          </h3>
          <p className="text-sm text-primary-foreground/80 mt-0.5">
            {schedule.subtitle}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Route */}
        <div className="flex items-center gap-2 mb-3">
          <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
          <p className="text-sm text-muted-foreground truncate">
            {schedule.routeDescription}
          </p>
        </div>

        {/* Stats & Action */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <StatBadge icon={<Camera className="h-3.5 w-3.5" />} count={scenicCount} label="景点" />
            <StatBadge icon={<Utensils className="h-3.5 w-3.5" />} count={mealCount} label="餐饮" />
            <StatBadge icon={<Bed className="h-3.5 w-3.5" />} count={1} label="住宿" />
          </div>
          
          <div className="flex items-center gap-1 text-primary">
            <span className="text-sm font-medium">查看详情</span>
            <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </div>
    </div>
  );
};

interface StatBadgeProps {
  icon: React.ReactNode;
  count: number;
  label: string;
}

const StatBadge = ({ icon, count, label }: StatBadgeProps) => (
  <div className="flex items-center gap-1 text-muted-foreground">
    {icon}
    <span className="text-xs">{count}{label}</span>
  </div>
);

export default DayCard;
