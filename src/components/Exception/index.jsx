import React from "react";
import classNames from "classnames";
import config from "./config";
import styles from "./index.less";

/*
* props {type} String or Number  传入状态组件状态,403,500,和config配置相统一
* props {img} String             传入组件展示图片src
* props {desc} String            传入组件描述
*/

// const Exception=({className, linkElement = 'a', type, title, desc, img, actions, ...rest })=>{
//     const clsString = classNames(styles.errorBox, className);
//     console.log(className);
//     return(<div></div>)
// };
// export default Exception
export default class Exception extends React.Component {
  checkoutDesc = desc => {
    // 判断desc参数的类型渲染不通的展示
    if (typeof desc === "string") {
      return <span className={styles.wordStyle}>desc</span>;
    }
    if (typeof desc === "function") {
      return desc();
    }
  };
  render() {
    const { type = null, img, style } = this.props;
    const pageType = type in config ? type : "403";
    const clsString = classNames(styles.errorBox, style);
    console.log(clsString);
    return (
      <div className={styles.errorBox}>
        <div
          className={styles.divImg}
          style={{ backgroundImage: `url(${img || config[pageType].img})` }}
        />
        <div className={styles.content}>
          <h1 className={clsString}>ceshi</h1>
          <span className={styles.wordStyle}>
            你没有权限访问此页面，或权限设置有误。
          </span>
          <span className={styles.wordStyle}>
            你没有权限访问此页面，或权限设置有误。
          </span>
        </div>
      </div>
    );
  }
}
