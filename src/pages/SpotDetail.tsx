import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Clock, Navigation, Tag, ChevronLeft, Camera, Shirt, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getSpotById } from '@/data/tripData';

const SpotDetail = () => {
  const { spotId } = useParams<{ spotId: string }>();
  const navigate = useNavigate();
  
  // {{BizData}} - 获取景点详情数据
  const spot = spotId ? getSpotById(spotId) : undefined;

  if (!spot) {
    return (
      <div className="w-[600px] h-[600px] bg-background flex items-center justify-center">
        <div className="text-center p-4">
          <p className="text-muted-foreground mb-3 text-sm">未找到该景点</p>
          <Button variant="sky" size="sm" onClick={() => navigate(-1)}>
            返回上一页
          </Button>
        </div>
      </div>
    );
  }

  const handleNavigate = () => {
    // {{BizHandler}} - 调用地图导航到景点
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
          <h1 className="text-sm font-semibold text-foreground truncate flex-1">
            {spot.name}
          </h1>
        </header>

        {/* 主内容区 - 剩余高度 552px */}
        <div className="flex-1 flex">
          {/* 左侧 - 大图展示 */}
          <div className="w-[320px] flex-shrink-0 relative">
            <img 
              src={spot.imageUrl}
              alt={spot.name}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
            
            {/* 底部信息叠加 */}
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h2 className="text-xl font-bold text-foreground mb-2">{spot.name}</h2>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {spot.tags.map((tag) => (
                  <span 
                    key={tag}
                    className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium bg-primary/20 text-primary rounded-full"
                  >
                    <Tag className="h-2.5 w-2.5" />
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4 text-secondary" />
                <span>建议游览 {spot.suggestedDuration}</span>
              </div>
            </div>
          </div>

          {/* 右侧 - 详细信息 */}
          <div className="flex-1 flex flex-col bg-muted/30">
            {/* 景点介绍 */}
            <div className="p-4 bg-card border-b border-border">
              <h3 className="text-sm font-semibold text-foreground mb-2">景点介绍</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {spot.description}
              </p>
            </div>

            {/* 游览提示 */}
            <div className="flex-1 p-4 space-y-3">
              <h3 className="text-sm font-semibold text-foreground">游览提示</h3>
              
              <TipCard 
                icon={<Camera className="h-4 w-4" />}
                iconBg="bg-sunset-glow"
                iconColor="text-sunset"
                title="拍照建议"
                content="早晨或傍晚光线最佳，适合拍摄风光大片"
              />
              
              <TipCard 
                icon={<Shirt className="h-4 w-4" />}
                iconBg="bg-sky-light"
                iconColor="text-primary"
                title="穿着建议"
                content="高海拔温差大，建议携带保暖外套"
              />
              
              <TipCard 
                icon={<AlertTriangle className="h-4 w-4" />}
                iconBg="bg-nature-light"
                iconColor="text-secondary"
                title="注意事项"
                content="遵守景区规定，保护生态环境"
              />
            </div>

            {/* 底部导航按钮 */}
            <div className="p-4 bg-card border-t border-border">
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
  iconColor: string;
  title: string;
  content: string;
}

const TipCard = ({ icon, iconBg, iconColor, title, content }: TipCardProps) => (
  <div className="flex gap-3 p-3 rounded-xl bg-card">
    <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${iconBg} ${iconColor} flex-shrink-0`}>
      {icon}
    </div>
    <div className="flex-1 min-w-0">
      <h4 className="text-xs font-semibold text-foreground mb-0.5">{title}</h4>
      <p className="text-xs text-muted-foreground">{content}</p>
    </div>
  </div>
);

export default SpotDetail;
