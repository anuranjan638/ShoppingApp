import * as React from 'react';
//import styles from './ShoppingApp.module.scss';
//import type { IShoppingAppProps } from './IShoppingAppProps';
//import { escape } from '@microsoft/sp-lodash-subset';

import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Header/Header';
import ProductList from './ProductList/ProductList';
import ProductDetail from './ProductDetail/ProductDetail';
import Cart from './Cart/Cart';
import Checkout from './Checkout/Checkout';
import NavigationMenu from './Navigation/Navigation';

const ShoppingApp: React.FC = () => {
  return (
    <Router>
      <Header />
      <NavigationMenu/>
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </Router>
  );
};

export default ShoppingApp;