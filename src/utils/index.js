import { useRef, useCallback, useEffect } from "react";

/**
 * 防抖函数
 * @param {*} func 函数
 * @param {*} wait 等待时间
 * @param {*} immediate 是否立即执行
 * @return
 */
export const useDebounceFn = (func, wait, immediate) => {
  //  参考网址：https://www.jianshu.com/p/1ca0fa40e58b
  const timeout = useRef();
  /* 函数组件的this其实没啥多大的意义，这里我们就把this指向func好了 */
  const fnRef = useRef(func);
  /*  useDebounceFn 重新触发 func 可能会改变，这里做下更新 */
  useEffect(() => {
    fnRef.current = func;
  }, [func]);
  /*
      timeout.current做了缓存，永远是最新的值
      cancel 虽然看着没有依赖项了
      其实它的隐形依赖项是timeout.current
  */
  const cancel = useCallback(function () {
    timeout.current && clearTimeout(timeout.current);
  }, []);

  /* 相关函数 func 可能会返回值，这里也要缓存 */
  const resultRef = useRef();
  function resDebounced(...args) {
    //args就是事件对象event

    // 一直触发一直清除上一个打开的延时器
    cancel();

    if (immediate) {
      // 第一次触发，timeout===undefined恰好可以利用timeout的值
      const callNow = !timeout.current;
      timeout.current = setTimeout(function () {
        timeout.current = null;
      }, wait);
      /* this指向func好了 */
      if (callNow) resultRef.current = fnRef.current.apply(fnRef.current, args);

    } else {
      // 停止触发，只有最后一个延时器被保留
      timeout.current = setTimeout(function () {
        timeout.current = null;
        // func绑定this和事件对象event，还差一个函数返回值
        resultRef.current = fnRef.current.apply(fnRef.current, args);
      }, wait);
    }
    return resultRef.current;
  }
  resDebounced.cancal = function () {
    cancel();
    timeout.current = null;
  };

  /* resDebounced 被 useCallback 缓存 */
  return useCallback(resDebounced, [wait, cancel, immediate]);
}

/**
 * 节流函数
 * @param {*} fn 函数
 * @param {*} delay 等待时间
 * @param {*} dep
 * @return
 */
export const useThrottle = (fn, delay, dep = []) => {
  const { current } = useRef({ fn, timer: null })
  useEffect(
    function () {
      current.fn = fn
    },
    [fn]
  )

  return useCallback(function f(...args) {
    if (!current.timer) {
      current.timer = setTimeout(() => {
        delete current.timer
      }, delay)
      current.fn.call(this, ...args)
    }
  }, dep)
}