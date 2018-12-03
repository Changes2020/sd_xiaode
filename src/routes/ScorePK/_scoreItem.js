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
        <span className={styles.familyName}>11</span>
        <span className={styles.familyName}>22</span>
        <span className={styles.familyName}>33</span>
        <span className={styles.familyName}>44</span>
      </div>
    );
  }
}
export default RenderItem;
