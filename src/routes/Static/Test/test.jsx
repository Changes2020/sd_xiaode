import React, { Component } from 'react';
import styles from './test.less';
import Top from '../../../assets/top.svg';
import formula1 from '../../../assets/sunlinght_01.png';
import formula2 from '../../../assets/sunlinght_02.png';

class Test extends Component {
  componentDidMount() {
    document.title='\u200E';
    window.addEventListener('scroll', this.onScroll);
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll);
  }
  onScroll = () => {
    const t = document.documentElement.scrollTop || document.body.scrollTop; // 滚动条滚动时，到顶部的距离
    const backTop = document.getElementById('backTopBtn'); // 返回顶部模块

    if (backTop !== null) {
      backTop.style.display = t >= 200 ? 'block' : 'none';
    }
  };
  scrollToAnchor = anchorName => {
    if (anchorName) {
      // 找到锚点
      const anchorElement = document.getElementById(anchorName);
      // 如果对应id的锚点存在，就跳转到锚点
      if (anchorElement) {
        anchorElement.scrollIntoView({ block: 'start', behavior: 'smooth' });
      }
    }
  };
  render() {
    return (
      <div className={styles.usercourse}>
        <div
          className={`${styles.floatIcon} ${styles.goTopCls}`}
          onClick={() => {
            window.scrollTo(0, 0);
          }}
          id="backTopBtn"
        >
          <img src={Top} className={styles.imgTop} alt="回到顶部" />
        </div>

        <div className={styles.u_button1} onClick={() => this.scrollToAnchor('test3')}>
          a
        </div>
        <div className={styles.u_button2} onClick={() => this.scrollToAnchor('test6')}>
          a
        </div>
        <img src={formula1} alt="formula1" />
        <img src={formula2} alt="formula2" />
        <img id="test3" src={formula1} alt="formula2" />
        <img src={formula2} alt="formula1" />
        <img id="test6" src={formula1} alt="formula2" />
        <img src={formula2} alt="formula1" />
      </div>
    );
  }
}

export default Test;
