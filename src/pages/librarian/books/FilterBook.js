import FilterInput from "../../../components/FilterInput";
import Button from "../../../components/Button";
import { useMemo, useState } from "react";
import { apis, routes } from "../../../components/URLs";
import { useDispatch, useSelector } from "react-redux";
import { filterUsers } from "../../../rtk/slices/usersSlice";
import { Link, useNavigate } from "react-router-dom";
import { AllLibrarianUsers } from "./AllLibrarianUsers";

export const FilterBook = () => {
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [auther, setAuther] = useState("");
  const [type, setType] = useState("");
  const [isbn, setISBN] = useState("");
  const [libraryName, setLibraryName] = useState("");

  const navigate = useNavigate();

  const users = useSelector((state) => state.users?.data);
  console.log(users);

  const dispatch = useDispatch();

  const handlerId = (value) => {
    setId(value);
  };
  const handlerTitle = (value) => {
    setTitle(value);
  };
  const handlerAuthor = (value) => {
    setAuther(value);
  };
  const handlerISBN = (value) => {
    setISBN(value);
  };
  const handlerType = (value) => {
    setType(value);
  };
  const handlerLibraryName = (value) => {
    setLibraryName(value);
  };

  const handlerSubmit = (e) => {
    e.preventDefault();

    console.log({
      id: id,
      title: title,
      auther: auther,
      isbn: isbn,
      type: type,
      libraryName: libraryName,
    });

    dispatch(filterUsers([id, title, auther, isbn, type, libraryName]));
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
          name="title"
          onChange={(value) => handlerTitle(value)}
          value={title}
        />
        <FilterInput
          name="auther"
          onChange={(value) => handlerAuthor(value)}
          auther
        />
        <FilterInput
          name="isbn"
          onChange={(value) => handlerISBN(value)}
          value={isbn}
        />
        <FilterInput
          name="type"
          onChange={(value) => handlerType(value)}
          Radio={true}
          elements={["reference", "fiction", "non-fiction"]}
          value={type}
        />
        <FilterInput
          name="library name"
          onChange={(value) => handlerLibraryName(value)}
          value={libraryName}
        />

        <Button label="filter" />
      </form>
      <AllLibrarianUsers pagination={false} />
    </>
  );
};
