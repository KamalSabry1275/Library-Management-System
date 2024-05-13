export default function InputRadio({
  showLabel = true,
  name,
  elements,
  value,
  onChange,
}) {
  return (
    <div className="field_input_radio">
      {showLabel && <h5>{name}</h5>}
      {elements?.map((radioElement, index) => (
        <div key={index}>
          <input
            type="radio"
            id={name + radioElement}
            name={name}
            value={radioElement}
            onChange={(e) => onChange(e)}
            defaultChecked={radioElement == value}
          />
          <label htmlFor={name + radioElement}>{radioElement}</label>
        </div>
      ))}
    </div>
  );
}
