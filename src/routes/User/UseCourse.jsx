import React, { Component } from 'react';
import styles from './useCourse.less';
import UseCourse1 from '../../assets/UseCourse1.png';
import UseCourse2 from '../../assets/UseCourse2.png';
import UseCourse3 from '../../assets/UseCourse3.png';
import UseCourse4 from '../../assets/UseCourse4.png';
import UseCourse5 from '../../assets/UseCourse5.png';
import UseCourse6 from '../../assets/UseCourse6.png';
import UseCourse7 from '../../assets/UseCourse7.png';
import UseCourse8 from '../../assets/UseCourse8.png';
import UseCourse9 from '../../assets/UseCourse9.png';
import UseCourse10 from '../../assets/UseCourse10.png';
import UseCourse11 from '../../assets/UseCourse11.png';
import UseCourse12 from '../../assets/UseCourse12.png';

class UseCourse extends Component {
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
        <img src={UseCourse1} alt="UseCourse1" />
        <a className={styles.aTest} onClick={() => this.scrollToAnchor('test')}>
          <img className="testclass" id="smootha" src={UseCourse2} alt="UseCourse2" />
        </a>
        <img src={UseCourse3} alt="UseCourse3" />
        <img src={UseCourse4} alt="UseCourse4" />
        <img src={UseCourse5} alt="UseCourse5" />
        <img src={UseCourse6} alt="UseCourse6" />
        <img src={UseCourse7} alt="UseCourse7" />
        <img src={UseCourse8} alt="UseCourse8" />
        <img src={UseCourse9} alt="UseCourse9" />
        <img src={UseCourse10} alt="UseCourse10" />
        <img id="test" src={UseCourse11} alt="UseCourse11" />
        <img src={UseCourse12} alt="UseCourse12" />
      </div>
    );
  }
}

export default UseCourse;
