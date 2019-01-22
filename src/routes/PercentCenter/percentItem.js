import React from 'react';
import { Icon } from 'antd-mobile';
import styles from './Percenter.less';
import { getItem } from '../../utils/localStorage';
import { LOCAL_STORAGE_USER } from '../../utils/typeDict';

class PercentItem extends React.Component {
  gotoNextPAge = (path, id) => {
    const layered_user = getItem(LOCAL_STORAGE_USER).value || {};
    if (id === 7) {
      window.location.href = `${path}?id=${layered_user.id}&userId=${layered_user.userId}`;
    } else {
      window.location.href = path;
    }
  };
  render() {
    const { datasource } = this.props;
    return (
      <ul className={styles.ulCls}>
        {datasource.map(item => (
          <li
            key={item.id}
            className={`scaleBorder ${styles.liCls}`}
            onClick={() => this.gotoNextPAge(item.pathName, item.id)}
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
