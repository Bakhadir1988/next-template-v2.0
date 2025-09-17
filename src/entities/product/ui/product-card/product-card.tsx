"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { TProduct } from "../../model/product.type";
import styles from "./product-card.module.css";
import { useProductActions } from "@/features/product/use-product-actions";

import { ProductImage } from "./components/product-image";
import { ProductInfo } from "./components/product-info";
import { ProductCharacteristics } from "./components/product-characteristics";
import { ProductPurchase } from "./components/product-purchase";

type ProductCardProps = {
  product: TProduct;
};

export const ProductCard = ({ product }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const { handleAddToFavorites, handleAddToComparison, handleQuickView } =
    useProductActions(product.id);

  return (
    <motion.div
      className={styles.card}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <ProductImage
        product={product}
        isHovered={isHovered}
        onFavorite={handleAddToFavorites}
        onCompare={handleAddToComparison}
        onQuickView={handleQuickView}
      />
      <div className={styles.info}>
        <ProductInfo product={product} />
        <ProductCharacteristics characteristics={product.characteristics} />
        <ProductPurchase product={product} />
      </div>
    </motion.div>
  );
};
