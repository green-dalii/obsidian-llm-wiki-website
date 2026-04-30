import Footer from './Footer';

interface Props {
  locale?: 'en' | 'zh';
}

export default function FooterIsland({ locale = 'en' }: Props) {
  return (
    <Footer locale={locale} />
  );
}