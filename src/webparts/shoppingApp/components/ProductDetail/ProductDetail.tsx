import * as React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { sp } from '@pnp/sp';
import { IProduct } from '../ProductList/IProduct';
import styles from './ProductDetail.module.scss';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = React.useState<IProduct | null>(null);
  const navigate = useNavigate(); // useNavigate hook for navigation

  const addToCart = (product: IProduct) => {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Product added to cart!');
    navigate('/cart'); // Navigate to the Cart page after adding the product
  };

  React.useEffect(() => {
    const fetchProduct = async () => {
      try{
      const item: IProduct = await sp.web.lists.getByTitle('Products').items.getById(Number(id)).get();
      setProduct(item);
      } catch(error){
        console.error('Error fetching product details:', error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.productDetail}>
      <h2>{product.Title}</h2>
      <p>Price: {product.Price}</p>
      <p>{product.Description}</p>
      <button onClick={() => addToCart(product)}>Add to Cart</button>
    </div>
  );
};

export default ProductDetail;
