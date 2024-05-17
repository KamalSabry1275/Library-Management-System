import { useEffect, useState } from "react";
import { apis, routes } from "../../../components/URLs";
import { decryptAndRetrieve } from "../../../rtk/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../../components/Button";
import { Link, useNavigate } from "react-router-dom";
import {
  clearUser,
  deleteUser,
  fetchUsers,
  toggleUserActive,
} from "../../../rtk/slices/usersSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsRotate } from "@fortawesome/free-solid-svg-icons";

export const AllLibrarianUsers = ({ pagination = true }) => {
  const users = useSelector((state) => state.users?.data);
  const [number_of_page, setNumOfPAge] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const next_page = () => {
    let num;
    if (users.length > 0) {
      num = number_of_page + 1;
      dispatch(clearUser());
      dispatch(
        fetchUsers(apis.Librarian.User.AllUsers.replace(":number", num))
      );
      setNumOfPAge(num);
    }
    console.log(num);
  };

  const previous_page = () => {
    let num;
    if (number_of_page > 1) {
      num = number_of_page - 1;
      dispatch(clearUser());
      dispatch(
        fetchUsers(apis.Librarian.User.AllUsers.replace(":number", num))
      );
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
                fetchUsers(apis.Librarian.User.AllUsers.replace(":number", 1))
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
            <th scope="col">Id</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Is Active</th>
          </tr>
        </thead>
        <tbody className="table-group-divider">
          {users?.map((user, index) => {
            return (
              <tr key={`${user}-${index}`}>
                <th scope="row">{index + 1 + (number_of_page - 1) * 10}</th>

                <td>{user.user_id}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <label style={{ margin: "0" }}>
                      {String(user.user_libraries[0]?.is_active)}
                    </label>
                    <button
                      style={{
                        margin: "0.2rem 0.5rem",
                        width: "fit-content",
                      }}
                      className="btn btn-success "
                      onClick={() => {
                        dispatch(toggleUserActive(user.user_id));
                      }}
                    >
                      Toggle State
                    </button>
                  </div>
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
