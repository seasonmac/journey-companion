import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { Calendar, Users, Wallet, MapPin, Compass, ChevronRight, Camera } from 'lucide-react';
import { tripInfo, daySchedules } from '@/data/tripData';

// 导入背景图
import day1Duku from '@/assets/day1-duku.jpg';

const Index = () => {
  const navigate = useNavigate();

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return `${date.getMonth() + 1}月${date.getDate()}日`;
  };

  const handleDayClick = (dayId: string) => {
    navigate(`/day/${dayId}`);
  };

  return (
    <>
      <Helmet>
        <title>{tripInfo.name} - 新疆自驾游助手</title>
        <meta name="description" content={`${tripInfo.name}，${tripInfo.travelers}人${tripInfo.route.join(' → ')}`} />
      </Helmet>

      <div className="w-[600px] h-[600px] overflow-hidden flex flex-col relative rounded-2xl shadow-glass">
        {/* 全屏背景图 */}
        <div className="absolute inset-0">
          <img 
            src={day1Duku}
            alt="背景"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 gradient-dark-overlay" />
        </div>

        {/* 内容层 */}
        <div className="relative z-10 flex flex-col h-full">
          {/* Header - 毛玻璃效果 */}
          <header className="h-11 flex items-center justify-center glass-header flex-shrink-0">
            <h1 className="text-sm font-semibold text-white">🏞 新疆自驾游助手</h1>
          </header>

          {/* 主内容区 */}
          <div className="flex-1 flex p-3 gap-3">
            {/* 左侧 - 行程信息毛玻璃卡片 */}
            <div className="w-[200px] flex-shrink-0 glass-card rounded-2xl p-3 flex flex-col">
              {/* 行程标题 */}
              <div className="flex items-center gap-2 mb-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/60 backdrop-blur-sm flex-shrink-0">
                  <Compass className="h-4 w-4 text-white" />
                </div>
                <div className="min-w-0">
                  <h2 className="text-sm font-bold text-white leading-tight truncate">
                    {tripInfo.name}
                  </h2>
                  <p className="text-xs text-white/60 truncate">
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
                <p className="text-xs text-white/50 mb-1.5">路线概览</p>
                <div className="flex flex-wrap gap-1">
                  {tripInfo.route.map((city, index) => (
                    <span key={city} className="flex items-center">
                      <span className="glass-tag px-1.5 py-0.5 text-xs font-medium rounded">
                        {city}
                      </span>
                      {index < tripInfo.route.length - 1 && (
                        <span className="text-white/40 text-xs mx-0.5">→</span>
                      )}
                    </span>
                  ))}
                </div>
              </div>

              {/* 行程亮点 */}
              <div className="flex-1">
                <p className="text-xs text-white/50 mb-1.5">行程亮点</p>
                <div className="flex flex-wrap gap-1">
                  {tripInfo.highlights.map((highlight) => (
                    <span 
                      key={highlight}
                      className="px-1.5 py-0.5 text-xs font-medium bg-accent/30 backdrop-blur-sm border border-accent/30 text-white rounded"
                    >
                      ✨ {highlight}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* 右侧 - 日程卡片网格 */}
            <div className="flex-1 grid grid-cols-2 gap-2.5 content-start">
              {daySchedules.map((schedule) => {
                const mustStops = schedule.activities.filter(a => a.isMustStop).length;
                return (
                  <div 
                    key={schedule.id}
                    className="group relative overflow-hidden rounded-xl glass-card cursor-pointer transition-all duration-200 hover:bg-white/20 active:scale-[0.98]"
                    onClick={() => handleDayClick(schedule.id)}
                  >
                    {/* 封面图 */}
                    <div className="relative h-[85px]">
                      <img 
                        src={schedule.coverImage} 
                        alt={schedule.title}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 gradient-hero" />
                      
                      {/* Day 标签 */}
                      <div className="absolute top-1.5 left-1.5">
                        <span className="px-1.5 py-0.5 text-xs font-bold bg-primary/70 backdrop-blur-sm text-white rounded border border-primary/40">
                          Day {schedule.day}
                        </span>
                      </div>

                      {/* 必停点标签 */}
                      {mustStops > 0 && (
                        <div className="absolute top-1.5 right-1.5">
                          <span className="flex items-center gap-0.5 px-1 py-0.5 text-xs bg-accent/70 backdrop-blur-sm text-white rounded border border-accent/40">
                            <Camera className="h-2.5 w-2.5" />
                            {mustStops}
                          </span>
                        </div>
                      )}

                      {/* 标题 */}
                      <div className="absolute bottom-1 left-1.5 right-1.5">
                        <p className="text-sm font-semibold text-white leading-tight truncate drop-shadow-lg">
                          {schedule.title}
                        </p>
                      </div>
                    </div>

                    {/* 底部信息 */}
                    <div className="p-2">
                      <p className="text-xs text-white/60 truncate mb-1">
                        {schedule.routeDescription}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-white/50">
                          {schedule.activities.length}个活动
                        </span>
                        <ChevronRight className="h-3.5 w-3.5 text-white/60 transition-transform group-hover:translate-x-0.5" />
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

interface InfoItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

const InfoItem = ({ icon, label, value }: InfoItemProps) => (
  <div className="p-2 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10">
    <div className="flex items-center gap-1 text-white/50 mb-0.5">
      {icon}
      <span className="text-xs">{label}</span>
    </div>
    <p className="text-xs font-semibold text-white truncate">{value}</p>
  </div>
);

export default Index;
