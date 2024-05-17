import "./App.css";
import "./sass/main.css";
import { ToastContainer } from "react-toastify";
import { Route, Routes } from "react-router-dom";
import { NavBar } from "./layout/NavBar";
import RequireAccess from "./layout/RequireAccess";
import { routes } from "./components/URLs";
import Home from "./pages/Home";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import ResetPassword from "./pages/auth/ResetPassword";
import { useEffect, useState } from "react";
import { ActiveEmail } from "./pages/auth/ActiveEmail";
import { RequireAuth } from "./components/RequireAuth";
import AddUser from "./pages/admin/AddUser";
import SideBar from "./layout/SideBar";
import { AllUsers } from "./pages/admin/AllUsers";
import EditUser from "./pages/admin/EditUser";
import ShowUser from "./pages/admin/ShowUser";
import Filtering from "./pages/admin/Filtering";
import { PageConainer } from "./layout/PageConainer";
import { AddGenre } from "./pages/librarian/genres/AddGenre";
import { AddBook } from "./pages/librarian/books/AddBook";
import { AllGenre } from "./pages/librarian/genres/AllGenre";
import { AllLibrarianUsers } from "./pages/librarian/books/AllLibrarianUsers";
import { FilterBook } from "./pages/librarian/books/FilterBook";
import { Transaction } from "./pages/librarian/transaction/Transaction";
import { BorrowBooks } from "./pages/librarian/transaction/BorrowBooks";
import { ReserveBooks } from "./pages/librarian/transaction/ReserveBooks";
import { ReturnBooks } from "./pages/librarian/transaction/ReturnBooks";

function App() {
  const [theme, setTheme] = useState(JSON.parse(localStorage.getItem("theme")));

  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(theme));
    // console.log(JSON.parse(localStorage.getItem("theme")));
  }, [theme]);

  return (
    <div theme={`${theme}`}>
      <div className="App">
        <NavBar>
          <button
            className="btn_theme"
            onClick={() => {
              setTheme(!theme);
            }}
          >
            <span></span>
          </button>
        </NavBar>

        <div className="main">
          <SideBar />

          <PageConainer>
            <Routes>
              <Route path={routes.Register} element={<Register />} />
              <Route path={routes.Login} element={<Login />} />
              <Route
                path={routes.Resetpassword}
                element={
                  <RequireAccess>
                    <ResetPassword />
                  </RequireAccess>
                }
              />
              <Route path={routes.ActiveEmail} element={<ActiveEmail />} />
              <Route element={<RequireAuth />}>
                <Route path={routes.Home} element={<Home />} />
              </Route>
              <Route element={<RequireAuth allowedRoles={"administrator"} />}>
                <Route path={routes.Admin.AddUser} element={<AddUser />} />
                <Route path={routes.Admin.EditUser} element={<EditUser />} />
                <Route path={routes.Admin.ShowUser} element={<ShowUser />} />
                <Route path={routes.Admin.AllUsers} element={<AllUsers />} />
                <Route path={routes.Admin.Filtering} element={<Filtering />} />
              </Route>
              <Route element={<RequireAuth allowedRoles={"librarian"} />}>
                <Route
                  path={routes.Librarian.User.All}
                  element={<AllLibrarianUsers />}
                />
                <Route
                  path={routes.Librarian.Genre.All}
                  element={<AllGenre />}
                />
                <Route
                  path={routes.Librarian.Genre.Add}
                  element={<AddGenre />}
                />
                <Route path={routes.Librarian.Book.Add} element={<AddBook />} />
                <Route
                  path={routes.Librarian.Book.Filter}
                  element={<FilterBook />}
                />
                <Route
                  path={routes.Librarian.Transaction["/"]}
                  element={<Transaction />}
                >
                  <Route index element={<BorrowBooks />} />
                  <Route
                    path={routes.Librarian.Transaction.Borrow}
                    element={<BorrowBooks />}
                  />
                  <Route
                    path={routes.Librarian.Transaction.Reserve}
                    element={<ReserveBooks />}
                  />
                  <Route
                    path={routes.Librarian.Transaction.Return}
                    element={<ReturnBooks />}
                  />
                </Route>
              </Route>
            </Routes>
          </PageConainer>

          {/* <Shap /> */}
          <ToastContainer theme="colored" hideProgressBar />
        </div>
      </div>
    </div>
  );
}

export default App;
