import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Calendar, MapPin } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import TimelineItem from '@/components/TimelineItem';
import AccommodationCard from '@/components/AccommodationCard';
import { getDayScheduleById } from '@/data/tripData';

const DayDetail = () => {
  const { dayId } = useParams<{ dayId: string }>();
  const navigate = useNavigate();
  
  // {{BizData}} - 获取日程详情数据
  const schedule = dayId ? getDayScheduleById(dayId) : undefined;

  if (!schedule) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center p-6">
          <p className="text-muted-foreground mb-4">未找到该日程</p>
          <button 
            onClick={() => navigate('/')}
            className="text-primary font-medium"
          >
            返回首页
          </button>
        </div>
      </div>
    );
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const weekdays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
    return `${date.getMonth() + 1}月${date.getDate()}日 ${weekdays[date.getDay()]}`;
  };

  return (
    <>
      <Helmet>
        <title>Day {schedule.day}: {schedule.title} - 新疆自驾游</title>
        <meta name="description" content={`${schedule.title}，${schedule.routeDescription}`} />
      </Helmet>

      <div className="min-h-screen bg-background">
        <PageHeader 
          title={`Day ${schedule.day}`}
          subtitle={schedule.title}
        />

        {/* Hero Section */}
        <div className="relative h-48 overflow-hidden">
          <img 
            src={schedule.coverImage}
            alt={schedule.title}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 gradient-hero" />
          
          {/* Content Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <h1 className="text-2xl font-bold text-primary-foreground mb-1">
              {schedule.title}
            </h1>
            <p className="text-base text-primary-foreground/90">
              {schedule.subtitle}
            </p>
          </div>
        </div>

        {/* Info Bar */}
        <div className="flex items-center gap-4 px-5 py-4 bg-card border-b border-border">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="h-4 w-4 text-primary" />
            <span className="text-sm">{formatDate(schedule.date)}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground flex-1 min-w-0">
            <MapPin className="h-4 w-4 text-secondary flex-shrink-0" />
            <span className="text-sm truncate">{schedule.routeDescription}</span>
          </div>
        </div>

        {/* Timeline */}
        <main className="px-5 py-6">
          <h2 className="text-lg font-bold text-foreground mb-5">今日行程</h2>
          
          <div className="space-y-0">
            {schedule.activities.map((activity, index) => (
              <TimelineItem 
                key={`${activity.time}-${index}`}
                activity={activity}
                isLast={index === schedule.activities.length - 1}
                index={index}
              />
            ))}
          </div>

          {/* Accommodation */}
          <div className="mt-8">
            <AccommodationCard accommodation={schedule.accommodation} />
          </div>
        </main>

        {/* Bottom Safe Area Spacer */}
        <div className="h-8 safe-bottom" />
      </div>
    </>
  );
};

export default DayDetail;
