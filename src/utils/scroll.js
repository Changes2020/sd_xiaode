/*
*此方法用于页面垂直滚动到指定位置
* @param { Number } currentY 当前位置
* @param { Number } targetY 目标位置
 */
export function scroll(currentY, targetY) {
  // 计算需要移动的距离
  const needScrollTop = targetY - currentY;
  const stepNum = 35;
  let _currentY = currentY;
  const time = setTimeout(() => {
    // 一次调用滑动帧数，每次调用会不一样
    _currentY += Math.ceil(needScrollTop / stepNum);

    window.scrollTo(_currentY, currentY);
    // 如果移动幅度小于十个像素，直接移动，否则递归调用，实现动画效果
    if (needScrollTop > stepNum || needScrollTop < -stepNum) {
      scroll(_currentY, targetY);
    } else {
      window.scrollTo(_currentY, targetY);
      clearTimeout(time);
    }
  }, 1);
}
