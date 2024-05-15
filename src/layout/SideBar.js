import React, { useEffect, useState } from "react";
import { label, useLocation, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const location = useLocation();
  const [selcetorTop, setSelcetorTop] = useState(1);
  const positionSelctor = 4.5;
  const offestSelctor = 3.875;

  const handleSideBarSelector = (e) => {
    document.documentElement.style.setProperty(
      "--selctor-top",
      `${e.target.getBoundingClientRect().top}px`
    );

    console.log(e);
    console.log(e.target.getBoundingClientRect().top);
  };

  useEffect(() => {
    if (
      location.pathname == "/librarian/transaction/" ||
      location.pathname == "/librarian/transaction/borrow" ||
      location.pathname == "/librarian/transaction/reserve" ||
      location.pathname == "/librarian/transaction/return"
    ) {
      document.documentElement.style.setProperty(
        "--selctor-top",
        `${positionSelctor + offestSelctor * 6}rem`
      );
      document.querySelectorAll("input[type='radio']")[6].checked = true;
    } else if (location.pathname == "/librarian/filterbook") {
      document.documentElement.style.setProperty(
        "--selctor-top",
        `${positionSelctor + offestSelctor * 5}rem`
      );
      document.querySelectorAll("input[type='radio']")[5].checked = true;
    } else if (location.pathname == "/librarian/addbook") {
      document.documentElement.style.setProperty(
        "--selctor-top",
        `${positionSelctor + offestSelctor * 4}rem`
      );
      document.querySelectorAll("input[type='radio']")[4].checked = true;
    } else if (
      location.pathname == "/librarian/user/all" ||
      location.pathname == "/admin/add"
    ) {
      document.documentElement.style.setProperty(
        "--selctor-top",
        `${positionSelctor + offestSelctor * 3}rem`
      );
      document.querySelectorAll("input[type='radio']")[3].checked = true;
    } else if (
      location.pathname == "/librarian/genre/add" ||
      location.pathname == "/admin/all" ||
      location.pathname == "/admin/edit/:id" ||
      location.pathname == "/admin/user/:id"
    ) {
      document.documentElement.style.setProperty(
        "--selctor-top",
        `${positionSelctor + offestSelctor * 2}rem`
      );
      document.querySelectorAll("input[type='radio']")[2].checked = true;
    } else if (location.pathname == "/admin/filter") {
      document.documentElement.style.setProperty(
        "--selctor-top",
        `${positionSelctor + offestSelctor}rem`
      );
      document.querySelectorAll("input[type='radio']")[1].checked = true;
    } else {
      document.documentElement.style.setProperty(
        "--selctor-top",
        `${positionSelctor}rem`
      );
      document.querySelectorAll("input[type='radio']")[0].checked = true;
    }
  }, []);

  useEffect(() => {
    if (role == "administrator") {
      dispatch(fetchUsers(apis.Admin.AllUsers.replace(":number", 1)));
    } else if (role == "librarian") {
      dispatch(fetchGenres(apis.Librarian.Genre.All));

      dispatch(fetchUsers(apis.Librarian.User.AllUsers.replace(":number", 1)));
    }
  }, [role]);

  return (
    <div className="sidebar">
      <ul className="list">
        <div className="sidebar-selector"></div>
        <li className="item-list">
          <input type="radio" id="sidebar-0" name="sidebar" />
          <label
            htmlFor="sidebar-0"
            className="item"
            onClick={(e) => {
              navigate(routes.Home);
              handleSideBarSelector(e);
            }}
          >
            Home
          </label>
        </li>
        {role == "administrator" && (
          <>
            <li className="item-list">
              <input type="radio" id="sidebar-1" name="sidebar" />

              <label
                htmlFor="sidebar-1"
                className="item"
                onClick={(e) => {
                  navigate(routes.Admin.Filtering);
                  handleSideBarSelector(e);
                }}
              >
                Filter
              </label>
            </li>
            <li className="item-list">
              <input type="radio" id="sidebar-2" name="sidebar" />

              <label
                htmlFor="sidebar-2"
                className="item"
                onClick={(e) => {
                  navigate(routes.Admin.AllUsers);
                  handleSideBarSelector(e);
                }}
              >
                All Users
              </label>
            </li>
            <li className="item-list">
              <input type="radio" id="sidebar-3" name="sidebar" />

              <label
                htmlFor="sidebar-3"
                className="item"
                onClick={(e) => {
                  navigate(routes.Admin.AddUser);
                  handleSideBarSelector(e);
                }}
              >
                Add User
              </label>
            </li>
          </>
        )}
        {role == "librarian" && (
          <>
            <li className="item-list">
              <input type="radio" id="sidebar-4" name="sidebar" />
              <label
                htmlFor="sidebar-4"
                className="item"
                onClick={(e) => {
                  navigate(routes.Librarian.Genre.All);
                  handleSideBarSelector(e);
                }}
              >
                All Genres
              </label>
            </li>

            <li className="item-list">
              <input type="radio" id="sidebar-5" name="sidebar" />

              <label
                htmlFor="sidebar-5"
                className="item"
                onClick={(e) => {
                  navigate(routes.Librarian.Genre.Add);
                  handleSideBarSelector(e);
                }}
              >
                Add Genre
              </label>
            </li>
            <li className="item-list">
              <input type="radio" id="sidebar-6" name="sidebar" />

              <label
                htmlFor="sidebar-6"
                className="item"
                onClick={(e) => {
                  navigate(routes.Librarian.User.All);
                  handleSideBarSelector(e);
                }}
              >
                All Users
              </label>
            </li>
            <li className="item-list">
              <input type="radio" id="sidebar-7" name="sidebar" />

              <label
                htmlFor="sidebar-7"
                className="item"
                onClick={(e) => {
                  navigate(routes.Librarian.Book.Add);
                  handleSideBarSelector(e);
                }}
              >
                Add Book
              </label>
            </li>
            <li className="item-list">
              <input type="radio" id="sidebar-8" name="sidebar" />

              <label
                htmlFor="sidebar-8"
                className="item"
                onClick={(e) => {
                  navigate(routes.Librarian.Book.Filter);
                  handleSideBarSelector(e);
                }}
              >
                Filter Book
              </label>
            </li>
            <li className="item-list">
              <input type="radio" id="sidebar-9" name="sidebar" />

              <label
                htmlFor="sidebar-9"
                className="item"
                onClick={(e) => {
                  navigate(routes.Librarian.Transaction["/"]);
                  handleSideBarSelector(e);
                }}
              >
                Transaction
              </label>
            </li>
          </>
        )}
      </ul>
    </div>
  );
}

export default SideBar;
