import { useEffect, useRef, useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import Error from "../components/Error";
import { toast } from "react-toastify";
import { Register, Resetpassword } from "../components/URLs";
// import GoogleLogin from "@leecheuk/react-google-login";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { jwtDecode } from "jwt-decode";
import GoogleLogin from "@leecheuk/react-google-login";
import GoogleAuth from "../components/GoogleAuth";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [invalid, setInvalid] = useState([]);

  let dataError = [];

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
      login();
    } else setInvalid(dataError);
  };

  async function login() {
    await fetch("https://graduation-api-zaj9.onrender.com/api/v1/user/login", {
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
          // navigate(Login);
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

  const register_by_google = async (data) => {
    await fetch(
      "https://graduation-api-zaj9.onrender.com/api/v1/user/google-login",
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          googleId: data.sub,
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.success === true) {
          // navigate(Login);
          toast.success(data.msg);
        } else {
          toast.error(data.msg);
        }
      })
      .catch((rej) => {
        setButton();
        toast.error(rej);
      });
  };

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

  // const responseGoogle = (response) => {
  //   console.log(response);
  //   reEvaluateToken(response.credential);
  //   console.log(decodedToken);
  // };

  return (
    <div className="container">
      <form onSubmit={handlerSubmit}>
        {/* <GoogleLogin
          clientId="1010440021595-544rbh58fdt8rp8uvrv5jre8dem56sqf.apps.googleusercontent.com"
          render={(renderProps) => (
            <button
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
            >
              <FontAwesomeIcon icon={faGoogle} style={{ color: "#828282" }} />
              Login
            </button>
          )}
          onSuccess={handleCallbackResponse}
          onFailure={handleCallbackResponse}
          cookiePolicy={"single_host_origin"}
        /> */}

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

        <GoogleAuth handleData={register_by_google} />

        <Button
          link={[
            {
              to: Resetpassword,
              label: "forget password?",
              access: "resetpassword",
            },
            { to: Register, label: "create account" },
          ]}
        />
      </form>
    </div>
  );
}
export default Login;
