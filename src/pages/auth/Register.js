import { useEffect, useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import zxcvbn from "zxcvbn";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { routes, apis } from "../../components/URLs";
import { login } from "../../rtk/slices/authSlice";
import { useSelector, useDispatch } from "react-redux";
import InputRadio from "../../components/InputRadio";

function Register() {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [accountType, setAccountType] = useState("student");
  const [password, setPassword] = useState("");
  const [progressValue, setprogressValue] = useState(0);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [invalid, setInvalid] = useState([]);

  const accountTypeValid = { Student: "student", Faculty: "faculty" };

  const dispatch = useDispatch();

  const navigate = useNavigate();

  let dataError = [];

  const handlerUserName = (e) => {
    setUserName(e.target.value);
  };

  const handlerEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlerAccountType = (e) => {
    setAccountType(e.target.value);
  };

  const handlerPassword = (e) => {
    strongPassword(e.target.value);
    setPassword(e.target.value);
  };

  const strongPassword = (password) => {
    const checkStrongPassword = zxcvbn(password);
    setprogressValue(100 * (checkStrongPassword.score / 4));
  };

  const handlerConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

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
    if (confirmPassword !== password) dataError.push("password is not match");
    if (accountType == "") dataError.push("required account type");
    else if (
      accountType !== accountTypeValid.Student &&
      accountType !== accountTypeValid.Faculty
    )
      dataError.push("account type is not student or faculty");
    console.log(dataError);
    if (dataError == "") {
      let loading = document.querySelector(".loading");
      let loading_bar = document.createElement("span");
      loading_bar.className = "spinner-border";
      loading_bar.style.height = "1.2rem";
      loading_bar.style.width = "1.2rem";
      loading_bar.style.borderWidth = "0.2rem";
      loading.innerHTML = "";
      loading.appendChild(loading_bar);
      signup();
    } else setInvalid(dataError);
  };

  async function signup() {
    await fetch(apis.Register, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        email: email,
        account_type: accountType,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success === true) {
          navigate(routes.ActiveEmail, { state: { data_user: data } });
          toast.success(data.msg);
        } else {
          toast.error(data.msg);
        }
        setButton();
      })
      .catch((rej) => {
        setButton();
        toast.error(rej);
      });
  }

  const setButton = () => {
    let loading = document.querySelector(".loading");
    loading.innerHTML = "Submit";
  };

  function titleForm(title) {
    document.documentElement.style.setProperty("--logo-form", `'${title}'`);
  }

  useEffect(() => {
    titleForm("Register");
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
          name="user name"
          value={username}
          onChange={handlerUserName}
        />
        <Input
          type="email"
          name="email"
          value={email}
          onChange={handlerEmail}
        />

        <InputRadio
          name="account type"
          elements={["student", "faculty"]}
          value={accountType}
          onChange={handlerAccountType}
        />

        <Input
          type="password"
          name="password"
          value={password}
          progress={progressValue}
          onChange={handlerPassword}
        />
        <Input
          type="password"
          name="confirm password"
          value={confirmPassword}
          progress="false"
          onChange={handlerConfirmPassword}
        />

        <Button
          label="sign up"
          link={[{ to: routes.Login, label: "i have an account" }]}
        />
        {/* <Error invalid={invalid} /> */}
      </form>
    </>
  );
}

export default Register;
