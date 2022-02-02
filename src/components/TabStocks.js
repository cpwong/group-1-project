import { useState, useEffect } from 'react'
import { API_Finance, API_Json } from './../api/API'
import ViewStock from './TabStocks/ViewStock'
import ViewChart from './TabStocks/ViewChart'
import ViewGauge from './TabStocks/ViewGauge'
import FormTickerSymbol from './TabStocks/FormTickerSymbol'

export default function TabStocks() {
  const blankForm = {
    symbol: 'AAPL',
  }
  const blankStock = {
    name: '', 
    bid: 0,
    ask: 0,
    change: 0,
    chgPct: 0,
    dayVol: 0,
    avgVol: 0,
    mktCap: 0,
    fwdPe: 0,
    pe: 0
  }
  const [stockData, setStockData] = useState({});           // Stores stock data from API
  const [chartData, setChartData] = useState([]);           // Stores stock historical price data from API
  const [formItem, setFormItem] = useState(blankForm);      // Query form input
  const [symbol, setSymbol] = useState('AAPL')                // Stock symbol to query
  const [isStockReady, setIsStockReady] = useState(false);  // Stock data is ready for viewing
  const [isChartReady, setIsChartReady] = useState(false);  // Chart data is ready for viewing
  const [isLiveData, setIsLiveData] = useState(false);      // true =  from API server, false = from JSON-server
  const [isSearchBox, setSearchBox] = useState(false);

  //-- DUMMY Fetch stock data from API
  /*
  const dummyGetStockData = () => {
    const d = dummyData
    setStockData({
      name: d.longName, 
      bid: d.bid,
      ask: d.ask,
      change: d.regularMarketChange,
      chgPct: d.regularMarketChangePercent,
      dayVol: d.regularMarketVolume,
      avgVol: d.averageDailyVolume3Month,
      mktCap: d.marketCap,
      fwdPe: d.forwardPE,
      pe: d.trailingPE,
  
    });  
  }
  */
  //-- Saves stock data into data.json file runnng on local JSON-server 
  const apiPutStockData = async (obj) => {
    console.log('apiPutStockData', obj);
    try {
      const response = await API_Json.put(`/stock-data/${obj.symbol}`, obj);
      console.log('API.put response:', response);
    } catch (err) {
      console.log(obj.symbol,'not found on local JSON-server. Adding new record...');
      try {
        const response = await API_Json.post(`/stock-data`, obj);
        console.log('API.put response:', response);  
      } catch (err) {
        console.log('API.put error:', err.message);
      }
    }  
  }
  //-- Fetch stock data from API
  const apiGetStockData = async (symbol) => {
    console.log('apiGetStockData from...');
    setIsStockReady(false)
    if (isLiveData) {
      const { status, data } = await API_Finance.get(`/qu/quote?symbol=${symbol}`);
      if (status === 200) {
        console.log('... from API_Finance:', data[0]);
        const d = data[0];
        const obj = {
          id: symbol,
          name: d.longName, 
          bid: d.bid,
          ask: d.ask,
          change: d.regularMarketChange,
          chgPct: d.regularMarketChangePercent,
          dayVol: d.regularMarketVolume,
          avgVol: d.averageDailyVolume3Month,
          mktCap: d.marketCap,
          fwdPe: d.forwardPE,
          pe: d.trailingPE,
          fiftyDMA: d.fiftyDayAverage,
          twoHunDMA: d.twoHundredDayAverage,
          yearHi: d.fiftyTwoWeekHigh,
          yearLo: d.fiftyTwoWeekLow    
        }
        setStockData(obj);
        setIsStockReady(true);
        apiPutStockData(obj);
      } else {
        console.log(`apiGetStockData ${symbol} API_Finance.get Error: ${status}`);
        return;
      }  
    } else {  // (isLiveData === false)
      const { status, data } = await API_Json.get(`/stock-data/${symbol}`);
      if (status === 200) {
        console.log('... JSON server', data);
        setStockData(data);
        setIsStockReady(true);
      } else {
        console.log(`apiGetStockData ${symbol} API_Finance.get Error: ${status}`);
      }  
    }
  }
  //-- Saves stock history into data.json file running on local JSON-server
  const apiPutChartData = async (obj) => {
    console.log('apiPutChartData', obj);
    try {
      const response = await API_Json.put(`/stock-history/${obj.symbol}`, obj);
      console.log('API.put response:', response);
    } catch (err) {
      console.log(obj.symbol, 'not found on local JSON-server. Adding new record...');
      try {
        const response = await API_Json.post(`/stock-history/`, obj);
        console.log('API.put response:', response);
      } catch (err) {
        console.log('API.put error:', err.message);
      }
    }
  }
  //-- Fetch stock history price data from API
  const apiGetChartData = async (symbol) => {
    console.log('apiGetChartData from ...');
    setIsChartReady(false);
    if (isLiveData) {
      const { status, data } = await API_Finance.get(`/hi/history?interval=1d&symbol=${symbol}`)
      console.log('history', data);
      if (status === 200) {
        console.log('apiGetChartData:', data.items);
        const temp = [];
        for (const id in data.items) {
          temp.push({...data.items[id], date: parseInt(id, 10)*1000});
        }
        const obj = {
          id: symbol,
          array: [...temp]
        }
        setChartData(obj);
        setIsChartReady(true);
        apiPutChartData(obj); 
      } else {
        console.log(`apiGetChartData ${symbol} API_Finance.get Error: ${status}`);
      }
    } else { // (isLiveData === false)
      const { status, data } = await API_Json.get(`/stock-history/${symbol}`);
      if (status === 200) {
        console.log('... JSON-server', data);
        const obj = {
          id: data.id,
          array: data.array
        }
        setChartData(obj);
        setIsChartReady(true);
      } else {
        console.log(`apiGetChartData ${symbol} API_Finance.get Error: ${status}`);  
      }
    }
  }

  //-- Handler for submit button
  const handleSubmit = async e => {
    e.preventDefault();
    console.log('handlerSubmit:');
    setSymbol(formItem.symbol);
    setSearchBox(false);
    // setFormItem(blankForm);
  }
  //-- Handler for input field boxes
  
  const handleInput = e => {
    const { name, value } = e.target;
    const newItem = {...formItem, [name]: value.toUpperCase()}
    setFormItem(newItem)
    console.log('handleInput:', newItem);
  }
  //-- Handler for search modal window
  const handleOpenSearch = e => {
    console.log('handleOpenSearch');
    setSearchBox(true);
  }  
  const handleCloseSearch = e => {
    console.log('handleCloseSearch');
    setSearchBox(false);
  }  
  //-- Handler for checkbox (live data)
  const handleCheckBox = e => {
    console.log('handleCheckBox->isLiveData');
    setIsLiveData(!isLiveData);
  }
  //-- Handler for cancel button
  const handleCancel = e => {
    console.log('handleCancel');
    setFormItem(blankForm);
  }

  //-- Load stock data when component is mounted
  useEffect( () => {
    console.log('App.useEffect')
    if (symbol) {
      apiGetStockData(symbol);
      apiGetChartData(symbol);
    }
  }, [symbol])
  
  return (
    <div className='TabStocks box'>
      {/*---- User input form ----*/ }
      <div className='columns is-vcentered'>
      { /*-- Input text box with Submit button -- */ }
        <div className='column is-3'>
          <form className='field has-addons' onSubmit={handleSubmit}>
            <div className='control'>
              <input
                className='input'
                type='text'
                name='symbol'
                placeholder='Ticker SYMBOL'
                value={formItem.symbol}
                onChange={handleInput}
              />
            </div>
            <div className='control'>
              <button type='submit' className='button is-info'>
                Submit
              </button>
            </div>
          </form>
        </div>
        { /*--- Input with Submit button ----*/ }
        <div className='column is-2'>
          <button className='button is-primary' onClick={handleOpenSearch}>
            Search
          </button>
        </div>
        <div className='column is-2'>
          <label className='checkbox'>
            <input type='checkbox' checked={isLiveData} onChange={handleCheckBox}/>
              {' Live Data'}
          </label>
        </div>
        <div className='column'>
          <p className='is-size-4 has-text-right has-text-weight-light'>STOCK ANALYSIS</p>
        </div>
      </div>
      {/*-- Search box window (modal) for stock symbol --*/}
      <div className={`modal ${isSearchBox ? 'is-active' : ''}`}>
        <div className='modal-background'></div>
        <div className='modal-content'>
          <div className='box'>
            <p>Start typing in the search box below...</p>
            <form className='field has-addons' onSubmit={handleSubmit}>
              <div className='control'>
                <FormTickerSymbol onChange={ (stock) => 
                  setFormItem({symbol: stock.symbol}) } />
              </div>
              <div className='control'>
                <button className='button is-primary'>
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
        <button className='modal-close is-large' aria-label='close' 
          onClick={handleCloseSearch}/>
      </div>
      { /*-- Stock data --*/ }
      { isStockReady && <ViewStock data={stockData} /> } 
      { /*-- Stock chart --*/
        isStockReady && 
        <>
          <span className='heading has-text-centered'>Relative 52-week High/Low Range</span>
          <div className='columns multi-line'>
            <div className='column'><ViewGauge 
              value={stockData.bid} 
              high={stockData.yearHi} 
              low={stockData.yearLo} />
              <p className='heading has-text-centered'>Last Price</p>
            </div>
            <div className='column'><ViewGauge 
              value={stockData.fiftyDMA} 
              high={stockData.yearHi} 
              low={stockData.yearLo} />
              <p className='heading has-text-centered'>50-day Moving Avg</p>
            </div>
            <div className='column'><ViewGauge 
              value={stockData.twoHunDMA} 
              high={stockData.yearHi} 
              low={stockData.yearLo} />
              <p className='heading has-text-centered'>200-day Moving Avg</p>
            </div>
          </div>
        </>
      }      
      { isChartReady && <ViewChart data={chartData} />}
      {/*-- Progress Bar --*/}
      { (!isChartReady || !isStockReady) &&
        <>
          <div className='columns is-vcentered'>
            <div className='column has-text-right'>
              <p>Fetching stock data in progress:</p>
            </div>
            <div className='column'>
              <progress className="progress is-info" max="100" />
            </div>
          </div>
        </>
      }

    </div>
  );
}

