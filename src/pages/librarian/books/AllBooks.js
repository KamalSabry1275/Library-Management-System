import { useEffect, useState } from "react";
import { apis, routes } from "../../../components/URLs";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { clearUser, fetchUsers } from "../../../rtk/slices/usersSlice";
import { clearBook, filterBooks } from "../../../rtk/slices/booksSlice";

export const AllBooks = ({ pagination = true }) => {
  const books = useSelector((state) => state.books);
  const [number_of_page, setNumOfPAge] = useState(books?.page);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const next_page = () => {
    let num;
    if (books?.data?.length > 0) {
      num = number_of_page + 1;
      dispatch(clearBook());
      dispatch(filterBooks());
      setNumOfPAge(num);
    }
    console.log(num);
  };

  const previous_page = () => {
    let num;
    if (number_of_page > 1) {
      num = number_of_page - 1;
      dispatch(clearBook());
      dispatch(filterBooks());
      setNumOfPAge(num);
    }
    console.log(num);
  };

  return (
    <>
      <h2>All Books</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Id</th>
            <th scope="col">Title</th>
            <th scope="col">Author</th>
            <th scope="col">ISBN</th>
            <th scope="col">Copies</th>
            <th scope="col">Available</th>
            <th scope="col">Library Name</th>
          </tr>
        </thead>
        <tbody className="table-group-divider">
          {books?.data?.map((book, index) => {
            return (
              <tr key={`${book}-${index}`}>
                <th scope="row">{index + 1 + (books?.page - 1) * 10}</th>

                <td>{book.book_id}</td>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.isbn}</td>
                <td>{book.total_copies}</td>
                <td>{book.available_copies}</td>
                <td>{book.library_name}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {pagination && (
        <>
          <div className="pagination">
            <button
              className="btn btn-outline-primary"
              onClick={() => {
                previous_page();
              }}
            >
              Previous
            </button>
            <button
              className="btn btn-outline-primary"
              onClick={() => {
                next_page();
              }}
            >
              Next
            </button>
          </div>
        </>
      )}
    </>
  );
};
