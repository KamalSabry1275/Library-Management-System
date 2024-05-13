import { InputSelect } from "../../../components/InputSelect";

export const ReturnBooks = () => {
  return (
    <>
      <InputSelect
        elements={[
          { value: "Returned", label: "Returned" },
          { value: "Borrowed", label: "Not Returned" },
        ]}
      />
    </>
  );
};
