import React from 'react';
import { Icon } from 'antd-mobile';
import styles from './Percenter.less';

class PercentItem extends React.Component {
  gotoNextPAge = path => {
    console.log(path);
  };
  render() {
    const { datasource } = this.props;
    return (
      <ul className={styles.ulCls}>
        {datasource.map(item => (
          <li
            key={item.id}
            className={`scaleBorder ${styles.liCls}`}
            onClick={() => this.gotoNextPAge(item.pathName)}
          >
            <img src={item.icon} alt="icon" className={styles.iconImg} />
            {item.name}
            <Icon type="right" className={styles.arrowRight} size="lg" />
          </li>
        ))}
      </ul>
    );
  }
}

export default PercentItem;
