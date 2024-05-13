import { useEffect, useState } from "react";
import swal from "sweetalert2";
import { ContextMenu } from "../components/ContextMenu";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import { MenuContext } from "../Scripts/MenuContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTableCellsLarge,
  faTableList,
} from "@fortawesome/free-solid-svg-icons";

import "simplebar-react/dist/simplebar.min.css";
import { useSelector, useDispatch } from "react-redux";
import {
  addProject,
  deleteProject,
  fetchProjects,
  renameProject,
} from "../rtk/slices/projectsSlice";
import { fetchModules } from "../rtk/slices/modulesSlice";

export const Project_Page = () => {
  // const [projects, setprojects] = useState([]);
  const [point, setPoint] = useState({
    y: 0,
    x: 0,
  });
  const [clicked, setClicked] = useState(false);
  const [reversed, setReversed] = useState("");
  const [projectID, setProjectID] = useState("");
  const [view, setView] = useState("");

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const projectDate = new Date().toLocaleDateString("en-US", options);
  const navigate = useNavigate();

  const projects = useSelector((state) => state.projects);
  const dispatch = useDispatch();

  const createProject = () => {
    swal.fire({
      title: "What is name of project",
      input: "text",
      inputLabel: "My project is",
      showCancelButton: true,
      inputValidator: async (projectName) => {
        if (!projectName) {
          return "You need to write something!";
        } else {
          await dispatch(addProject(["kamal12", projectName, projectDate]));
          dispatch(fetchProjects());
        }
      },
    });
  };
  // const add_project = () => {
  //   swal.fire({
  //     title: "What is name of project",
  //     input: "text",
  //     inputLabel: "My project is",
  //     showCancelButton: true,
  //     inputValidator: (name) => {
  //       if (!name) {
  //         return "You need to write something!";
  //       } else {
  //         create_project(name, date);
  //       }
  //     },
  //   });
  // };

  // const create_project = async (name, date) => {
  //   await fetch("http://localhost:9000/projects", {
  //     method: "post",
  //     headers: {
  //       "content-type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       name: name,
  //       date: date,
  //     }),
  //   });
  //   get_projects();
  // };

  // const get_projects = async () => {
  //   await fetch("http://localhost:9000/projects")
  //     .then((res) => res.json())
  //     .then((data) => setprojects(data))
  //     .catch((rej) => {
  //       console.log(rej);
  //     });
  // };

  const delete_project = (projectID) => {
    swal.fire({
      title: "You want delete the project?",
      showCancelButton: true,

      preConfirm: async () => {
        await dispatch(deleteProject([projectID]));
        dispatch(fetchProjects());
      },
    });
  };

  // const AddProject = (username, projectName, projectDate) => {
  //   const project = {
  //     user: username,
  //     projectName: projectName,
  //     projectDate: projectDate,
  //     description: "An IoT project for smart gardening",
  //     modules: [],
  //   };
  //   dispatch(plusProject(project));
  // };

  const editor_project = (projectID) => {
    navigate(`/editorproject/${projectID}`);
  };

  const rename_project = (projectID) => {
    swal.fire({
      title: "Rename my project",
      input: "text",
      inputLabel: "My project is",
      showCancelButton: true,

      inputValidator: async (projectName) => {
        if (!projectName) {
          return "You need to write something!";
        } else {
          await dispatch(renameProject([projectID, projectName]));
          dispatch(fetchProjects());
        }
      },
    });
  };

  const menuShow = (e, project) => {
    e.preventDefault();
    if (
      e.pageY > window.innerHeight - 8.5 * 16 &&
      e.pageX > window.innerWidth - 6 * 16
    ) {
      setPoint({ y: e.pageY - 8.5 * 16, x: e.pageX - 6 * 16 });
      setReversed("column-reverse");
    } else if (e.pageY > window.innerHeight - 8.5 * 16) {
      setPoint({ y: e.pageY - 8.5 * 16, x: e.pageX });
      setReversed("column-reverse");
    } else if (e.pageX > window.innerWidth - 6 * 16) {
      setPoint({ y: e.pageY, x: e.pageX - 6 * 16 });
      setReversed("column");
    } else {
      setPoint({ y: e.pageY, x: e.pageX });
      setReversed("column");
    }
    setClicked(true);
    setProjectID(project.id);
  };

  const menuHide = () => {
    setClicked(false);
  };

  const viewStle = (style) => {
    setView(style);
  };

  useEffect(() => {
    // get_projects();
    dispatch(fetchProjects());
    dispatch(fetchModules());
    console.log(projects);
    MenuContext(() => menuHide());
    return () => {};
  }, []);

  // useEffect(() => {
  //   dispatch(fetchProjects());
  //   console.log("nlnk");
  // }, [projects]);

  useEffect(() => {
    if (view != "") localStorage.setItem("viewStyle", view);
    return () => {};
  }, [view]);

  return (
    <>
      <div className="container">
        <div className="page-project">
          {clicked && (
            <ContextMenu top={point.y} left={point.x}>
              <ul style={{ flexDirection: reversed }}>
                <li
                  onClick={() => {
                    setClicked(false);
                    editor_project(projectID);
                  }}
                >
                  Edit
                </li>
                <li
                  onClick={() => {
                    setClicked(false);
                    rename_project(projectID);
                  }}
                >
                  Rename
                </li>
                <li
                  onClick={() => {
                    setClicked(false);
                    delete_project(projectID);
                  }}
                >
                  Delete
                </li>
              </ul>
            </ContextMenu>
          )}
          <div className="project-title">
            <h1>My Projects</h1>
            <button
              className="btn-add-project"
              onClick={() => {
                // add_project();
                createProject();
              }}
            >
              add project
            </button>
            <div className="view_icons">
              <FontAwesomeIcon
                style={{ width: "2em", fontSize: "1.5rem", cursor: "pointer" }}
                icon={faTableCellsLarge}
                onClick={() => viewStle("grip")}
              />
              <FontAwesomeIcon
                style={{ width: "2em", fontSize: "1.5rem", cursor: "pointer" }}
                icon={faTableList}
                onClick={() => viewStle("list")}
              />
            </div>
            {/* <FontAwesomeIcon
              icon={fa}
              style={{ color: "#FFF", width: "2em" }}
              onClick={() => {
                type = "password";
                setType(type);
              }}
            /> */}
          </div>
          {/* <SimpleBar
            forceVisible="y"
            autoHide={false}
            style={{ maxHeight: "90%", paddingRight: "0.5rem" }}
          > */}

          <div
            className={`projects ${
              view != ""
                ? view
                : localStorage.getItem("viewStyle") != undefined
                ? localStorage.getItem("viewStyle")
                : "grip"
            }`}
            onScroll={menuHide}
          >
            {projects?.map((project) => {
              return (
                <div
                  className="card"
                  key={project.id}
                  onClick={(e) => {
                    menuShow(e, project);
                  }}
                  onContextMenu={(e) => {
                    e.preventDefault();
                    menuShow(e, project);
                  }}
                >
                  <div className="card-body">
                    <h5 className="card-title">{project.projectName}</h5>
                    <h6 className="card-subtitle mb-2 text-end opacity-75">
                      {project.projectDate}
                    </h6>
                    {/* <p className="card-text">
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </p> */}
                  </div>
                </div>
              );
            })}
          </div>
          {/* </SimpleBar> */}
        </div>
      </div>
    </>
  );
};
