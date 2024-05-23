export async function fetchAvailablePlaces() {
  const result = await fetch('http://localhost:3000/places');
  const response = await result.json();
  console.log(response);

  if (!result.ok) {
    throw new Error('Failed to fetch places');
  }

  return response.places;
}

export async function fetchUserPlaces() {
  const result = await fetch('http://localhost:3000/user-places');
  const response = await result.json();
  console.log(response);

  if (!result.ok) {
    throw new Error('Failed to fetch user places');
  }

  return response.places;
}

export async function updateUserPlaces(places) {
  const response = await fetch('http://localhost:3000/user-places', {
    method: 'PUT',
    body: JSON.stringify({ places }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error('Failed to update user data');
  }

  return data.message;
}
