import type { FunctionComponent } from "react";
import type { Product } from "../../types";
import { AddToCartButton } from "../AddToCartButton/AddToCartButton";
import classes from "./wishlist.module.scss";
import { Link } from "react-router-dom";
import { CurrencyFormatter } from "../CurrencyFormatter";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
interface WishlistProps {
  wishlist: { [productId: string]: Product };
  removeFromWishlist: (productId: number) => void;
}

export const Wishlist: FunctionComponent<WishlistProps> = ({
  wishlist,
  removeFromWishlist,
}) => {
  const wishlistItems = Object.values(wishlist || {});
    const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return (
    <section className={classes.wishlist}>
      <h1>Wishlist</h1>
      {wishlistItems.length === 0 ? (
        <div className={classes.empty}>Your wishlist is empty.</div>
      ) : (
        <div className={classes.container}>
          {wishlistItems.map((product) => (
            <div className={classes.product} key={product.id}>
              <Link to={`/product/${product.id}`}>
              <img src={product.thumbnail} alt={product.title} />
              <h3>{product.title}</h3>
              </Link>
              <p>Price: 
              {(()=>{
                let discountedPrice = product.price;
                if(product.discountPercentage) {
                  discountedPrice=Number((product.price *(100 - product.discountPercentage)/100).toFixed(2));
                }
                return <p>{<CurrencyFormatter amount={discountedPrice} />} </p>
              })()}
              </p>
              <button onClick={() => removeFromWishlist(product.id)}>
                Remove
              </button>
              <AddToCartButton product={product} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
