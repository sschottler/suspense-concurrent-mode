import React from "react";
import ReactDOM from "react-dom";

import ErrorBoundary from "./ErrorBoundary";
import ComponentThrowsError from "./ComponentThrowsError";
import FakeSuspense from "./FakeSuspense";
import DataFetchingComponent from "./DataFetchingComponent";
import "./styles.css";

function App() {
  return (
    <div className="App">
      <h2>Fake Suspense</h2>

      <ErrorBoundary>
        <ComponentThrowsError />
      </ErrorBoundary>

      <FakeSuspense fallback={<h3>Loading...</h3>}>
        <DataFetchingComponent />
      </FakeSuspense>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
