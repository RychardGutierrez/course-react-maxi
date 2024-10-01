import { Link, Outlet, useNavigate, useParams } from 'react-router-dom';

import Header from '../Header.jsx';
import { deleteEvent, fetchEvent, queryClient } from '../../utils/http.js';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import Modal from '../UI/Modal.jsx';

export default function EventDetails() {
  const [isDeleted, setIsDeleted] = useState(false);

  const navigate = useNavigate();

  const { id } = useParams();
  const { data, isLoading, isError } = useQuery({
    queryFn: ({ signal }) => fetchEvent({ id, signal }),
    queryKey: ['event', id],
  });

  const { mutate, isPending: isPendingDelete } = useMutation({
    mutationFn: deleteEvent,
    onSuccess: () => {
      navigate('/events');
      queryClient.invalidateQueries({
        queryKey: ['events'],
        exact: true,
        refetchType: 'none',
      });
    },
  });

  function handleDelete() {
    mutate({ id });
  }

  function handleStartDelete() {
    setIsDeleted(true);
  }

  function handleCancelDelete() {
    setIsDeleted(false);
  }

  return (
    <>
      {isDeleted && (
        <Modal onClose={handleCancelDelete}>
          <h2>Delete the Event</h2>
          <p> Do you really want to delete this event?</p>
          <div className="form-actions">
            {isPendingDelete && <p>Deleting...</p>}
            {!isPendingDelete && (
              <>
                <button onClick={handleCancelDelete} className="button-text">
                  Cancel
                </button>
                <button onClick={handleDelete} className="button">
                  Delete
                </button>
              </>
            )}
          </div>
        </Modal>
      )}
      <Outlet />
      <Header>
        <Link to="/events" className="nav-item">
          View all Events
        </Link>
      </Header>
      {isLoading && <p>Loading event...</p>}
      {isError && (
        <p>
          An error occurred while loading the event. Please try again later.
        </p>
      )}
      {!isLoading && (
        <article id="event-details">
          <header>
            <h1>{data.title}</h1>
            <nav>
              <button onClick={handleStartDelete}>Delete</button>
              <Link to="edit">Edit</Link>
            </nav>
          </header>
          <div id="event-details-content">
            <img src={`http://localhost:3000/${data.image}`} alt={data.title} />
            <div id="event-details-info">
              <div>
                <p id="event-details-location">{data.location}</p>
                <time dateTime={`Todo-DateT$Todo-Time`}>
                  {data.date} @ {data.time}
                </time>
              </div>
              <p id="event-details-description">{data.description}</p>
            </div>
          </div>
        </article>
      )}
    </>
  );
}
