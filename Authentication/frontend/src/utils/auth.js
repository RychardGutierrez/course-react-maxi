import { redirect } from 'react-router-dom';

export const getAuthToken = () => {
  const token = localStorage.getItem('token');
  const tokenDuration = getTokenDuration();
  console.log(token);
  if (!token) {
    return null;
  }

  if (tokenDuration < 0) {
    return 'EXPIRED';
  }

  return token;
};

export const loader = () => {
  console.log(getAuthToken(), 'test');
  return { token: getAuthToken() };
};

export function checkAuthLoader() {
  // this function will be added in the next lecture
  // make sure it looks like this in the end
  const token = getAuthToken();

  if (!token) {
    return redirect('/auth');
  }

  return null; // this is missing in the next lecture video and should be added by you
}

export const getTokenDuration = () => {
  const storedExpirationDate = localStorage.getItem('expiration');
  const expirationDate = new Date(storedExpirationDate);
  const now = new Date();
  const duration = expirationDate.getTime() - now.getTime();
  return duration;
};
