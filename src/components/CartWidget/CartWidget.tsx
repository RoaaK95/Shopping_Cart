 import { type FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";

import shoppingCart from "../../assets/shopping-cart.svg";
import classes from "./CartWidget.module.scss";

interface Props {
  productsCount: number;
}

const CartWidget: FunctionComponent<Props> = ({ productsCount }) => {
  const navigate = useNavigate();

  const navigateToCart = () => {
    navigate("/cart");
  };

  return (
    <>
      <button className={classes.container} onClick={navigateToCart}>
        <span className={classes.productsCount}>{productsCount}</span>
        <img
          src={shoppingCart}
          className={classes.shoppingCart}
          alt="Go to Cart"
        />
      </button>
    </>
  );
};

export default CartWidget;
