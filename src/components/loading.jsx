import React from "react";
import Spinner from "react-bootstrap/Spinner";

class Loading extends React.Component {
  render() {
    return (
      <div className="spinner">
        <Spinner animation="border" />
      </div>
    );
  }
}

export default Loading;
