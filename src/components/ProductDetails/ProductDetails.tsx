import { useEffect, useState, type FunctionComponent } from "react"
import { useParams } from "react-router-dom"
import { Loader } from "../Loader";
import classes from './ProductDetails.module.scss'
import { AddToCartButton } from '../AddToCartButton/AddToCartButton';
import type { Product, ProductDetail, Review } from "../../types";
import { AddToWishlistButton } from "../AddToWishlistButton";
import { RemoveFromWishlistButton } from "../RemoveFromWishlistButton";
import { Reviews } from "../Reviews/Reviews";
import { ProductInfo } from "./ProductInfo";
import { ProductMeta } from "./ProductMeta";


 


interface ProductDetailsProps {
  addToWishlist?: (product: Product) => void;
  removeFromWishlist?: (productId: number) => void;
  wishlist?: { [productId: string]: Product };
}

export const ProductDetails: FunctionComponent<ProductDetailsProps> = ({ addToWishlist, removeFromWishlist, wishlist }) => {
  const isInWishlist = (productId: number): boolean =>
    wishlist ? Object.keys(wishlist).includes(productId.toString()) : false;
  const API_URL: string = 'https://dummyjson.com/products'
  const { id } = useParams();
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState<Review[]>([])

  useEffect(() => {
    fetch(`${API_URL}/${id}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data);
        setLoading(false);
        setReviews(data.reviews || [])
      });
  }, [id])

  if (loading) return <Loader />
  if (!product) return <div>Product not found</div>
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
      <h1>{product.title}</h1>
      <h3>{product.description}</h3>
  <ProductInfo product={product} />
  <ProductMeta meta={product.meta} qrCodeClassName={classes.qrCode} />
      <div className={classes.images}>
        {product.images.map((image, idx) => (
          <img key={image} src={image} alt={`Product image ${idx + 1}`} />
        ))}
      </div>
  <Reviews reviews={reviews} />
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
  )
}
