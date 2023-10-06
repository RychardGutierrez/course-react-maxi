import React, { useEffect, useState } from 'react';

import Tasks from './components/Tasks/Tasks';
import NewTask from './components/NewTask/NewTask';
import UseHttp from './hooks/UseHttp';

function App() {
  const [tasks, setTasks] = useState([]);

  const transFormTasks = (tasks) => {
    const loadedTasks = [];

    for (const taskKey in tasks) {
      loadedTasks.push({ id: taskKey, text: tasks[taskKey].text });
    }

    setTasks(loadedTasks);
  };

  const { sendRequest, isLoading, error } = UseHttp();

  useEffect(() => {
    sendRequest({ method: 'GET' }, transFormTasks);
  }, []);

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={sendRequest}
      />
    </React.Fragment>
  );
}

export default App;
