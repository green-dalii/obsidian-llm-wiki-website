import Hero from './Hero';

interface Props {
  locale?: 'en' | 'zh';
}

export default function HeroIsland({ locale = 'en' }: Props) {
  return (
    <Hero locale={locale} />
  );
}