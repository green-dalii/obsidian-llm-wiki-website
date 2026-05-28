import Header from './Header';

interface Props {
  currentLocale?: string;
  isBlog?: boolean;
}

export default function HeaderIsland({ currentLocale = 'en', isBlog = false }: Props) {
  return (
    <Header currentLocale={currentLocale} isBlog={isBlog} />
  );
}