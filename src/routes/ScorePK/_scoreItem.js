import React from 'react';
import ScoreDetail from './_scoreDetail';
import styles from './_score.less';

class RenderItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  // getFilterData = (paramsObj=[])=>{
  //   let detailList = null;
  //   if( paramsObj.length > 0) {
  //     // // 整理传给子组件的数据
  //     // paramsObj.map((item)=>{
  //     //   item.childNode.map((val)=>{
  //     //     this.idArr.push(val.id);
  //     //   })
  //     // });
  //     //
  //     // this.idArr = Array.from( new Set(this.idArr) );
  //     detailList = this.idArr.map((i)=>{
  //       paramsObj.map((item)=>{
  //         item.childNode.map((val)=>{
  //           if(val.id === i){
  //             this.newData[i]=val;
  //           }
  //         })
  //       });
  //       return (
  //         <ScoreDetail paramsObj={this.newArr} />
  //       )
  //     });
  //     console.log(this.newData)
  //     detailList = paramsObj[0].childNode.map((item, index) => {
  //       // this.newData[index] = item;
  //       // this.newArr.push(this.newData);
  //       return (
  //         <ScoreDetail paramsObj={this.newData} />
  //       )
  //     })
  //   }
  //   return <div>{detailList}</div>;
  // };
  // newArr = [];
  newData = {};
  // idArr = [];

  // 渲染二级数据
  renderList = (data, index) => {
    console.log(data);
    const liList = data.map(item => {
      return (
        <div
          key={index}
          className={`${styles.dataCss} ${data.length > 2 ? styles.width_3 : styles.width_2}`}
        >
          <div className={styles.u_unitScore}>{item.childNode[index].avgScore.toFixed(2)}</div>
        </div>
      );
    });
    return <div className={styles.u_rightCss}>{liList}</div>;
  };
  render() {
    const { paramsObj = [] } = this.props;
    return (
      <div className={styles.m_container}>
        {paramsObj.length > 0
          ? paramsObj[0].childNode.map((item, index) => {
              return (
                <div key={item.id}>
                  <div className={styles.u_colCss}>
                    <span className={styles.u_leftCss}>{item.dimensionName}</span>
                    {this.renderList(paramsObj, index)}
                  </div>
                  <ScoreDetail paramsObj={paramsObj} />
                </div>
              );
            })
          : null}
      </div>
    );
  }
}
export default RenderItem;
