'use client';

import {
  HeartIcon,
  LayersIcon,
  PersonIcon,
  ReaderIcon,
  RocketIcon,
} from '@radix-ui/react-icons';
import Link from 'next/link';

import { useCompare } from '@/features/product/compare-provider';
import { useFavorites } from '@/features/product/favorites-provider';
import { Container } from '@/shared/ui/container';

import styles from './header.module.scss';

export const Header = () => {
  const { products: favoriteProducts } = useFavorites();
  const { products: compareProducts } = useCompare();
  const favoritesCount = favoriteProducts.length;
  const compareCount = compareProducts.length;

  return (
    <header className={styles.header}>
      <Container className={styles.container}>
        <Link href="/" className={styles.logo}>
          <RocketIcon />
          <span>Лого</span>
        </Link>
        <nav className={styles.nav}>
          <ul className={styles.nav_list}>
            <li className={styles.nav_item}>
              <Link href="/catalog">Каталог</Link>
            </li>
          </ul>
        </nav>
        <ul className={styles.action_list}>
          <li className={styles.action_item}>
            <Link href="/compare">
              <LayersIcon />
              {compareCount > 0 && (
                <span className={styles.counter}>{compareCount}</span>
              )}
            </Link>
          </li>
          <li className={styles.action_item}>
            <Link href="/favorites">
              <HeartIcon />
              {favoritesCount > 0 && (
                <span className={styles.counter}>{favoritesCount}</span>
              )}
            </Link>
          </li>
          <li className={styles.action_item}>
            <Link href="/cart">
              <ReaderIcon />
            </Link>
          </li>
          <li className={styles.action_item}>
            <Link href="/profile">
              <PersonIcon />
            </Link>
          </li>
        </ul>
      </Container>
    </header>
  );
};
