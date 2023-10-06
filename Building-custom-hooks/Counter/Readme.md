# Custom Hooks

Here are some of the most commonly used React Hooks:

- useState: Allows you to use in a functional component.
- useEffect: Allows you to perform side effects in a functional component, such as fetching data from an API or updating the document title.
- useContext: Allows you to use a reducer to manage state in a functional component.
- useCallback: Allows you to memoize a function so that it only changes when its dependencies change.
- useMemo: Allows you to memoize a value so that it only change when it's dependecies changes.
- useRef: Allows you to create a mutable ref object that persists for the lifetime of the component.

What are Custom Hooks?
It a regular functions, they content outsourcece stateful logic into
re-usable functions.
Unlike "regular functions", Custom hooks can use other React hooks and React state.

### Best practices for useing React Hooks
- Only use Hooks at the top level of a functional component or customer hook.
- Use the useEffect hooks to manager side effects, such as fetching data from API or updating the document title.
- Use the useCallback hook to memoize functions that are passed as props to child components
- Use the useMemo hook to memoize values that are expensive to compute.
- Use the useContext hook to pass data down the component tree without having to pass props through every level.
- Use the useReducer hook to manaheple the complex state that can't be managed with the useState hook.
