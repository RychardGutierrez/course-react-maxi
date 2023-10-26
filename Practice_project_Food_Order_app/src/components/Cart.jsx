import React from 'react';
import Modal from './UI/Modal';
import { useContext } from 'react';
import CartContext from '../store/CartContext';
import { currencyFormatter } from '../../../Working-forms-inputs/src/utils/formatter';
import Button from './UI/Button';
import UserProgressContext from '../store/UserProgressContext';
import CartItem from './CartItem';

const Cart = () => {
  const { items, addItem, removeItem } = useContext(CartContext);
  const { progress, hideCart, showCheckout } = useContext(UserProgressContext);
  const cartTotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  function handleCloseCart() {
    hideCart();
  }

  function handleGoToCheckout() {
    showCheckout();
  }

  return (
    <Modal
      className="cart"
      open={progress === 'cart'}
      onClose={progress === 'cart' ? handleCloseCart : null}
    >
      <h2>Your cart</h2>
      <ul>
        {items.map((item) => (
          <CartItem
            key={item.id}
            name={item.name}
            price={item.price}
            quantity={item.quantity}
            onDecrease={() => {
              removeItem(item.id);
            }}
            onIncrease={() => {
              addItem(item);
            }}
          />
        ))}
      </ul>
      <p className="cart-total">
        Total price: {currencyFormatter.format(cartTotal)}
      </p>
      <section className="modal-actions">
        <Button textOnly onClick={handleCloseCart}>
          Close
        </Button>
        {Boolean(items.length) && (
          <Button onClick={handleGoToCheckout}> Go to Checckout </Button>
        )}
      </section>
    </Modal>
  );
};

export default Cart;
