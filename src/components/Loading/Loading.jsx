import React from 'react';
import { ActivityIndicator } from 'antd-mobile';
import styles from './loading.css';

class Loading extends React.Component {
  render() {
    const bol = true;
    return (
      <ActivityIndicator toast className={styles} text size="small" color="white" animating={bol} />
    );
  }
}
export default Loading;
