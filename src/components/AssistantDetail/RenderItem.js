import React from 'react';
import styles from './RenderItem.less';

class RenderItem extends React.Component {
  render() {
    const { rowData } = this.props;
    console.log(rowData);
    return <div className={styles.normal}>12121</div>;
  }
}
export default RenderItem;
