import { Link, Outlet } from "react-router-dom";
import { routes } from "../../../components/URLs";
import { MiniNav } from "../../../components/MiniNav";

export const Transaction = () => {
  return (
    <>
      <MiniNav
        elements={["borrow", "reserve", "return"]}
        defaultValue="borrow"
      />
      <div>
        <Outlet />
      </div>
    </>
  );
};
