/*
* params：
* dataList: 必传，展示的数据结构
* groupName: 必传，每个模块的字段
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
import RenderHeader from './RenderHeader';
import RenderItem from './RenderItem';
import './ListView.css';

class MultipHeaderList extends Component {
  constructor(props) {
    super(props);
    const dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource,
    };
  }

  render() {
    const {
      dataList,
      groupName,
      initialListSize,
      headerParam,
      customRenderHeader,
      customRenderItem,
      otherCpmponent,
    } = this.props;

    return (
      <div>
        <ListView
          dataSource={this.state.dataSource.cloneWithRows(dataList[groupName])}
          className="am-list sticky-list"
          style={{ background: '#fff', paddingBottom: '.4rem' }}
          useBodyScroll
          renderSectionWrapper={sectionID => (
            <StickyContainer
              key={`s_${sectionID}_c`}
              className="sticky-container"
              style={{ zIndex: 4, padding: '0 10px' }}
            />
          )}
          renderSectionHeader={sectionData => (
            <Sticky>
              {({ style }) =>
                customRenderHeader ? (
                  customRenderHeader(sectionData)
                ) : (
                  <RenderHeader
                    className="sticky"
                    style={{ ...style }}
                    sectionData={sectionData}
                    tabKey={headerParam.tabKey}
                    groupName={groupName}
                  />
                )
              }
            </Sticky>
          )}
          renderRow={rowData => {
            return !customRenderItem ? <RenderItem rowData={rowData} /> : customRenderItem(rowData);
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
