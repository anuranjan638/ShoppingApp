import * as React from 'react';
import { IProduct } from '../ProductList/IProduct';
import { Link } from 'react-router-dom';
import styles from './Cart.module.scss';

const Cart: React.FC = () => {
  const [cart, setCart] = React.useState<IProduct[]>([]);

  React.useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(storedCart);
  }, []);

  const removeFromCart = (productId: number) => {
    const updatedCart = cart.filter(product => product.Id !== productId);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  if (cart.length === 0) {
    return <div>Your cart is empty</div>;
  }

  return (
    <div className={styles.cart}>
      <h2>Cart</h2>
      <ul>
        {cart.map(product => (
          <li key={product.Id}>
            <h3>{product.Title}</h3>
            <p>Price: {product.Price}</p>
            <button onClick={() => removeFromCart(product.Id)}>Remove</button>
          </li>
        ))}
      </ul>
      <Link to="/checkout">
        <button>Proceed to Checkout</button>
      </Link>
    </div>
  );
};

export default Cart;
