import { memo } from "react";

function Input({
  label,
  name,
  type = "text",
  value,
  onChange,
  error,
  ref,
  ...props
}) {
  return (
    <>
      <div className="input_area">
        <label htmlFor={name}>{label}</label>
        <input
          type={type}
          id={name}
          className={error ? "error" : ""}
          ref={ref}
          value={value}
          onChange={onChange}
          {...props}
        />
      </div>
      {error && <div className="error_message">{error}</div>}
    </>
  );
}

export default memo(Input);