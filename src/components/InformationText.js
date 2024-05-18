const InformationText = ({ label = "", value = "" }) => {
  return (
    <tr>
      <td>{label}</td>
      <td>{`${value}`}</td>
    </tr>
  );
};

export default InformationText;
