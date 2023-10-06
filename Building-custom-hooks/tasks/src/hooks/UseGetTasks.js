import { URL_TASK } from './Constants';

const UseGetTasks = async () => {
  const response = await fetch(URL_TASK);

  if (!response.ok) {
    throw new Error('Request failed!');
  }

  const data = await response.json();

  return { data };
};

export default UseGetTasks;
