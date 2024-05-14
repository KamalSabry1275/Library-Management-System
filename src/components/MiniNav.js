import { useNavigate } from "react-router-dom";

export const MiniNav = ({ defaultValue = "", value, elements = [] }) => {
  const navigate = useNavigate();
  return (
    <div className="mini-nav">
      <ul>
        {elements?.map((element, index) => {
          return (
            <li key={`${element}-${index}`}>
              <input
                id={element}
                type="radio"
                name="MiniNavSelect"
                onClick={() => navigate(element)}
                defaultChecked={element == defaultValue}
                hidden
              />
              <label htmlFor={element}>{element}</label>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
