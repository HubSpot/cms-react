import pageStyles from '../styles/page.module.css';

type HeroProps = {
  children: React.ReactNode;
  size?: 'large' | 'small';
};

export default function Hero({ children, size = 'large' }: HeroProps) {
  return (
    <div
      className={pageStyles.hero}
      style={{ height: `${size === 'large' ? '50' : '20'}vh` }}
    >
      {children}
    </div>
  );
}
