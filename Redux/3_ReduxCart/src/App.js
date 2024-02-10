import { useSelector } from 'react-redux';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';

function App() {
  const toggleModal = useSelector(({ modal }) => modal.toggle);
  const { items } = useSelector(({ cart }) => cart);
  return (
    <Layout>
      {toggleModal && <Cart items={items} />}
      <Products />
    </Layout>
  );
}

export default App;
