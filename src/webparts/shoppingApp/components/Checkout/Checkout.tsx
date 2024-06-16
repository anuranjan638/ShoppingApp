import * as React from 'react';
import { sp } from '@pnp/sp'; // Import sp from PnPjs
import { IProduct } from '../ProductList/IProduct';
import styles from './Checkout.module.scss';

import { Modal } from '@fluentui/react';
import { useState } from 'react';

const Checkout: React.FC = () => {
  const [cart, setCart] = React.useState<IProduct[]>([]);
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  React.useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(storedCart);
  }, []);

  const handleCheckout = async () => {
    try {

      // Construct the item to be saved in SharePoint list
      const item = {
        Title: name, // Assuming 'Title' is a required field in your SharePoint list
        Email: email,
        Address: address,
        //Cart: JSON.stringify(cart), // Convert cart array to JSON string
        TotalAmount: calculateTotalAmount(), // Implement calculateTotalAmount function
      };
      //console.log(JSON.stringify(cart))

      // Add item to SharePoint list using PnPjs
      await sp.web.lists.getByTitle("Order").items.add(item);

      setModalMessage('Order placed successfully!');
      setModalIsOpen(true);
      localStorage.removeItem('cart');
      // Optionally reset form fields or redirect to another page
    } catch (error) {
      console.error('Error saving order to SharePoint:', error);
      setModalMessage('Failed to place order. Please try again.');
      setModalIsOpen(true);
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const calculateTotalAmount = () => {
    return cart.reduce((total, product) => total + product.Price, 0);
  };

  const totalAmount = cart.reduce((total, product) => total + product.Price, 0);

  return (
    <div className={styles.checkout}>
      <h2>Checkout</h2>
      <div className={styles.orderSummary}>
        <h3>Order Summary</h3>
        <ul>
          {cart.map(product => (
            <li key={product.Id}>
              <h4>{product.Title}</h4>
              <p>Price: {product.Price}</p>
            </li>
          ))}
        </ul>
        <p className={styles.totalAmount}>Total Amount: {totalAmount}</p>
      </div>
      <div className={styles.shippingDetails}>
        <h3>Shipping Details</h3>
        <form onSubmit={e => { e.preventDefault(); handleCheckout(); }}>
          <div>
            <label>Name:</label>
            <input type="text" value={name} onChange={e => setName(e.target.value)} required />
          </div>
          <div>
            <label>Email:</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
          </div>
          <div>
            <label>Address:</label>
            <textarea value={address} onChange={e => setAddress(e.target.value)} required />
          </div>
          <button type="submit">Place Order</button>
        </form>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onDismiss={closeModal}
      >
        <h2>{modalMessage}</h2>
        <button onClick={closeModal}>Close</button>
      </Modal>
    </div>
  );
};

export default Checkout;
