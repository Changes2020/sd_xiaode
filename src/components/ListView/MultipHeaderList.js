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
    const { dataList, groupName, tabKey, initialListSize, otherCpmponent, listColumn } = this.props;

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
              {({ style }) => (
                <RenderHeader
                  className="sticky"
                  style={{
                    ...style,
                  }}
                  sectionData={sectionData}
                  listColumn={listColumn}
                  tabKey={tabKey}
                  groupName={groupName}
                />
              )}
            </Sticky>
          )}
          renderRow={rowData => {
            return <RenderItem rowData={rowData} listColumn={listColumn} />;
          }}
          pageSize={0}
          initialListSize={initialListSize}
          scrollEventThrottle={200}
          onEndReached={this.onEndReached}
          onEndReachedThreshold={10}
        />
        {/* 小助手展示 todo */}
        {!otherCpmponent ? null : otherCpmponent}
        {/* {dataList[groupName].length>20?<div onClick={this.goAllData.bind(this,groupName)} className={styles.seeAllCls}>查看全部</div>:''} */}
      </div>
    );
  }
}

export default MultipHeaderList;
