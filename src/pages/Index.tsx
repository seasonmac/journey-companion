import { Helmet } from 'react-helmet-async';
import TripHeader from '@/components/TripHeader';
import DayCard from '@/components/DayCard';
import { tripInfo, daySchedules } from '@/data/tripData';

const Index = () => {
  return (
    <>
      <Helmet>
        <title>{tripInfo.name} - 新疆自驾游助手</title>
        <meta name="description" content={`${tripInfo.name}，${tripInfo.travelers}人${tripInfo.route.join(' → ')}，深度体验新疆自然风光`} />
      </Helmet>

      <div className="min-h-screen bg-background safe-top safe-bottom">
        {/* Header */}
        <header className="sticky top-0 z-50 glass border-b border-border/50">
          <div className="flex items-center justify-center h-14 px-4">
            <h1 className="text-base font-semibold text-foreground">
              🏞 新疆自驾游助手
            </h1>
          </div>
        </header>

        {/* Content */}
        <main className="px-4 py-5 space-y-5">
          {/* Trip Overview */}
          <section className="animate-fade-up">
            <TripHeader trip={tripInfo} />
          </section>

          {/* Day Cards */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-foreground">日程安排</h2>
              <span className="text-sm text-muted-foreground">
                共{daySchedules.length}天
              </span>
            </div>
            
            <div className="space-y-4">
              {daySchedules.map((schedule, index) => (
                <DayCard 
                  key={schedule.id} 
                  schedule={schedule}
                  index={index}
                />
              ))}
            </div>
          </section>

          {/* Highlights */}
          <section className="animate-fade-up" style={{ animationDelay: '400ms' }}>
            <h2 className="text-lg font-bold text-foreground mb-3">行程亮点</h2>
            <div className="flex flex-wrap gap-2">
              {tripInfo.highlights.map((highlight) => (
                <span 
                  key={highlight}
                  className="px-3 py-1.5 text-sm font-medium bg-sunset-glow text-sunset rounded-full"
                >
                  ✨ {highlight}
                </span>
              ))}
            </div>
          </section>
        </main>

        {/* Bottom Safe Area Spacer */}
        <div className="h-6" />
      </div>
    </>
  );
};

export default Index;
