import { type FunctionComponent } from "react";
import useLocalStorageState from "use-local-storage-state";
import type { Product, CartProps } from "../../types";
import classes from "./AddToCartButton.module.scss";


interface AddToCartButtonProps {
  product: Product;
}

export const AddToCartButton: FunctionComponent<AddToCartButtonProps> = ({
  product,
}) => {
  const [cart, setCart] = useLocalStorageState<CartProps>("cart", {});

  const isInCart = Object.keys(cart || {}).includes(product.id.toString());

  const addToCart = () => {
    const productWithQuantity = { ...product, quantity: 1 };
    setCart((prevCart) => ({
      ...prevCart,
      [product.id]: productWithQuantity,
    }));
  };

  return (
    <button 
    className={classes.addToCartBtn}
      disabled={isInCart}
      onClick={addToCart}
      style={{ marginRight: "8px" }}
    >
      Add to Cart
    </button>
  );
};
