import React from 'react';
import styles from './TableHeader.less';

class RenderHeader extends React.Component {
  render() {
    return (
      <div className={styles.normal}>
        <div className={styles.leftCls}>序号</div>
        <div className={styles.dateCls}>日期</div>
        <div className={styles.stuCls}>学员ID</div>
        <div className={styles.preValCls}>预估分</div>
        <div className={styles.rightCls}>班主任</div>
      </div>
    );
  }
}
export default RenderHeader;
