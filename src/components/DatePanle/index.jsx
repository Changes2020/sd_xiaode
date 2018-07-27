import React from 'react';
import SelectPanle from './SelectedPanle';
import Calendar from './Calendar';

export default class DatePanle extends React.Component {
  render() {
    return (
      <div>
        <SelectPanle />
        <Calendar reset={{ minDate: '2018-7-25' }} />
      </div>
    );
  }
}
