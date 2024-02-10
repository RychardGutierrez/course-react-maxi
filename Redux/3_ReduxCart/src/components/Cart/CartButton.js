import { useDispatch, useSelector } from 'react-redux';
import classes from './CartButton.module.css';
import { modalActions } from '../../store/modal';

const CartButton = (props) => {
  const dispatch = useDispatch();
  const { totalItems } = useSelector(({ cart }) => cart);

  const onToggleModal = () => {
    dispatch(modalActions.toggleModal());
  };

  return (
    <button className={classes.button} onClick={onToggleModal}>
      <span>My Cart</span>
      <span className={classes.badge}>{totalItems}</span>
    </button>
  );
};

export default CartButton;
