import Image from 'next/image';

type ProductImageProps = {
  images: string[];
  alt: string;
};

export const ProductImage = ({ images, alt }: ProductImageProps) => {
  const imageUrl = images[0]
    ? process.env.NEXT_PUBLIC_IMAGE_URL + images[0]
    : '/image-placeholder.png';
  return <Image src={imageUrl} alt={alt} width={350} height={350} priority />;
};
