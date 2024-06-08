import { useLoaderData, json, defer, Await } from 'react-router-dom';

import EventsList from '../components/EventsList';
import { Suspense } from 'react';

const EventsPage = () => {
  // const [isLoading, setIsLoading] = useState(false);
  // const [fetchedEvents, setFetchedEvents] = useState();
  // const [error, setError] = useState();

  //  useEffect(() => {
  // async function fetchEvents() {
  //   setIsLoading(true);
  //   const response = await fetch('http://localhost:8080/events');
  //   console.log(response);
  //   if (!response.ok) {
  //     setError('Something went wrong!');
  //   } else {
  //     const resData = await response.json();
  //     setFetchedEvents(resData.events);
  //   }
  //   setIsLoading(false);
  // }
  // fetchEvents();
  //}, []);

  const { events } = useLoaderData();

  return (
    <>
      {/* <section>
        {isLoading && <p>Loading...</p>}
        {error && <p>{error}</p>}
      </section> */}
      {/* {!isLoading && fetchedEvents && <EventsList events={fetchedEvents} />} */}
      {/* <EventsList events={events} /> */}
      <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
        <Await resolve={events}>
          {(loaderEvents) => <EventsList events={loaderEvents} />}
        </Await>
      </Suspense>
    </>
  );
};

export default EventsPage;

async function loaderEvent() {
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

export function loader() {
  return defer({ events: loaderEvent() });
}
