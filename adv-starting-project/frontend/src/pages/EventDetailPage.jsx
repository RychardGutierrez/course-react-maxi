import { useRouteLoaderData, json, redirect, defer, Await } from 'react-router';
import EventItem from '../components/EventItem';
import EventsList from '../components/EventsList';
import { Suspense } from 'react';

const EventDetailPage = () => {
  const { event, events } = useRouteLoaderData('id-details');

  const LoaderText = <p style={{ textAlign: 'center' }}>Loading...</p>;

  return (
    <>
      <Suspense fallback={LoaderText}>
        <Await resolve={event}>
          {(loaderEvent) => <EventItem event={loaderEvent} />}
        </Await>
      </Suspense>
      <Suspense fallback={LoaderText}>
        <Await resolve={events}>
          {(loaderEvents) => <EventsList events={loaderEvents} />}
        </Await>
      </Suspense>
    </>
  );
};

export default EventDetailPage;

async function loaderEvent(id) {
  const response = await fetch('http://localhost:8080/events/' + id);
  if (!response.ok) {
    console.log('Something went wrong!');

    throw json(
      { message: 'Could not fetch details for select events.' },
      { status: response.status }
    );
  } else {
    const data = await response.json();
    return data.event;
  }
}

async function loaderEvents() {
  const response = await fetch('http://localhost:8080/events');
  if (!response.ok) {
    console.log('Something went wrong!');
    // throw new Response(JSON.stringify({ message: 'Could not fetch events.' }), {
    //   status: response.status,
    // });
    throw json(
      { message: 'Could not fetch events.' },
      { status: response.status }
    );
  } else {
    // it's not necessary to transfor json to object
    // const data = await response.json();
    const data = await response.json();
    return data.events;
  }
}

export async function loader({ request, params }) {
  const id = params.id;
  return defer({ event: loaderEvent(id), events: loaderEvents() });
}

export async function action({ params, request }) {
  const eventId = params.id;
  const response = await fetch('http://localhost:8080/events/' + eventId, {
    method: request.method,
  });

  if (!response.ok) {
    throw json(
      { message: 'Could not delete for the selected event.' },
      { status: 404 }
    );
  }

  return redirect('/events');
}
