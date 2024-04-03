'use client'

import { useState } from 'react';

function App() {
  const [helloText, setHelloText] = useState('');

  const fetchGreeting = async (lang = 'en') => {
    // const apiUrl = `http://localhost:8080/api/hello?lang=${lang}`;
    const apiUrl = `${process.env.NEXT_PUBLIC_API_SERVER}/hello?lang=${lang}`;
    const response = await fetch(apiUrl, { mode: 'cors' });
    const text = await response.text();
    setHelloText(text);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {/* フォントサイズを小さく（text-3xlに変更）し、マージンボトムを縮小（mb-4に変更） */}
      <h1 className="mb-4 text-3xl font-bold text-gray-900">Hello App</h1>
      <div className="space-x-2">
        {/* ボタンのパディングを減らし（px-4 py-1に変更）、フォントサイズを小さく（text-smに変更） */}
        <button
          className="px-4 py-1 text-sm text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring"
          onClick={() => fetchGreeting('en')}
        >
          Say Hello in English
        </button>
        <button
          className="px-4 py-1 text-sm text-white bg-green-500 rounded hover:bg-green-600 focus:outline-none focus:ring"
          onClick={() => fetchGreeting('ja')}
        >
          日本語で挨拶
        </button>
      </div>
      {/* テキストサイズを小さく（text-mdに変更）し、余白を調整 */}
      <div className="mt-4 text-md text-gray-700">{helloText}</div>
    </div>
  );
}

export default App;
