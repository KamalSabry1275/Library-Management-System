import { useEffect, useRef, useState } from "react";
import Input from "../../../components/Input";
import InputRadio from "../../../components/InputRadio";
import { titleForm } from "../../../components/TitleForm";
import { MultiSelection } from "../../../components/MultiSelection";
import { ContextMenu, menuShow } from "../../../components/ContextMenu";
import { useDispatch, useSelector } from "react-redux";
import { addBook } from "../../../rtk/slices/booksSlice";
import Button from "../../../components/Button";

export const AddBook = () => {
  const [title, setTitle] = useState("");
  const [auther, setAuther] = useState("");
  const [type, setType] = useState("");
  const [isbn, setISBN] = useState("");
  const [totalCopies, setTotalCopies] = useState("");
  const [availableCopies, setAvailableCopies] = useState("");
  const [genres, setGenres] = useState([]);
  const getGenres = useSelector((state) => state.genres?.data);

  const dispatch = useDispatch();

  const handlerMultiSelection = (e) => {
    let genre = e;
    if (genres.indexOf(e) == -1) {
      let allGenres = [...genres, genre];
      setGenres(allGenres);
    }
  };

  const optionsSelection = getGenres?.map((genre) => {
    return {
      label: genre.name,
      event: () => handlerMultiSelection(genre.name),
    };
  });

  const deleteGenre = (index) => {
    let allGenres = [...genres];
    allGenres.splice(index, 1);
    setGenres(allGenres);
  };

  useEffect(() => {
    titleForm("add book");
  }, []);

  const handlerTitle = (e) => {
    setTitle(e.target.value);
  };
  const handlerAuthor = (e) => {
    setAuther(e.target.value);
  };
  const handlerISBN = (e) => {
    setISBN(e.target.value);
  };
  const handlerType = (e) => {
    setType(e.target.value);
  };
  const handlerTotalCopies = (e) => {
    setTotalCopies(e.target.value);
  };
  const handlerAvailableCopies = (e) => {
    setAvailableCopies(e.target.value);
  };

  const handlerSubmit = (e) => {
    e.preventDefault();
    console.log({
      title,
      auther,
      isbn,
      type,
      totalCopies,
      availableCopies,
      genres,
    });

    dispatch(
      addBook([title, auther, isbn, type, totalCopies, availableCopies, genres])
    );
  };

  return (
    <form onSubmit={handlerSubmit}>
      <Input type="text" name="title" value={title} onChange={handlerTitle} />
      <Input
        type="text"
        name="author"
        value={auther}
        onChange={handlerAuthor}
      />
      <Input type="text" name="isbn" value={isbn} onChange={handlerISBN} />
      <InputRadio
        type="radio"
        name="type"
        elements={["reference", "fiction", "non-fiction"]}
        value={type}
        onChange={handlerType}
      />
      <Input
        type="number"
        name="total copies"
        value={totalCopies}
        onChange={handlerTotalCopies}
      />
      <Input
        type="number"
        name="available copies"
        value={availableCopies}
        onChange={handlerAvailableCopies}
      />
      <MultiSelection
        name="genres"
        value={genres}
        elements={optionsSelection}
        onClick={deleteGenre}
      />
      <Button label="add" />
    </form>
  );
};
