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
import RenderAssistantHeader from '../AssistantDetail/RenderHeader';
import RenderAssistantItem from '../AssistantDetail/RenderItem';
import RenderCreditHeader from '../CreditDetail/RenderHeader';
import RenderCreditItem from '../CreditDetail/RenderItem';
import './ListView.css';

let pretotal = 0;
class MultipHeaderList extends Component {
  constructor(props) {
    super(props);
    const dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource,
    };
  }

  headerBgColor = () => {
    const { groupName } = this.props;
    if (groupName.indexOf('selfExam') > -1) {
      return '#52C9C2';
    } else if (groupName.indexOf('barrier') > -1) {
      return '#F3A92F';
    } else if (groupName.indexOf('incubator') > -1) {
      return '#619BDE';
    } else {
      console.warn('没有对应的字段');
    }
  };
  ItemBgColor = rowData => {
    const { groupName } = this.props;
    if (rowData.lineHeight) {
      return 'rgba(255,89,89,0.10)';
    } else if (groupName.indexOf('selfExam') > -1) {
      return 'rgba(82,201,194,0.15)';
    } else if (groupName.indexOf('barrier') > -1) {
      return 'rgba(243,169,47,0.15)';
    } else if (groupName.indexOf('incubator') > -1) {
      return 'rgba(97,155,222,0.15)';
    } else {
      console.warn('没有对应的字段');
    }
  };
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
            <div
              className="sticky"
              style={{ ...style, zIndex: 4, backgroundColor: this.headerBgColor() }}
            >
              {headerParam.loadComponent === 'assistant' ? (
                <RenderAssistantHeader sectionData={sectionData} groupName={groupName} />
              ) : (
                <RenderCreditHeader sectionData={sectionData} tabKey={headerParam.groupType} />
              )}
            </div>
          )}
        </Sticky>
      );
    }
  };

  renderRow = (rowData, sectionID, rowID) => {
    const { customRenderItem, headerParam, jump2Data, toggleClick } = this.props;
    let dataIndex = 0;
    if (rowData.familyType === 0) {
      dataIndex = rowData.rank;
      pretotal = rowData.total;
    } else if (rowData.familyType === 1) {
      dataIndex = rowData.rank + pretotal;
    } else {
      console.warn('只考虑0和1');
    }
    if (customRenderItem) {
      return customRenderItem(rowData, sectionID, rowID);
    } else {
      return (
        <div
          id={`rowId${dataIndex}`}
          dataid={`${rowData.familyType}${rowData.id}`}
          className="flex-container"
          style={{ background: this.ItemBgColor(rowData), marginBottom: '.14rem' }}
        >
          {headerParam.loadComponent === 'assistant' ? (
            <RenderAssistantItem
              rowData={rowData}
              jump2Data={(data1, data2, data3, data4) => {
                jump2Data(data1, data2, data3, data4);
              }}
              toggleClick={(data, show) => {
                toggleClick(data, show);
              }}
            />
          ) : (
            <RenderCreditItem
              rowData={rowData}
              jump2Data={(data1, data2, data3, data4) => {
                jump2Data(data1, data2, data3, data4);
              }}
              toggleClick={(data, show) => {
                toggleClick(data, show);
              }}
            />
          )}
        </div>
      );
    }
  };
  render() {
    const { dataList, groupName, initialListSize, otherCpmponent, style } = this.props;
    const dataSource = groupName
      ? this.state.dataSource.cloneWithRows(dataList[groupName])
      : this.state.dataSource.cloneWithRows(dataList);
    return (
      <div>
        <ListView
          dataSource={dataSource}
          className="am-list sticky-list"
          style={style}
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
