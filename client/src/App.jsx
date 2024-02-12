import { useState } from 'react';

import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="bg-purple-700 text-white">
        <p>HEllo from the home page</p>
      </div>
    </>
  );
}

export default App;
