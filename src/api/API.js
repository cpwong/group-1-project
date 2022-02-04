import axios from 'axios'

export const API_Json = axios.create({
  baseURL:'http://localhost:3300'
});

/*
  Create a .env.local file with the content:
  
  REACT_APP_API_KEY=<your_own_api_key>

  WARNING: 
  - NOT RECOMMENDED for use in production code
  - API key will still be visible in compiled code
  - DO NOT check the .env.local file into Github repository

*/

export const API_YahooFinance = axios.create({
  baseURL:'https://yfapi.net',
  headers: {
    'x-api-key': process.env.REACT_APP_API_KEY_YAHOO
  }    
})

export const API_MboumFinance = axios.create({
  baseURL:'https://mboum-finance.p.rapidapi.com',
  headers: {
    'x-rapidapi-host': 'mboum-finance.p.rapidapi.com',
    'x-rapidapi-key': process.env.REACT_APP_API_KEY_MBOUM
  }    
})
