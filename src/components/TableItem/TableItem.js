import React from 'react';
import styles from './TableItem.less';

class RenderItem extends React.Component {
  render() {
    const { rowData } = this.props;
    return (
      <div className={styles.normal}>
        <div className={rowData.key % 2 !== 0 ? styles.bgWhite : styles.bgGrey}>
          <div className={styles.leftCls}>{rowData.id}</div>
          <div className={styles.dateCls}>{rowData.titleOne}</div>
          <div className={styles.stuCls}>{rowData.titleTwo}</div>
          <div className={styles.preValCls}>{rowData.titleThree}</div>
          <div className={styles.rightCls}>{rowData.titleFour}</div>
        </div>
      </div>
    );
  }
}
export default RenderItem;
