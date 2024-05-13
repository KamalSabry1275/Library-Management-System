export function Drag_Drop() {
  let sensors = document.querySelectorAll(".collection_sensors .sensor");
  let newSensors = document.querySelectorAll(".project_page .sensor");
  let newSensor;

  newSensors?.forEach((newSensor) => {
    newSensor.addEventListener("dragstart", (e) => {
      newSensor.classList.add("dragging");
    });
    newSensor.addEventListener("dragend", (e) => {
      newSensor.classList.remove("dragging");
    });
  });

  sensors?.forEach((sensor) => {
    sensor.addEventListener("dragstart", (e) => {
      sensor.classList.add("dragging");
      newSensor = sensor.cloneNode(true);
    });
    sensor.addEventListener("dragend", (e) => {
      sensor.classList.remove("dragging");
      // add sensor in modules in modules reducer
      // console.log(newSensor);

      // const addModule =  modules.filter((module)=>module.modlueName == sensor)
      // dispatch(plusModule());
      newSensor.classList.remove("dragging");
      newSensor = undefined;
      let newSensors = document.querySelectorAll(".project_page .sensor");
      newSensors.forEach((newSensor) => {
        newSensor.addEventListener("dragstart", (e) => {
          newSensor.classList.add("dragging");
        });
        newSensor.addEventListener("dragend", (e) => {
          newSensor.classList.remove("dragging");
        });
      });
    });
  });

  let project_page = document.querySelector(".project_page");

  // container.addEventListener("dragleave", (e) => {
  //   if (newItem != null) container.removeChild(newItem);
  // });
  project_page?.addEventListener("dragover", (e) => {
    e.preventDefault();

    let dragging = document.querySelector(".dragging");
    let element = addElement(project_page, e.clientY);

    if (newSensor == null) {
      if (element == null) project_page.appendChild(dragging);
      else project_page.insertBefore(dragging, element);
    } else {
      if (element == null) project_page.appendChild(newSensor);
      else project_page.insertBefore(newSensor, element);
    }
  });

  project_page?.addEventListener("mousedown", (e) => {
    if (e.button == "2") {
      e.preventDefault();
    }
  });

  function addElement(project_page, y) {
    let sensors = [
      ...project_page.querySelectorAll(".project_page .sensor:not(.dragging)"),
    ];

    return sensors.reduce(
      (total, sensor) => {
        let box = sensor.getBoundingClientRect();
        box = y - box.top - box.height / 2;

        if (box < 0 && box > total.offect) {
          return { offect: box, element: sensor };
        } else {
          return total;
        }
      },
      { offect: Number.NEGATIVE_INFINITY }
    ).element;
  }
}
