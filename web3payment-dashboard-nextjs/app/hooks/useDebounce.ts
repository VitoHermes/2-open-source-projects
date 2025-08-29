import { debounce, DebouncedFunc } from 'lodash';
import { useEffect, useMemo, useRef } from 'react';

interface DebounceOptions {
  leading?: boolean;
  trailing?: boolean;
  maxWait?: number;
}

export function useDebounce<T extends (...args: any[]) => any>(
  fn: T,
  delay: number,
  options?: DebounceOptions
): DebouncedFunc<T> {
  // 使用 useRef 保存防抖函数，避免重复创建
  const debouncedFnRef = useRef<DebouncedFunc<T> | null>(null);

  // 创建防抖函数
  const debouncedFn = useMemo(() => {
    // 清理之前的防抖函数
    if (debouncedFnRef.current) {
      debouncedFnRef.current.cancel();
    }

    // 创建新的防抖函数
    const newDebouncedFn = debounce(fn, delay, options);
    debouncedFnRef.current = newDebouncedFn;

    return newDebouncedFn;
  }, [fn, delay, options]);

  // 组件卸载时清理防抖函数
  useEffect(() => {
    return () => {
      if (debouncedFnRef.current) {
        debouncedFnRef.current.cancel();
      }
    };
  }, []);

  return debouncedFn;
}
