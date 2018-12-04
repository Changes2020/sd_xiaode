import React, { PureComponent } from 'react';
import ButtonGroupPro from 'components/ButtonGroupPro/ButtonGroupPro';
import styles from './index.less';

export default class OrgItem extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  choseButton = obj => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(obj);
    }
  };

  render() {
    const data = [
      { id: 1, name: '第一' },
      { id: 2, name: '第一' },
      { id: 3, name: '第一', isFirst: true },
      { id: 4, name: '第一' },
      { id: 5, name: '第一' },
    ];
    return (
      <div className={styles.itemContainer}>
        <span className={styles.orgName}>拍学院</span>
        <ButtonGroupPro
          selectedIdList={this.props.selectIds}
          dataSource={{ data }}
          dataReturnFun={this.choseButton}
        />
      </div>
    );
  }
}
