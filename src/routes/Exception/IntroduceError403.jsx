import React from 'react';
import Exception from 'components/Exception';
import styles from './Exception.css';

class Error403 extends React.Component {
  render() {
    const desc = (
      <ul className={styles.desc}>
        <li className={styles.authInfo}>你的访问权限迷路了，</li>
        <li className={styles.authItem}>马上联系发光研究所寻求帮助。</li>
        <li className={styles.authItem}>zhangzaiqian@sunlands.com</li>
      </ul>
    );
    return (
      <div className={styles.container}>
        <div className={styles.conter}>
          <Exception type="403" style={styles.ceshi} desc={desc} />
        </div>
      </div>
    );
  }
}

export default Error403;
