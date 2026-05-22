import React from 'react';
import { createRoot } from 'react-dom/client';

function App() {
  return <div style={{fontFamily:'sans-serif',padding:24}}>Chakavak Web Frontend Ready</div>;
}

createRoot(document.getElementById('root')!).render(<App />);
