export default function InputCheckBox({ name, value = false, onChange }) {
  return (
    <div className="field_input_checkbox">
      <div>
        <input
          type="checkbox"
          id={name}
          name={name}
          value={name}
          onChange={(e) => onChange(e)}
          defaultChecked={value}
        />
        <label htmlFor={name}>{name}</label>
      </div>
    </div>
  );
}
