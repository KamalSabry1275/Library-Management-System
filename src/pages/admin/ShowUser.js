import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../components/Button";
import InformationText from "../../components/InformationText";
import { useDispatch, useSelector } from "react-redux";
import { routes } from "../../components/URLs";
import { deleteUser } from "../../rtk/slices/usersSlice";

const ShowUser = () => {
  let userId = useParams().id;
  let [userInfo] = useSelector((state) =>
    state.users?.data?.filter((user) => user.user_id == userId)
  );
  console.log(userInfo);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  function titleForm(title) {
    document.documentElement.style.setProperty("--logo-form", `'${title}'`);
  }

  const handlerSubmit = (e) => {};

  useEffect(() => {
    titleForm("information");
  }, []);

  return (
    <>
      <form onSubmit={handlerSubmit}>
        <table className="table table-bordered">
          <tbody class="table-group-divider">
            <InformationText label="id" value={userInfo.user_id} />
            <InformationText label="user name" value={userInfo.username} />
            <InformationText label="password" value={userInfo.password} />
            <InformationText label="email" value={userInfo.email} />
            <InformationText label="role" value={userInfo.role} />
            <InformationText
              label="account btype"
              value={userInfo.account_type}
            />
            <InformationText
              label="library name"
              value={userInfo.library_name}
            />
            <InformationText label="verified" value={userInfo.verified} />
            <InformationText label="is actvie" value={userInfo.is_active} />
          </tbody>
        </table>
        <tr>
          <td>
            <button
              style={{ margin: "0.2rem 0.5rem" }}
              className="btn btn-success"
              onClick={() => {
                navigate(
                  routes.Admin.EditUser.replace(":id", userInfo.user_id)
                );
              }}
            >
              edit
            </button>
            <button
              style={{ margin: "0.2rem 0.5rem" }}
              className="btn btn-danger"
              onClick={() => {
                // navigate(routes.Admin.AllUsers);
                dispatch(deleteUser(userInfo.user_id));
              }}
            >
              delete
            </button>
          </td>
        </tr>
      </form>
    </>
  );
};

export default ShowUser;
