import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Input from "../../components/Input";
import { apis, routes } from "../../components/URLs";
import Button from "../../components/Button";
import InputRadio from "../../components/InputRadio";
import InputCheckBox from "../../components/InputCheckBox";
import zxcvbn from "zxcvbn";
import { decryptAndRetrieve } from "../../rtk/slices/authSlice";

function getAccessToken() {
  return decryptAndRetrieve("fathy", "access_token");
}

export default function AddUser({
  default_username = "",
  default_accountType = "student",
  default_email = "",
  default_password = "",
  default_progressValue = 0,
  default_role = "patron",
  default_libraryName = "",
  default_verified = false,
  default_isActive = false,
}) {
  const [username, setUserName] = useState(default_username);
  const [accountType, setAccountType] = useState(default_accountType);
  const [email, setEmail] = useState(default_email);
  const [password, setPassword] = useState(default_password);
  const [progressValue, setprogressValue] = useState(default_progressValue);
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
    loading.innerHTML = "add";
  };

  const strongPassword = (password) => {
    const checkStrongPassword = zxcvbn(password);
    setprogressValue(100 * (checkStrongPassword.score / 4));
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
  const handlerPassword = (e) => {
    strongPassword(e.target.value);
    setPassword(e.target.value);
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
    if (password == "") dataError.push("required password");
    else if (progressValue <= 50) dataError.push("invaild password");
    if (dataError == "") {
      let loading = document.querySelector(".loading");
      let loading_bar = document.createElement("span");
      loading_bar.className = "spinner-border";
      loading_bar.style.height = "1.2rem";
      loading_bar.style.width = "1.2rem";
      loading_bar.style.borderWidth = "0.2rem";
      loading.innerHTML = "";
      loading.appendChild(loading_bar);
      hundleLogin();
    } else setInvalid(dataError);
  };

  async function hundleLogin() {
    let user = {
      username: username,
      account_type: accountType,
      email: email,
      password: password,
      role: role,
      library_name: libraryName,
      verified: verified,
      is_active: isActive,
    };

    console.log(user);

    try {
      const access_token = getAccessToken();

      if (!access_token) {
        throw new Error("Access token not found");
      }

      if (access_token) {
        let res = await fetch(apis.Admin.AddUser, {
          // let res = await fetch("http://localhost:9000/users", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${access_token}`,
          },
          body: JSON.stringify(user),
        });

        let data = await res.json();

        if (data.success === true) {
          // handleProcessLogin(data);
          // navigate(routes.Home);
          toast.success(data.msg);
        } else {
          toast.error(data.msg);
        }
      }

      setButton();
    } catch (error) {
      setButton();
      toast.error(error);
    }
  }

  useEffect(() => {
    titleForm("add user");
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
        <Input
          type="password"
          name="password"
          value={password}
          progress={progressValue}
          onChange={handlerPassword}
        />
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

        <Button label="add" />
      </form>
    </>
  );
}
