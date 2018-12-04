import React from 'react';
import styles from './_score.less';

class RenderHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    // const { rowData } = this.props;

    return (
      <div className={styles.container}>
        <span className={styles.leftCss}>正面均分</span>

        <div className={styles.rightCss}>
          <span className={styles.dataCss}>15.49</span>
          <span className={styles.dataCss}>13.23</span>
          <span className={styles.dataCss}>14.49</span>
        </div>
      </div>
    );
  }
}
export default RenderHeader;
