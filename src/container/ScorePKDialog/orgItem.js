import React, { PureComponent } from 'react';
import ButtonGroupPro from 'components/ButtonGroupPro/ButtonGroupPro';
import styles from './index.less';
import { SortChanseData } from '../../utils/sortChineseWord';

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
    const familyType0 = { name: '', data: [] };
    // 壁垒
    const familyType1 = { name: '', data: [] };

    this.props.dataList.forEach(v => {
      if (v.familyType === 0) {
        familyType0.data.push(v);
      }
      if (v.familyType === 1) {
        familyType1.data.push(v);
      }
      familyType0.name = '自考';
      familyType1.name = '壁垒';
    });
    familyType0.data = SortChanseData(familyType0.data, 'orgName'); // 排序
    familyType1.data = SortChanseData(familyType1.data, 'orgName'); // 排序
    return (
      <div>
        <div className={styles.itemContainer}>
          <span className={styles.orgName}>{familyType0.name}</span>
          <ButtonGroupPro
            selectedIdList={this.props.selectIds}
            dataSource={familyType0}
            dataReturnFun={this.choseButton}
          />
        </div>
        <div className={styles.itemContainer}>
          <span className={styles.orgName}>{familyType1.name}</span>
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
