import React from "react";
import wrapPromise from "./wrapPromise";

const fetchSomeData = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("some data");
  }, 3000);
});

const resource = wrapPromise(fetchSomeData);

const DataFetchingComponent = () => {
  const data = resource.read();
  return (
    <div>
      <h2>Data Loaded</h2>

      {data}
    </div>
  );
};

export default DataFetchingComponent;
