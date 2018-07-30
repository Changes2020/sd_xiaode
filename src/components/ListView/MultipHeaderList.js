/*
* params：
* dataList: 必传，展示的数据结构
* groupName: 每个模块的字段，要是只有一个列表，可以不传
* initialListSize: 每页展示多好条数据
*
* headerParam: 传给子组件 RenderHeader
* customRenderHeader: 组件，展示表头，默认RenderHeader
* customRenderItem: 组件，展示数据，RenderItem
* otherCpmponent: 在listView中扩展
*
* */
import React, { Component } from 'react';
import { StickyContainer, Sticky } from 'react-sticky';
import { ListView } from 'antd-mobile';
import RenderHeader from '../CreditDetail/RenderHeader';
import RenderItem from '../CreditDetail/RenderItem';
import './ListView.css';

class MultipHeaderList extends Component {
  constructor(props) {
    super(props);
    const dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource,
    };
  }
  renderSectionWrapper = sectionID => {
    return (
      <StickyContainer
        key={`s_${sectionID}_c`}
        className="sticky-container"
        style={{ zIndex: 4, padding: '0 10px' }}
      />
    );
  };

  renderSectionHeader = sectionData => {
    const { customRenderHeader, headerParam, groupName } = this.props;
    if (customRenderHeader) {
      return customRenderHeader(sectionData);
    } else {
      return (
        <Sticky>
          {({ style }) => (
            <RenderHeader
              className="sticky"
              style={{ ...style }}
              sectionData={sectionData}
              tabKey={headerParam.tabKey}
              groupName={groupName}
            />
          )}
        </Sticky>
      );
    }
  };

  renderRow = (rowData, sectionID, rowID) => {
    const { customRenderItem, headerParam } = this.props;
    if (customRenderItem) {
      return customRenderItem(rowData, sectionID, rowID);
    } else {
      return <RenderItem rowData={rowData} jump2Data={headerParam.jump2Data} />;
    }
  };
  render() {
    const { dataList, groupName, initialListSize, otherCpmponent } = this.props;
    const dataSource = groupName
      ? this.state.dataSource.cloneWithRows(dataList[groupName])
      : this.state.dataSource.cloneWithRows(dataList);
    return (
      <div>
        <ListView
          dataSource={dataSource}
          className="am-list sticky-list"
          style={{ background: '#fff', paddingBottom: '.4rem' }}
          useBodyScroll
          renderSectionWrapper={sectionID => {
            return this.renderSectionWrapper(sectionID);
          }}
          renderSectionHeader={sectionData => {
            return this.renderSectionHeader(sectionData);
          }}
          renderRow={(rowData, sectionID, rowID) => {
            return this.renderRow(rowData, sectionID, rowID);
          }}
          pageSize={0}
          initialListSize={initialListSize || 500}
          scrollEventThrottle={200}
          onEndReachedThreshold={10}
        />
        {/* 小助手展示查看全部 */}
        {!otherCpmponent ? null : otherCpmponent}
      </div>
    );
  }
}

export default MultipHeaderList;
