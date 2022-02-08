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

export const API_covidstat = axios.create({
    baseURL: 'https://covid-193.p.rapidapi.com',
    headers: {
        'x-rapidapi-host': 'covid-193.p.rapidapi.com',
        'x-rapidapi-key': process.env.REACT_APP_API_KEY_COVID
    }
})

export const API_covidVaxed = axios.create({
    baseURL: 'https://covid-19-world-vaccination-data.p.rapidapi.com',
    headers: {
        'x-rapidapi-host': 'covid-19-world-vaccination-data.p.rapidapi.com',
        'x-rapidapi-key': process.env.REACT_APP_API_KEY_COVID,
        'useQueryString' : true
    }
})
// Just another potential API for news from Rapid API.
// export const API_FreeNews = axios.create({
//   baseURL: 'https://free-news.p.rapidapi.com',
//   headers: {
//     'x-rapidapi-host': 'free-news.p.rapidapi.com',
//     'x-rapidapi-key': process.env.REACT_APP_API_KEY_FREENEWS
//   }
// })

export const API_NewsApi = axios.create({
  baseURL: 'https://newsapi.org/v2/everything',
  headers: {
    'x-api-key': process.env.REACT_APP_API_KEY_NEWSAPI
  }
})
