import { CompareProvider } from '@/features/product/compare-provider';
import { FavoritesProvider } from '@/features/product/favorites-provider';
import QueryProvider from '@/shared/lib/query-provider';
import { SessionProvider } from '@/shared/lib/session-provider';

export function Providers({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryProvider>
      <FavoritesProvider>
        <CompareProvider>
          <SessionProvider />
          {children}
        </CompareProvider>
      </FavoritesProvider>
    </QueryProvider>
  );
}
