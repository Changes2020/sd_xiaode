import React from 'react';
import styles from './ResultList.less';

export default class ScoreFile extends React.Component {

  studyList = (paramsObj = [],arrLength=1) => {
    const list = Array.isArray(paramsObj) ? paramsObj : [];
    const liList = list.map((item) => {
      return (
        <div key={item.id} className={arrLength > 2 ?styles.m_innerScore1:styles.m_innerScore}>
          <span className={styles.u_unitScore}>{item.avgScore}</span>
        </div>
      );
    });
    return (
      <div className={styles.m_studyScore} >
        <span className={styles.u_studyWord}>学分均分</span>
        <div className={styles.m_innerContent}>
          {liList}
        </div>
      </div>
    );
  };
  render() {
    const { paramsObj = {} } = this.props;
    const arrLength = paramsObj.length;
    return (
      <div>
        {this.studyList(paramsObj,arrLength)}
      </div>
    );
  }
}
