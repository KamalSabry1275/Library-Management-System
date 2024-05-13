import { useEffect } from "react";

export function Choose_Sensor() {
  let sensors = document.querySelectorAll(".project_page .sensor");
  useEffect(() => {
    sensors?.forEach((sensor) => {
      sensor.addEventListener("click", (e) => {
        e.target.focus();
      });
    });
    return () => {
      sensors?.forEach((sensor) => {
        sensor.removeEventListener("click", (e) => {
          e.target.focus();
        });
      });
    };
  }, []);
}
