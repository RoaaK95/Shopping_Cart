import type { FunctionComponent } from 'react';
import wishlistIcon from '../../assets/wishlist.png';
import classes from './WishlistWidget.module.scss';

interface WishlistWidgetProps {
  wishlistCount: number;
}

export const WishlistWidget: FunctionComponent<WishlistWidgetProps> = ({ wishlistCount }) => {
  return (
    <div className={classes.widget}>
      <img src={wishlistIcon} alt="Wishlist" className={classes.icon} />
      <span className={classes.count}>{wishlistCount}</span>
    </div>
  );
};
