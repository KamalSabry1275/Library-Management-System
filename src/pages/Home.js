import "react-toastify/dist/ReactToastify.css";
import QRCode from "qrcode.react";
import { CitySvg } from "../components/CitySvg";

function Home() {
  const members = [
    { track: "frontend", name: "kamal sabry" },
    { track: "backend", name: "fathy mohamed" },
    { track: "ai", name: "kareem Adel" },
    { track: "ai", name: "Ahmed Abdelhamed" },
    { track: "mobile", name: "Kerolos Emad" },
    { track: "mobile", name: "Nadia khaled" },
    { track: "testing", name: "poula george" },
    { track: "testing", name: "islam ibrahim" },
  ];

  return (
    <>
      <div className="home">
        <section>
          <h1>Library Management System</h1>
          <p style={{ maxWidth: "55rem", marginBottom: "5rem" }}>
            Welcome to the Library Management System! This system is designed to
            provide administrators and librarians with powerful tools to
            efficiently manage library operations. Whether you're overseeing
            user accounts, organizing library resources, or handling
            transactions, this system has you covered.
          </p>
          <CitySvg />
        </section>
        <section>
          <h1>Members</h1>
          <div className="member-card">
            {members?.map((member, i) => {
              return (
                <div key={i} className="card">
                  <span></span>
                  <span></span>
                  <div className="card-title">
                    <h2>{member.track}</h2>
                    <hr />
                    <h3>{member.name}</h3>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
        <footer>
          {/* <div className="inf">
              <p>download my application from scan</p>
              <QRCode
                value="google.com"
                level="H"
                bgColor="transparent"
                renderAs="svg"
              />
            </div> */}
          <div className="copy">© 2024 Copyright: Kamal Sabry</div>
        </footer>
      </div>
    </>
  );
}

export default Home;
