import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Calendar, MapPin, Navigation, ChevronLeft, Star, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getDayScheduleById, getSpotById } from '@/data/tripData';

const DayDetail = () => {
  const { dayId } = useParams<{ dayId: string }>();
  const navigate = useNavigate();
  
  // {{BizData}} - 获取日程详情数据
  const schedule = dayId ? getDayScheduleById(dayId) : undefined;

  if (!schedule) {
    return (
      <div className="w-[600px] h-[600px] bg-background flex items-center justify-center">
        <div className="text-center p-4">
          <p className="text-muted-foreground mb-3 text-sm">未找到该日程</p>
          <Button variant="sky" size="sm" onClick={() => navigate('/')}>
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

  // 获取必停点
  const mustStops = schedule.activities.filter(a => a.isMustStop);

  const handleBack = () => {
    navigate('/');
  };

  const handleNavigate = () => {
    // {{BizHandler}} - 调用地图导航到住宿
    if (schedule.accommodation.coordinates) {
      const { lat, lng } = schedule.accommodation.coordinates;
      window.open(`https://maps.google.com/?q=${lat},${lng}`, '_blank');
    }
  };

  const handleSpotNavigate = (spotId: string) => {
    const spot = getSpotById(spotId);
    if (spot) {
      // {{BizHandler}} - 调用地图导航到景点
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

      <div className="w-[600px] h-[600px] bg-background overflow-hidden flex flex-col">
        {/* Header - 固定高度 48px */}
        <header className="h-12 flex items-center px-4 bg-card border-b border-border flex-shrink-0">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={handleBack}
            className="h-8 w-8 mr-2"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <div className="flex-1 min-w-0">
            <h1 className="text-sm font-semibold text-foreground truncate">
              Day {schedule.day} · {schedule.title}
            </h1>
          </div>
        </header>

        {/* 主内容区 - 剩余高度 552px */}
        <div className="flex-1 flex">
          {/* 左侧 - 封面图和基本信息 */}
          <div className="w-[240px] flex-shrink-0 flex flex-col">
            {/* 封面图 */}
            <div className="relative h-[160px]">
              <img 
                src={schedule.coverImage}
                alt={schedule.title}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 gradient-hero" />
              <div className="absolute bottom-2 left-3 right-3">
                <p className="text-lg font-bold text-primary-foreground leading-tight">
                  {schedule.subtitle}
                </p>
              </div>
            </div>

            {/* 日期路线信息 */}
            <div className="p-3 bg-card border-b border-border">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="h-3.5 w-3.5 text-primary" />
                <span className="text-xs text-foreground">{formatDate(schedule.date)}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 text-secondary" />
                <span className="text-xs text-muted-foreground truncate">{schedule.routeDescription}</span>
              </div>
            </div>

            {/* 今日住宿 */}
            <div className="p-3 bg-nature-light flex-1">
              <p className="text-xs text-secondary font-medium mb-2">今日住宿</p>
              <p className="text-sm font-semibold text-foreground mb-1 leading-tight">
                {schedule.accommodation.name}
              </p>
              <p className="text-xs text-muted-foreground mb-3">{schedule.accommodation.address}</p>
              {schedule.accommodation.coordinates && (
                <Button 
                  variant="nature" 
                  size="sm"
                  onClick={handleNavigate}
                  className="w-full h-9"
                >
                  <Navigation className="h-3.5 w-3.5 mr-1.5" />
                  导航到酒店
                </Button>
              )}
            </div>
          </div>

          {/* 右侧 - 必停点列表 */}
          <div className="flex-1 flex flex-col bg-muted/30">
            <div className="px-3 py-2 border-b border-border bg-card">
              <h2 className="text-sm font-semibold text-foreground flex items-center gap-1.5">
                <Star className="h-4 w-4 text-sunset" />
                必停景点 ({mustStops.length})
              </h2>
            </div>

            <div className="flex-1 p-3 space-y-3">
              {mustStops.map((activity) => {
                const spot = activity.spotId ? getSpotById(activity.spotId) : undefined;
                return (
                  <div 
                    key={`${activity.time}-${activity.title}`}
                    className="bg-card rounded-xl overflow-hidden shadow-card"
                  >
                    {spot && (
                      <div className="relative h-[100px]">
                        <img 
                          src={spot.imageUrl}
                          alt={spot.name}
                          className="h-full w-full object-cover"
                        />
                        <div className="absolute top-2 left-2">
                          <span className="px-2 py-0.5 text-xs font-medium bg-primary text-primary-foreground rounded-full">
                            {activity.time}
                          </span>
                        </div>
                        <div className="absolute bottom-0 inset-x-0 gradient-hero p-2">
                          <p className="text-sm font-semibold text-primary-foreground">{activity.title}</p>
                        </div>
                      </div>
                    )}
                    <div className="p-2.5">
                      <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                        {activity.description}
                      </p>
                      <div className="flex items-center justify-between">
                        {spot && (
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
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
    </>
  );
};

export default DayDetail;
