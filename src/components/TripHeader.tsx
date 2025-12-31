import { Calendar, Users, Wallet, MapPin, Compass } from 'lucide-react';
import { Trip } from '@/data/tripData';

interface TripHeaderProps {
  trip: Trip;
}

const TripHeader = ({ trip }: TripHeaderProps) => {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return `${date.getMonth() + 1}月${date.getDate()}日`;
  };

  return (
    <div className="relative overflow-hidden rounded-2xl bg-card shadow-card">
      {/* Gradient Background */}
      <div className="absolute inset-0 gradient-sky opacity-10" />
      
      {/* Content */}
      <div className="relative p-5">
        {/* Title */}
        <div className="flex items-start gap-3 mb-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl gradient-sky shadow-soft">
            <Compass className="h-6 w-6 text-primary-foreground" />
          </div>
          <div className="flex-1">
            <h1 className="text-xl font-bold text-foreground leading-tight">
              {trip.name}
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              {trip.style.slice(0, 2).join(' · ')}
            </p>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-3">
          <InfoItem 
            icon={<MapPin className="h-4 w-4" />}
            label="出发地"
            value={trip.departure}
          />
          <InfoItem 
            icon={<Calendar className="h-4 w-4" />}
            label="出行日期"
            value={`${formatDate(trip.startDate)} - ${formatDate(trip.endDate)}`}
          />
          <InfoItem 
            icon={<Users className="h-4 w-4" />}
            label="同行人数"
            value={`${trip.travelers}人`}
          />
          <InfoItem 
            icon={<Wallet className="h-4 w-4" />}
            label="预算/人"
            value={`¥${trip.budgetPerPerson.toLocaleString()}`}
          />
        </div>

        {/* Route Preview */}
        <div className="mt-4 pt-4 border-t border-border">
          <p className="text-xs text-muted-foreground mb-2">路线概览</p>
          <div className="flex items-center flex-wrap gap-1.5">
            {trip.route.map((city, index) => (
              <span key={city} className="flex items-center">
                <span className="px-2.5 py-1 text-sm font-medium bg-sky-light text-primary rounded-full">
                  {city}
                </span>
                {index < trip.route.length - 1 && (
                  <span className="text-muted-foreground mx-1">→</span>
                )}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

interface InfoItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

const InfoItem = ({ icon, label, value }: InfoItemProps) => (
  <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-muted/50">
    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
      {icon}
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="text-sm font-semibold text-foreground truncate">{value}</p>
    </div>
  </div>
);

export default TripHeader;
