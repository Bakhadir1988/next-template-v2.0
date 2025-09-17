import { ProductCard, TProduct } from "@/entities/product";
import { ArticleCard, TArticle } from "@/entities/article";

const mockProduct: TProduct = {
  id: 1,
  imageUrl: "/file.svg", // Using an existing image from public
  title: "Ноутбук NextGen Pro 15",
  price: 125000,
  characteristics: [
    { name: "Процессор", value: "Intel Core i9" },
    { name: "Память", value: "32GB DDR5" },
    { name: "Накопитель", value: "1TB NVMe SSD" },
  ],
  rating: 4,
  article: "NXT-PRO-15-I9",
};

const mockArticle: TArticle = {
  id: "a1",
  slug: "nextjs-14-features",
  imageUrl: "/globe.svg", // Using an existing image from public
  title: "Главные фичи Next.js 14 для современного веба",
  excerpt:
    "Next.js 14 принес с собой множество улучшений, включая Turbopack для ускорения локальной разработки, Server Actions для упрощения мутаций данных и улучшенный рендеринг на стороне сервера. Эти нововведения меняют подход к созданию быстрых и масштабируемых веб-приложений.",
};

export default function Home() {
  return (
    <main
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        gap: "40px",
        minHeight: "100vh",
        backgroundColor: "#f9f9f9",
        padding: "40px",
        flexWrap: "wrap",
      }}
    >
      <ProductCard product={mockProduct} />
      <ArticleCard article={mockArticle} />
    </main>
  );
}
