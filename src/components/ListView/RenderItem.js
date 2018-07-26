/*
* listData -- 必传
* rowData -- 每行数据直接用
* */
import React from 'react';
import styles from './RenderItem.less';

class RenderItem extends React.Component {
  componentDidMount() {}

  render() {
    const { rowData, listData } = this.props;
    const array = [];
    Object.keys(rowData).map(key => {
      listData.forEach(item => {
        if (key === item.name) {
          array.push(key);
        }
      });
      return array;
    });

    return (
      <div className={styles.wrap}>
        {Object.keys(rowData).map((key, i) => {
          return (
            <span key={key} className={styles.title} style={{ ...listData[i].style }}>
              {typeof rowData[array[i]] === 'number'
                ? rowData[array[i]].toFixed(2)
                : rowData[array[i]]}
            </span>
          );
        })}
      </div>
    );
  }
}
export default RenderItem;
