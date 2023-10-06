import Section from '../UI/Section';
import TaskForm from './TaskForm';
import UseHttp from '../../hooks/UseHttp';

const NewTask = (props) => {
  const handleCresteTask = (task, data) => {
    const generatedId = data.name; // firebase-specific => "name" contains generated id
    const createdTask = { id: generatedId, text: task };

    props.onAddTask(createdTask);
  };
  const { error, isLoading, sendRequest } = UseHttp();

  const enterTaskHandler = (task) => {
    sendRequest(
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: { text: task },
      },
      handleCresteTask.bind(null, task)
    );
  };

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
