import React from 'react';
import styles from './TableItem.less';

class DetailTableItem extends React.Component {
  checkDetal=(titleOne,titleTwo)=>{
    console.log(titleOne,titleTwo)
  }
  render() {
    const { rowData } = this.props;
    return (
      <div className={styles.normal}>
        <div className={rowData.key % 2 === 0 ? styles.bgWhite : styles.bgGrey}>
          <div className={styles.leftCls}>{rowData.id}</div>
          <div className={styles.dateCls}>{rowData.titleOne}</div>
          <div className={styles.stuCls}>{rowData.titleTwo}</div>
          <div className={styles.preValCls}>{rowData.titleThree}</div>
          <div className={styles.checkButton} onClick={()=>this.checkDetal(rowData.titleOne,rowData.titleTwo)}>查看</div>
        </div>
      </div>
    );
  }
}
export default DetailTableItem;
