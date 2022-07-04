import './App.css';
import React from 'react'
import { Fragment } from 'react';

function App() {
  return (
    <Fragment>
      <header className='App'>It works!</header>
      <footer className='footer'>
        <div className='footer__author'>
          <a href='https://github.com/evelin-mart' target='_blank'>
            © 2022 evelin-mart
          </a>
        </div>
        <div className='footer__school'>
          <a href='https://rs.school/js/' target='_blank'></a>
        </div>
      </footer>
    </Fragment>
  );
}

export default App;
