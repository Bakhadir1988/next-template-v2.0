import React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useAddToCart } from "@/features/product/use-add-to-cart";
import { TProduct } from "../../../model/product.type";
import styles from "../product-card.module.css";

const MotionLink = motion(Link);

type ProductPurchaseProps = {
  product: TProduct;
};

export const ProductPurchase = ({ product }: ProductPurchaseProps) => {
  const {
    isAddedToCart,
    quantity,
    handleAddToCart,
    handleIncreaseQuantity,
    handleDecreaseQuantity,
  } = useAddToCart(product.id);

  return (
    <>
      <div className={styles["price-wrapper"]}>
        <p className={styles.price}>
          {product.price.toLocaleString("ru-RU")} ₽
        </p>
      </div>

      <div className={styles.actions}>
        <AnimatePresence mode="popLayout">
          {isAddedToCart ? (
            <MotionLink
              key="inCart"
              href="/cart"
              className={styles["in-cart-link"]}
              initial={{ opacity: 0, x: "-100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ type: "spring", stiffness: 400, damping: 40 }}
            >
              {`В корзине: ${quantity}`}
            </MotionLink>
          ) : (
            <motion.div
              key="addToCart"
              className={styles["add-to-cart-container"]}
              initial={false}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ type: "spring", stiffness: 400, damping: 40 }}
            >
              <div className={styles["quantity-selector"]}>
                <button
                  type="button"
                  className={styles["quantity-button"]}
                  onClick={handleDecreaseQuantity}
                >
                  -
                </button>
                <input
                  type="text"
                  value={quantity}
                  readOnly
                  className={styles["quantity-input"]}
                />
                <button
                  type="button"
                  className={styles["quantity-button"]}
                  onClick={handleIncreaseQuantity}
                >
                  +
                </button>
              </div>
              <button
                type="button"
                className={styles["add-to-cart-button"]}
                onClick={handleAddToCart}
              >
                В корзину
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <button type="button" className={styles["buy-now-button"]}>
        Купить в 1 клик
      </button>
    </>
  );
};
