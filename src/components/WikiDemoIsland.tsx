import WikiDemo from './WikiDemo';

interface Props {
  locale?: 'en' | 'zh';
}

export default function WikiDemoIsland({ locale = 'en' }: Props) {
  return (
    <WikiDemo locale={locale} />
  );
}