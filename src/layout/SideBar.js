import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
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
  const location = useLocation();
  const [selcetorTop, setSelcetorTop] = useState(1);

  const handleSideBarSelector = (e) => {
    document.documentElement.style.setProperty(
      "--selctor-top",
      `${e.target.getBoundingClientRect().top}px`
    );

    console.log(e);
    console.log(e.target.getBoundingClientRect().top);
  };

  useEffect(() => {
    console.log(location.pathname);
    if (
      location.pathname == "/librarian/transaction/" ||
      location.pathname == "/librarian/transaction/borrow" ||
      location.pathname == "/librarian/transaction/reserve" ||
      location.pathname == "/librarian/transaction/return"
    ) {
      document.documentElement.style.setProperty("--selctor-top", `382px`);
    } else if (location.pathname == "/librarian/filterbook") {
      document.documentElement.style.setProperty("--selctor-top", `320px`);
    } else if (location.pathname == "/librarian/addbook") {
      document.documentElement.style.setProperty("--selctor-top", `258px`);
    } else if (
      location.pathname == "/librarian/genre/add" ||
      location.pathname == "/admin/add"
    ) {
      document.documentElement.style.setProperty("--selctor-top", `196px`);
    } else if (
      location.pathname == "/librarian/user/all" ||
      location.pathname == "/admin/all" ||
      location.pathname == "/admin/edit/:id" ||
      location.pathname == "/admin/user/:id"
    ) {
      document.documentElement.style.setProperty("--selctor-top", `134px`);
    } else {
      document.documentElement.style.setProperty("--selctor-top", `72px`);
    }
  }, []);

  return (
    <div className="sidebar">
      <ul className="list">
        <div className="sidebar-selector"></div>
        {role == "administrator" && (
          <>
            <li className="item-list">
              <Link
                className="item"
                to={routes.Admin.Filtering}
                onClick={(e) => handleSideBarSelector(e)}
              >
                Filter
              </Link>
            </li>
            <li className="item-list">
              <Link
                className="item"
                to={routes.Admin.AllUsers}
                onClick={(e) => {
                  dispatch(
                    fetchUsers(apis.Admin.AllUsers.replace(":number", 1))
                  );
                  handleSideBarSelector(e);
                }}
              >
                All Users
              </Link>
            </li>
            <li className="item-list">
              <Link
                className="item"
                to={routes.Admin.AddUser}
                onClick={(e) => handleSideBarSelector(e)}
              >
                Add User
              </Link>
            </li>
          </>
        )}
        {role == "librarian" && (
          <>
            <li className="item-list">
              <Link
                className="item"
                to={routes.Librarian.Genre.All}
                onClick={(e) => {
                  dispatch(fetchGenres(apis.Librarian.Genre.All));
                  handleSideBarSelector(e);
                }}
              >
                All Genres
              </Link>
            </li>
            <li className="item-list">
              <Link
                className="item"
                to={routes.Librarian.User.All}
                onClick={(e) => {
                  dispatch(
                    fetchUsers(
                      apis.Librarian.User.AllUsers.replace(":number", 1)
                    )
                  );
                  handleSideBarSelector(e);
                }}
              >
                All Users
              </Link>
            </li>
            <li className="item-list">
              <Link
                className="item"
                to={routes.Librarian.Genre.Add}
                onClick={(e) => handleSideBarSelector(e)}
              >
                Add Genre
              </Link>
            </li>
            <li className="item-list">
              <Link
                className="item"
                to={routes.Librarian.Book.Add}
                onClick={(e) => handleSideBarSelector(e)}
              >
                Add Book
              </Link>
            </li>
            <li className="item-list">
              <Link
                className="item"
                to={routes.Librarian.Book.Filter}
                onClick={(e) => handleSideBarSelector(e)}
              >
                Filter Book
              </Link>
            </li>
            <li className="item-list">
              <Link
                className="item"
                to={routes.Librarian.Transaction["/"]}
                onClick={(e) => handleSideBarSelector(e)}
              >
                Transaction
              </Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
}

export default SideBar;
