import { useDispatch, useSelector } from "react-redux";
// import { Code, Email } from "../rtk/slices/resetPasswordSlice";

const TestRedux = () => {
  const user = useSelector((state) => state.resetPassword);
  const dispatch = useDispatch();

  return (
    <>
      <h1>redux</h1>
      <h1>{user}</h1>
      {/* <button onClick={() => dispatch(Email("kamal"))}>show</button>
      <button onClick={() => dispatch(Code("kamal12"))}>show</button> */}
    </>
  );
};

export default TestRedux;
