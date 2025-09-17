import React from 'react';

import { TProduct } from '../../../model/product.type';
import styles from '../product-card.module.css';

type ProductCharacteristicsProps = {
  characteristics: TProduct['characteristics'];
};

export const ProductCharacteristics = ({
  characteristics,
}: ProductCharacteristicsProps) => {
  return (
    <ul className={styles.characteristics}>
      {characteristics.map((char, index) => (
        <li key={index} className={styles.characteristic}>
          <span className={styles['char-name']}>{char.name}:</span>
          <span className={styles['char-value']}>{char.value}</span>
        </li>
      ))}
    </ul>
  );
};
