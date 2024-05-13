export const InputSelect = ({ elements = [], onChange }) => {
  return (
    <div>
      <select className="field_input text_color" onChange={(e) => onChange(e)}>
        {elements?.map((element, index) => {
          return (
            <option key={index} value={element.value}>
              {element.label}
            </option>
          );
        })}
      </select>
    </div>
  );
};
