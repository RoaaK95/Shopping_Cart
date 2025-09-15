import { useIsMobile } from "./useIsMobile";
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
import { ProductImage } from "./ProductImage";
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

  // Scroll to top when product changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const isMobile = useIsMobile();
  if (loading) return <Loader />;
  if (!product) return <div>Product not found</div>;
  const discountedPrice = product.discountPercentage
    ? Number(
        ((product.price * (100 - product.discountPercentage)) / 100).toFixed(2)
      )
    : product.price;
  const productForAction = {
    id: product.id,
    title: product.title,
    price: discountedPrice,
    thumbnail: product.thumbnail,
    image: product.images[0] || product.thumbnail,
    quantity: product.quantity || 1,
    category: product.category,
    rating: product.rating,
  };

  return (
    <div className={classes.product}>
      <div className={classes.productMain}>
        {!isMobile && (
          <div className={classes.leftSection}>
            <ProductImage
              images={product.images}
              thumbnail={product.thumbnail}
              mainImageIdx={mainImageIdx}
              setMainImageIdx={setMainImageIdx}
              title={product.title}
            />
            <ProductMeta meta={product.meta} qrCodeClassName={classes.qrCode} />
          </div>
        )}
        <div className={classes.productDetails}>
          <p className={classes.tagBox}>
            {product.tags.map((tag) => (
              <span className={classes.tags} key={tag}>
                {tag}
              </span>
            ))}
          </p>
          <h2>{product.title}</h2>
          
          {isMobile && (
            <ProductImage
              images={product.images}
              thumbnail={product.thumbnail}
              mainImageIdx={mainImageIdx}
              setMainImageIdx={setMainImageIdx}
              title={product.title}
            />
          )}
          <ProductPrice
            price={product.price}
            discountPercentage={product.discountPercentage}
          />
          <div className={classes.details}>{product.description}</div>
          <ProductInfo product={product} />
          {isMobile && (
            <ProductMeta meta={product.meta} qrCodeClassName={classes.qrCode} />)}

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
