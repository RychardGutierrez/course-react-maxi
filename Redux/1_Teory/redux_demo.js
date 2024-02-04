const redux = require('redux');

const initialState = { counter: 0 };

const counterReducer = (state = initialState, action) => {
  if (action.type === 'INCREMENT') {
    return {
      counter: state.counter + 1,
    };
  }

  if (action.type === 'DECREMENT') {
    return {
      counter: state.counter - 1,
    };
  }
  return state;
};

const storeDemo = redux.createStore(counterReducer);
console.log(storeDemo.getState());
const counterSubscriber = () => {
  const lastestState = storeDemo.getState();
  console.log(lastestState);
};

storeDemo.subscribe(counterSubscriber);

storeDemo.dispatch({ type: 'INCREMENT' });
storeDemo.dispatch({ type: 'INCREMENT' });
storeDemo.dispatch({ type: 'INCREMENT' });
storeDemo.dispatch({ type: 'DECREMENT' });
