import Header from './Header';

interface Props {
  currentLocale?: string;
}

export default function HeaderIsland({ currentLocale = 'en' }: Props) {
  return (
    <Header currentLocale={currentLocale} />
  );
}