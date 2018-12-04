import React from 'react';
import styles from './_score.less';

class RenderHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // studyList = (paramsObj = []) => {
  //   const list = Array.isArray(paramsObj) ? paramsObj : [];
  //   const liList = list.map((item) => {
  //     return (
  //       <div key={styles.m_innerScore}>
  //         <span className={styles.u_unitScore}>{item.avgScore}</span>
  //       </div>
  //     );
  //   });
  //   return (
  //     <div className={styles.m_innerContent} style={{display:'inline-block'}}>
  //       {liList}
  //     </div>
  //   );
  // };

  scoreList = (paramsObj = []) => {
    const list = Array.isArray(paramsObj) ? paramsObj : [];
    const liList = list.map(item => {
      return (
        <div key={item.key} className={styles.m_formulaButton2}>
          <span className={styles.u_nameClass}>{item.avgScore}</span>
        </div>
      );
    });
    return <div style={{ display: 'inline-block' }}>{liList}</div>;
  };

  render() {
    const { paramsObj = [] } = this.props;
    return (
      <div>
        <div className={styles.m_studyScore}>
          <span className={styles.u_studyWord}>正面均分</span>
          {this.scoreList(paramsObj)}
        </div>
      </div>
    );
  }
}
export default RenderHeader;
