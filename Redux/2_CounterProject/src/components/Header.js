import { useDispatch, useSelector } from 'react-redux';
import classes from './Header.module.css';
import { authActions } from '../store/auth';

const Header = () => {
  const isAuthenticated = useSelector(({ auth }) => auth.isAuthenticated);

  const dispatch = useDispatch();
  const onLogoutHandler = (e) => {
    e.preventDefault();

    dispatch(authActions.logoutReducer());
  };

  return (
    <header className={classes.header}>
      <h1>Redux Auth</h1>
      <nav>
        <ul>
          <li>
            <a href="/">My Products</a>
          </li>
          <li>
            <a href="/">My Sales</a>
          </li>
          <li>
            {isAuthenticated && (
              <button onClick={onLogoutHandler}>Logout</button>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
