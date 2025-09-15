import type { FC } from 'react';
import classes from './ProductPrice.module.scss';

interface ProductPriceProps {
  price: number;
  discountPercentage?: number;
}

export const ProductPrice: FC<ProductPriceProps> = ({ price, discountPercentage }) => {
  const hasDiscount = !!discountPercentage;
  const discountedPrice = hasDiscount
    ? (price * (100 - discountPercentage!) / 100).toFixed(2)
    : price.toFixed(2);

  return (
    <div className={classes.price}>
      {hasDiscount ? (
        <>
          <span className={classes.priceafter}>${discountedPrice}</span>
          <span className={classes.pricebefore}>${price.toFixed(2)}</span>
          <p className={classes.discount}>Save {Math.floor(discountPercentage!)}%</p>
        </>
      ) : (
        `$${price.toFixed(2)}`
      )}
    </div>
  );
}
