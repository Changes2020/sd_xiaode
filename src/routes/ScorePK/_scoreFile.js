import React from 'react';
import styles from './ResultList.less';

export default class ScoreFile extends React.Component {

  scoreList = (paramsObj = [],arrLength=1) => {
    const list = Array.isArray(paramsObj) ? paramsObj : [];
    const liList = list.map((item) => {
      return (
        <div key={item.id} className={arrLength > 2 ?styles.m_formulaButton:styles.m_formulaButton2}>
          <span className={styles.u_nameClass}>{item.orgName}</span>
          <br />
          <span className={styles.u_nameClass}>{`${item.rank}/${item.allObj}`}</span>
        </div>
      );
    });
    return (
      <div style={{display:'inline-block'}} >
        {liList}
      </div>
    );
  };
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
        <div className={arrLength > 2 ? styles.pk3Score : styles.pk2Score}>
          <span className={styles.pkWordCls}>PK</span>
          {this.scoreList(paramsObj,arrLength)}
        </div>
        {this.studyList(paramsObj,arrLength)}
      </div>
    );
  }
}
