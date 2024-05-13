import FilterInput from "../../components/FilterInput";
import Button from "../../components/Button";
import { useMemo, useState } from "react";
import { apis, routes } from "../../components/URLs";
import { useDispatch, useSelector } from "react-redux";
import { filterUsers } from "../../rtk/slices/usersSlice";
import { Link, useNavigate } from "react-router-dom";
import { deleteUser, fetchUsers } from "../../rtk/slices/usersSlice";
import { AllUsers } from "./AllUsers";

const Filtering = () => {
  const [id, setId] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [accountType, setAccountType] = useState("");
  const [libraryName, setLibraryName] = useState("");
  const [role, setRole] = useState("");
  const [verified, setVerified] = useState("");
  const [isActive, setIsActive] = useState("");

  const navigate = useNavigate();

  const users = useSelector((state) => state.users?.data);
  console.log(users);

  const dispatch = useDispatch();

  const handlerId = (value) => {
    setId(value);
  };
  const handlerUserName = (value) => {
    setUserName(value);
  };
  const handlerAccountType = (value) => {
    setAccountType(value);
  };
  const handlerEmail = (value) => {
    setEmail(value);
  };
  const handlerRole = (value) => {
    setRole(value);
  };
  const handlerLibraryName = (value) => {
    setLibraryName(value);
  };
  const handlerVerified = (value) => {
    setVerified(value);
  };
  const handlerIsActive = (value) => {
    setIsActive(value);
  };

  const handlerSubmit = (e) => {
    e.preventDefault();
    console.log(
      "id",
      id,
      "userName",
      userName,
      "email",
      email,
      "accountType",
      accountType,
      "libraryName",
      libraryName,
      "role",
      role,
      "verified",
      verified,
      "isActive",
      isActive
    );
    dispatch(
      filterUsers([
        id,
        userName,
        email,
        accountType,
        libraryName,
        role,
        verified,
        isActive,
      ])
    );
  };

  return (
    <>
      <h2>Filtering</h2>
      <form onSubmit={handlerSubmit}>
        <FilterInput
          name="id"
          onChange={(value) => handlerId(value)}
          value={id}
        />
        <FilterInput
          name="user name"
          onChange={(value) => handlerUserName(value)}
          value={userName}
        />
        <FilterInput
          name="email"
          onChange={(value) => handlerEmail(value)}
          value={email}
        />
        <FilterInput
          name="account type"
          Radio={true}
          elements={["student", "faculty", "librarian", "administrator"]}
          onChange={(value) => handlerAccountType(value)}
          value={accountType}
        />
        <FilterInput
          name="library name"
          onChange={(value) => handlerLibraryName(value)}
          value={libraryName}
        />
        <FilterInput
          name="role"
          Radio={true}
          elements={["patron", "librarian", "administrator"]}
          onChange={(value) => handlerRole(value)}
          value={role}
        />
        <FilterInput
          name="verified"
          Radio={true}
          elements={["true", "false"]}
          onChange={(value) => handlerVerified(value)}
          value={verified}
        />
        <FilterInput
          name="is active"
          Radio={true}
          elements={["true", "false"]}
          onChange={(value) => handlerIsActive(value)}
          value={isActive}
        />
        <Button label="filter" />
      </form>
      <AllUsers pagination={false} />
    </>
  );
};

export default Filtering;
