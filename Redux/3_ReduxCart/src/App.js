import { useSelector } from 'react-redux';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';

function App() {
  const toggleModal = useSelector(({ modal }) => modal.toggle);
  console.log(toggleModal);
  return (
    <Layout>
      {toggleModal && <Cart />}
      <Products />
    </Layout>
  );
}

export default App;
