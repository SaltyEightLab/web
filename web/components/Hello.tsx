'use client'

import { useState } from 'react';

function App() {
  const [helloText, setHelloText] = useState('');

  const fetchGreeting = async () => {
    const apiUrl = `${process.env.NEXT_PUBLIC_API_SERVER}:8080/hello`;
    const response = await fetch(apiUrl, { mode: 'cors' });
    const text = await response.text();
    setHelloText(text);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="mb-4 text-3xl font-bold text-gray-900">Hello App</h1>
      <button
        className="px-4 py-1 text-sm text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring"
        onClick={fetchGreeting}
      >
        Say Hello
      </button>
      <div className="mt-4 text-md text-gray-700">{helloText}</div>
    </div>
  );
}

export default App;
