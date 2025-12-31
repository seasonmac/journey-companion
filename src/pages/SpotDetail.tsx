import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Clock, Navigation, Tag, Share2 } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import { Button } from '@/components/ui/button';
import { getSpotById } from '@/data/tripData';

const SpotDetail = () => {
  const { spotId } = useParams<{ spotId: string }>();
  const navigate = useNavigate();
  
  // {{BizData}} - 获取景点详情数据
  const spot = spotId ? getSpotById(spotId) : undefined;

  if (!spot) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center p-6">
          <p className="text-muted-foreground mb-4">未找到该景点</p>
          <button 
            onClick={() => navigate(-1)}
            className="text-primary font-medium"
          >
            返回上一页
          </button>
        </div>
      </div>
    );
  }

  const handleNavigate = () => {
    // {{BizHandler}} - 调用地图导航到景点
    const { lat, lng } = spot.coordinates;
    window.open(`https://maps.google.com/?q=${lat},${lng}`, '_blank');
  };

  const handleShare = () => {
    // {{BizHandler}} - 分享景点信息
    if (navigator.share) {
      navigator.share({
        title: spot.name,
        text: spot.description,
        url: window.location.href,
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>{spot.name} - 景点详情</title>
        <meta name="description" content={spot.description} />
      </Helmet>

      <div className="min-h-screen bg-background">
        <PageHeader 
          title={spot.name}
          rightAction={
            <Button variant="ghost" size="icon" onClick={handleShare}>
              <Share2 className="h-5 w-5" />
            </Button>
          }
        />

        {/* Hero Image */}
        <div className="relative aspect-[16/10] overflow-hidden">
          <img 
            src={spot.imageUrl}
            alt={spot.name}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
        </div>

        {/* Content */}
        <main className="px-5 py-6 -mt-12 relative">
          {/* Title Card */}
          <div className="bg-card rounded-2xl shadow-elevated p-5 mb-6 animate-scale-in">
            <h1 className="text-2xl font-bold text-foreground mb-2">
              {spot.name}
            </h1>
            
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {spot.tags.map((tag) => (
                <span 
                  key={tag}
                  className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium bg-sky-light text-primary rounded-full"
                >
                  <Tag className="h-3 w-3" />
                  {tag}
                </span>
              ))}
            </div>

            {/* Duration */}
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="h-4 w-4 text-secondary" />
              <span className="text-sm">建议游览时间：{spot.suggestedDuration}</span>
            </div>
          </div>

          {/* Description */}
          <section className="mb-8 animate-fade-up" style={{ animationDelay: '100ms' }}>
            <h2 className="text-lg font-bold text-foreground mb-3">景点介绍</h2>
            <p className="text-base text-muted-foreground leading-relaxed">
              {spot.description}
            </p>
          </section>

          {/* Tips */}
          <section className="mb-8 animate-fade-up" style={{ animationDelay: '200ms' }}>
            <h2 className="text-lg font-bold text-foreground mb-3">游览提示</h2>
            <div className="space-y-3">
              <TipItem 
                emoji="📸"
                title="拍照建议"
                content="早晨或傍晚光线最佳，适合拍摄风光大片"
              />
              <TipItem 
                emoji="🧥"
                title="穿着建议"
                content="高海拔地区温差大，建议携带保暖外套"
              />
              <TipItem 
                emoji="⚠️"
                title="注意事项"
                content="请注意安全，遵守景区规定，保护环境"
              />
            </div>
          </section>
        </main>

        {/* Fixed Bottom Navigation Button */}
        <div className="fixed bottom-0 left-0 right-0 p-4 glass border-t border-border/50 safe-bottom">
          <Button 
            variant="sky" 
            size="xl"
            onClick={handleNavigate}
            className="w-full"
          >
            <Navigation className="h-5 w-5 mr-2" />
            开始导航
          </Button>
        </div>

        {/* Spacer for fixed button */}
        <div className="h-24 safe-bottom" />
      </div>
    </>
  );
};

interface TipItemProps {
  emoji: string;
  title: string;
  content: string;
}

const TipItem = ({ emoji, title, content }: TipItemProps) => (
  <div className="flex gap-3 p-4 rounded-xl bg-muted/50">
    <span className="text-xl">{emoji}</span>
    <div className="flex-1">
      <h4 className="text-sm font-semibold text-foreground mb-0.5">{title}</h4>
      <p className="text-sm text-muted-foreground">{content}</p>
    </div>
  </div>
);

export default SpotDetail;
