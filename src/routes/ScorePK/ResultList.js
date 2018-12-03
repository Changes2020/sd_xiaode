import React, { Component } from 'react';
import ButtonGroupPro from '../../components/ButtonGroupPro/ButtonGroupPro';

class ReaultList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ds: {
        data: [
          { id: 1, name: '派学院', isFirst: false },
          { id: 2, name: '狐逻', isFirst: false },
          { id: 3, name: '泰罗', isFirst: true },
          { id: 4, name: '皓博', isFirst: false },
        ],
      },
      ss: [{ id: 1, name: '派学院' }, { id: 6, name: '名称6' }],
    };
  }
  selectGroup = item => {
    console.log(item);
  };
  render() {
    return (
      <div>
        <ButtonGroupPro
          dataSource={this.state.ds}
          selectedIdList={this.state.ss}
          dataReturnFun={this.selectGroup}
        />
      </div>
    );
  }
}
export default ReaultList;
