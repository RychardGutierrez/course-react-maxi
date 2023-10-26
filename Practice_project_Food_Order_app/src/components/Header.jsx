import { useContext } from 'react';
import logo from '../assets/logo.jpg';
import Button from './UI/Button';
import CartContext from '../store/CartContext';
import UserProgressContext from '../store/UserProgressContext';

const Header = () => {
  const { items } = useContext(CartContext);
  const { showCart } = useContext(UserProgressContext);
  const totalCardItems = items.reduce((acc, item) => acc + item.quantity, 0);

  function handleShowCart() {
    showCart();
  }

  return (
    <header id="main-header">
      <title id="title">
        <img src={logo} alt="Food logo image" />
        <h1>React Food</h1>
      </title>
      <nav>
        <Button onClick={handleShowCart} textOnly>
          Cart ({totalCardItems})
        </Button>
      </nav>
    </header>
  );
};

export default Header;
