import React from 'react';
import { Icon } from 'antd-mobile';
import { randomString } from '../../utils/radomUtils';
import styles from './_score.less';

class RenderItem extends React.Component {
  jump2Data = (arrowShow, type, data) => {
    const { timeObj } = this.props;
    if (arrowShow && Number(data.avgScore) !== 0) {
      this.props.selfProps('/demention', {
        startTime: timeObj.startTime,
        endTime: timeObj.endTime,
        groupType: data.originObj.groupType,
        familyType: data.originObj.familyType, // 0:自考，1:壁垒，2:孵化器
        titleName: data.originObj.orgName, // 学院名字
        groupId: data.originObj.id, // 学院id
        groupName: '学分均分',
        type, // 正面均分/负面均分
        dementionId: data.id, // 直播id
        buttonName: data.dimensionName, // 直播名字
      });
    } else {
      console.warn('无权限查看');
    }
  };
  // 渲染3级数据
  renderList = (data, index, type) => {
    const liList = data.map(item => {
      const newItem = item.childNode[index];
      const isShow = Number(newItem.avgScore) !== 0 && newItem.originObj.arrowShow;
      return (
        <div
          key={randomString(5)}
          className={`${styles.dataCss} ${data.length > 2 ? styles.width_3 : styles.width_2}`}
        >
          <span className={styles.u_unitScore}>{newItem.avgScore.toFixed(2)}</span>
          <Icon
            type="right"
            className={type === 2 ? styles.echartsIcon : styles.echartsIcon2}
            size="lg"
            style={{ display: isShow ? 'inline' : 'none' }}
            onClick={this.jump2Data.bind(this, isShow, type, newItem)}
          />
        </div>
      );
    });
    return <div className={styles.u_rightCss}>{liList}</div>;
  };
  render() {
    const { paramsObj = [], type = 2 } = this.props;

    return (
      <div className={`${styles.m_container} ${styles.m_regContain}`}>
        {paramsObj.length > 0
          ? paramsObj[0].childNode.map((item, index) => {
              return (
                <div key={randomString(4)} className={`${styles.u_colCss} ${styles.u_regColCss}`}>
                  <span className={styles.u_leftCss}>{item.dimensionName}</span>
                  {this.renderList(paramsObj, index, type)}
                </div>
              );
            })
          : null}
        <div className={styles.heiDiv} />
      </div>
    );
  }
}
export default RenderItem;
