import * as React from 'react';
import { sp } from '@pnp/sp/presets/all';
import { IProduct } from './IProduct';
import { Link } from 'react-router-dom';
import styles from './ProductList.module.scss';

const ProductList: React.FC = () => {
    const [products, setProducts] = React.useState<IProduct[]>([]);

    React.useEffect(() => {
        const fetchProducts = async () => {
            try {
                const items: IProduct[] = await sp.web.lists.getByTitle('Products').items.get();
                setProducts(items);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div className={styles.productList}>
            {products.map(product => (
                <div key={product.Id} className={styles.productCard}>
                    <h2>{product.Title}</h2>
                    <p>{product.Price}</p>
                    <Link to={`/product/${product.Id}`}>View Details</Link>
                </div>
            ))}
        </div>
    );
}

export default ProductList;

