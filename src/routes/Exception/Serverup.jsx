import React from 'react';
import Exception from 'components/Exception';
import styles from './Exception.css';

class Serverup extends React.Component {
  render() {
    return (
      <div className={styles.container}>
        <div className={styles.conter}>
          <Exception type="serverup" style={styles.ceshi} desc="服务器升级中, 过会儿再来吧 ~" />
        </div>
      </div>
    );
  }
}

export default Serverup;
