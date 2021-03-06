/*
* params：
* dataList: 必传，展示的数据结构
* groupName: 每个模块的字段，要是只有一个列表，可以不传
* initialListSize: 每页展示多好条数据
*
* headerParam: 传给子组件 RenderHeader
* renderHeader：页头
* renderFooter：页脚
* customRenderHeader: 组件，展示表头，默认RenderHeader
* customRenderItem: 组件，展示数据，RenderItem
* otherCpmponent: 在listView中扩展
*
* */
import React, { Component } from 'react';
import { StickyContainer, Sticky } from 'react-sticky';
import { ListView } from 'antd-mobile';
import classNames from 'classnames';
import RenderAssistantHeader from '../AssistantDetail/RenderHeader';
import RenderAssistantItem from '../AssistantDetail/RenderItem';
import RenderCreditHeader from '../CreditDetail/RenderHeader';
import RenderCreditItem from '../CreditDetail/RenderItem';
import styles from './ListView.css';

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
  // 组件头部
  renderHeader = () => {
    if (this.props.renderHeader) return this.props.renderHeader();
  };
  // 组件底部
  renderFooter = () => {
    if (this.props.renderFooter) return this.props.renderFooter();
  };
  renderSectionWrapper = sectionID => {
    const { sectionClass = '' } = this.props;
    const newSectionClass = sectionClass
      ? classNames('sticky-container', styles.containCls, sectionClass)
      : classNames('sticky-container', styles.containCls);
    return <StickyContainer key={`s_${sectionID}_c`} className={newSectionClass} />;
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
              onClick={() => {
                window.scrollTo(0, 0);
                // const currentY = document.documentElement.scrollTop || document.body.scrollTop;
                // scroll(currentY, 0);
              }}
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
    const { dataList, customRenderItem, headerParam, jump2Data, saveIds, paramCom } = this.props;
    let dataIndex = 0;
    if (rowData.familyType === 0) {
      dataIndex = rowData.rank;
      pretotal = rowData.total;
    } else if (rowData.familyType === 1) {
      dataIndex = rowData.rank + pretotal;
    } else {
      // 处理其他字段
    }

    if (customRenderItem) {
      return customRenderItem(rowData, sectionID, rowID);
    } else {
      return (
        <div
          id={`rowId${dataIndex}`}
          dataid={`${rowData.familyType}${rowData.id}`}
          className="flex-container"
          style={{ background: this.ItemBgColor(rowData), color: '#333', marginBottom: '.14rem' }}
        >
          {headerParam.loadComponent === 'assistant' ? (
            <RenderAssistantItem
              rowData={rowData}
              jump2Data={(data1, data2, data3, data4) => {
                jump2Data(data1, data2, data3, data4);
              }}
              saveIds={arr => {
                saveIds(arr);
              }}
            />
          ) : (
            <RenderCreditItem
              dataList={dataList}
              rowData={rowData}
              jump2Data={(data1, data2, data3, data4) => {
                jump2Data(data1, data2, data3, data4);
              }}
              saveIds={arr => {
                saveIds(arr);
              }}
              paramCom={paramCom}
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
      <div id={groupName}>
        <ListView
          dataSource={dataSource}
          className="am-list sticky-list"
          style={style}
          useBodyScroll
          renderHeader={() => {
            return this.renderHeader();
          }}
          renderFooter={() => {
            return this.renderFooter();
          }}
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
