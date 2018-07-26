import React from 'react';
import {ActivityIndicator} from 'antd-mobile';
import styles from './loading.css';

class Loading extends React.Component {
    render() {
      return (
          <ActivityIndicator
            toast
            className={styles}
            text
            size="small"
            color="white"
            animating={true}
          />
      )
  
    }
  }
  export default Loading;