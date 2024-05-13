import { InputSelect } from "../../../components/InputSelect";

export const ReserveBooks = () => {
  //Pending - Confirmed - Expired
  return (
    <>
      <InputSelect
        elements={[
          { value: "Pending", label: "Pending" },
          { value: "Confirmed", label: "Confirmed" },
          { value: "Expired", label: "Expired" },
        ]}
      />
    </>
  );
};
