---
title: 验证码输入框
---

## 验证码输入框

移动端验证码输入框，支持自定义验证码位数。

## DEMO

```tsx
import React, { useState } from 'react';
import { CodeBox } from 'rc-codebox';

export default () => {
  const [code, setCode] = useState('');
  const [error, setError] = useState(false);

  const onChange = (e: string) => {
    if (e.length !== 6) {
      setError(false);
    }
    setCode(e);
  };

  const onSubmit = (e: string) => {
    if (e === '111111') {
      setError(e);
    }
  };

  return (
    <div>
      <h3>现在输入的code是：{code}</h3>
      <h4>输入 111111 会报错</h4>
      <CodeBox len={6} onChange={onChange} onSubmit={onSubmit} error={error}></CodeBox>
    </div>
  );
};
```

<API></API>
