import { useSelector } from 'react-redux';
import Auth from './components/Auth';
import Counter from './components/Counter';
import Header from './components/Header';
import UserProfile from './components/UserProfile';

function App() {
  const isAuthenticated = useSelector(({ auth }) => auth.isAuthenticated);
  return (
    <>
      <Header />
      {!isAuthenticated && <Auth />}
      {isAuthenticated && <Counter />}
      {isAuthenticated && <UserProfile />}
    </>
  );
}

export default App;
