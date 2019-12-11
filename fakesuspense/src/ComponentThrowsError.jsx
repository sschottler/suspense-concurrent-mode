import React from "react";

const ComponentThrowsError = () => {
  throw new Error("boom!");

  return <div>Nope</div>;
};

export default ComponentThrowsError;
