import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Routes from './routes';
import GlobalStyle from './style/global';


const App: React.FC = () => {
  return (
    <>
      <BrowserRouter>

        <Routes />

      </BrowserRouter>
      <ToastContainer autoClose={1500} />
      <GlobalStyle />
    </>
  );
}

export default App;
