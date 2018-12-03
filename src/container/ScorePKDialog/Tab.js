import React, { PureComponent } from 'react';
import classNames from 'classnames';
import Dict from '../../utils/typeDict';
import styles from './index.less';

const { groupTypeZHDict } = Dict;
class Tab extends PureComponent {
  clickTab = id => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(id);
    }
  };

  render() {
    const { groupType } = this.props;
    return (
      <ul className={styles.groupTypeTab}>
        {Object.keys(groupTypeZHDict).map(item => (
          <li
            key={item}
            className={classNames(
              styles.tabItem,
              `${Number(groupType) === Number(item) ? styles.selectedTabItem : ''}`
            )}
            onClick={this.clickTab.bind(this, item)}
          >
            {groupTypeZHDict[item]}
          </li>
        ))}
        {/* <li className={selectedStyle}>学院</li>
            <li className={styles.tabItem}>家族</li>
            <li className={styles.tabItem}>小组</li> */}
      </ul>
    );
  }
}
export default Tab;
