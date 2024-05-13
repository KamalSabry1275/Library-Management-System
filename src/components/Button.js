import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../rtk/slices/resetPasswordSlice";

function Button({ label = "Submit", link }) {
  const access = useSelector((state) => state.resetPassword);
  const dispatch = useDispatch();
  return (
    <div className="field_form submit_form">
      <button className="btn  btn-success loading" type="submit">
        {label}
      </button>
      <div>
        {link?.map((link, i) => {
          return (
            <Link
              onClick={() => {
                if (link.access == "resetpassword")
                  dispatch(resetPassword(true));
              }}
              key={i}
              to={link.to}
            >
              {link.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Button;
