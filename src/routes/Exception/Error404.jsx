import React from 'react';
import Exception from 'components/Exception';
import styles from './Exception.css';

class Error404 extends React.Component {
  render() {
    return (
      <div className={styles.container}>
        <div className={styles.conter}>
          <Exception
            type="404"
            style={styles.ceshi}
            desc="发出的请求针对的是不存在的记录，服务器没有进行操作"
          />
        </div>
      </div>
    );
  }
}

export default Error404;
