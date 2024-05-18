import { useEffect, useState } from "react";
import { ContextMenu } from "./ContextMenu";

export const MultiSelection = ({
  onClick,
  name,
  value = "",
  elements = [],
}) => {
  return (
    <>
      <div className="field_form" style={{ height: "fit-content" }}>
        <div
          className="field_input"
          style={{
            flexWrap: "wrap",
            flexDirection: "row",
            justifyContent: "start",
            height: "fit-content",
            minHeight: "3.2rem",
            padding: "0.2rem !important",
          }}
        >
          <input hidden></input>
          <label>{name}</label>
          <ContextMenu idTarget="item" elements={elements}>
            <button type="button" className="btn btn-add m-1" id="item">
              +
            </button>
          </ContextMenu>

          {value?.map((item, index) => {
            return (
              <div key={index} className="field_multiSelection">
                <label>{item}</label>
                <button
                  className="btn"
                  style={{ width: "1.2rem", padding: "0" }}
                  type="button"
                  onClick={() => onClick(index)}
                >
                  x
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
