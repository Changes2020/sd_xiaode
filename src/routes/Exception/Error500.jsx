import React from 'react';
import Exception from 'components/Exception';
import styles from './Exception.css';

class Error500 extends React.Component {
  render() {
    // const desc = (
    //   <ul className={styles.desc}>
    //     <li className={styles.authInfo}>你没有权限访问此页面，或权限设置有误。</li>
    //     <li className={styles.authItem}>请联系：运营中心-产研一部</li>
    //     <li className={styles.authItem}>jiangli@sunlands.com</li>
    //   </ul>
    // );
    return (
      <div className={styles.container}>
        <div className={styles.conter}>
          <Exception type="500" style={styles.ceshi} desc="服务器出错,请退出重试/待会再来~" />
        </div>
      </div>
    );
  }
}

export default Error500;
