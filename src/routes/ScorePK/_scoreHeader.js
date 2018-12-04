import React from 'react';
import styles from './_score.less';

class RenderHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  scoreList = (paramsObj = [],arrLength=1) => {
    const list = Array.isArray(paramsObj) ? paramsObj : [];
    const liList = list.map(item => {
      return (
        <div key={item.key} className={arrLength > 2 ?styles.m_formulaButton:styles.m_formulaButton2}>
          <span className={styles.u_nameClass}>{item.avgScore}</span>
        </div>
      );
    });
    return (
      <div style={{display:'inline-block',width:'5.7rem'}} >
        {liList}
      </div>
    );
  };

  scoreList1 = (paramsObj = [],arrLength=1) => {
    const list = Array.isArray(paramsObj) ? paramsObj : [];
    const liList = list.map((item) => {
      return (
        <div key={item.key} className={arrLength > 2 ?styles.m_formulaButton:styles.m_formulaButton2}>
          <span className={styles.u_nameClass1}>{item.avgScore}</span>
        </div>
      );
    });
    return (
      <div style={{display:'inline-block'}} >
        {liList}
      </div>
    );

  };


  render() {
    const { paramsObj=[] } = this.props;
    const arrLength = paramsObj.length;
    return (
      <div>
        <div className={styles.heightDiv} />
        <div className={styles.m_studyScore}>
          <span className={styles.u_studyWord}>正面均分</span>
          {this.scoreList(paramsObj,arrLength)}
        </div>


        <div className={styles.heightDiv1} />
        <div className={styles.m_studyScore1}>
          <span className={styles.u_studyWord1}>负面均分</span>
          {this.scoreList1(paramsObj,arrLength)}
        </div>
      </div>
    );
  }
}
export default RenderHeader;
