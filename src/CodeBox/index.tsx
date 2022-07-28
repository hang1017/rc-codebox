/* eslint-disable indent */
/* eslint-disable no-unused-expressions */
/**
 * @file: 验证码输入框
 * @author: huxiaoshuai
 * @Date: 2021-12-20 17:46:36
 * @LastEditors: huxiaoshuai
 * @LastEditTime: 2022-01-12 19:51:57
 */

import React, { useRef, useEffect, useState } from 'react';
// @ts-ignore
import classnames from 'classnames';
import styles from './index.less';

interface CodeBoxProps {
  /**
   * @description 验证码的位数
   * @default 6
   */
  len?: number;
  /**
   * @description 验证码改变时的callback
   */
  onChange?: (code: string) => void;

  /**
   * @description 自定义类名
   *
   */
  className?: string;

  /**
   * @description 是否自动获取焦点
   * @default true
   */
  autoFocus?: boolean;
  /**
   * @description 当用户输入完整时会调用此方法
   */
  onSubmit?: (code: string) => void;
  /**
   * @description 错误标识
   * @default false
   */
  error?: boolean;
}

export function CodeBox(props: CodeBoxProps) {
  const { len = 6, onChange, className = '', autoFocus = true, onSubmit, error = false } = props;

  // 输入框数组
  const [inputArr, setInputArr] = useState<string[]>(new Array(len).fill(''));

  // 输入框ref
  const inputRefs = useRef<any>([]);

  /**
   * @method getRef
   * @description 获取input的ref
   */
  const getRef = (dom: any) => {
    if (inputRefs?.current?.length === len) {
      return;
    }
    inputRefs.current.push(dom);
  };

  /**
   * @method onInputKeyDown
   * @method 处理input的删除事件
   * @param e 事件
   * @param index number input输入框对应的索引
   */
  const onInputKeyDown = (e: any, index: number) => {
    switch (e.key) {
      case 'Backspace':
        if (index > 0 && !e.target.value) {
          const currentInputRef = inputRefs.current[index];
          currentInputRef.value = '';
          const prevInputRef = inputRefs.current[index - 1];
          prevInputRef.focus();
          // prevInputRef.select();
          e.preventDefault();
        }
        break;
      default:
        break;
    }
  };

  /**
   * @method onInputValueChange
   * @description 当输入的验证码发生变化时
   * @param index number input输入框对应的索引
   */
  const onInputValueChange = (index: number, e: any) => {
    let code = '';
    const inp: string[] = [];
    inputRefs.current?.forEach((ref: any) => {
      if (ref?.value) {
        code += ref?.value;
      } else {
        code += '';
      }
      inp.push(ref?.value || '');
    });
    setInputArr(inp);

    // 判断是删除操作
    if (index > 0 && !e.target.value) {
      const prevInputRef = inputRefs.current[index - 1];
      prevInputRef.focus();
    }

    // 判断是写入操作
    if (index < len - 1 && e.target.value) {
      const nextInputRef = inputRefs.current[index + 1];
      nextInputRef.focus();
    }
    if (onSubmit && code.length === len) onSubmit(code);
    onChange && onChange(code);
  };

  useEffect(() => {
    if (autoFocus) {
      inputRefs?.current[0].focus();
    }
  }, [autoFocus]);

  return (
    <div
      className={classnames(className, {
        [styles.codeBox]: true,
      })}
    >
      {(inputArr || []).map((v, index) => {
        return (
          <input
            ref={getRef}
            maxLength={1}
            className={classnames({
              [styles.codeBoxInput]: true,
              [styles.hasString]: v && !error,
              [styles.hasError]: error,
            })}
            key={index}
            type="text"
            onFocus={() => {
              inputRefs.current[index].select();
            }}
            onKeyDown={(e: any) => {
              onInputKeyDown(e, index);
            }}
            onChange={(e) => {
              onInputValueChange(index, e);
            }}
          />
        );
      })}
    </div>
  );
}

export default CodeBox;
