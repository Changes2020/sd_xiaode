import React from 'react';
import CreditDetails from '../SecDetails/CreditDetails';
import greenIcon from '../../assets/green.png';
import blueIcon from '../../assets/blue.png';
import yellowIcon from '../../assets/yellow.png';
import redImg from '../../assets/redtriangle.png';
import greenImg from '../../assets/greentriangle.png';
import yellowImg from '../../assets/yellowtriangle.png';
import styles from './Render.less';

let checkIds = [];
class RenderItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowDetail: this.props.rowData.isCheck || false,
    };
  }
  UNSAFE_componentWillReceiveProps(nextprops) {
    if (nextprops.paramCom && this.props.paramCom) {
      const { paramsObj, nextParamsObj } = nextprops.paramCom;
      if (paramsObj !== nextParamsObj) {
        // 如果是过滤条件，则需要把checkIds和isShowDetail恢复初始值
        this.setState({
          isShowDetail: false,
        });
        checkIds = [];
      }
    }
  }
  showChain = (n = null) => {
    if (!n) {
      return n === 0 ? n : 'N/A';
    } else if (n > 1000) {
      return '1000+';
    } else if (n < -1000) {
      return '-1000+';
    } else {
      return n;
    }
  };
  toggleClick = () => {
    const { isShowDetail } = this.state;
    this.setState({ isShowDetail: !isShowDetail });
    // let n = k;
    // const { dataList } = this.props;
    // Object.keys(dataList).map(item => {
    //   dataList[item].forEach(el => {
    //     n += 1;
    //     if (document.getElementById(`rowId${n}`)) {
    //       if (
    //         document.getElementById(`rowId${n}`).getAttribute('dataid') ===
    //         `${el.familyType}${el.id}`
    //       ) {
    //         this.setState({ isShowDetail: bol });
    //       }
    //     }
    //   });
    //   return dataList;
    // });
  };
  render() {
    const { rowData, jump2Data } = this.props;
    const { isShowDetail } = this.state;

    const { chain } = rowData;
    return (
      <div>
        <div
          className={styles.tableCss}
          onClick={() => {
            const _id = `${rowData.familyType}${rowData.id}`;
            const index = checkIds.indexOf(_id);
            if (index === -1) {
              checkIds.push(_id);
              this.toggleClick(0, true);
            } else {
              checkIds.splice(index, 1);
              this.toggleClick(0, false);
            }
            this.props.saveIds(checkIds);
          }}
        >
          <div className={styles.leftCss}>{rowData.name}</div>
          <div className={styles.proCss}>{rowData.project}</div>
          <div className={styles.rankCss}>
            {rowData.rank}/{rowData.total}
          </div>
          <div className={styles.equableCss}>{rowData.score.toFixed(2)}</div>
          <div className={styles.ringRatioCss}>
            {this.showChain(chain)}
            {chain || chain === 0 ? (
              <img
                alt=""
                className={styles.triImg}
                src={chain === 0 ? yellowImg : chain < 0 ? redImg : greenImg}
              />
            ) : (
              <span className={styles.triImg} />
            )}
          </div>
          <div className={styles.countCss} />
          <div className={styles.rightCss}>
            <img
              alt="箭头"
              className={isShowDetail ? styles.arrowUp : styles.arrowDown}
              src={
                rowData.familyType === 0
                  ? greenIcon
                  : rowData.familyType === 1 ? yellowIcon : blueIcon
              }
            />
          </div>
        </div>
        {!isShowDetail ? null : (
          <CreditDetails
            rowData={rowData}
            jump2Data={(data1, data2, data3, data4) => {
              jump2Data(data1, data2, data3, data4);
            }}
            isShowDetail={isShowDetail}
          />
        )}
      </div>
    );
  }
}
export default RenderItem;
