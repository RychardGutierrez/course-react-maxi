import { useDispatch } from 'react-redux';
import classes from './CartButton.module.css';
import { modalActions } from '../../store/modal';

const CartButton = (props) => {
  const dispatch = useDispatch();

  const onToggleModal = () => {
    
    dispatch(modalActions.toggleModal());
  };

  return (
    <button className={classes.button} onClick={onToggleModal}>
      <span>My Cart</span>
      <span className={classes.badge}>1</span>
    </button>
  );
};

export default CartButton;
