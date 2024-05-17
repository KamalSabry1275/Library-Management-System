import { useState } from "react";
import Input from "./Input";
import InputRadio from "../components/InputRadio";

const FilterInput = ({
  Radio = false,
  elements,
  name,
  type = "text",
  value,
  onChange,
}) => {
  const [showInput, setShowInput] = useState(false);

  const hundleFilterInput = (e) => {
    setShowInput(e.target.checked);
    if (e.target.checked == false) onChange("");
  };

  return (
    <>
      <div className="filter-check">
        {Radio ? (
          <>
            <label htmlFor={name}>
              <input
                type="checkbox"
                id={name}
                onChange={(e) => hundleFilterInput(e)}
              />
              {name}
            </label>
            {showInput && (
              <InputRadio
                name={name}
                showLabel={false}
                elements={elements}
                onChange={(e) => onChange(e.target.value)}
              />
            )}
          </>
        ) : (
          <>
            <label htmlFor={name}>
              <input
                type="checkbox"
                id={name}
                onChange={(e) => hundleFilterInput(e)}
              />
              {name}
            </label>
            {showInput && (
              <Input
                type={type}
                value={showInput ? value : ""}
                onChange={(e) => onChange(e.target.value)}
              />
            )}
          </>
        )}
      </div>
    </>
  );
};

export default FilterInput;
