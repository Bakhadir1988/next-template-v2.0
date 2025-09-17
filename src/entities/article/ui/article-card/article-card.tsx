import { truncateText } from "@/shared/lib/truncate-text";
import { TArticle } from "../../model/article.type";
import styles from "./article-card.module.css";
import Link from "next/link";
import Image from "next/image";

type ArticleCardProps = {
  article: TArticle;
};

export const ArticleCard = ({ article }: ArticleCardProps) => {
  const articleUrl = `/articles/${article.slug}`;

  return (
    <article className={styles.card}>
      <Link href={articleUrl} className={styles["image-link"]}>
        <div className={styles["image-wrapper"]}>
          <Image
            src={article.imageUrl}
            alt={article.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className={styles.image}
            priority
          />
        </div>
      </Link>
      <div className={styles.info}>
        <h2 className={styles["title-wrapper"]}>
          <Link href={articleUrl} className={styles.title}>
            {article.title}
          </Link>
        </h2>
        <p className={styles.excerpt}>{truncateText(article.excerpt, 100)}</p>
        <Link href={articleUrl} className={styles["read-more"]}>
          Подробнее →
        </Link>
      </div>
    </article>
  );
};
