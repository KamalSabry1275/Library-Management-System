import React from "react";

const VerificationCodeInput = ({ onChange }) => {
  const inputs = ["", "", "", "", ""];

  const handleChange = (e, index) => {
    const value = e.target.value;
    inputs[index] = value;

    if (value < 0 || value == "-") {
      // Clear the input field
      e.target.value = "";
      // Display an error message
      console.error("Only positive numbers allowed");
      return;
    }

    if (value.length > 1) {
      // Clear the input field
      e.target.value = value.slice(0, 1);
      return; // Prevent further input
    }

    // Focus on the next input if a number is entered
    if (value.length === 1 && index < 4) {
      e.target.nextElementSibling.focus();
    } else if (value.length === 0 && index > 0) {
      e.target.previousElementSibling.focus();
    }

    // Call the onChange handler with the updated code
    if (index === 4) onChange(inputs.join(""));
  };

  return (
    <div className="code">
      {inputs.map((value, index) => (
        <input
          key={index}
          type="text"
          inputMode="numeric"
          maxLength={1}
          onChange={(e) => handleChange(e, index)}
        />
      ))}
    </div>
  );
};

export default VerificationCodeInput;
