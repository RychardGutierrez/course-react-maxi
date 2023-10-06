import { URL_TASK } from './Constants';

const UsePostTask = async (text) => {
  const response = await fetch(URL_TASK, {
    method: 'POST',
    body: JSON.stringify({ text }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Request failed!');
  }

  const data = await response.json();

  return { data };
};

export default UsePostTask;
