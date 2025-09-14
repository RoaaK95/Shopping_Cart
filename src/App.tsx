import { BrowserRouter, Route, Routes } from 'react-router-dom';
 import useLocalStorageState from 'use-local-storage-state';
import { Header } from './components/Header';
import { Products } from './components/Products/Products';
import { Footer } from './components/Footer';
import { Cart } from './components/Cart';
import { Wishlist } from './components/Wishlist';
import { ProductDetails } from './components/ProductDetails';
import './app.module.scss';
import type { Product } from './types';
import { AddToCartButton } from './components/AddToCartButton';


function App() {
  // Wishlist state in localStorage
  const [wishlist, setWishlist] = useLocalStorageState<{ [productId: string]: Product }>('wishlist', {});

  const addToWishlist = (product: Product) => {
    setWishlist((prev) => ({ ...prev, [product.id]: product }));
  };
  const removeFromWishlist = (productId: number) => {
    setWishlist((prev) => {
      const updated = { ...prev };
      delete updated[productId];
      return updated;
    });
  };

  return (
    <BrowserRouter>
  <Header wishlistCount={Object.keys(wishlist ?? {}).length} />
      <main>
        <Routes>
          <Route
            path="/"
            element={<Products addToWishlist={addToWishlist} removeFromWishlist={removeFromWishlist} wishlist={wishlist ?? {}} />}
          />
          <Route
            path="/cart"
            element={<Cart />}
          />
          <Route
            path="/wishlist"
            element={<Wishlist wishlist={wishlist ?? {}} removeFromWishlist={removeFromWishlist} />}
          />
             <Route
            path="/product/:id"
            element={<ProductDetails addToWishlist={addToWishlist} removeFromWishlist={removeFromWishlist} wishlist={wishlist} />}
          />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App