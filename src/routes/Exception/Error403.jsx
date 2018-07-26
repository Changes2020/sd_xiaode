import React from "react";
import Exception from "components/Exception";
import styles from "./Exception.css";

class Error403 extends React.Component {
  render() {
    return (
      <div className={styles.container}>
        <h1>403</h1>
        <Exception type="404" style={styles.ceshi} />
      </div>
    );
  }
}

export default Error403;
