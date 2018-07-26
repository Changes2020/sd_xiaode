import React from "react";
import styles from "./RenderHeader.less";

class RenderHeader extends React.Component {
  componentDidMount() {}

  render() {
    const { listColumn, sectionData } = this.props;
    console.log(sectionData);
    return (
      <div className={styles.tableHeader}>
        {Object.keys(listColumn).map(key => {
          return (
            <span
              key={key}
              className={styles.title}
              style={{ ...listColumn[key].style }}
            >
              {listColumn[key].name}
            </span>
          );
        })}
      </div>
    );
  }
}
export default RenderHeader;
