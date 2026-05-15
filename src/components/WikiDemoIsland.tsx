import WikiDemo from './WikiDemo';

interface Props {
  locale?: string;
}

export default function WikiDemoIsland({ locale = 'en' }: Props) {
  return (
    <WikiDemo locale={locale} />
  );
}