import {
  Link,
  redirect,
  useNavigate,
  useNavigation,
  useParams,
  useSubmit,
} from 'react-router-dom';

import Modal from '../UI/Modal.jsx';
import EventForm from './EventForm.jsx';
import { useMutation, useQuery } from '@tanstack/react-query';
import { fetchEvent, queryClient, updateEvent } from '../../utils/http.js';

import ErrorBlock from '../UI/ErrorBlock.jsx';

export default function EditEvent() {
  const navigate = useNavigate();
  const submit = useSubmit();

  const { id } = useParams();
  const { state } = useNavigation();
  const { data, isError } = useQuery({
    queryFn: ({ signal }) => fetchEvent({ id, signal }),
    queryKey: ['events', id],
  });

  const { mutate } = useMutation({
    mutationFn: updateEvent,
    onMutate: async (data) => {
      const newEvent = data.data;

      await queryClient.cancelQueries({ queryKey: ['events', id] });
      const previousEvent = queryClient.getQueryData(['events', id]);

      queryClient.setQueryData(['events', id], newEvent);

      return { previousEvent };
    },
    onError: (error, data, context) => {
      queryClient.setQueryData(['events', id], context.previousEvent);
    },
    onSettled: () => {
      queryClient.invalidateQueries(['events', id]);
    },
  });

  function handleSubmit(formData) {
    // mutate({ id, data: formData });
    // navigate('../');

    submit(formData, { method: 'PUT' });
  }

  function handleClose() {
    navigate('../');
  }

  let content;

  // if (isPending) {
  //   content = (
  //     <div className="center">
  //       <LoadingIndicator />
  //     </div>
  //   );
  // }
  if (isError) {
    content = (
      <>
        <ErrorBlock title={data.title} message={data.message}>
          <div className="form-actions">
            <Link to="../" className="button-text">
              Okay
            </Link>
          </div>
        </ErrorBlock>
      </>
    );
  }

  if (data) {
    content = (
      <EventForm inputData={data} onSubmit={handleSubmit}>
        {state === 'submitting' && <p>Updating event...</p>}
        {state !== 'submitting' && (
          <>
            <Link to="../" className="button-text">
              Cancel
            </Link>
            <button type="submit" className="button">
              Update
            </button>
          </>
        )}
      </EventForm>
    );
  }

  return <Modal onClose={handleClose}>{content}</Modal>;
}

export function loader({ params: { id } }) {
  return queryClient.fetchQuery({
    queryFn: ({ signal }) => fetchEvent({ id, signal }),
    queryKey: ['events', id],
  });
}

export async function action({ request, params }) {
  const formData = await request.formData();
  const { id } = params;
  const data = Object.fromEntries(formData);
  await updateEvent({ id, data });
  await queryClient.invalidateQueries(['events']);
  return redirect(`../`);
}
