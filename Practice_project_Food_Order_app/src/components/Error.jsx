import React from 'react';

const Error = ({ title, message }) => {
  return (
    <section className="error">
      <h2>{title}</h2>
      <p>{message}</p>
    </section>
  );
};

export default Error;
