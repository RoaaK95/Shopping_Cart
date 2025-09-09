
import type { FunctionComponent } from 'react';
import type { Product } from '../Products/Products';
import classes from './wishlist.module.scss';

interface WishlistProps {
  wishlist: { [productId: string]: Product };
  removeFromWishlist: (productId: number) => void;
}

export const Wishlist: FunctionComponent<WishlistProps> = ({ wishlist, removeFromWishlist }) => {
  const wishlistItems = Object.values(wishlist || {});

  if (wishlistItems.length === 0) {
    return <div className={classes.empty}>Your wishlist is empty.</div>;
  }

  return (
    <section className={classes.wishlistPage}>
      <h1>Wishlist</h1>
      <div className={classes.container}>
        {wishlistItems.map(product => (
          <div className={classes.product} key={product.id}>
            <img src={product.thumbnail} alt={product.title} />
            <h3>{product.title}</h3>
            <p>Price: {product.price}</p>
            <button onClick={() => removeFromWishlist(product.id)}>Remove</button>
          </div>
        ))}
      </div>
    </section>
  );
};
