import { MapPin, Camera, Utensils, Bed, Car, Star, Navigation } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Activity, getSpotById } from '@/data/tripData';
import { Button } from '@/components/ui/button';

interface TimelineItemProps {
  activity: Activity;
  isLast: boolean;
  index: number;
}

const TimelineItem = ({ activity, isLast, index }: TimelineItemProps) => {
  const navigate = useNavigate();
  const spot = activity.spotId ? getSpotById(activity.spotId) : undefined;

  const getActivityIcon = () => {
    switch (activity.type) {
      case 'travel':
        return <Car className="h-4 w-4" />;
      case 'scenic':
        return <MapPin className="h-4 w-4" />;
      case 'photo':
        return <Camera className="h-4 w-4" />;
      case 'meal':
        return <Utensils className="h-4 w-4" />;
      case 'rest':
        return <Bed className="h-4 w-4" />;
      default:
        return <MapPin className="h-4 w-4" />;
    }
  };

  const getActivityColor = () => {
    switch (activity.type) {
      case 'travel':
        return 'bg-sky-light text-primary';
      case 'scenic':
        return 'bg-nature-light text-secondary';
      case 'photo':
        return 'bg-sunset-glow text-sunset';
      case 'meal':
        return 'bg-sand-warm text-accent';
      case 'rest':
        return 'bg-muted text-muted-foreground';
      default:
        return 'bg-primary/10 text-primary';
    }
  };

  const handleSpotClick = () => {
    if (spot) {
      // {{BizHandler}} - 导航到景点详情页
      navigate(`/spot/${spot.id}`);
    }
  };

  const handleNavigate = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (spot) {
      // {{BizHandler}} - 调用地图导航
      const { lat, lng } = spot.coordinates;
      window.open(`https://maps.google.com/?q=${lat},${lng}`, '_blank');
    }
  };

  return (
    <div 
      className="relative flex gap-4 animate-fade-up"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      {/* Timeline Line */}
      <div className="flex flex-col items-center">
        <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${getActivityColor()} shadow-sm`}>
          {getActivityIcon()}
        </div>
        {!isLast && (
          <div className="w-0.5 flex-1 bg-gradient-to-b from-border to-transparent min-h-[24px]" />
        )}
      </div>

      {/* Content */}
      <div className={`flex-1 pb-6 ${!isLast ? '' : 'pb-0'}`}>
        {/* Time & Must Stop Badge */}
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm font-semibold text-primary">{activity.time}</span>
          {activity.isMustStop && (
            <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-sunset text-accent-foreground">
              <Star className="h-3 w-3" />
              <span className="text-xs font-medium">必停点</span>
            </div>
          )}
        </div>

        {/* Title */}
        <h4 className="text-base font-semibold text-foreground mb-1">
          {activity.title}
        </h4>

        {/* Description */}
        <p className="text-sm text-muted-foreground mb-3">
          {activity.description}
        </p>

        {/* Spot Card (if has spot) */}
        {spot && (
          <div 
            className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 border border-border/50 cursor-pointer transition-all hover:bg-muted active:scale-[0.98]"
            onClick={handleSpotClick}
          >
            <div className="h-14 w-14 rounded-lg overflow-hidden flex-shrink-0">
              <img 
                src={spot.imageUrl} 
                alt={spot.name}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">
                {spot.name}
              </p>
              <p className="text-xs text-muted-foreground">
                建议停留 {spot.suggestedDuration}
              </p>
            </div>
            <Button 
              variant="sky" 
              size="icon"
              onClick={handleNavigate}
              className="flex-shrink-0"
            >
              <Navigation className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TimelineItem;
