import React from 'react';
import styles from './RenderItem.less';

class RenderHeader extends React.Component {
  componentDidMount() {}

  render() {
    const { sectionData, tabKey, groupName } = this.props;
    const index = sectionData[0].familyType;
    const groupType = {
      1: '学院',
      2: '家族',
      3: '小组',
    };
    const familyType = {
      0: '(自考)',
      1: '(壁垒)',
      2: '(孵化器)',
    };
    return (
      <div
        style={{
          zIndex: 2,
          backgroundColor:
            groupName.indexOf('selfExam') > -1
              ? '#52C9C2'
              : groupName.indexOf('barrier') > -1 ? '#F3A92F' : '#619BDE',
          color: 'white',
          width: '7.1rem',
          height: '.8rem',
          fontSize: '.2rem',
          borderRadius: '.04rem .04rem 0 0',
        }}
      >
        <div className={styles.tableCss}>
          <div className={styles.leftCss}>
            <span style={{ display: 'inline-block', width: '32px', textAlign: 'center' }}>
              {' '}
              {groupType[tabKey]}
            </span>
            <br />
            <span>{familyType[index]}</span>
          </div>
          <div className={styles.proCss}>项目</div>
          <div className={styles.rankCss}>排名/总数</div>
          <div className={styles.equableCss}>均分</div>
          <div className={styles.ringRatioCss}>环比%</div>
          <div className={styles.ringRatioCss}>数量</div>
          <div className={styles.rightCss}>操作</div>
        </div>
      </div>
    );
  }
}
export default RenderHeader;
