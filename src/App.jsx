import { BrowserRouter } from 'react-router-dom';
import SwitchScreen from './router';
import { ContextProvider } from './store/context/store';
import React from 'react';

function App() {
  return (
    <ContextProvider>
      <BrowserRouter>
        <SwitchScreen />
      </BrowserRouter>
    </ContextProvider>
  );
}

export default App;
