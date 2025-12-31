import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  showBack?: boolean;
  rightAction?: React.ReactNode;
}

const PageHeader = ({ title, subtitle, showBack = true, rightAction }: PageHeaderProps) => {
  const navigate = useNavigate();

  const handleBack = () => {
    // {{BizHandler}} - 返回上一页
    navigate(-1);
  };

  return (
    <header className="sticky top-0 z-50 glass border-b border-border/50 safe-top">
      <div className="flex items-center justify-between h-14 px-4">
        {/* Left */}
        <div className="flex items-center gap-3 min-w-0 flex-1">
          {showBack && (
            <Button 
              variant="ghost" 
              size="icon"
              onClick={handleBack}
              className="flex-shrink-0 -ml-2"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
          )}
          <div className="min-w-0">
            <h1 className="text-base font-semibold text-foreground truncate">
              {title}
            </h1>
            {subtitle && (
              <p className="text-xs text-muted-foreground truncate">
                {subtitle}
              </p>
            )}
          </div>
        </div>

        {/* Right */}
        {rightAction && (
          <div className="flex-shrink-0 ml-3">
            {rightAction}
          </div>
        )}
      </div>
    </header>
  );
};

export default PageHeader;
