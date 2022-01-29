import { useState, useEffect } from 'react'
import { API_Finance } from './../api/API'
import ViewStock from './TabStocks/ViewStock'
import ViewChart from './TabStocks/ViewChart'

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
  const [stockData, setStockData] = useState(blankStock);   // Stores stock data from API
  const [chartData, setChartData] = useState([]);           // Stores stock historical price data from API
  const [formItem, setFormItem] = useState(blankForm);      // Query form input
  const [symbol, setSymbol] = useState(null)                // Stock symbol to query
  const [isStockReady, setIsStockReady] = useState(false);
  const [isChartReady, setIsChartReady] = useState(false);

  //-- DUMMY Fetch stock data from API
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
      pe: d.trailingPE
    });  
  }
  //-- Fetch stock data from API
  const apiGetStockData = async (symbol) => {
    const { status, data } = await API_Finance.get(`/qu/quote?symbol=${symbol}`);
    console.log('data', data);
    setIsStockReady(false)
    if (status === 200) {
      console.log('apiGetStockData:', data[0]);
      const d = data[0];
      const temp = {
        name: d.longName, 
        bid: d.bid,
        ask: d.ask,
        change: d.regularMarketChange,
        chgPct: d.regularMarketChangePercent,
        dayVol: d.regularMarketVolume,
        avgVol: d.averageDailyVolume3Month,
        mktCap: d.marketCap,
        fwdPe: d.forwardPE,
        pe: d.trailingPE
        }
      setStockData(temp);
      setIsStockReady(true)
    } else {
      console.log(`apiGetStockData ${symbol} API_Finance.get Error: ${status}`);
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
        // array.push(data.items[id]);
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
    <div className='TabStocks block'>
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
      { isChartReady && <ViewChart data={chartData} symbol={symbol} />}
    </div>
  );
}

