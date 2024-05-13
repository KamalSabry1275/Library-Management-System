import { useSelector, useDispatch } from "react-redux";
import { fetchProjects, plusModule } from "../rtk/slices/projectsSlice";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Module } from "./Module";

export const NavEditorProject = () => {
  const save_project = () => {
    let project_page = document.querySelector(".container_modules");
    let modules_in_project = [...project_page?.children].map(
      (module_project) => {
        return JSON.parse(module_project.dataset.index);
      }
    );
    //console.log(project_page?.children.length);
    console.log(modules_in_project);
  };
  return (
    <>
      <button onClick={save_project} className="btn btn-success header">
        Save
      </button>
    </>
  );
};

export function ProjectPage() {
  const projects = useSelector((state) => state.projects);
  const dispatch = useDispatch();
  const { projectID } = useParams();

  const modules_project = projects.filter(
    (module_project) => module_project.id == projectID
  );

  const modules = useSelector((state) => state.modules);

  // const newModule = (e) => {
  //   // console.log(e.target);
  //   console.log(
  //     modules.filter((module) => module.moduleName == e.target.textContent)
  //   );
  //   // dispatch(plusModule());
  // };

  // useEffect(() => {
  //   window.addEventListener("dragstart", newModule);
  //   return () => {
  //     window.removeEventListener("dragstart", newModule);
  //   };
  // }, []);

  useEffect(() => {
    // console.log(project);
    dispatch(fetchProjects());
  }, []);

  return (
    <>
      <div className="project_page">
        <div className="container_modules">
          {modules_project[0]?.modules.map((module, index) => {
            return (
              <Module class_name="module" data_module={module} key={index} />
            );
          })}
        </div>
      </div>
    </>
  );
}

export function CollectionModules({ children }) {
  return (
    <>
      <div className="collection_modules">{children}</div>
    </>
  );
}

export function ModuleProperty({ children }) {
  const modules = useSelector((state) => state.modules);
  const [chooseModule, setModule] = useState([]);
  let modules_in_project;
  const [lenght, setLength] = useState(0);

  const newModule = (e) => {
    let number_modules = project_page?.children.length;
    if (lenght != number_modules) setLength(number_modules);
    let module_index = e.target.dataset?.index;

    console.log(module_index);
    //remove class focus from all modules
    [...project_page.children].map((element) =>
      element.classList.remove("focus")
    );
    //add class focus at element focus
    e.target.classList.add("focus");
    if (module_index != undefined || module_index != null)
      setModule(JSON.parse(module_index));
    // setModule(e.target);
    // setModule(
    //   modules.filter((module) => module.moduleName == e.target.textContent)
    // );

    // dispatch(plusModule());
  };

  let project_page;

  useEffect(() => {
    project_page = document.querySelector(".container_modules");

    project_page?.addEventListener("click", newModule);
    return () => {
      project_page?.removeEventListener("click", newModule);
    };
  }, [lenght]);

  // useEffect(() => {
  //   project_page = document.querySelector(".project_page");

  // }, [lenght]);

  const updateDate = () => {
    const dateUpdate = document.querySelector(".properties_module");
    // console.log(dateUpdate.children);
    dateUpdate = [...dateUpdate.children];
    console.log(
      dateUpdate?.map((property) => {
        // console.log(property.firstChild);
        if (property.lastChild.value)
          return `${property.firstChild.innerHTML} ${property.lastChild.value}`;
        else
          return `${property.firstChild.innerHTML} ${property.lastChild.placeholder}`;
      })
    );
    // elementFocus.dataset.index = dateUpdate;
    let updateElment = document.querySelector(".module.focus");
    updateElment.dataset.index = "JSON.parse(dateUpdate)";
  };

  return (
    <>
      <div className="module_properties">
        <h5 className="name_module">{chooseModule?.moduleName}</h5>
        <div className="properties_module">
          {chooseModule.length !== 0 && (
            <div>
              <label>alternate name:</label>
              <input type="text" placeholder={chooseModule?.alternateName} />
            </div>
          )}
          {chooseModule?.pins?.map((pin) =>
            Object.entries(pin).map(([key, value]) => (
              <div key={key}>
                <label>{`${key}:`}</label>
                {key == "pinNumber" ? (
                  <select>
                    <option>A1</option>
                    <option>A2</option>
                    <option>A3</option>
                    <option>A4</option>
                    <option>A5</option>
                    <option>A6</option>
                  </select>
                ) : (
                  <input type="text" defaultValue={value} disabled />
                )}
              </div>
            ))
          )}
        </div>
        <button className="btn btn-success" onClick={updateDate}>
          Save
        </button>
      </div>
    </>
  );
}
