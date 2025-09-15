import React from "react";
import classes from "./ProductDetails.module.scss";

interface ProductImageProps {
  images: string[];
  thumbnail: string;
  mainImageIdx: number;
  setMainImageIdx: (idx: number) => void;
  title: string;
}

export const ProductImage: React.FC<ProductImageProps> = ({
  images,
  thumbnail,
  mainImageIdx,
  setMainImageIdx,
  title,
}) => (
  <div className={classes.productImage}>
    <img
      src={images[mainImageIdx] || thumbnail}
      alt={title}
    />
    {/* Thumbnails */}
    {images.length > 1 && (
      <div className={classes.thumbnails}>
        {images.map((img, idx) => (
          <img
            key={img}
            src={img}
            alt={`Thumbnail ${idx + 1}`}
            className={mainImageIdx === idx ? classes.activeThumbnail : ""}
            onClick={() => setMainImageIdx(idx)}
          />
        ))}
      </div>
    )}
  </div>
);
