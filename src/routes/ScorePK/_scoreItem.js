import React from 'react';
import styles from './_score.less';

class RenderItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    // const { rowData } = this.props;

    return (
      <div className={styles.container}>
        <span className={styles.leftCss}>11</span>

        <div className={styles.rightCss}>
          <span className={styles.dataCss}>22</span>
          <span className={styles.dataCss}>33</span>
          <span className={styles.dataCss}>44</span>
        </div>
      </div>
    );
  }
}
export default RenderItem;
