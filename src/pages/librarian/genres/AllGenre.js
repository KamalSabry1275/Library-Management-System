import { useDispatch, useSelector } from "react-redux";
import { deleteGenre } from "../../../rtk/slices/genresSlice";

export const AllGenre = () => {
  const genres = useSelector((state) => state.genres?.data);
  const dispatch = useDispatch();

  return (
    <>
      <h2>All Genres</h2>
      <table>
        {genres?.map((genre, index) => {
          return (
            <tr key={index}>
              <td className="p-2">{genre.name}</td>
              <td>
                <button
                  className="btn btn-danger m-1"
                  onClick={() => {
                    dispatch(deleteGenre(genre.genre_id));
                  }}
                >
                  delete
                </button>
              </td>
            </tr>
          );
        })}
      </table>
    </>
  );
};
