import { useInput } from '../hooks/use-input';

const EMAIL_REGEX =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

const BasicForm = (props) => {
  const {
    value: enteredName,
    hasError: nameInputHasError,
    valueChangeHandler: nameInputChangeHandler,
    inputBlurHandler: nameInputBlurHandler,
    clearInput: clearNameInput,
  } = useInput((value) => value.trim() !== '');

  const {
    value: enteredLastName,
    hasError: lastNameInputHasError,
    valueChangeHandler: lastNameInputChangeHandler,
    inputBlurHandler: lastNameInputBlurHandler,
    clearInput: clearLastNameInput,
  } = useInput((value) => value.trim() !== '');

  const {
    value: enteredEmail,
    hasError: emailInputHasError,
    valueChangeHandler: emailInputChangeHandler,
    inputBlurHandler: emailInputBlurHandler,
    clearInput: clearEmailInput,
  } = useInput((value) => EMAIL_REGEX.test(value.toLowerCase().trim()));

  const enteredNameIsValid = enteredName.trim() !== '';
  const enteredLastNameIsValid = enteredLastName.trim() !== '';
  const enteredEmailIsValid =
    enteredEmail.trim() !== '' &&
    EMAIL_REGEX.test(enteredEmail.toLowerCase().trim());

  const formSubmitHandler = (event) => {
    event.preventDefault();

    if (
      !enteredNameIsValid ||
      !enteredEmailIsValid ||
      !enteredLastNameIsValid
    ) {
      return;
    }

    console.log({ enteredName, enteredEmail, enteredLastName });

    clearEmailInput();
    clearNameInput();
    clearLastNameInput();
  };

  let formIsValid = false;
  if (enteredNameIsValid && enteredEmailIsValid && enteredLastNameIsValid) {
    formIsValid = true;
  }
  console.log({ lastNameInputHasError, nameInputHasError });
  const nameInputClasses = nameInputHasError
    ? 'form-control invalid'
    : 'form-control';

  const lastEmailNameInputClasses = lastNameInputHasError
    ? 'form-control invalid'
    : 'form-control';

  const emailInputClasses = emailInputHasError
    ? 'form-control invalid'
    : 'form-control';

  return (
    <form onSubmit={formSubmitHandler}>
      <div>
        <div className={nameInputClasses}>
          <label htmlFor="name">First Name</label>
          <input
            type="text"
            id="name"
            onChange={nameInputChangeHandler}
            onBlur={nameInputBlurHandler}
            value={enteredName}
          />
          {nameInputHasError && (
            <p className="error-text">Enter name is invalid</p>
          )}
        </div>

        <div className={lastEmailNameInputClasses}>
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            onChange={lastNameInputChangeHandler}
            onBlur={lastNameInputBlurHandler}
            value={enteredLastName}
          />
          {lastNameInputHasError && (
            <p className="error-text">Enter last name is invalid</p>
          )}
        </div>
      </div>
      <div className={emailInputClasses}>
        <label htmlFor="email">E-Mail Address</label>
        <input
          type="email"
          id="email"
          onChange={emailInputChangeHandler}
          onBlur={emailInputBlurHandler}
          value={enteredEmail}
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

export default BasicForm;
