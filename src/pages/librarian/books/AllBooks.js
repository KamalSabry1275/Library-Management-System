import { useEffect, useState } from "react";
import { apis, routes } from "../../../components/URLs";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { clearUser, fetchUsers } from "../../../rtk/slices/usersSlice";

export const AllBooks = ({ pagination = true }) => {
  const users = useSelector((state) => state.books?.data);
  const [number_of_page, setNumOfPAge] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const next_page = () => {
    let num;
    if (users.length > 0) {
      num = number_of_page + 1;
      dispatch(clearUser());
      dispatch(
        fetchUsers(apis.Librarian.User.AllUsers.replace(":number", num))
      );
      setNumOfPAge(num);
    }
    console.log(num);
  };

  const previous_page = () => {
    let num;
    if (number_of_page > 1) {
      num = number_of_page - 1;
      dispatch(
        fetchUsers(apis.Librarian.User.AllUsers.replace(":number", num))
      );
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
            <th scope="col">Auther</th>
            <th scope="col">ISBN</th>
            <th scope="col">Copies</th>
            <th scope="col">Available</th>
            <th scope="col">Library Name</th>
          </tr>
        </thead>
        <tbody className="table-group-divider">
          {users?.map((user, index) => {
            return (
              <tr>
                <th scope="row">{index + 1 + (number_of_page - 1) * 10}</th>

                <td>{user.book_id}</td>
                <td>{user.title}</td>
                <td>{user.author}</td>
                <td>{user.isbn}</td>
                <td>{user.total_copies}</td>
                <td>{user.available_copies}</td>
                <td>{user.library_name}</td>
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
