import React from 'react';
import styles from './Render.less';

class RenderHeader extends React.Component {
  render() {
    const { groupName, sectionData } = this.props;
    console.log(sectionData);
    const params = {
      0: { groupName: 'collegeselfExam', arr: '学院 (自考)' },
      1: { groupName: 'collegebarrier', arr: '学院 (壁垒)' },
      2: { groupName: 'collegeincubator', arr: '学院(孵化器)' },
      3: { groupName: 'familyselfExam', arr: '家族 (自考)' },
      4: { groupName: 'familybarrier', arr: '家族 (壁垒)' },
      5: { groupName: 'familyincubator', arr: '家族(孵化器)' },
      6: { groupName: 'groupselfExam', arr: '小组 (自考)' },
      7: { groupName: 'groupbarrier', arr: '小组 (壁垒)' },
      8: { groupName: 'groupincubator', arr: '小组(孵化器)' },
    };
    return (
      <div className={styles.tableTitle}>
        <div className={styles.tableCss}>
          <div className={styles.leftCss}>
            {Object.keys(params).map(key => {
              if (params[key].groupName === groupName) {
                return params[key].arr;
              } else {
                return null;
              }
            })}
          </div>
          <div className={styles.proCss}>项目</div>
          <div className={styles.rankCss}>排名/总数</div>
          <div className={styles.equableCss}>均分</div>
          <div className={styles.ringRatioCss}>集团均分</div>
          <div className={styles.rightCss}>第一名</div>
        </div>
      </div>
    );
  }
}
export default RenderHeader;
