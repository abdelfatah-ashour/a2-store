import React from "react";

function FieldOption({ option, onChange, name }) {
  return (
    <div className="form-group">
      <label htmlFor={name}>{name}</label>
      <br />
      <select onChange={onChange} name={name} id={name} className="p-2">
        <option>none</option>
        {option.map((item, key) => (
          <option value={item} key={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
}

export default FieldOption;
