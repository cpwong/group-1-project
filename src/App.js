import './App.css';
import { useState, useEffect } from 'react'
import TabCalculator from './components/TabCalculator'
import TabMovies from './components/TabMovies/TabMovies'
import TabStocks from './components/TabStocks'
import TabCrypto from './components/TabCrypto'
import TabCovid from './components/TabCovid'
import TabNews from './components/TabNews'
import Home from './components/Home'

function App() {
  const [activeTab, setActiveTab] = useState('home');
   
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
      case 'movies':
        return <TabMovies />    // Mani
      case 'calculator':
        return <TabCalculator />  // Charles  
      default:
        return 'home';
    }  
  }
  return (
    <section className='App section content'>
      <p className='title is-2 has-text-centered'>Project Name</p>
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
          <li>
            <a className='navbar-item' onClick={() => setActiveTab('movies')}>🎬Movies</a>
          </li>
          <li>
            <a className='navbar-item' onClick={() => setActiveTab('calculator')}>➗Calc</a>
          </li>
        </ul>
      </div>
      <div className='container'>{showTab()}</div>
    </section>
  );
}

export default App;
