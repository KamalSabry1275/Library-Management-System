export function Module({ class_name, data_module, index }) {
  return (
    <>
      <div
        tabIndex={-1}
        data-index={JSON.stringify(data_module)}
        draggable="true"
        className={class_name}
      >
        {data_module?.moduleName}
      </div>
    </>
  );
}
