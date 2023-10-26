export const URL = 'http://localhost:3000';
export const URL_MEALS = `${URL}/meals`;
export const URL_ORDERS = `${URL}/orders`;

export const getAllMeals = async () => {
  try {
    const response = await fetch(URL_MEALS);
    const meals = await response.json();
    return meals;
  } catch (error) {
    console.log(error);
  }
};

export const postOrder = async ({ customer, items }) => {
  try {
    const response = await fetch(URL_ORDERS, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        order: {
          items,
          customer,
        },
      }),
    });
  } catch (error) {
    console.log(error);
  }
};
