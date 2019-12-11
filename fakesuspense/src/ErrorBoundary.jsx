import React from "react";

class ErrorBoundary extends React.Component {
  state = {
    hasError: false
  };

  componentDidCatch(error) {
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return <h3 style={{ color: "red" }}>Error boundary triggered!</h3>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
