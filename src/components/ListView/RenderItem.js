import React from "react";
import styles from "./RenderItem.less";

class RenderItem extends React.Component {
  componentDidMount() {}

  render() {
    const { rowData, listData } = this.props;
    return (
      <div className={styles.wrap}>
        {// listData.forEach((item)=>{
        Object.keys(rowData).map(key => {
          // if(key === item.name){
          console.log(rowData[key]);
          return (
            <span key={key} className={styles.title}>
              {rowData[key]}
            </span>
          );
          // }
        })
        // })
        }
      </div>
    );
  }
}
export default RenderItem;
