import React from 'react';
import styles from './TableHeader.less';

class RenderHeader extends React.Component {
  tableColums = v => {
    const columns = [
      {
        title: '序号',
        dataIndex: 'id',
        key: 'id',
        clsName: 'leftCls',
      },
      {
        title: v.titleOne,
        dataIndex: 'titleOne',
        key: 'titleOne',
        clsName: 'dateCls',
      },
      {
        title: v.titleTwo,
        dataIndex: 'titleTwo',
        key: 'titleTwo',
        clsName: 'stuCls',
      },
      {
        title: v.titleThree,
        dataIndex: 'titleThree',
        key: 'titleThree',
        clsName: 'preValCls',
      },
      {
        title: v.titleFour,
        dataIndex: 'titleFour',
        key: 'titleFour',
        clsName: 'rightCls',
      },
    ];
    return columns;
  };

  render() {
    const { columnsData } = this.props;

    const columns = this.tableColums(columnsData);
    return (
      <div className={styles.normal}>
        {Object.keys(columns).map((key, i) => {
          const { title, clsName } = columns[i];
          return (
            <div key={key} className={styles[clsName]}>
              {title}
            </div>
          );
        })}
      </div>
    );
  }
}
export default RenderHeader;
