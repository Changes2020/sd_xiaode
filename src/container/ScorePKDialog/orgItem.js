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
    // 自考
    const familyType0 = { data: [] };
    // 壁垒
    const familyType1 = { data: [] };

    this.props.dataList.forEach(v => {
      if (v.familyType === 0) {
        familyType0.data.push(v);
      }
      if (v.familyType === 1) {
        familyType1.data.push(v);
      }
    });
    return (
      <div>
        <div className={styles.itemContainer}>
          <span className={styles.orgName}>自考</span>
          <ButtonGroupPro
            selectedIdList={this.props.selectIds}
            dataSource={familyType0}
            dataReturnFun={this.choseButton}
          />
        </div>
        <div className={styles.itemContainer}>
          <span className={styles.orgName}>壁垒</span>
          <ButtonGroupPro
            selectedIdList={this.props.selectIds}
            dataSource={familyType1}
            dataReturnFun={this.choseButton}
          />
        </div>
      </div>
    );
  }
}
