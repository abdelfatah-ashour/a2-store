import React from "react";

function FieldInput({ name, type, onChange }) {
  return (
    <div className="form-group  p-2">
      <label htmlFor={name}>{name}</label>
      <input
        name={name}
        type={type}
        className="form-control p-2"
        id={name}
        onChange={onChange}
      />
    </div>
  );
}

export default FieldInput;
