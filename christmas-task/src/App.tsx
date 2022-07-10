import './styles/index.scss';
import React from 'react';
import { Fragment } from 'react';
import Filters from './components/Filters';
import Cart from './components/Cart';

function App() {
  return (
    <Fragment>
      <header>
        <div className='container'>
          <div className='header'>
            <a href='#' className='header___logo'>
              <img src={'./assets/holiday_icon.png'} alt='logo' className='logo' />
              <h1>x-mas store</h1>
            </a>
            <Cart />
          </div>
        </div>
      </header>
      <main>
        <div className='container'>
          <div className='main'>
            <Filters />
          </div>
        </div>
      </main>
      <footer>
        <div className='container'>
          <div className='footer'>
            <div className='footer__author'>
              <a href='https://github.com/evelin-mart' target='_blank'>
                2022 evelin-mart
              </a>
            </div>
            <div className='footer__school'>
              <a href='https://rs.school/js/' target='_blank'></a>
            </div>
          </div>
        </div>
      </footer>
    </Fragment>
  );
}

export default App;
