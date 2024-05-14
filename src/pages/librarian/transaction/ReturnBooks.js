import { useDispatch, useSelector } from "react-redux";
import { InputSelect } from "../../../components/InputSelect";
import { useState } from "react";

export const ReturnBooks = () => {
  const books = [
    {
      transction_id: 1,
      user_id: 1,
      book_id: 4,
      transaction_type: "return",
      transaction_date: "2024-04-27T21:36:43.000z",
      expiry_date: "2024-04-29T21:36:43.000z",
      books: {
        title: "test",
        auther: "F. Scott Fitzgerald",
        isbn: "9780743273565",
        total_copies: 11,
        available_copies: 9,
      },
      users: {
        username: "test1",
        emeail: "test2@gmail.com",
        role: "patron",
        account_type: "student",
        is_active: false,
      },
    },
    {
      transction_id: 1,
      user_id: 1,
      book_id: 4,
      transaction_type: "return",
      transaction_date: "2024-04-27T21:36:43.000z",
      expiry_date: "2024-04-29T21:36:43.000z",
      books: {
        title: "test",
        auther: "F. Scott Fitzgerald",
        isbn: "9780743273565",
        total_copies: 11,
        available_copies: 9,
      },
      users: {
        username: "test1",
        emeail: "test2@gmail.com",
        role: "patron",
        account_type: "student",
        is_active: false,
      },
    },
  ];

  const [state, setState] = useState("");

  const dispatch = useDispatch();

  const handlerOnChange = (e) => {
    let value = e.target.value;
    setState(value);
    if (value !== "") {
      console.log(value);
      // dispatch();
    }
  };
  return (
    <>
      <InputSelect
        elements={[
          { value: "", label: "Select The State" },
          { value: "Returned", label: "Returned" },
          { value: "Borrowed", label: "Not Returned" },
        ]}
        onChange={handlerOnChange}
      />
      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">book title</th>
            <th scope="col">username</th>
            <th scope="col">operations</th>
          </tr>
        </thead>
        {state != "" && (
          <tbody className="table-group-divider">
            {books?.map((book, index) => {
              return (
                <tr key={`${book}-${index}`}>
                  <th scope="row">{index + 1}</th>
                  <td>{book.books.title}</td>
                  <td>{book.users.username}</td>
                  <td>
                    {state == "Borrowed" && (
                      <button className="btn btn-success m-1" type="button">
                        Confirm
                      </button>
                    )}
                    <button className="btn btn-danger m-1" type="button">
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        )}
      </table>
    </>
  );
};
