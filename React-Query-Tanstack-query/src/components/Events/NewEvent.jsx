import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';

import Modal from '../UI/Modal.jsx';
import EventForm from './EventForm.jsx';
import { createNewEvent, queryClient } from '../../utils/http.js';
import ErrorBlock from '../UI/ErrorBlock.jsx';

export default function NewEvent() {
  const navigate = useNavigate();

  const { data, isError, error, isPending, mutate } = useMutation({
    mutationFn: createNewEvent,
    onSuccess: () => {
      navigate('/events');
      queryClient.invalidateQueries({ queryKey: ['events'], exact: true });
    },
  });

  function handleSubmit(formData) {
    mutate({ event: formData });
    //navigate('/events');
  }

  return (
    <Modal onClose={() => navigate('../')}>
      <EventForm onSubmit={handleSubmit}>
        {isPending && <p>Creating event...</p>}
        {!isPending && (
          <>
            <Link to="../" className="button-text">
              Cancel
            </Link>
            <button type="submit" className="button">
              Create
            </button>
          </>
        )}
      </EventForm>
      {isError && (
        <ErrorBlock
          title="Faild to create event"
          message={error.info?.message || 'Fail to create event'}
        />
      )}
    </Modal>
  );
}
