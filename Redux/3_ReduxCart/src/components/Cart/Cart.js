import { useDispatch } from 'react-redux';
import Card from '../UI/Card';
import classes from './Cart.module.css';
import CartItem from './CartItem';
import { cartActions } from '../../store/cart';

const Cart = ({ items }) => {
  const dispatch = useDispatch();

  const onAddCartHandler = ({ id }) => {
    dispatch(cartActions.addCart({ id }));
  };

  const onRestCartHandler = ({ id }) => {
    dispatch(cartActions.restCart({ id }));
  };

  return (
    <Card className={classes.cart}>
      {items.length > 0 && <h2>Your Shopping Cart</h2>}
      {items.length === 0 && <h2>You have not items in Cart</h2>}
      <ul>
        {items.map(({ title, quantity, price, total, id }) => (
          <CartItem
            key={id}
            item={{ title, quantity, total, price }}
            onClickToAddCart={() => onAddCartHandler({ id })}
            onClickToRestCart={() => onRestCartHandler({ id })}
          />
        ))}
      </ul>
    </Card>
  );
};

export default Cart;
