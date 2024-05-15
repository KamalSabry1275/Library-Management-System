import {
  Link,
  Outlet,
  useLoaderData,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { routes } from "../../../components/URLs";
import { MiniNav } from "../../../components/MiniNav";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

export const Transaction = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (
      location.pathname == "/librarian/transaction/" ||
      location.pathname == "/librarian/transaction/borrow"
    ) {
      document.querySelectorAll("input[hidden]")[0].checked = true;
    } else if (location.pathname == "/librarian/transaction/reserve") {
      document.querySelectorAll("input[hidden]")[1].checked = true;
    } else if (location.pathname == "/librarian/transaction/return") {
      document.querySelectorAll("input[hidden]")[2].checked = true;
    }
  }, []);

  return (
    <>
      <MiniNav elements={["borrow", "reserve", "return"]} />
      <div>
        <Outlet />
      </div>
    </>
  );
};
