import React, { Component } from 'react';
import { Link } from 'dva/router';
import { Carousel } from 'antd-mobile';
import styles from './index.less';
import MaskImg from '../../assets/banner1.png';

export default class Banner extends Component {
  state = {
    data: [MaskImg],
  };
  render() {
    return (
      <div className={styles.normal}>
        <Carousel dots={false} infinite selectedIndex={0}>
          {this.state.data.map(val => (
            <Link key={val} to="/usercourse" className={styles.imgContainer}>
              <img src={val} alt="轮播图" className={styles.bannerImg} />
            </Link>
          ))}
        </Carousel>
      </div>
    );
  }
}
