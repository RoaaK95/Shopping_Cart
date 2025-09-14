import type { Product } from '../../types';
import { type FunctionComponent, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CurrencyFormatter } from '../CurrencyFormatter/CurrencyFormatter';
import classes from './products.module.scss';
import { Loader } from '../Loader';
import { ProductsFilter } from '../ProductsFilter/ProductsFilter';
import { AddToCartButton } from '../AddToCartButton/AddToCartButton';
import { AddToWishlistButton } from '../AddToWishlistButton';
import { RemoveFromWishlistButton } from '../RemoveFromWishlistButton';
const API_URL = 'https://dummyjson.com/products'



interface ProductsProps {
  addToWishlist?: (product: Product) => void;
  removeFromWishlist?: (productId: number) => void;
  wishlist?: { [productId: string]: Product };
}

export const Products: FunctionComponent<ProductsProps> = ({ addToWishlist, removeFromWishlist, wishlist }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedRating, setSelectedRating] = useState<number | null>(null);

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
    } catch {
      setError(true);
      setIsLoading(false);
    }
  }

  const isInWishlist = (productId: number): boolean =>
    wishlist ? Object.keys(wishlist).includes(productId.toString()) : false;

  if (error) {
    return <h3 className={classes.error}>An error occurred when fetching data. Please check the API and try again.</h3>;
  }

  if (isLoading) {
    return <Loader />;
  }

  const filteredProducts = products.filter(product => {
    const categoryMatch = selectedCategory === 'all' || product.category === selectedCategory;
    const ratingMatch = selectedRating === null || Math.floor(product.rating) === selectedRating;
    return categoryMatch && ratingMatch;
  });

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
              <Link to={`/product/${product.id}`}>
                <img src={product.thumbnail} alt={product.title} />
                <h3>{product.title}</h3>
              </Link>
              <p>Price: <CurrencyFormatter amount={product.price} /></p>
              <div className={classes.actionRow}>
                <AddToCartButton product={product} />
                {addToWishlist && removeFromWishlist && (
                  isInWishlist(product.id) ? (
                    <RemoveFromWishlistButton
                      productId={product.id}
                      removeFromWishlist={removeFromWishlist}
                    />
                  ) : (
                    <AddToWishlistButton
                      product={product}
                      addToWishlist={addToWishlist}
                      isInWishlist={false}
                    />
                  )
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};