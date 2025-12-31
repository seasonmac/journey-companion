import { Bed, MapPin, Navigation } from 'lucide-react';
import { Accommodation } from '@/data/tripData';
import { Button } from '@/components/ui/button';

interface AccommodationCardProps {
  accommodation: Accommodation;
}

const AccommodationCard = ({ accommodation }: AccommodationCardProps) => {
  const handleNavigate = () => {
    if (accommodation.coordinates) {
      // {{BizHandler}} - 调用地图导航到住宿地点
      const { lat, lng } = accommodation.coordinates;
      window.open(`https://maps.google.com/?q=${lat},${lng}`, '_blank');
    }
  };

  return (
    <div className="overflow-hidden rounded-2xl bg-card shadow-card border border-border/50">
      <div className="p-4">
        {/* Header */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-nature-light text-secondary">
            <Bed className="h-4 w-4" />
          </div>
          <span className="text-sm font-medium text-muted-foreground">今日住宿</span>
        </div>

        {/* Content */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h4 className="text-base font-semibold text-foreground mb-1 truncate">
              {accommodation.name}
            </h4>
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
              <span className="text-sm truncate">{accommodation.address}</span>
            </div>
          </div>

          {accommodation.coordinates && (
            <Button 
              variant="nature" 
              size="touch"
              onClick={handleNavigate}
              className="flex-shrink-0"
            >
              <Navigation className="h-4 w-4 mr-1.5" />
              导航
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccommodationCard;
