import React from 'react';
import SidebarItem from './SidebarItem';

const Sidebar = () => {
  const items = [
    "ホーム", "プロフィール", "設定", "メッセージ", "通知", 
    "お気に入り", "アーカイブ", "分析", "マーケット", "ヘルプ",
    "設定", "フィードバック", "キャリア", "プライバシー", 
    "セキュリティ", "ログアウト"
  ];

  return (
    <aside className="w-64 min-h-screen bg-gray-800 text-white p-5">
      <ul>
        {items.map((item, index) => (
          <SidebarItem key={index} label={item} />
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;