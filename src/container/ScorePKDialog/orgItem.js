import React, { PureComponent } from 'react';
import ButtonGroupPro from 'components/ButtonGroupPro/ButtonGroupPro';
import styles from './index.less';
import { SortChanseData } from '../../utils/sortChineseWord';

export default class OrgItem extends PureComponent {
  constructor(props) {
    super(props);
    const { dataList } = props;
    this.state = {
      dataListObj: this.handleDataLiat(dataList),
    };
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (JSON.stringify(nextProps.dataList) !== JSON.stringify(this.props.dataList)) {
      this.setState({ dataListObj: this.handleDataLiat(nextProps.dataList) });
    }
  }

  choseButton = obj => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(obj);
    }
  };
  handleDataLiat = (data = []) => {
    // 自考
    const familyType0 = { name: '自考', data: [] };
    // 壁垒
    const familyType1 = { name: '壁垒', data: [] };
    if (Array.isArray(data)) {
      data.forEach(v => {
        if (v.familyType === 0) {
          familyType0.data.push(v);
        }
        if (v.familyType === 1) {
          familyType1.data.push(v);
        }
      });
      familyType0.data = SortChanseData(familyType0.data, 'orgName'); // 排序
      familyType1.data = SortChanseData(familyType1.data, 'orgName'); // 排序
    }
    return { familyType0, familyType1 };
  };

  render() {
    const { dataListObj } = this.state;
    const { familyType0, familyType1 } = dataListObj;
    return (
      <div>
        <div className={styles.itemContainer}>
          {!familyType0.data.length ? null : (
            <span className={styles.orgName}>{familyType0.name}</span>
          )}
          <ButtonGroupPro
            selectedIdList={this.props.selectIds}
            dataSource={familyType0}
            dataReturnFun={this.choseButton}
          />
        </div>
        <div className={styles.itemContainer}>
          {!familyType1.data.length ? null : (
            <span className={styles.orgName}>{familyType1.name}</span>
          )}
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
