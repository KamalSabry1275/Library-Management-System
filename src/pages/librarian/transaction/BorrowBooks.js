import { useDispatch, useSelector } from "react-redux";
import { InputSelect } from "../../../components/InputSelect";
import { TableTemp } from "../../../components/TableTemp";

export const BorrowBooks = () => {
  // const books = useSelector((state) => state.books?.data);
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

  const dispatch = useDispatch();

  const handlerOnChange = (e) => {
    let value = e.target.value;
    if (value !== "") {
      console.log(value);
      // dispatch();
    }
  };
  //Borrow_request - Returned - Borrowed
  return (
    <>
      <InputSelect
        elements={[
          { value: "", label: "----" },
          { value: "Borrow_request", label: "Borrow Request" },
          { value: "Borrowed", label: "Borrowed" },
        ]}
        onChange={handlerOnChange}
      />
      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">book title</th>
            <th scope="col">username</th>
            <th scope="col">#</th>
            <th scope="col">#</th>
          </tr>
        </thead>
        <tbody className="table-group-divider">
          {books?.map((book, index) => {
            return (
              <>
                <tr>
                  <th scope="row">{index + 1}</th>
                  <td key={index}>{book.books.title}</td>
                  <td key={index}>{book.users.username}</td>
                </tr>
              </>
            );
          })}
        </tbody>
      </table>
    </>
  );
};
