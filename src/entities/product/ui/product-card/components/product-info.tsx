import React from "react";
import { StarFilledIcon, StarIcon } from "@radix-ui/react-icons";
import { TProduct } from "../../../model/product.type";
import styles from "../product-card.module.css";

type ProductInfoProps = {
  product: TProduct;
};

export const ProductInfo = ({ product }: ProductInfoProps) => {
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= product.rating) {
        stars.push(<StarFilledIcon key={i} className={styles.star} />);
      } else {
        stars.push(<StarIcon key={i} className={styles.star} />);
      }
    }
    return stars;
  };

  return (
    <>
      <p className={styles.article}>Артикул: {product.article}</p>
      <h3 className={styles.title}>{product.title}</h3>
      <div className={styles.rating}>{renderStars()}</div>
    </>
  );
};
