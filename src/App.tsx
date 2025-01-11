// src/App.tsx
import React from 'react';
import AppRouter from './routers/AppRouter';  // Import the router

const App: React.FC = () => {
  return (
    <div className="App">
      <AppRouter />  {/* This will render the correct component based on the current URL */}
    </div>
  );
};

export default App;
