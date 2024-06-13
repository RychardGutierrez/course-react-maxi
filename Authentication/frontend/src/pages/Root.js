import { Outlet, useLoaderData, useSubmit } from 'react-router-dom';

import MainNavigation from '../components/MainNavigation';
import { useEffect } from 'react';
import { getTokenDuration } from '../utils/auth';

function RootLayout() {
  // const navigation = useNavigation();
  const { token } = useLoaderData();
  const submit = useSubmit();
  useEffect(() => {
    if (!token) {
      return;
    }

    const tokenDuration = getTokenDuration();
    console.log(tokenDuration);

    if (token === 'EXPIRED') {
      submit(null, {
        method: 'post',
        action: '/logout',
      });
      return;
    }

    setTimeout(() => {
      submit(null, {
        method: 'post',
        action: '/logout',
      });
    }, 1 * 60 * 60 * 1000);
  }, [submit, token]);

  return (
    <>
      <MainNavigation />
      <main>
        {/* {navigation.state === 'loading' && <p>Loading...</p>} */}
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
