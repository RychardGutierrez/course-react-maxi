import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Header from './components/Header';
import Meals from './components/Meals';
import { CartContextProvier } from './store/CartContext';
import { UserProgressContextProvider } from './store/UserProgressContext';

function App() {
  return (
    <UserProgressContextProvider>
      <CartContextProvier>
        <Header />
        <Meals />
        <Cart />
        <Checkout />
      </CartContextProvier>
    </UserProgressContextProvider>
  );
}

export default App;
