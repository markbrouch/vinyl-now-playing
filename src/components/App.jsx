import React from 'react';

const handleDetectSong = () => {
  console.log('detecting...');
};

const App = () => (
  <div>
    <h1>Vinyl Now Playing</h1>
    <button onClick={handleDetectSong}>Detect Song</button>
  </div>
);

export default App;
