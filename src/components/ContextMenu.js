import { useEffect, useRef, useState } from "react";

export const ContextMenu = ({
  idTarget = "",
  elements = [],
  children,
  style,
}) => {
  const [point, setPoint] = useState({ y: 0, x: 0 });
  const [flexDirection, setFlexDirection] = useState("");
  const [clicked, setClicked] = useState(false);

  const menuShow = (e) => {
    let element = e.target?.closest(`#${idTarget}`);

    if (element) {
      if (
        e.pageY > window.innerHeight - window.innerHeight / 3 &&
        e.pageX > window.innerWidth - 6 * 16
      ) {
        setPoint({
          y: e.layerY - window.innerHeight / 2,
          x: e.layerX - 6 * 16,
        });
        setFlexDirection("column-reverse");
      } else if (e.pageY > window.innerHeight - window.innerHeight / 3) {
        setPoint({ y: e.layerY - window.innerHeight / 3, x: e.layerX });
        setFlexDirection("column-reverse");
      } else if (e.pageX > window.innerWidth - 6 * 16) {
        setPoint({ y: e.layerY, x: e.layerX - 6 * 16 });
        setFlexDirection("column");
      } else {
        setPoint({ y: e.layerY, x: e.layerX });
        setFlexDirection("column");
      }

      setClicked(true);
    } else {
      setClicked(false);
    }
  };

  useEffect(() => {
    window.addEventListener("click", (e) => menuShow(e));
    return () => {
      window.removeEventListener("click", (e) => menuShow(e));
    };
  }, []);

  return (
    <>
      <div className="container_context_menu" style={style}>
        {clicked && (
          <div className="context_menu" style={{ top: point.y, left: point.x }}>
            <ul
              style={{
                flexDirection: flexDirection,
              }}
            >
              {elements?.map((element, index) => {
                return (
                  <li key={index} onClick={element.event}>
                    {element.label}
                  </li>
                );
              })}
            </ul>
          </div>
        )}
        {children}
      </div>
    </>
  );
};
