import moment from 'moment';
import { getItem } from './localStorage';

const cusTomTime = '13:30:00'; // 默认获取数据的时间为下午 一点半,后期时间会有所调整

function fiexdDateType(now) {
  // 传入的是dateTime类型
  const year = now.getFullYear();
  const mouth = now.getMonth();
  const day = now.getDate();
  const timeStr = `${year}/${mouth + 1}/${day} ${cusTomTime}`;
  return timeStr;
}

export function formatDate(timestamp) {
  // 设置时间转换格式
  const dateTime = new Date(Number(timestamp));
  const y = dateTime.getFullYear(); // 获取年
  let m = dateTime.getMonth() + 1; // 获取月
  m = m < 10 ? `0${m}` : m; // 判断月是否大于10
  let d = dateTime.getDate(); // 获取日
  d = d < 10 ? `0${d}` : d; // 判断日期是否大10
  const a = ['日', '一', '二', '三', '四', '五', '六'];
  const week = dateTime.getDay(); // 获取周
  const str = `周${a[week]}`;
  return `${y}.${m}.${d} ${str}`; // 返回时间格式
}

// export function formatDateToMD(timestamp) { // 设置时间转换格式
//   let dateTime = new Date(timestamp);
//   var m = dateTime.getMonth() + 1;  // 获取月
//   m = m < 10 ? '0' + m : m;  // 判断月是否大于10
//   var d = dateTime.getDate();  // 获取日
//   d = d < 10 ? ('0' + d) : d;  // 判断日期是否大10
//   var a = ["日", "一", "二", "三", "四", "五", "六"];
//   var week = dateTime.getDay(); //获取周
//   var str = "周" + a[week];
//   return m + '.' + d + ' ' + str;  // 返回时间格式
// }

export function weekMean(now) {
  // 计算周均数据为上周5到今天-1,    endTime计算到23:59:59
  const fiexdDateTime = new Date(fiexdDateType(now));
  const newTime = Number(now) >= Number(fiexdDateTime) ? now : new Date(now - 86400000);
  const weeHours = new Date(newTime.setHours(0, 0, 0, 0));
  const endTime = new Date(weeHours - 1).valueOf(); // 获取当天-1时间23:59:59
  const weekNum = weeHours.getDay() === 0 ? 7 : newTime.getDay();
  const startTime = new Date(
    weeHours - (weekNum > 5 ? weekNum - 5 : weekNum + 2) * 86400000
  ).valueOf();
  return {
    startTime,
    endTime,
  };
}

export function custom(dateTime = null) {
  // 自定义13:30之前是t-2；之后是t-1s
  const now = dateTime || new Date();
  const fiexdDateTime = new Date(fiexdDateType(now));
  let startTime = null;
  let endTime = null;
  if (Number(now) >= Number(fiexdDateTime)) {
    // t-1时间
    const weeHours = new Date(+now.setHours(0, 0, 0, 0)); // 凌晨时间
    startTime = Number(new Date(+weeHours - 86400000));
    endTime = Number(new Date(+weeHours - 1));
  } else {
    // t-2时间
    const weeHours = new Date(+now.setHours(0, 0, 0, 0)); // 凌晨时间
    startTime = Number(new Date(+weeHours - 86400000 * 2));
    endTime = Number(new Date(+weeHours - 86400000 - 1));
  }
  return {
    startTime,
    endTime,
  };
}

export function checkoutNextDay() {
  const [forMatStr, nowTmp] = ['YYYY-MM-DD', Number(new Date())];
  const timeDate = getItem('timeDate').value || {};
  const { dateRange = {} } = timeDate || {};
  /*   默认日期为当月的一号,无截止时间 */
  const {
    beginTime = moment(moment().format('YYYY-MM-01'))
      .utc()
      .valueOf(),
    endTime = null,
  } = dateRange;
  const endTimeFormat = moment(endTime).format(forMatStr);
  const nowTmpFormat = moment(nowTmp).format(forMatStr);
  const tempEndTime = !endTime || !moment(endTimeFormat).isBefore(nowTmpFormat) ? nowTmp : endTime;
  const dayTime = moment(tempEndTime).format(forMatStr);
  /* 判断最大日期是否大于t-1,如果小于则默认日期为该值,如果默认日期大于t-1则需要进行13:30判断 */
  const t1DateTime = moment(nowTmp - 86400000).format(forMatStr);
  const defaultT13Tmp = moment(`${dayTime} 13:30:00`)
    .utc()
    .valueOf(); // 默认1:30的时间搓
  /* 将当前小时分钟添加到已选日期 */
  const defaultTimeNowStr = moment(nowTmp).format('HH:mm:ss');
  const defaultTimeTmp = moment(`${dayTime} ${defaultTimeNowStr}`)
    .utc()
    .valueOf();
  if (moment(dayTime).isBefore(nowTmpFormat)) {
    /*
    *选择默认日期小于t-1 
    */
    if (
      moment(dayTime).isBefore(t1DateTime) ||
      (!moment(dayTime).isBefore(t1DateTime) && defaultTimeTmp >= defaultT13Tmp)
    ) {
      return {
        startTime: beginTime,
        endTime:
          moment(dayTime)
            .utc()
            .valueOf() +
          86400000 -
          1,
      };
    } else {
      return {
        startTime: beginTime,
        endTime:
          moment(dayTime)
            .utc()
            .valueOf() - 1,
      };
    }
  } else {
    // 所选默认日期等于当前日期
    const returnObj = custom(new Date(defaultTimeTmp));
    return Object.assign(returnObj, { startTime: beginTime });
  }
}

export function defaultDateTime() {
  const [forMatStr, timeDate] = ['YYYY-MM-DD', getItem('timeDate').value || null];
  const { dataExList = [] } = timeDate || {};
  const { startTime, endTime } = checkoutNextDay();
  for (let i = endTime; i >= startTime; i -= 86400000) {
    const tempTime = moment(i).format(forMatStr);
    if (!dataExList.find(item => moment(item).format(forMatStr) === tempTime)) {
      return {
        startTime: moment(tempTime)
          .utc()
          .valueOf(),
        endTime:
          moment(tempTime)
            .utc()
            .valueOf() +
          86400000 -
          1,
      };
    }
  }
}
export function getExtraDate() {
  const [timeDate] = [getItem('timeDate').value || {}];
  const { dateRange = {} } = timeDate || {};
  /*   默认日期为当月的一号,无截止时间 */
  const {
    beginTime = moment(moment().format('YYYY-MM-01'))
      .utc()
      .valueOf(),
  } = dateRange;
  const dateTime = defaultDateTime() || {};
  return {
    minDate: beginTime,
    maxDate: dateTime.endTime,
  };
}

export function monthMean(now) {
  // 月均日期
  const weeHours = new Date(now.setHours(0, 0, 0, 0));
  const endTime = new Date(weeHours - 86400000).valueOf(); // 获取当天-1时间
  const weekNum = weeHours.getDay() === 0 ? 7 : now.getDay();
  const startTime = new Date(
    weeHours - (weekNum > 5 ? weekNum + 16 : weekNum + 23) * 86400000
  ).valueOf();
  return {
    startTime,
    endTime,
  };
}

export function isRequestRelative(params, dateType = null) {
  // 判断是否需要发送环比请求请求  params中需要传递startTime,endTime,dateType
  const startTime = params.startTime || null;
  const endTime = params.endTime || null;
  if (dateType) {
    const dateTime = relativeRatio(startTime, endTime, dateType);
    const newParams =
      dateTime.startTime !== null && dateTime.endTime !== null ? { ...params, ...dateTime } : null;
    return newParams;
  } else {
    console.warn('传入时间类型,1周均2月均3自定义');
  }
}

export function relativeRatio(start, end, dateType = null) {
  // 计算环比值,datatype值1:周均2:月均,3:自定义

  const TIME = new Date('2018/7/1 0:0:0').valueOf(); // 时间最早追溯到2017.12.29,时间戳
  const stime = Number(start);
  const etime = Number(end);
  let startTime = null;
  let endTime = null;

  if (dateType) {
    switch (Number(dateType)) {
      case 1:
        startTime = checkOutTime(stime, 7);
        endTime = checkOutTime(stime, 1) + 24 * 3600000 - 1;
        break;
      case 2:
        startTime = checkOutTime(stime, 28);
        endTime = checkOutTime(stime, 1) + 24 * 3600000 - 1;
        break;
      case 3:
        startTime = stime * 2 - etime >= TIME ? stime * 2 - etime - 1 : null; // 上一期的end时间少1ms造成本期多出1ms,应该减掉
        endTime = checkOutTime(stime, 1) + 24 * 3600000 - 1;
        break;
      default:
        break;
    }
  } else {
    console.warn('传入时间类型,1周均2月均3自定义');
  }
  function checkOutTime(timeTamp, days) {
    return timeTamp - days * 24 * 3600000 >= TIME ? timeTamp - days * 24 * 3600000 : null;
  }

  return { startTime, endTime };
}
