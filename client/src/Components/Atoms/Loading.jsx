import React from "react";

const Loading = ({ color = "success", width = "auto" }) => {
  return (
    <button
      className={`btn btn-${color} mt-3`}
      type="button"
      style={{ width }}
      disabled
    >
      <span
        className="spinner-border spinner-border-sm"
        aria-hidden="true"
      ></span>
      <span className="visually-hidden" role="status">
        Loading...
      </span>
    </button>
  );
};

export default Loading;