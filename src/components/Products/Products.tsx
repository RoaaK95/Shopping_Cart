
import { type FunctionComponent, useEffect, useState } from 'react';
import useLocalStorageState from 'use-local-storage-state';
import { CurrencyFormatter } from '../CurrencyFormatter/CurrencyFormatter';
import classes from './products.module.scss';
import { Loader } from '../Loader';
import { ProductsFilter } from '../ProductsFilter/ProductsFilter';
const API_URL = 'https://dummyjson.com/products'

export type Product = {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  image: string;
  quantity: number;
  category: string;
  rating: number
};

export interface CartProps {
  [productId: string]: Product;
}

interface ProductsProps {
  addToWishlist?: (product: Product) => void;
  removeFromWishlist?: (productId: number) => void;
  wishlist?: { [productId: string]: Product };
}

export const Products: FunctionComponent<ProductsProps> = ({ addToWishlist, removeFromWishlist, wishlist }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState(false);
  const [cart, setCart] = useLocalStorageState<CartProps>('cart', {});
  const[selectedCategory, setSelectedCategory] = useState('all');
  const[selectedRating, setSelectedRating] = useState<number | null>(null);
  useEffect(() => {
    fetchData(API_URL);
  }, []);

  async function fetchData(url: string) {
    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setProducts(data.products);
        setIsLoading(false);
      } else {
        setError(true);
        setIsLoading(false);
      }
    } catch (error) {
      setError(true);
      setIsLoading(false);
    }
  }

  const addToCart = (product: Product): void => {
    product.quantity = 1;
    setCart((prevCart) => ({
      ...prevCart,
      [product.id]: product,
    }));
  };

  const isInCart = (productId: number): boolean => Object.keys(cart || {}).includes(productId.toString());
  const isInWishlist = (productId: number): boolean => wishlist ? Object.keys(wishlist).includes(productId.toString()) : false;

  if (error) {
    return <h3 className={classes.error}>An error occurred when fetching data. Please check the API and try again.</h3>;
  }

  if (isLoading) {
    return <Loader />;
  }
  const filteredProducts = products.filter(product=>{
    const categoryMatch = selectedCategory === 'all' || product.category === selectedCategory;
    const ratingMatch = selectedRating === null || Math.floor(product.rating) === selectedRating;
    return categoryMatch && ratingMatch;
  })
  return (
    <section className={classes.productPage}>
      <h1>Products</h1>
      <ProductsFilter 
      selectedCategory={selectedCategory}
      onCategoryChange={setSelectedCategory}
      selectedRating={selectedRating}
      onRatingChange={setSelectedRating}
      />
      <div className={classes.container}>
        {filteredProducts.length === 0 ? (
          <p className={classes.nullTxt}>No products found</p>
        ) : (
          filteredProducts.map(product => (
            <div className={classes.product} key={product.id}>
              <img src={product.thumbnail} alt={product.title} />
              <h3>{product.title}</h3>
              <p>Price: <CurrencyFormatter amount={product.price} /></p>
              <div className={classes.actionRow}>
                <button className={classes.addToCartBtn} disabled={isInCart(product.id)} onClick={() => addToCart(product)}>Add to Cart</button>
                {addToWishlist && removeFromWishlist && (
                  <button
                    className={classes.heartBtn}
                    aria-label={isInWishlist(product.id) ? 'Remove from wishlist' : 'Add to wishlist'}
                    onClick={() =>
                      isInWishlist(product.id)
                        ? removeFromWishlist(product.id)
                        : addToWishlist(product)
                    }
                  >
                    <svg
                      width="26"
                      height="26"
                      viewBox="0 0 24 24"
                      fill={isInWishlist(product.id) ? 'red' : 'none'}
                      stroke="red"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{ display: 'block' }}
                    >
                      <path d="M12 21s-6.5-5.2-9-8.3C1.2 10.1 1 7.6 3.1 5.7 5.2 3.8 8.1 4.2 10 6.1l2 2 2-2c1.9-1.9 4.8-2.3 6.9-.4 2.1 1.9 1.9 4.4.1 7C18.5 15.8 12 21 12 21z" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};