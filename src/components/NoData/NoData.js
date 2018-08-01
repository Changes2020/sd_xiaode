import React, {Component} from 'react';
import styles from './NoData.less';
import nodaimg from '../../assets/nodata.png'

class NoData extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  };
  render() {
    return (
      <div   className={this.props.showflag ? styles.normalblock : styles.normalnone}  >
        <div className={styles.divimg}>
          <img className={styles.imgcss} src={nodaimg} alt="NoData" />
        </div>
        <div className={styles.wordstyle}>
          <div className={styles.wordstyle1}>
            没有相关数据
          </div>
        </div>
      </div>
    );
  }
}

export default NoData
