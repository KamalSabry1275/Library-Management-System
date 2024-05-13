import { useEffect, useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { toast } from "react-toastify";
import { routes, apis } from "../../components/URLs";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../../rtk/slices/authSlice";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [invalid, setInvalid] = useState([]);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  let dataError = [];

  const handleProcessLogin = (user) => {
    dispatch(login(user));
    // dispatch(fetchProjects());
    // dispatch(fetchModules());
  };

  const setButton = () => {
    let loading = document.querySelector(".loading");
    loading.innerHTML = "Submit";
  };

  const handlerEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlerPassword = (e) => {
    setPassword(e.target.value);
  };

  const handlerSubmit = (e) => {
    e.preventDefault();
    dataError = [];
    const reEmail = /\w+@\w+\.\w{2,}/g;
    if (password === "") dataError.push("required password");
    if (email === "") dataError.push("required email");
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
      hundleLogin();
    } else setInvalid(dataError);
  };

  async function hundleLogin() {
    await fetch(apis.Login, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success === true) {
          handleProcessLogin(data);
          navigate(routes.Home);
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

  function titleForm(title) {
    document.documentElement.style.setProperty("--logo-form", `'${title}'`);
  }

  useEffect(() => {
    titleForm("login");
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
          type="email"
          name="email"
          value={email}
          onChange={handlerEmail}
        />
        <Input
          type="password"
          name="password"
          value={password}
          progress="false"
          onChange={handlerPassword}
        />

        <Button
          label="sign in"
          link={[
            {
              to: routes.Resetpassword,
              label: "forget password?",
              access: "resetpassword",
            },
            { to: routes.Register, label: "create account" },
          ]}
        />
      </form>
    </>
  );
}
export default Login;
