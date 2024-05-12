'use client'

import React, { useContext } from 'react';
import { LayoutContext } from '../app/page';

const LayoutValuesDisplay = () => {
  const layout = useContext(LayoutContext);

  return (
    <div>
      <h1>現在のレイアウト設定</h1>
      <p>行数: {layout ? layout.rows : '未設定'}</p>
      <p>列数: {layout ? layout.columns : '未設定'}</p>
    </div>
  );
}

export default LayoutValuesDisplay;