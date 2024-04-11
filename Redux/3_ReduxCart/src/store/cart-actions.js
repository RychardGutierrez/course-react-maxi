import { uiNotificationActions } from './ui-notification';
import { cartActions } from './cart';

export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        'https://journal-app-react-8c4c6-default-rtdb.firebaseio.com/cart.json'
      );

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const data = await response.json();

      return data;
    };
    try {
      const response = await fetchData();
      dispatch(cartActions.replaceCart(response));
    } catch (error) {
      uiNotificationActions.showNotification({
        status: 'error',
        title: 'Error',
        message: 'Error with fetch data',
      });
    }
  };
};

export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiNotificationActions.showNotification({
        status: ' Pending',
        title: 'Sending...',
        message: 'Sending cart data',
      })
    );

    const sendRequest = async () => {
      const response = await fetch(
        'https://journal-app-react-8c4c6-default-rtdb.firebaseio.com/cart.json',
        {
          method: 'PUT',
          body: JSON.stringify(cart),
        }
      );

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }
    };

    try {
      sendRequest();
    } catch (error) {
      dispatch(
        uiNotificationActions.showNotification({
          status: 'error',
          title: 'Error',
          message: 'Sent cart data failed',
        })
      );
    }

    dispatch(
      uiNotificationActions.showNotification({
        status: 'success',
        title: 'Success',
        message: 'Sent cart data successfully',
      })
    );
  };
};
