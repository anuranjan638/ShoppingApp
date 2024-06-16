import * as React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Navigation.module.scss'; // Import CSS module

const NavigationMenu = () => {
  const location = useLocation(); // Hook to get current location

  return (
    <nav className={styles.nav}> {/* Apply 'nav' class from CSS module */}
      <ul>
        <li>
          <Link to="/" className={location.pathname === '/' ? styles.active : ''}>Home</Link>
        </li>
        <li>
          <Link to="/cart" className={location.pathname === '/cart' ? styles.active : ''}>Cart</Link>
        </li>
        <li>
          <Link to="/checkout" className={location.pathname === '/checkout' ? styles.active : ''}>Checkout</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavigationMenu;
