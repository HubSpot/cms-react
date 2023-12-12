const FormInput = ({
  helpText,
  id = 'no-id',
  label = 'Missing Label',
  type = 'text',
  defaultValue,
}) => {
  return (
    <p>
      <label style={{ display: 'block' }} htmlFor={id}>
        {label} <small style={{ marginLeft: '1rem' }}>{helpText}</small>
      </label>
      <input type={type} id={id} name={id} defaultValue={defaultValue} />
    </p>
  );
};

export default FormInput;
