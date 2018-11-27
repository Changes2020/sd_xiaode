import React from 'react';
import Exception from 'components/Exception';
import styles from './Exception.css';

class Error403 extends React.Component {
  componentDidMount() {
    document.title='\u200E';
  }
  render() {
    const desc = (
      <ul className={styles.desc}>
        <li className={styles.authInfo}>你的访问权限迷路了</li>
        <li className={styles.authInfo}>马上联系发光研究所寻求帮助</li>
        <li className={styles.authItem}>zhangzaiqian@sunlands.com</li>
      </ul>
    );
    return (
      <div className={styles.container}>
        <Exception type="brochure" imgStyle={styles.imgContent} desc={desc} contentStyle={styles.content} />
      </div>
    );
  }
}

export default Error403;
