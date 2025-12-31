import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Calendar, MapPin, Navigation, ChevronLeft, Star, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getDayScheduleById, getSpotById } from '@/data/tripData';

const DayDetail = () => {
  const { dayId } = useParams<{ dayId: string }>();
  const navigate = useNavigate();
  
  const schedule = dayId ? getDayScheduleById(dayId) : undefined;

  if (!schedule) {
    return (
      <div className="w-[600px] h-[600px] bg-background flex items-center justify-center rounded-2xl">
        <div className="text-center p-4">
          <p className="text-white/60 mb-3 text-sm">未找到该日程</p>
          <Button variant="glass" size="sm" onClick={() => navigate('/')}>
            返回首页
          </Button>
        </div>
      </div>
    );
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const weekdays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
    return `${date.getMonth() + 1}月${date.getDate()}日 ${weekdays[date.getDay()]}`;
  };

  const mustStops = schedule.activities.filter(a => a.isMustStop);

  const handleBack = () => {
    navigate('/');
  };

  const handleNavigate = () => {
    if (schedule.accommodation.coordinates) {
      const { lat, lng } = schedule.accommodation.coordinates;
      window.open(`https://maps.google.com/?q=${lat},${lng}`, '_blank');
    }
  };

  const handleSpotNavigate = (spotId: string) => {
    const spot = getSpotById(spotId);
    if (spot) {
      const { lat, lng } = spot.coordinates;
      window.open(`https://maps.google.com/?q=${lat},${lng}`, '_blank');
    }
  };

  return (
    <>
      <Helmet>
        <title>Day {schedule.day}: {schedule.title}</title>
        <meta name="description" content={schedule.routeDescription} />
      </Helmet>

      <div className="w-[600px] h-[600px] overflow-hidden flex flex-col relative rounded-2xl shadow-glass">
        {/* 全屏背景图 */}
        <div className="absolute inset-0">
          <img 
            src={schedule.coverImage}
            alt="背景"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 gradient-dark-overlay" />
        </div>

        {/* 内容层 */}
        <div className="relative z-10 flex flex-col h-full">
          {/* Header - 毛玻璃效果 */}
          <header className="h-12 flex items-center px-4 glass-header flex-shrink-0">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={handleBack}
              className="h-8 w-8 mr-2 text-white hover:bg-white/10"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <div className="flex-1 min-w-0">
              <h1 className="text-sm font-semibold text-white truncate">
                Day {schedule.day} · {schedule.title}
              </h1>
            </div>
          </header>

          {/* 主内容区 */}
          <div className="flex-1 flex p-3 gap-3">
            {/* 左侧 - 信息卡片 */}
            <div className="w-[220px] flex-shrink-0 flex flex-col gap-3">
              {/* 日期路线卡片 */}
              <div className="glass-card rounded-xl p-3">
                <h2 className="text-lg font-bold text-white mb-2">{schedule.subtitle}</h2>
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="h-3.5 w-3.5 text-primary" />
                  <span className="text-xs text-white/80">{formatDate(schedule.date)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-3.5 w-3.5 text-secondary" />
                  <span className="text-xs text-white/60 truncate">{schedule.routeDescription}</span>
                </div>
              </div>

              {/* 今日住宿卡片 */}
              <div className="glass-card rounded-xl p-3 flex-1 flex flex-col bg-secondary/10">
                <p className="text-xs text-secondary font-medium mb-2 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                  今日住宿
                </p>
                <p className="text-sm font-semibold text-white mb-1 leading-tight">
                  {schedule.accommodation.name}
                </p>
                <p className="text-xs text-white/50 mb-3 flex-1">{schedule.accommodation.address}</p>
                {schedule.accommodation.coordinates && (
                  <Button 
                    variant="nature" 
                    size="sm"
                    onClick={handleNavigate}
                    className="w-full"
                  >
                    <Navigation className="h-3.5 w-3.5 mr-1.5" />
                    导航到酒店
                  </Button>
                )}
              </div>
            </div>

            {/* 右侧 - 必停点列表 */}
            <div className="flex-1 glass-card rounded-xl flex flex-col overflow-hidden">
              <div className="px-3 py-2 border-b border-white/10">
                <h2 className="text-sm font-semibold text-white flex items-center gap-1.5">
                  <Star className="h-4 w-4 text-accent" />
                  必停景点 ({mustStops.length})
                </h2>
              </div>

              <div className="flex-1 p-3 space-y-2.5 overflow-hidden">
                {mustStops.map((activity) => {
                  const spot = activity.spotId ? getSpotById(activity.spotId) : undefined;
                  return (
                    <div 
                      key={`${activity.time}-${activity.title}`}
                      className="glass-card rounded-xl overflow-hidden"
                    >
                      {spot && (
                        <div className="relative h-[80px]">
                          <img 
                            src={spot.imageUrl}
                            alt={spot.name}
                            className="h-full w-full object-cover"
                          />
                          <div className="absolute inset-0 gradient-hero" />
                          <div className="absolute top-2 left-2">
                            <span className="glass-tag px-2 py-0.5 text-xs font-medium rounded">
                              {activity.time}
                            </span>
                          </div>
                          <div className="absolute bottom-0 inset-x-0 p-2">
                            <p className="text-sm font-semibold text-white drop-shadow-lg">{activity.title}</p>
                          </div>
                        </div>
                      )}
                      <div className="p-2.5">
                        <p className="text-xs text-white/60 mb-2 line-clamp-2">
                          {activity.description}
                        </p>
                        <div className="flex items-center justify-between">
                          {spot && (
                            <div className="flex items-center gap-1 text-xs text-white/50">
                              <Clock className="h-3 w-3" />
                              <span>{spot.suggestedDuration}</span>
                            </div>
                          )}
                          {spot && (
                            <Button 
                              variant="sky" 
                              size="sm"
                              onClick={() => handleSpotNavigate(spot.id)}
                              className="h-7 text-xs px-2"
                            >
                              <Navigation className="h-3 w-3 mr-1" />
                              导航
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DayDetail;
