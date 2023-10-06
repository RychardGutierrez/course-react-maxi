import { useCallback, useState } from 'react';
import { URL_TASK } from './Constants';

const UseHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(async (config, applyData) => {
    let data = [];
    const { method = 'GET', headers = {}, body = null } = config;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(URL_TASK, {
        method,
        headers,
        body: body ? JSON.stringify(body) : null,
      });

      if (!response.ok) {
        throw new Error('Request failed!');
      }

      data = await response.json();
    } catch (error) {
      setError(error.message || 'Something went wrong!');
    }

    setIsLoading(false);
    applyData(data);
  }, []);

  return { sendRequest, isLoading, error };
};

export default UseHttp;
