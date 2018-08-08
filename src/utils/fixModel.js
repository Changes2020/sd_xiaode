function closest(el, selector) {
  const matchesSelector =
    el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
  let e = el;
  while (e) {
    if (matchesSelector.call(e, selector)) {
      return e;
    }
    e = e.parentElement;
  }
  return null;
}

/**
 * 修复antd-mobile Modal组件touch事件穿透
 * 在组件解挂的时候对事件进行remove,提供一个参数removeEvent
 * 需要滚动的地方请加class: 'scroller'
 */
let data = {
  scroller: null,
  posY: 0,
  scrollY: 0,
  maxscroll: 0,
};
function onTouchStart(e) {
  const scroller = closest(e.target, '.scroller');
  if (!scroller) return;
  data.scroller = scroller;
  // 垂直位置标记
  data.posY = e.touches[0].pageY;
  data.scrollY = scroller.scrollTop;
  // 是否可以滚动
  data.maxscroll = scroller.scrollHeight - scroller.clientHeight;
}
function onTouchmove(e) {
  if (!data.scroller) {
    return e.preventDefault();
  }

  const { scrollTop } = data.scroller;
  const distanceY = e.touches[0].pageY - data.posY;

  // 上下边缘检测
  if (distanceY > 0 && scrollTop === 0) {
    // 往上滑，并且到头
    // 禁止滚动的默认行为
    return e.preventDefault();
  }

  // 下边缘检测
  if (distanceY < 0 && scrollTop + 1 >= data.maxscroll) {
    // 往下滑，并且到头
    // 禁止滚动的默认行为
    return e.preventDefault();
  }
}
function onTouchend() {
  data.scroller = null;
  data.maxscroll = 0;
}
export function fixModal(removeEvent = false) {
  data = {
    scroller: null,
    posY: 0,
    scrollY: 0,
    maxscroll: 0,
  };

  const event = removeEvent ? 'removeEventListener' : 'addEventListener';
  document.body.style.overflow = removeEvent ? 'auto' : 'hiden';
  document.body[event]('touchstart', onTouchStart, { passive: false });
  document.body[event]('touchmove', onTouchmove, { passive: false });
  document.body[event]('touchend', onTouchend, { passive: false });
}
