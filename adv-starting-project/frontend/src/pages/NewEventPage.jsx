import { json, redirect } from 'react-router-dom';

import EventForm from '../components/EventForm';

const NewEventPage = () => {
  return <EventForm event="POST" />;
};

export default NewEventPage;
