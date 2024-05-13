import { useEffect } from "react";
import { Module } from "../components/Module";
import { Drag_Drop } from "../Scripts/Drag_Drop";
import { Choose_Module } from "../Scripts/Choose_Module";
import {
  CollectionModules,
  ModuleProperty,
  NavEditorProject,
  ProjectPage,
} from "../components/CompEditProj";
import { useSelector, useDispatch } from "react-redux";
import { fetchModules } from "../rtk/slices/modulesSlice";
import { plusModule } from "../rtk/slices/projectsSlice";

export const NewModule = () => {
  const modules = useSelector((state) => state.modules);
  console.log(modules);
};

export function EditorProject() {
  const modules = useSelector((state) => state.modules);
  const dispatch = useDispatch();

  // let newSensor = document.querySelector(".dragging");
  // console.log(newSensor);

  const hanldeModules = () => {
    // Choose_Module();
    Drag_Drop();
  };

  useEffect(() => {
    return () => {
      hanldeModules();
    };
  }, []);

  return (
    <div className="editor_project">
      <NavEditorProject />
      <CollectionModules>
        {modules?.map((module, index) => {
          return (
            <Module key={index} class_name="module" data_module={module} />
          );
        })}
      </CollectionModules>
      <ProjectPage />
      <ModuleProperty />
    </div>
  );
}
