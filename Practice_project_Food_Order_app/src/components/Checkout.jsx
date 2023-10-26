import { useContext } from 'react';
import Modal from './UI/Modal';
import CartContext from '../store/CartContext';
import { currencyFormatter } from '../../../Working-forms-inputs/src/utils/formatter';
import Input from './UI/Input';
import Button from './UI/Button';
import UserProgressContext from '../store/UserProgressContext';
import { URL_ORDERS } from '../api/meal-api';
import useHttp from '../hooks/UseHttp';
import Error from './Error';

const configOrder = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
};

const Checkout = () => {
  const { items, clearCart } = useContext(CartContext);
  const { progress, hideCheckout } = useContext(UserProgressContext);
  const { sendRequest, data, isLoading, error, clearData } = useHttp(
    URL_ORDERS,
    configOrder,
    null
  );
  const cartTotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  function handleClose() {
    hideCheckout();
    clearCart();
    clearData();
  }

  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const customerData = Object.fromEntries(formData.entries());

    configOrder.body = JSON.stringify({
      order: {
        items,
        customer: customerData,
      },
    });

    sendRequest();
  }

  if (error) {
    return (
      <Error title="Something is wrong when send the data" message={error} />
    );
  }

  if (data && !error) {
    return (
      <Modal open={progress === 'checkout'} onClose={handleClose}>
        <h2>Succes!</h2>
        <p>Your order has been sent!</p>
        <Button type="button" onClick={handleClose}>
          Okay
        </Button>
      </Modal>
    );
  }

  return (
    <Modal open={progress === 'checkout'} onClose={handleClose}>
      <form onSubmit={handleSubmit}>
        <h2>Checkout</h2>
        <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>

        <Input label="Full name" id="name" type="text" />
        <Input label="Email address" id="email" type="email" />
        <Input label="Street" id="street" type="text" />

        <div className="control-row">
          <Input label="City" id="city" type="text" />
          <Input label="Postal Code" id="postal-code" type="text" />
        </div>
        <p className="modal-actions">
          {isLoading && <p>Sending order...</p>}
          {!isLoading && (
            <>
              <Button textOnly type="button" onClick={handleClose}>
                Close
              </Button>
              <Button type="submit">Submit Order</Button>
            </>
          )}
        </p>
      </form>
    </Modal>
  );
};

export default Checkout;
