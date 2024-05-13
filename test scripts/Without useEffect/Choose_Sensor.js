export function Choose_Sensor() {
  let sensors = document.querySelectorAll(".project_page .sensor");
  sensors?.forEach((sensor) => {
    sensor.addEventListener("click", (e) => {
      e.target.focus();
    });
  });
}
