import { useDispatch, useSelector } from 'react-redux';
import ProductItem from './ProductItem';
import classes from './Products.module.css';
import { useEffect } from 'react';
import { productActions } from '../../store/product';
import { cartActions } from '../../store/cart';

const Products = () => {
  const dispatch = useDispatch();
  const products = useSelector(({ product }) => product.products);

  useEffect(() => {
    dispatch(productActions.loaderProductos());
  }, []);

  const onAddCartHandler = ({ title, description, price, id }) => {
    const item = { title, description, price, id };
    dispatch(cartActions.addCart(item));
  };

  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {products.map(({ title, description, price, id }) => (
          <ProductItem
            title={title}
            price={price}
            description={description}
            onClickToAddCart={() =>
              onAddCartHandler({
                title,
                description,
                price,
                id,
              })
            }
            key={id}
          />
        ))}
      </ul>
    </section>
  );
};

export default Products;
