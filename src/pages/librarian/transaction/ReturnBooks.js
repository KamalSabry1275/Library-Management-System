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
  const transactions = useSelector((state) => state.transactions);
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
          apis.Librarian.Book.Transaction.FilterByState.replace(
            ":number",
            1
          ).replace(":state", value)
        )
      );
    }
  };

  const handlerConfirm = async (id) => {
    await dispatch(
      transactionConfirm(
        apis.Librarian.Book.Transaction.Return.Confirm.replace(":id", id)
      )
    );
  };

  const handlerDelete = async (id) => {
    await dispatch(
      transactionDelete(
        apis.Librarian.Book.Transaction.Return.Delete.replace(":id", id)
      )
    );
  };

  const next_page = () => {
    let number;
    if (transactions?.data?.length > 0) {
      number = transactions?.page + 1;
      dispatch(clearTransactions());
      dispatch(
        fetchTransactions(
          apis.Librarian.Book.Transaction.FilterByState.replace(
            ":number",
            number
          ).replace(":state", state)
        )
      );
    }
    console.log(number);
  };

  const previous_page = () => {
    let number;
    if (transactions?.page > 1) {
      number = transactions?.page - 1;
      dispatch(clearTransactions());
      dispatch(
        fetchTransactions(
          apis.Librarian.Book.Transaction.FilterByState.replace(
            ":number",
            number
          ).replace(":state", state)
        )
      );
    }
    console.log(number);
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
            {transactions?.data?.map((transaction, index) => {
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
                  <th scope="row">
                    {index + 1 + (transactions?.page - 1) * 10}
                  </th>
                  <td>{transaction.books.title}</td>
                  <td>{transaction.users.username}</td>
                  <td>{formatted_expiry_date}</td>
                  <td>{formatted_transaction_date}</td>
                  <td>
                    {state == "Borrowed" && (
                      <button
                        className="btn btn-success m-1"
                        type="button"
                        onClick={async (e) => {
                          await handlerConfirm(transaction.transaction_id);
                          e.target.parentNode.innerHTML =
                            "<div style='color:#00aa00'>Confirmed</div>";
                        }}
                      >
                        Confirm
                      </button>
                    )}
                    <button
                      className="btn btn-danger m-1"
                      type="button"
                      onClick={async (e) => {
                        await handlerDelete(transaction.transaction_id);
                        e.target.parentNode.innerHTML =
                          "<div style='color:#ff0000'>Delete</div>";
                      }}
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
  );
};
