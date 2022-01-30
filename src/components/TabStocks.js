import { useState, useEffect } from 'react'
import { API_Finance, API_Json } from './../api/API'
import ViewStock from './TabStocks/ViewStock'
import ViewChart from './TabStocks/ViewChart'
import ViewGauge from './TabStocks/ViewGauge'

const dummyData = {
  ask: 161.68,
  averageDailyVolume3Month: 97589887,
  bid: 160.12,
  bookValue: 3.841,
  dividendDate: {
    date: '2021-11-11 00:00:00.000000', 
    timezone_type: 1, 
    timezone: '+00:00'},
  earningsTimestamp: {
    date: '2022-01-27 21:00:00.000000', 
    timezone_type: 1, 
    timezone: '+00:00'},
  epsForward: 6.19,
  epsTrailingTwelveMonths: 5.61,
  fiftyDayAverage: 169.0138,
  fiftyDayAverageChange: -9.3237915,
  fiftyDayAverageChangePercent: -0.05516586,
  fiftyTwoWeekHigh: 182.94,
  fiftyTwoWeekHighChange: -23.25,
  fiftyTwoWeekHighChangePercent: -0.12709084,
  fiftyTwoWeekLow: 116.21,
  fiftyTwoWeekLowChange: 43.480003,
  fiftyTwoWeekLowChangePercent: 0.37415028,
  forwardPE: 25.798061,
  longName: "Apple Inc.",
  marketCap: 2608440279040,
  priceToBook: 41.57511,
  regularMarketChange: -0.08999634,
  regularMarketChangePercent: -0.05632516,
  regularMarketDayHigh: 164.3894,
  regularMarketDayLow: 157.82,
  regularMarketOpen: 163.5,
  regularMarketPreviousClose: 159.78,
  regularMarketPrice: 159.69,
  regularMarketVolume: 108275308,
  sharesOutstanding: 16334399488,
  symbol: "AAPL",
  trailingAnnualDividendRate: 0.85,
  trailingAnnualDividendYield: 0.005319815,
  trailingPE: 28.46524,
  twoHundredDayAverage: 147.8017,
  twoHundredDayAverageChange: 11.888306,
  twoHundredDayAverageChangePercent: 0.080434166
}

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
  const [symbol, setSymbol] = useState(null)                // Stock symbol to query
  const [isStockReady, setIsStockReady] = useState(false);  // Stock data is ready for viewing
  const [isChartReady, setIsChartReady] = useState(false);  // Chart data is ready for viewing
  const [isLiveData, setIsLiveData] = useState(false);      // true =  from API server, false = from JSON-server

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
        setIsStockReady(true)
        apiPutStockData(obj);
      } else {
        console.log(`apiGetStockData ${symbol} API_Finance.get Error: ${status}`);
        return;
      }  
    } else {  // (isLiveData === false)
      const { status, data } = await API_Json.get(`/stock-data/${symbol}`);
      if (status === 200) {
        console.log('... from JSON server', data);
        setStockData(data);
        setIsStockReady(true)
      } else {
        console.log(`apiGetStockData ${symbol} API_Finance.get Error: ${status}`);
      }  
    }
  }
  //-- Fetch stock history price data from API
  const apiGetStockHistory = async (symbol) => {
    const { status, data } = await API_Finance.get(`/hi/history?interval=1d&symbol=${symbol}`)
    setIsChartReady(false);
    console.log('history', data);
    if (status === 200) {
      console.log('apiGetStockHistory:', data.items);
      const array = [];
      for (const id in data.items) {
        array.push({...data.items[id], date: parseInt(id, 10)*1000});
      }
      console.log('setChartData', array);
      setChartData(array); 
      setIsChartReady(true); 
    } else {
      console.log(`apiGetStockData ${symbol} API_Finance.get Error: ${status}`);
    }
  }

  //-- Handler for submit button
  const handleSubmit = async () => {
    console.log('handlerSubmit:');
    setSymbol(formItem.symbol);
    setFormItem(blankForm);
  }
  //-- Handler for input field boxes
  const handleInput = e => {
    const { name, value } = e.target;
    const newItem = {...formItem, [name]: value.toUpperCase()}
    setFormItem(newItem)
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
      // dummyGetStockData();
      apiGetStockData(symbol);
      apiGetStockHistory(symbol);
    }
  }, [symbol])
  
  return (
    <div className='TabStocks box'>
      <div className='columns'>
        <div className='column'>
        <div className='field has-addons'>
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
            <button className='button is-primary' onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </div>
        </div>
        <div className='column'>
          <h2 className='heading has-text-right has-text-weight-light'>Stock Analysis</h2>
        </div>
      </div>
      { isStockReady && <ViewStock data={stockData} /> }
      { 
        isStockReady && 
        <>
          <span className='heading has-text-centered'>Relative 52-week High/Low Range</span>
          <div className='columns multi-line'>
            <div className='column'><ViewGauge 
              id='bid'
              value={stockData.bid} 
              high={stockData.yearHi} 
              low={stockData.yearLo} />
              <p className='heading has-text-centered'>Last Price</p>
            </div>
            <div className='column'><ViewGauge 
              id='fiftyDMA'
              value={stockData.fiftyDMA} 
              high={stockData.yearHi} 
              low={stockData.yearLo} />
              <p className='heading has-text-centered'>50-day Moving Avg</p>
            </div>
            <div className='column'><ViewGauge 
              id='TwoHunDMA'
              value={stockData.twoHunDMA} 
              high={stockData.yearHi} 
              low={stockData.yearLo} />
              <p className='heading has-text-centered'>200-day Moving Avg</p>
            </div>
          </div>
        </>
      }      
      { isChartReady && <ViewChart data={chartData} symbol={symbol} />}
    </div>
  );
}

