'use client';

import Link from 'next/link';

import { useFavorites } from '@/features/product/favorites-provider';

import styles from './header.module.scss';

export const Header = () => {
  const { products } = useFavorites();
  const favoritesCount = products.length;

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/">Лого</Link>
      </div>
      <nav className={styles.nav}>
        <div className={styles.action_item}>
          <Link href="/favorites">Избранное</Link>
          {favoritesCount > 0 && (
            <span className={styles.counter}>{favoritesCount}</span>
          )}
        </div>
        <Link href="/compare">Сравнение</Link>
        <Link href="/cart">Корзина</Link>
      </nav>
    </header>
  );
};
