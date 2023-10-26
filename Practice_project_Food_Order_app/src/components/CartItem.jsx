import { currencyFormatter } from '../../../Working-forms-inputs/src/utils/formatter';

const CartItem = ({ name, quantity, price, onIncrease, onDecrease }) => {
  return (
    <li className="cart-item">
      <p>
        {name} - {quantity} <strong> x </strong>
        {currencyFormatter.format(price)}
      </p>
      <section className="cart-item-actions">
        <button onClick={onDecrease}>-</button>
        <span>QTY</span>
        <button onClick={onIncrease}>+</button>
      </section>
    </li>
  );
};

export default CartItem;
