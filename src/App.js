import './App.css';
import { uniqueId } from 'lodash';
import { useState, useEffect } from 'react'
import TabStocks from './components/TabStocks'
import TabCrypto from './components/TabCrypto'
import TabCovid from './components/TabCovid'
import TabNews from './components/TabNews'

import Home from './components/Home'

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [tabList, setTabList] = useState([]);
   
  useEffect( () => {
    console.log('App.useEffect[activeTab]', activeTab);
  }, [activeTab])

  const showTab = () => {
    switch (activeTab) {
      case 'home':
        return <Home />
      case 'stocks':
        return <TabStocks />    // CP
      case 'crypto':
        return <TabCrypto />    // Leslie, Mani, Charles
      case 'covid':
        return <TabCovid />     // Keith
      case 'news':
        return <TabNews />      // Liew, Leslie
      default:
        return 'home';
    }  
  }
  return (
    <section className='App section content'>
      <h1 className='title is-1 has-text-centered'>Project Name</h1>
      <div className='tabs is-toggle is-centered'>
        <ul>
          <li>
            <a className='navbar-item' onClick={() => setActiveTab('home')}>🏠Home</a>
          </li>
          <li>
            <a className='navbar-item' onClick={() => setActiveTab('stocks')}>📈Stocks</a>
          </li>
          <li>
            <a className='navbar-item' onClick={() => setActiveTab('crypto')}>💰Cryptocurrencies</a>
          </li>
          <li>
            <a className='navbar-item' onClick={() => setActiveTab('covid')}>🦠COVID-19</a>
          </li>
          <li>
            <a className='navbar-item' onClick={() => setActiveTab('news')}>📰News</a>
          </li>
        </ul>
      </div>
      <div className='container'>{showTab()}</div>
    </section>
  );
}

export default App;
