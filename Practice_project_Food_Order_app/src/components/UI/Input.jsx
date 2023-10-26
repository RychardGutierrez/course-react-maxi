const Input = ({ id, label, ...props }) => {
  return (
    <section className="control">
      <label htmlFor={id}>{label}</label>
      <input id={id} name={id} required {...props} />
    </section>
  );
};

export default Input;
