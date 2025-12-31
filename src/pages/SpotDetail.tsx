import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Clock, Navigation, Tag, ChevronLeft, Camera, Shirt, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getSpotById } from '@/data/tripData';

const SpotDetail = () => {
  const { spotId } = useParams<{ spotId: string }>();
  const navigate = useNavigate();
  
  const spot = spotId ? getSpotById(spotId) : undefined;

  if (!spot) {
    return (
      <div className="w-[600px] h-[600px] bg-background flex items-center justify-center rounded-2xl">
        <div className="text-center p-4">
          <p className="text-white/60 mb-3 text-sm">未找到该景点</p>
          <Button variant="glass" size="sm" onClick={() => navigate(-1)}>
            返回上一页
          </Button>
        </div>
      </div>
    );
  }

  const handleNavigate = () => {
    const { lat, lng } = spot.coordinates;
    window.open(`https://maps.google.com/?q=${lat},${lng}`, '_blank');
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <>
      <Helmet>
        <title>{spot.name} - 景点详情</title>
        <meta name="description" content={spot.description} />
      </Helmet>

      <div className="w-[600px] h-[600px] overflow-hidden flex flex-col relative rounded-2xl shadow-glass">
        {/* 全屏背景图 */}
        <div className="absolute inset-0">
          <img 
            src={spot.imageUrl}
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
            <h1 className="text-sm font-semibold text-white truncate flex-1">
              {spot.name}
            </h1>
          </header>

          {/* 主内容区 */}
          <div className="flex-1 flex p-3 gap-3">
            {/* 左侧 - 景点信息 */}
            <div className="w-[280px] flex-shrink-0 flex flex-col gap-3">
              {/* 标题卡片 */}
              <div className="glass-card rounded-xl p-4">
                <h2 className="text-xl font-bold text-white mb-3">{spot.name}</h2>
                
                {/* 标签 */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {spot.tags.map((tag) => (
                    <span 
                      key={tag}
                      className="glass-tag inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-full"
                    >
                      <Tag className="h-2.5 w-2.5" />
                      {tag}
                    </span>
                  ))}
                </div>

                {/* 时长 */}
                <div className="flex items-center gap-2 text-white/70">
                  <Clock className="h-4 w-4 text-secondary" />
                  <span className="text-sm">建议游览 {spot.suggestedDuration}</span>
                </div>
              </div>

              {/* 介绍卡片 */}
              <div className="glass-card rounded-xl p-4 flex-1">
                <h3 className="text-sm font-semibold text-white mb-2">景点介绍</h3>
                <p className="text-sm text-white/70 leading-relaxed">
                  {spot.description}
                </p>
              </div>
            </div>

            {/* 右侧 - 游览提示 */}
            <div className="flex-1 flex flex-col gap-3">
              {/* 提示卡片 */}
              <div className="glass-card rounded-xl p-4 flex-1">
                <h3 className="text-sm font-semibold text-white mb-3">游览提示</h3>
                
                <div className="space-y-3">
                  <TipCard 
                    icon={<Camera className="h-4 w-4" />}
                    iconBg="bg-accent/30"
                    title="拍照建议"
                    content="早晨或傍晚光线最佳，适合拍摄风光大片"
                  />
                  
                  <TipCard 
                    icon={<Shirt className="h-4 w-4" />}
                    iconBg="bg-primary/30"
                    title="穿着建议"
                    content="高海拔温差大，建议携带保暖外套"
                  />
                  
                  <TipCard 
                    icon={<AlertTriangle className="h-4 w-4" />}
                    iconBg="bg-secondary/30"
                    title="注意事项"
                    content="遵守景区规定，保护生态环境"
                  />
                </div>
              </div>

              {/* 导航按钮 */}
              <Button 
                variant="sky" 
                size="lg"
                onClick={handleNavigate}
                className="w-full"
              >
                <Navigation className="h-5 w-5 mr-2" />
                开始导航
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

interface TipCardProps {
  icon: React.ReactNode;
  iconBg: string;
  title: string;
  content: string;
}

const TipCard = ({ icon, iconBg, title, content }: TipCardProps) => (
  <div className="flex gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
    <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${iconBg} backdrop-blur-sm text-white flex-shrink-0`}>
      {icon}
    </div>
    <div className="flex-1 min-w-0">
      <h4 className="text-xs font-semibold text-white mb-0.5">{title}</h4>
      <p className="text-xs text-white/60">{content}</p>
    </div>
  </div>
);

export default SpotDetail;
