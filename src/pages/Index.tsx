import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { Calendar, Users, Wallet, MapPin, Compass, ChevronRight, Camera } from 'lucide-react';
import { tripInfo, daySchedules } from '@/data/tripData';

const Index = () => {
  const navigate = useNavigate();

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return `${date.getMonth() + 1}月${date.getDate()}日`;
  };

  const handleDayClick = (dayId: string) => {
    // {{BizHandler}} - 导航到日程详情页
    navigate(`/day/${dayId}`);
  };

  return (
    <>
      <Helmet>
        <title>{tripInfo.name} - 新疆自驾游助手</title>
        <meta name="description" content={`${tripInfo.name}，${tripInfo.travelers}人${tripInfo.route.join(' → ')}`} />
      </Helmet>

      <div className="w-[600px] h-[600px] bg-background overflow-hidden flex flex-col">
        {/* Header - 固定高度 44px */}
        <header className="h-11 flex items-center justify-center bg-card border-b border-border flex-shrink-0">
          <h1 className="text-sm font-semibold text-foreground">🏞 新疆自驾游助手</h1>
        </header>

        {/* 主内容区 - 剩余高度 556px */}
        <div className="flex-1 flex">
          {/* 左侧 - 行程信息卡片 宽度 220px */}
          <div className="w-[220px] flex-shrink-0 p-3 bg-sky-light/50 flex flex-col">
            {/* 行程标题 */}
            <div className="flex items-center gap-2 mb-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg gradient-sky shadow-soft flex-shrink-0">
                <Compass className="h-4 w-4 text-primary-foreground" />
              </div>
              <div className="min-w-0">
                <h2 className="text-base font-bold text-foreground leading-tight truncate">
                  {tripInfo.name}
                </h2>
                <p className="text-xs text-muted-foreground truncate">
                  {tripInfo.style[0]}
                </p>
              </div>
            </div>

            {/* 信息网格 */}
            <div className="grid grid-cols-2 gap-2 mb-3">
              <InfoItem 
                icon={<MapPin className="h-3 w-3" />}
                label="出发地"
                value={tripInfo.departure}
              />
              <InfoItem 
                icon={<Calendar className="h-3 w-3" />}
                label="日期"
                value={`${formatDate(tripInfo.startDate)}`}
              />
              <InfoItem 
                icon={<Users className="h-3 w-3" />}
                label="人数"
                value={`${tripInfo.travelers}人`}
              />
              <InfoItem 
                icon={<Wallet className="h-3 w-3" />}
                label="预算/人"
                value={`¥${tripInfo.budgetPerPerson}`}
              />
            </div>

            {/* 路线 */}
            <div className="mb-3">
              <p className="text-xs text-muted-foreground mb-1.5">路线概览</p>
              <div className="flex flex-wrap gap-1">
                {tripInfo.route.map((city, index) => (
                  <span key={city} className="flex items-center">
                    <span className="px-1.5 py-0.5 text-xs font-medium bg-primary/10 text-primary rounded">
                      {city}
                    </span>
                    {index < tripInfo.route.length - 1 && (
                      <span className="text-muted-foreground text-xs mx-0.5">→</span>
                    )}
                  </span>
                ))}
              </div>
            </div>

            {/* 行程亮点 */}
            <div className="flex-1">
              <p className="text-xs text-muted-foreground mb-1.5">行程亮点</p>
              <div className="flex flex-wrap gap-1">
                {tripInfo.highlights.map((highlight) => (
                  <span 
                    key={highlight}
                    className="px-1.5 py-0.5 text-xs font-medium bg-sunset-glow text-sunset rounded"
                  >
                    ✨ {highlight}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* 右侧 - 日程卡片列表 */}
          <div className="flex-1 p-3 grid grid-cols-2 gap-2.5 content-start">
            {daySchedules.map((schedule) => {
              const mustStops = schedule.activities.filter(a => a.isMustStop).length;
              return (
                <div 
                  key={schedule.id}
                  className="group relative overflow-hidden rounded-xl bg-card shadow-card cursor-pointer transition-all duration-200 hover:shadow-elevated active:scale-[0.98]"
                  onClick={() => handleDayClick(schedule.id)}
                >
                  {/* 封面图 */}
                  <div className="relative h-[90px]">
                    <img 
                      src={schedule.coverImage} 
                      alt={schedule.title}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 gradient-hero" />
                    
                    {/* Day 标签 */}
                    <div className="absolute top-1.5 left-1.5">
                      <span className="px-1.5 py-0.5 text-xs font-bold bg-primary text-primary-foreground rounded">
                        Day {schedule.day}
                      </span>
                    </div>

                    {/* 必停点标签 */}
                    {mustStops > 0 && (
                      <div className="absolute top-1.5 right-1.5">
                        <span className="flex items-center gap-0.5 px-1 py-0.5 text-xs bg-sunset text-accent-foreground rounded">
                          <Camera className="h-2.5 w-2.5" />
                          {mustStops}
                        </span>
                      </div>
                    )}

                    {/* 标题 */}
                    <div className="absolute bottom-1 left-1.5 right-1.5">
                      <p className="text-sm font-semibold text-primary-foreground leading-tight truncate">
                        {schedule.title}
                      </p>
                    </div>
                  </div>

                  {/* 底部信息 */}
                  <div className="p-2">
                    <p className="text-xs text-muted-foreground truncate mb-1">
                      {schedule.routeDescription}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">
                        {schedule.activities.length}个活动
                      </span>
                      <ChevronRight className="h-3.5 w-3.5 text-primary transition-transform group-hover:translate-x-0.5" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

interface InfoItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

const InfoItem = ({ icon, label, value }: InfoItemProps) => (
  <div className="p-2 rounded-lg bg-card/80">
    <div className="flex items-center gap-1 text-muted-foreground mb-0.5">
      {icon}
      <span className="text-xs">{label}</span>
    </div>
    <p className="text-xs font-semibold text-foreground truncate">{value}</p>
  </div>
);

export default Index;
