import React from "react";

class FakeSuspense extends React.Component {
  state = {
    isPending: false
  };

  componentDidCatch(error) {
    if (error.suspender) {
      this.setState({ isPending: true });

      const promise = error.suspender;

      promise.then(() => {
        this.setState({ isPending: false });
      });
    }
  }

  render() {
    if (this.state.isPending) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

export default FakeSuspense;
