import Header from './Header';

interface Props {
  currentLocale?: 'en' | 'zh';
}

export default function HeaderIsland({ currentLocale = 'en' }: Props) {
  return (
    <Header currentLocale={currentLocale} />
  );
}