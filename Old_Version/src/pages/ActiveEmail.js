import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Button from "../components/Button";
import Input from "../components/Input";
import { useFetch } from "../hooks/useFetch";

const statusUser = {
  sentEmail: "sentEmail",
  activeEmail: "activeEmail",
};

export const ActiveEmail = () => {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [activeEmail, setActiveEmail] = useState(statusUser.sentEmail);

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleCode = (e) => {
    setCode(e.target.value);
  };

  const sentCodeForEmail = async () => {
    await fetch(
      "https://graduation-api-zaj9.onrender.com/api/v1/user/sendEmail-verify",
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.success === true) {
          toast.info(data.msg);
          setActiveEmail(statusUser.activeEmail);
        } else toast.error(data.msg);
      })
      .catch((rej) => toast.error(rej));
  };

  const handleActiveEmail = async () => {
    // await fetch(
    //   `https://graduation-api-zaj9.onrender.com/api/v1/user/verify-email?verifyCode=${code}`,
    //   {
    //     method: "post",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       email: email,
    //     }),
    //   }
    // )
    await fetch(
      `https://graduation-api-zaj9.onrender.com/api/v1/user/verify-email`,
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          verifyCode: code,
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.success === true) {
          toast.success(data.msg);
        } else toast.error(data.msg);
      })
      .catch((rej) => toast.error(rej));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (activeEmail == statusUser.sentEmail && email != "") {
      sentCodeForEmail();
    } else if (activeEmail == statusUser.activeEmail && code != "") {
      handleActiveEmail();
    }
  };

  function titleForm(title) {
    document.documentElement.style.setProperty("--logo-form", `'${title}'`);
  }

  useEffect(() => {
    titleForm("Active Email");
  }, []);

  return (
    <>
      <div className="container">
        <form onSubmit={handleSubmit}>
          {activeEmail == statusUser.sentEmail ? (
            <>
              <Input
                type="email"
                name="email"
                value={email}
                onChange={handleEmail}
              />
            </>
          ) : (
            <>
              {" "}
              <Input
                type="text"
                name="code"
                value={code}
                onChange={handleCode}
              />
            </>
          )}

          <Button label="next" />
        </form>
      </div>
    </>
  );
};
