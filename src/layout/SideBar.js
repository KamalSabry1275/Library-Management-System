import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { apis, routes } from "../components/URLs";
import { decryptAndRetrieve } from "../rtk/slices/authSlice";
import { useDispatch } from "react-redux";
import { fetchUsers } from "../rtk/slices/usersSlice";
import { fetchGenres } from "../rtk/slices/genresSlice";
import RequireAccess from "./RequireAccess";
import RequireAuth from "../components/RequireAuth";

function getAccessToken() {
  return decryptAndRetrieve("fathy", "access_token");
}

function getRoleUser() {
  return decryptAndRetrieve("fathy", "role");
}

function SideBar() {
  const dispatch = useDispatch();
  const role = getRoleUser();

  return (
    <div className="sidebar">
      <ul className="list">
        {role == "administrator" && (
          <>
            <hr />
            <li className="item-list">
              <Link to={routes.Admin.Filtering}>Filter</Link>
            </li>
            <hr />
            <li className="item-list">
              <Link
                to={routes.Admin.AllUsers}
                onClick={() => {
                  dispatch(
                    fetchUsers(apis.Admin.AllUsers.replace(":number", 1))
                  );
                }}
              >
                All Users
              </Link>
            </li>
            <hr />
            <li className="item-list">
              <Link to={routes.Admin.AddUser}>Add User</Link>
            </li>
            <hr />
          </>
        )}
        {role == "librarian" && (
          <>
            <hr />
            <li className="item-list">
              <Link
                to={routes.Librarian.Genre.All}
                onClick={() => {
                  dispatch(fetchGenres(apis.Librarian.Genre.All));
                }}
              >
                All Genres
              </Link>
            </li>
            <hr />
            <li className="item-list">
              <Link
                to={routes.Librarian.User.All}
                onClick={() => {
                  dispatch(
                    fetchUsers(
                      apis.Librarian.User.AllUsers.replace(":number", 1)
                    )
                  );
                }}
              >
                All Users
              </Link>
            </li>
            <hr />
            <li className="item-list">
              <Link to={routes.Librarian.Genre.Add}>Add Genre</Link>
            </li>
            <hr />
            <li className="item-list">
              <Link to={routes.Librarian.Book.Add}>Add Book</Link>
            </li>
            <hr />
            <li className="item-list">
              <Link to={routes.Librarian.Book.Filter}>Filter Book</Link>
            </li>
            <hr />
            <li className="item-list">
              <Link to={routes.Librarian.Transaction["/"]}>Transaction</Link>
            </li>
            <hr />
          </>
        )}
      </ul>
    </div>
  );
}

export default SideBar;
