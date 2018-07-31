import React, { Component } from 'react';
import { List } from 'antd-mobile';
import styles from './assistantDetails.less';

class AssistantDetails extends Component {
  render() {
    const { rowData, isShowDetail } = this.props;
    let i = 0;
    i += 1;
    return (
      <div
        key={`fir${i}`}
        style={{
          paddingBottom: '.14rem',
          fontSize: '.2rem',
          display: !isShowDetail ? 'none' : 'block',
        }}
      >
        <List className={styles.mylist} prefixCls="mylist">
          <List.Item prefixCls="mylist">
            <ul className={styles.ulCss}>
              <li>
                <span className={styles.row1} />
                <span className={styles.row2}>正面均分</span>
                <span className={styles.row2}>负面均分</span>
              </li>

              {rowData.children
                ? Object.keys(rowData.children).map((key, j) => {
                    const datalist = rowData.children[j];
                    return (
                      <li key={`sec${key}`}>
                        <span className={styles.row1}>
                          {j === 0 ? (
                            rowData.category
                          ) : (
                            <p className={styles.firRankBox}>
                              <span className={styles.firRankCls}>集团第一名</span>
                              <span className={styles.firRankCls}>{rowData.firstName}</span>
                            </p>
                          )}
                        </span>
                        <span className={styles.row3}>
                          {datalist.positive}
                          {/* {datalist.chain1!==null?<img className={styles.triImg} src={datalist.chain1==0?yellowImg:datalist.chain1>0?greenImg:redImg} alt=""/>:<span className={styles.triImg}></span>} */}
                          {/* <p className={datalist.chain1!==null?(datalist.chain1===0?styles.circleY:datalist.chain1<0?styles.circleR:styles.circleG):styles.hideCircle}>•</p> */}
                        </span>
                        <span className={styles.row3}>
                          {datalist.negative}
                          {/* {datalist.chain!==null?<img className={styles.triImg} src={datalist.chain==0?yellowImg:datalist.chain>0?greenImg:redImg} alt=""/>:<span className={styles.triImg}></span>} */}
                          {/* <p className={datalist.chain!==null?(datalist.chain===0?styles.circleY:datalist.chain<0?styles.circleR:styles.circleG):styles.hideCircle}>•</p> */}
                        </span>
                      </li>
                    );
                  })
                : null}
            </ul>
          </List.Item>
        </List>
      </div>
    );
  }
}
export default AssistantDetails;
