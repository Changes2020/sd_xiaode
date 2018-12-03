import React, { PureComponent } from 'react';
import ButtonGroupPro from 'components/ButtonGroupPro/ButtonGroupPro';
import styles from './index.less';

export default class OrgItem extends PureComponent {
  render() {
    const data = [
      { id: 1, name: '第一' },
      { id: 2, name: '第一' },
      { id: 3, name: '第一', isFirst: true },
      { id: 4, name: '第一' },
    ];
    return (
      <div className={styles.itemContainer}>
        <span className={styles.orgName}>拍学院</span>
        <div className={styles.itemButtonBox}>
          <ButtonGroupPro dataSource={{ data }} />
        </div>
      </div>
    );
  }
}
