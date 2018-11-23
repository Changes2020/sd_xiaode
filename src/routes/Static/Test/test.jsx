import React, { Component } from 'react';
import styles from './test.less';
import Top from '../../../assets/top.svg';
import sunlinght1 from '../../../assets/sunlight1.png';
import sunlinght2 from '../../../assets/sunlight2.png';
import sunlinght3 from '../../../assets/sunlight3.png';
import sunlinght4 from '../../../assets/sunlight4.png';
import sunlinght5 from '../../../assets/sunlight5.png';
import sunlinght6 from '../../../assets/sunlight6.png';
import sunlinght7 from '../../../assets/sunlight7.png';
import sunlinght8 from '../../../assets/sunlight8.png';
import sunlinght9 from '../../../assets/sunlight9.png';


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

        <div className={styles.u_button1} onClick={() => this.scrollToAnchor('test3')} />
        <div className={styles.u_button2} onClick={() => this.scrollToAnchor('test4')} />
        <div className={styles.u_button3} onClick={() => this.scrollToAnchor('test5')} />
        <div className={styles.u_button4} onClick={() => this.scrollToAnchor('test6')} />
        <div className={styles.u_button5} onClick={() => this.scrollToAnchor('test7')} />
        <div className={styles.u_button6} onClick={() => this.scrollToAnchor('test8')} />
        <img src={sunlinght1} alt="sunlinght1" />
        <img src={sunlinght2} alt="sunlinght2" />
        <img id="test3" src={sunlinght3} alt="sunlinght3" />
        <img id="test4" src={sunlinght4} alt="sunlinght4" />
        <img id="test5" src={sunlinght5} alt="sunlinght5" />
        <img id="test6" src={sunlinght6} alt="sunlinght6" />
        <img id="test7" src={sunlinght7} alt="sunlinght7" />
        <img id="test8" src={sunlinght8} alt="sunlinght8" />
        <img  src={sunlinght9} alt="sunlinght9" />
      </div>
    );
  }
}

export default Test;
