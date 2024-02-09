import { useSelector, useDispatch } from 'react-redux';
import classes from './Counter.module.css';
import { counterActions } from '../store/counter';

const Counter = () => {
  const dispatch = useDispatch();
  const counterState = useSelector(({ counter }) => counter.counter);

  const showCounter = useSelector(({ counter }) => counter.showCounter);

  const incrementHandler = () => {
    console.log(counterState);
    dispatch(counterActions.incrementReducer());
  };
  const decrementHandler = () => {
    dispatch(counterActions.decrementReducer());
  };

  const increaseHandler = () => {
    dispatch(counterActions.increaseReducer({ number: 5 }));
  };

  const toggleCounterHandler = () => {
    dispatch(counterActions.toggleReducer());
  };

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      {showCounter && <div className={classes.value}>{counterState}</div>}
      <div>
        <button onClick={incrementHandler}>Increment</button>
        <button onClick={increaseHandler}>Increment + 5</button>
        <button onClick={decrementHandler}>Decrement</button>
      </div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;
