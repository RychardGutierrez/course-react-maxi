import { useDispatch, useSelector } from 'react-redux';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import Notification from './components/UI/Notification';
import { useEffect } from 'react';
import { sendCartData, fetchCartData } from './store/cart-actions';

let initial = true;

function App() {
  const dispatch = useDispatch();
  const toggleModal = useSelector(({ modal }) => modal.toggle);
  const { items, changed } = useSelector(({ cart }) => cart);

  const notification = useSelector(
    ({ notification }) => notification.notification
  );

  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch]);

  useEffect(() => {
    if (initial) {
      initial = false;
      return;
    }
    if (changed) {
      dispatch(sendCartData(items));
    }
  }, [changed, dispatch, items]);

  return (
    <>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {toggleModal && <Cart items={items} />}
        <Products />
      </Layout>
    </>
  );
}

export default App;
