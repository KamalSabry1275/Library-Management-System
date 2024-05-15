import { useDispatch, useSelector } from "react-redux";
import { InputSelect } from "../../../components/InputSelect";
import { useState } from "react";
import {
  clearTransactions,
  fetchTransactions,
  transactionConfirm,
  transactionDelete,
} from "../../../rtk/slices/transactionsSlice";
import { apis } from "../../../components/URLs";

export const ReturnBooks = () => {
  const transactions = useSelector((state) => state.transactions?.data);
  console.log(transactions);

  const [state, setState] = useState("");

  const dispatch = useDispatch();

  const handlerOnChange = (e) => {
    let value = e.target.value;
    setState(value);
    if (value !== "") {
      console.log(value);
      dispatch(clearTransactions());
      dispatch(
        fetchTransactions(
          apis.Librarian.Book.Transaction.FilterByState.replace(":state", value)
        )
      );
    }
  };

  const handlerConfirm = (id) => {
    dispatch(
      transactionConfirm(
        apis.Librarian.Book.Transaction.Return.Confirm.replace(":id", id)
      )
    );
  };

  const handlerDelete = (id) => {
    dispatch(
      transactionDelete(
        apis.Librarian.Book.Transaction.Return.Delete.replace(":id", id)
      )
    );
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
            <th scope="col">expiry date</th>
            <th scope="col">date</th>
            <th scope="col">operations</th>
          </tr>
        </thead>
        {state != "" && (
          <tbody className="table-group-divider">
            {transactions?.map((transaction, index) => {
              let date_expiry_date = new Date(transaction.expiry_date);
              const formatted_expiry_date = date_expiry_date.toLocaleDateString(
                "en-US",
                {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                }
              );

              let date_transaction_date = new Date(transaction.expiry_date);
              const formatted_transaction_date =
                date_transaction_date.toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                });

              return (
                <tr key={`${transaction}-${index}`}>
                  <th scope="row">{index + 1}</th>
                  <td>{transaction.books.title}</td>
                  <td>{transaction.users.username}</td>
                  <td>{formatted_expiry_date}</td>
                  <td>{formatted_transaction_date}</td>
                  <td>
                    {state == "Borrowed" && (
                      <button
                        className="btn btn-success m-1"
                        type="button"
                        onClick={() =>
                          handlerConfirm(transaction.transaction_id)
                        }
                      >
                        Confirm
                      </button>
                    )}
                    <button
                      className="btn btn-danger m-1"
                      type="button"
                      onClick={() => handlerDelete(transaction.transaction_id)}
                    >
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
