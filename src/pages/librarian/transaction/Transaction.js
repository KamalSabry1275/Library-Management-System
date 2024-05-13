import { Link, Outlet } from "react-router-dom";
import { routes } from "../../../components/URLs";

export const Transaction = () => {
  return (
    <>
      <div>
        <Link to={routes.Librarian.Transaction.Borrow}>borrow</Link>
        <Link to={routes.Librarian.Transaction.Reserve}>reserve</Link>
        <Link to={routes.Librarian.Transaction.Return}>return</Link>
      </div>
      <div>
        <Outlet />
      </div>
    </>
  );
};
