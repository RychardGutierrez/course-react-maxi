import { QueryClient } from '@tanstack/react-query';

export const fetchEvents = async ({ signal, searchTerm, max }) => {
  let url = 'http://localhost:3000/events';

  if (searchTerm) {
    url = `${url}?search=${searchTerm}`;
  }

  if (max) {
    url = `${url}?max=${max}`;
  }
  console.log(signal);
  const response = await fetch(url, { signal });

  if (!response.ok) {
    const error = new Error('An error occurred while fetching the events');
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const { events } = await response.json();

  return events;
};

export const createNewEvent = async (eventData) => {
  const response = await fetch('http://localhost:3000/events', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(eventData),
  });

  if (!response.ok) {
    const error = new Error('An error occurred while creating the event');
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const { event } = await response.json();
  return event;
};

export const fetchSelectabImages = async ({ signal }) => {
  const response = await fetch('http://localhost:3000/events/images', {
    signal,
  });

  if (!response.ok) {
    const error = new Error('An error occurred while fetching images');
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const { images } = await response.json();
  return images;
};

export const queryClient = new QueryClient();

export const fetchEvent = async ({ id, signal }) => {
  const response = await fetch(`http://localhost:3000/events/${id}`, {
    signal,
  });

  if (!response.ok) {
    const error = new Error('An error occurred while fetching the event');
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const { event } = await response.json();
  return event;
};

export const deleteEvent = async ({ id }) => {
  const response = await fetch(`http://localhost:3000/events/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    const error = new Error('An error occurred while deleting the event');
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }
  return response.json();
};

export const updateEvent = async ({ id, data }) => {
  const response = await fetch(`http://localhost:3000/events/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ event: data }),
  });

  if (!response.ok) {
    const error = new Error('An error occurred while updating the event');
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  return response.json();
};
