import React from 'react';
import itemList from '../../utils/personalJson';
import Detail from './percentItem';
import styles from './Percenter.less';
import lightBg from '../../assets/lightBG.png';
import adressIcon from '../../assets/address.svg';
import shapeIcon from '../../assets/Shape.svg';
import classIcon from '../../assets/class.svg';
import collegeIcon from '../../assets/college.svg';

class Percent extends React.Component {
  render() {
    return (
      <div className={styles.m_percentWrap}>
        <div className={styles.u_header}>
          <img src={lightBg} alt="BG" className={styles.bgCls} />
          <div className={styles.infoCls}>
            <div className={styles.userInfo}>
              <img src={shapeIcon} alt="name" className={styles.hdIcon} />
              <span>哈哈哈</span>
              <div className={styles.addressCls}>
                <img src={adressIcon} alt="name" className={styles.hdIcon} />
                <span>北京</span>
              </div>
            </div>
            <div className={styles.classInfo}>
              <img src={classIcon} alt="class" className={styles.hdIcon} />
              哈哈哈
            </div>
            <div className={styles.collegeInfo}>
              <img src={collegeIcon} alt="college" className={styles.hdIcon} />
              哈哈哈
            </div>
          </div>
        </div>
        {Object.keys(itemList).map(item => <Detail key={item} datasource={itemList[item]} />)}
      </div>
    );
  }
}

export default Percent;
