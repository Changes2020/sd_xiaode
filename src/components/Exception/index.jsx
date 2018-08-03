import React from 'react';
import classNames from 'classnames';
import config from './config';
import styles from './index.less';

/*
* props {type} String or Number  传入状态组件状态,403,500,和config配置相统一
* props {img} String             传入组件展示图片src
* props {desc} String            传入组件描述
*/
export default class Exception extends React.Component {
  checkoutDesc = desc => {
    // 判断desc参数的类型渲染不通的展示
    if (typeof desc === 'string') {
      return <span className={styles.wordStyle}>{desc}</span>;
    }
    if (typeof desc === 'object' && !isNaN(desc.length)) {
      const lis = desc.map(item => (
        <li className={styles.wordStyle} key={new Date().valueOf() + item}>
          {' '}
          {item}{' '}
        </li>
      ));
      return <ul className={styles.ulStyle}>{lis}</ul>;
    }
    if (typeof desc === 'function') {
      return desc();
    }
    if (typeof desc === 'object' && React.isValidElement(desc)) {
      return desc;
    }
  };
  render() {
    const { type = null, img, style, desc = '' } = this.props;
    const pageType = type in config ? type : '403';
    const clsString = classNames(styles.errorBox, style);
    const hasHaddleDesc = this.checkoutDesc(desc);
    return (
      <div className={`${styles.errorBox} ${clsString}`}>
        <div
          className={styles.divImg}
          style={{ backgroundImage: `url(${img || config[pageType].img})` }}
        />
        <div className={styles.content}>{hasHaddleDesc}</div>
      </div>
    );
  }
}
