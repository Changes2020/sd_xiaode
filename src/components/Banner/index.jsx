import React, { Component } from 'react';
import { Link } from 'dva/router';
import { Carousel } from 'antd-mobile';
import styles from './index.less';
import MaskImg from '../../assets/banner1.png';
import perCenterImg from '../../assets/perCenter.svg';

export default class Banner extends Component {
  state = {
    data: [MaskImg],
  };
  render() {
    return (
      <div className={styles.normal}>
        <Carousel dots={false} infinite selectedIndex={0}>
          {this.state.data.map(val => (
            <Link key={val} to="/static/usercourse" className={styles.imgContainer}>
              <img src={val} alt="轮播图" className={styles.bannerImg} />
            </Link>
          ))}
        </Carousel>
        <Link className={styles.perCenterImg} to="/user/percent">
          <img src={perCenterImg} alt="个人中心" />
        </Link>
      </div>
    );
  }
}
