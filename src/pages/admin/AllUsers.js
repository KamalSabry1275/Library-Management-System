import { useEffect, useState } from "react";
import { apis, routes } from "../../components/URLs";
import { decryptAndRetrieve } from "../../rtk/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../components/Button";
import { Link, useNavigate } from "react-router-dom";
import { clearUser, deleteUser, fetchUsers } from "../../rtk/slices/usersSlice";
import { clear } from "@testing-library/user-event/dist/clear";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsRotate, faUpload } from "@fortawesome/free-solid-svg-icons";

export const AllUsers = ({ pagination = true }) => {
  const users = useSelector((state) => state.users);
  const [number_of_page, setNumOfPAge] = useState(users?.page);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const next_page = () => {
    let num;
    if (users?.data?.length > 0) {
      num = number_of_page + 1;
      dispatch(clearUser());
      dispatch(fetchUsers(apis.Admin.AllUsers.replace(":number", num)));
      setNumOfPAge(num);
    }
    console.log(num);
  };

  const previous_page = () => {
    let num;
    if (number_of_page > 1) {
      num = number_of_page - 1;
      dispatch(clearUser());
      dispatch(fetchUsers(apis.Admin.AllUsers.replace(":number", num)));
      setNumOfPAge(num);
    }
    console.log(num);
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2>All Users</h2>
        <button style={{ background: "transparent", border: "none" }}>
          <FontAwesomeIcon
            icon={faArrowsRotate}
            style={{
              color: "#858585",
              width: "2em",
              fontSize: "1.2rem",
            }}
            onClick={async (e) => {
              e.target?.classList?.add("reload");

              dispatch(clearUser());
              await dispatch(
                fetchUsers(apis.Admin.AllUsers.replace(":number", 1))
              );

              e.target?.classList?.remove("reload");
            }}
          />
        </button>
      </div>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Operations</th>
          </tr>
        </thead>
        <tbody className="table-group-divider">
          {users?.data?.map((user, index) => {
            return (
              <tr>
                <th scope="row">{index + 1 + (users?.page - 1) * 10}</th>

                <td style={{ width: "60%" }}>{user.username}</td>
                <td>
                  <button
                    style={{ margin: "0.2rem 0.5rem" }}
                    className="btn btn-info"
                    onClick={() => {
                      navigate(
                        routes.Admin.ShowUser.replace(":id", user.user_id)
                      );
                    }}
                  >
                    view
                  </button>
                  <button
                    style={{ margin: "0.2rem 0.5rem" }}
                    className="btn btn-success"
                    onClick={() => {
                      navigate(
                        routes.Admin.EditUser.replace(":id", user.user_id)
                      );
                    }}
                  >
                    edit
                  </button>
                  <button
                    style={{ margin: "0.2rem 0.5rem" }}
                    className="btn btn-danger"
                    onClick={() => {
                      dispatch(deleteUser(user.user_id));
                    }}
                  >
                    delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {pagination && (
        <>
          <div className="pagination">
            <button
              className="btn btn-outline-primary"
              onClick={() => {
                previous_page();
              }}
            >
              Previous
            </button>
            <button
              className="btn btn-outline-primary"
              onClick={() => {
                next_page();
              }}
            >
              Next
            </button>
          </div>
        </>
      )}
    </>
  );
};
