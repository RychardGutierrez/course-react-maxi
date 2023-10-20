import { useInput } from '../hooks/use-input.js';

const EMAIL_REGEX =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

const SimpleInput = (props) => {
  const enteredNameIsValid = (enteredName) => enteredName.trim() !== '';

  const enteredEmailIsValid = (enteredEmail) =>
    enteredEmail.trim() !== '' &&
    EMAIL_REGEX.test(enteredEmail.toLowerCase().trim());

  const {
    value: enteredName,
    hasError: nameInputHasError,
    valueChangeHandler: nameInputChangeHandler,
    inputBlurHandler: nameInputBlurHandler,
    clearInput: clearNameInput,
  } = useInput(enteredNameIsValid);

  const {
    value: enteredEmail,
    hasError: emailInputHasError,
    valueChangeHandler: emailInputChangeHandler,
    inputBlurHandler: emailInputBlurHandler,
    clearInput: clearEmailInput,
  } = useInput(enteredEmailIsValid);

  let formIsValid = false;

  console.log({ emailInputHasError, nameInputHasError });
  if (
    enteredName.trim() !== '' &&
    EMAIL_REGEX.test(enteredEmail.toLowerCase().trim())
  ) {
    formIsValid = true;
  }

  const formSubmitHandler = (event) => {
    event.preventDefault();

    if (!enteredNameIsValid || !enteredEmailIsValid) {
      return;
    }
    clearNameInput();
    clearEmailInput();
    console.log(enteredName);
    console.log(enteredEmail);
    // nameInputRef.current.value = ''; // not ideal because you manipulate the dom directly
  };

  const nameInputClasses = nameInputHasError
    ? 'form-control invalid'
    : 'form-control';

  const emailInputClasses = emailInputHasError
    ? 'form-control invalid'
    : 'form-control';

  return (
    <form onSubmit={formSubmitHandler}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          onChange={nameInputChangeHandler}
          // ref={nameInputRef}
          value={enteredName}
          onBlur={nameInputBlurHandler}
        />
        {nameInputHasError && (
          <p className="error-text">Enter name is invalid</p>
        )}
      </div>

      <div className={emailInputClasses}>
        <label htmlFor="name">Your Email</label>
        <input
          type="text"
          id="name"
          onChange={emailInputChangeHandler}
          value={enteredEmail}
          onBlur={emailInputBlurHandler}
        />
        {emailInputHasError && (
          <p className="error-text">Enter email is invalid</p>
        )}
      </div>
      <div className="form-actions">
        <button type="submit" disabled={!formIsValid}>
          Submit
        </button>
      </div>
    </form>
  );
};

export default SimpleInput;
