import { useEffect, useState } from "react";
import Input from "../../components/Input";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { apis, routes } from "../../components/URLs";
import Button from "../../components/Button";
import InputRadio from "../../components/InputRadio";
import InputCheckBox from "../../components/InputCheckBox";
import { decryptAndRetrieve } from "../../rtk/slices/authSlice";
import { editUser } from "../../rtk/slices/usersSlice";

function getAccessToken() {
  return decryptAndRetrieve("fathy", "access_token");
}

export default function EditUser() {
  let userId = useParams().id;
  let [userInfo] = useSelector((state) =>
    state.users?.data?.filter((user) => user.user_id == userId)
  );
  console.log(userInfo);

  let default_username = userInfo.username,
    default_accountType = userInfo.account_type,
    default_email = userInfo.email,
    default_password = userInfo.password,
    default_role = userInfo.role,
    default_libraryName = userInfo.library_name,
    default_verified = userInfo.verified,
    default_isActive = userInfo.is_active;

  const [username, setUserName] = useState(default_username);
  const [accountType, setAccountType] = useState(default_accountType);
  const [email, setEmail] = useState(default_email);
  const [role, setRole] = useState(default_role);
  const [libraryName, setLibraryName] = useState(default_libraryName);
  const [verified, setVerified] = useState(default_verified);
  const [isActive, setIsActive] = useState(default_isActive);

  const [invalid, setInvalid] = useState([]);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  let dataError = [];

  const setButton = () => {
    let loading = document.querySelector(".loading");
    loading.innerHTML = "Submit";
  };

  const handlerUserName = (e) => {
    setUserName(e.target.value);
  };
  const handlerAccountType = (e) => {
    setAccountType(e.target.value);
  };
  const handlerEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlerRole = (e) => {
    setRole(e.target.value);
  };
  const handlerLibraryName = (e) => {
    setLibraryName(e.target.value);
  };
  const handlerVerified = (e) => {
    setVerified(e.target.checked);
  };
  const handlerIsActive = (e) => {
    setIsActive(e.target.checked);
  };

  function titleForm(title) {
    document.documentElement.style.setProperty("--logo-form", `'${title}'`);
  }

  const handlerSubmit = (e) => {
    e.preventDefault();
    dataError = [];
    const reUserName = /\w+/g;
    const reEmail = /\w+@\w+\.\w{2,}/g;
    if (username == "") dataError.push("required user name");
    else if (!reUserName.test(username)) dataError.push("invaild user name");
    if (email == "") dataError.push("required email");
    else if (!reEmail.test(email)) dataError.push("invaild email");
    if (dataError == "") {
      let loading = document.querySelector(".loading");
      let loading_bar = document.createElement("span");
      loading_bar.className = "spinner-border";
      loading_bar.style.height = "1.2rem";
      loading_bar.style.width = "1.2rem";
      loading_bar.style.borderWidth = "0.2rem";
      loading.innerHTML = "";
      loading.appendChild(loading_bar);
      hundleEditUser();
    } else setInvalid(dataError);
  };

  async function hundleEditUser() {
    dispatch(
      editUser([
        userId,
        username,
        accountType,
        email,
        role,
        libraryName,
        verified,
        isActive,
      ])
    );

    setButton();
  }

  useEffect(() => {
    titleForm("edit user");
  }, []);

  useEffect(() => {
    invalid.map((inputError) => {
      toast.error(inputError);
    });
  }, [invalid]);

  return (
    <>
      <form onSubmit={handlerSubmit}>
        <Input
          type="text"
          name="username"
          value={username}
          onChange={handlerUserName}
        />

        <InputRadio
          name="account type"
          elements={["student", "faculty", "librarian", "administrator"]}
          value={accountType}
          onChange={handlerAccountType}
        />

        <Input
          type="email"
          name="email"
          value={email}
          onChange={handlerEmail}
        />
        {/* <Input
          type="password"
          name="password"
          value={password}
          progress={progressValue}
          onChange={handlerPassword}
        /> */}
        <InputRadio
          name="rule"
          elements={["patron", "librarian", "administrator"]}
          value={role}
          onChange={handlerRole}
        />
        <Input
          type="text"
          name="library name"
          value={libraryName}
          onChange={handlerLibraryName}
        />
        <InputCheckBox
          name="verified"
          value={verified}
          onChange={handlerVerified}
        />
        <InputCheckBox
          name="is active"
          value={isActive}
          onChange={handlerIsActive}
        />

        <Button label="save" />
      </form>
    </>
  );
}
