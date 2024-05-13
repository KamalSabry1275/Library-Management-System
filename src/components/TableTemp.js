export const TableTemp = ({ head = [], body = [], number_of_page = 1 }) => {
  return (
    <>
      <table className="table table-bordered">
        <thead>
          <tr>
            {head?.map((item, index) => {
              return (
                <th key={index} scope="col">
                  {item}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody className="table-group-divider">
          {body?.map((item, index) => {
            return (
              <tr>
                <th scope="row">{index + 1 + (number_of_page - 1) * 10}</th>
                {Object.entries(item).map(([key, value]) => {
                  return <td key={key}>{value}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};
