import Link from 'next/link';

const { COMPANY_NAME, SITE_NAME } = process.env;

/**
 * 页脚组件 - 高对比度艺术质感设计
 * 采用温润工艺配色方案，增强品牌识别度和视觉层次
 */
export default function Footer() {
  const currentYear = new Date().getFullYear();
  const copyrightDate = 2023;
  const copyrightName = COMPANY_NAME || SITE_NAME || '温润工艺';

  return (
    <footer className="relative">
      {/* 顶部装饰线 */}
      <div className="absolute top-0 left-0 right-0 h-px" />
      
      <div className="w-full mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* 品牌信息 */}
          <div className="md:col-span-2 space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-fuguang-400 to-chizhi-400 rounded-xl flex items-center justify-center shadow-elegant">
                <span className="text-shanfan-50 font-bold text-xl font-chinese">温</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-primary font-chinese">
                  {copyrightName}
                </h3>
                <p className="text-base text-secondary font-chinese">
                  传承千年匠心之美
                </p>
              </div>
            </div>
            
            <p className="text-lg text-secondary leading-relaxed max-w-md font-chinese">
              每一件作品都承载着深厚的文化底蕴和艺术价值，在现代生活中重拾传统匠心，让品质与美学完美融合。
            </p>
            
            {/* 联系信息 */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-fuguang-400 rounded-full"></div>
                <span className="text-secondary">客服热线：400-888-9999</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-chizhi-400 rounded-full"></div>
                <span className="text-secondary">邮箱：service@wenrungongyi.com</span>
              </div>
            </div>
          </div>
          
          {/* 快速链接 */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-primary font-chinese">
              快速导航
            </h4>
            <nav className="space-y-4">
              <Link 
                href="/search" 
                className="block text-secondary hover:text-primary font-medium"
              >
                精选推荐
              </Link>
              <Link 
                href="/about" 
                className="block text-secondary hover:text-primary font-medium"
              >
                品牌故事
              </Link>
              <Link 
                href="/contact" 
                className="block text-secondary hover:text-primary font-medium"
              >
                联系我们
              </Link>
            </nav>
          </div>
          
          {/* 服务支持 */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-primary font-chinese">
              服务支持
            </h4>
            <nav className="space-y-4">
              <Link 
                href="/policies/terms-of-service" 
                className="block text-secondary hover:text-primary font-medium"
              >
                服务条款
              </Link>
              <Link 
                href="/policies/refund-policy" 
                className="block text-secondary hover:text-primary font-medium"
              >
                退换政策
              </Link>
              <Link 
                href="/policies/privacy-policy" 
                className="block text-secondary hover:text-primary font-medium"
              >
                隐私政策
              </Link>
            </nav>
          </div>
        </div>
        
        {/* 分割线 */}
        <div className="mt-16 pt-8 border-t border-fuguang-200/50 dark:border-yuepo-700/50">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* 版权信息 */}
            <div className="text-center md:text-left">
              <p className="text-secondary text-base">
                © {copyrightDate === currentYear ? currentYear : `${copyrightDate}-${currentYear}`}{' '}
                <span className="font-semibold">{copyrightName}</span>
                {'. '}
                <span className="font-chinese">匠心传承，品质保证</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* 底部装饰渐变 */}
      {/* <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-fuguang-400/20 via-chizhi-400/30 to-fuguang-400/20" /> */}
    </footer>
  );
}
