import { useEffect, useState, type FunctionComponent } from "react";
import { useParams } from "react-router-dom";
import { Loader } from "../Loader";
import classes from "./ProductDetails.module.scss";
import { AddToCartButton } from "../AddToCartButton/AddToCartButton";
import type { Product, ProductDetail, Review } from "../../types";
import { AddToWishlistButton } from "../AddToWishlistButton";
import { RemoveFromWishlistButton } from "../RemoveFromWishlistButton";
import { Reviews } from "../Reviews/Reviews";
import { ProductInfo } from "./ProductInfo";
import { ProductMeta } from "./ProductMeta";
import { ProductPrice } from "../ProductPrice/ProductPrice";

interface ProductDetailsProps {
  addToWishlist?: (product: Product) => void;
  removeFromWishlist?: (productId: number) => void;
  wishlist?: { [productId: string]: Product };
}

export const ProductDetails: FunctionComponent<ProductDetailsProps> = ({
  addToWishlist,
  removeFromWishlist,
  wishlist,
}) => {
  const isInWishlist = (productId: number): boolean =>
    wishlist ? Object.keys(wishlist).includes(productId.toString()) : false;
  const API_URL: string = "https://dummyjson.com/products";
  const { id } = useParams();
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [mainImageIdx, setMainImageIdx] = useState(0);

  useEffect(() => {
    fetch(`${API_URL}/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
        setReviews(data.reviews || []);
      });
  }, [id]);

  if (loading) return <Loader />;
  if (!product) return <div>Product not found</div>;
  // Avoid redundant product object construction
  const productForAction = {
    id: product.id,
    title: product.title,
    price: product.price,
    thumbnail: product.thumbnail,
    image: product.images[0] || product.thumbnail,
    quantity: product.quantity || 1,
    category: product.category,
    rating: product.rating,
  };

  return (
    <div className={classes.product}>
      <div className={classes.productMain}>
        <div className={classes.productImage}>
          <img
            src={product.images[mainImageIdx] || product.thumbnail}
            alt={product.title}
          />
          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className={classes.thumbnails}>
              {product.images.map((img, idx) => (
                <img
                  key={img}
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  className={
                    mainImageIdx === idx ? classes.activeThumbnail : ""
                  }
                  onClick={() => setMainImageIdx(idx)}
                />
              ))}
            </div>
          )}
          <ProductMeta meta={product.meta} qrCodeClassName={classes.qrCode} />
        </div>
        <div className={classes.productDetails}>
          <p className={classes.tagBox}>
            {product.tags.map((tag) => (
              <span className={classes.tags} key={tag}>
                {tag}
              </span>
            ))}
          </p>
          <h2>{product.title}</h2>
          <ProductPrice
            price={product.price}
            discountPercentage={product.discountPercentage}
          />
          <div className={classes.details}>{product.description}</div>
          <ProductInfo product={product} />
          <div className={classes.actions}>
            <AddToCartButton product={productForAction} />
            {addToWishlist && removeFromWishlist ? (
              isInWishlist(product.id) ? (
                <RemoveFromWishlistButton
                  productId={product.id}
                  removeFromWishlist={removeFromWishlist}
                />
              ) : (
                <AddToWishlistButton
                  product={productForAction}
                  addToWishlist={addToWishlist}
                  isInWishlist={false}
                />
              )
            ) : null}
          </div>
        </div>
      </div>
      <div className={classes.productReviews}>
        <Reviews reviews={reviews} />
      </div>
    </div>
  );
};
