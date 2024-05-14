export const InputSelect = ({
  elements = [],
  onChange = () => {
    console.log("empty");
  },
}) => {
  return (
    <div className="field_form">
      <select className="field_input text_color" onChange={(e) => onChange(e)}>
        {elements?.map((element, index) => {
          return (
            <option key={`${element}-${index}`} value={element.value}>
              {element.label}
            </option>
          );
        })}
      </select>
    </div>
  );
};
