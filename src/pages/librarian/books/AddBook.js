import { useEffect, useRef, useState } from "react";
import Input from "../../../components/Input";
import InputRadio from "../../../components/InputRadio";
import { titleForm } from "../../../components/TitleForm";
import { MultiSelection } from "../../../components/MultiSelection";
import { ContextMenu, menuShow } from "../../../components/ContextMenu";
import { useDispatch, useSelector } from "react-redux";
import { addBook } from "../../../rtk/slices/booksSlice";
import Button from "../../../components/Button";
import { toast } from "react-toastify";

export const AddBook = () => {
  const [title, setTitle] = useState("");
  const [auther, setAuther] = useState("");
  const [type, setType] = useState("");
  const [isbn, setISBN] = useState("");
  const [totalCopies, setTotalCopies] = useState("");
  const [availableCopies, setAvailableCopies] = useState("");
  const [genres, setGenres] = useState([]);
  const getGenres = useSelector((state) => state.genres?.data);

  let dataError = [];
  const [invalid, setInvalid] = useState([]);

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

  const setButton = () => {
    let loading = document.querySelector(".loading");
    loading.innerHTML = "add";
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

    if (title == "") dataError.push("title is empty");
    if (auther == "") dataError.push("auther is empty");
    if (isbn == "") dataError.push("isbn is empty");
    if (type == "") dataError.push("type is empty");
    if (totalCopies == "") dataError.push("totalCopies is empty");
    if (availableCopies == "") dataError.push("availableCopies is empty");
    if (genres == "") dataError.push("genres is empty");

    if (dataError == "") {
      let loading = document.querySelector(".loading");
      let loading_bar = document.createElement("span");
      loading_bar.className = "spinner-border";
      loading_bar.style.height = "1.2rem";
      loading_bar.style.width = "1.2rem";
      loading_bar.style.borderWidth = "0.2rem";
      loading.innerHTML = "";
      loading.appendChild(loading_bar);
      handleAddBook();
    } else setInvalid(dataError);
  };

  const handleAddBook = async () => {
    await dispatch(
      addBook([title, auther, isbn, type, totalCopies, availableCopies, genres])
    );

    setButton();
  };

  useEffect(() => {
    invalid.map((inputError) => {
      toast.error(inputError);
    });
  }, [invalid]);

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
