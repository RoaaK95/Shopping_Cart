import type { Product } from '../../types';
import React from 'react';
import classes from './AddToWishlistButton.module.scss';

interface AddToWishlistButtonProps {
  product: Product;
  addToWishlist: (product: Product) => void;
  isInWishlist: boolean;
}

export const AddToWishlistButton: React.FC<AddToWishlistButtonProps> = ({ product, addToWishlist, isInWishlist }) => (
  <button
    className={classes.heartBtn}
    aria-label="Add to wishlist"
    onClick={() => addToWishlist(product)}
    disabled={isInWishlist}
  >
    <svg
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill={isInWishlist ? 'red' : 'none'}
      stroke="red"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ display: 'block' }}
    >
      <path d="M12 21s-6.5-5.2-9-8.3C1.2 10.1 1 7.6 3.1 5.7 5.2 3.8 8.1 4.2 10 6.1l2 2 2-2c1.9-1.9 4.8-2.3 6.9-.4 2.1 1.9 1.9 4.4.1 7C18.5 15.8 12 21 12 21z" />
    </svg>
  </button>
);
