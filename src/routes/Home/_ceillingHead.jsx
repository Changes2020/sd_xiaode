import React from 'react';
import { formatDate } from '../../utils/FormatDate';
import styles from './IndexPage.less';

export default class Ceilling extends React.Component {
  componentDidMount() {
    window.addEventListener('scroll', this.onScroll);
  }
  onScroll = () => {
    const t = document.documentElement.scrollTop || document.body.scrollTop; // 滚动条滚动时，到顶部的距离
    this.Id.style.display = t >= 200 ? 'block' : 'none';
  };
  createRef = Id => {
    this.Id = Id;
  };
  backTopFn = () => {
    if (this.props.backTopFn) {
      this.props.backTopFn();
    }
  };
  render() {
    const { paramsObj, userInfo } = this.props;
    const groupTypeP = userInfo.groupType;
    return (
      <div className={styles.topBarCls} ref={this.createRef} onClick={this.backTopFn}>
        {`${formatDate(paramsObj.startTime).substring(5)} - ${formatDate(
          paramsObj.endTime
        ).substring(5)} | `}
        {Number(paramsObj.dateType) === 1
          ? '周均数据'
          : Number(paramsObj.dateType) === 2
            ? '月均数据'
            : Number(paramsObj.dateType) === 3 ? '自定义数据' : 'date error'}
        {paramsObj.creditType === 1
          ? ' | 学分均分 | '
          : paramsObj.creditType === 2 ? ' | 正面均分 | ' : ' | 负面均分 | '}
        {paramsObj.creditShowType === 'rank' ? '排名' : '趋势'}
        {paramsObj.groupType === 1 ? ' | 学院' : paramsObj.groupType === 2 ? ' | 家族' : ' | 小组'}
        {groupTypeP === 'boss' || groupTypeP === 'admin'
          ? ''
          : paramsObj.rankType === 1 ? '| 集团排名' : paramsObj.rankType === 2 ? '| 院内排名' : ''}
      </div>
    );
  }
}
