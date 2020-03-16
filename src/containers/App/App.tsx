import React from 'react';
import { BrowserRouter } from 'react-router-dom';
/** Components */
import { Routes } from 'routes/Routes';
/** Styles */
import './App.scss';

const App = () => {
  return (
    <BrowserRouter basename="/">
      <Routes />
    </BrowserRouter>
  );
};

export default App;
