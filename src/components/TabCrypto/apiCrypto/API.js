import axios from "axios";

export const API_CryptConv = axios.create({
  baseURL: "https://alpha-vantage.p.rapidapi.com",
  headers: {
    "x-rapidapi-host": "alpha-vantage.p.rapidapi.com",
    "x-rapidapi-key": process.env.REACT_APP_API_CRYPTO_KEY,
  },
});

export const API_CryptNews = axios.create({
  baseURL: "https://crypto-news-live3.p.rapidapi.com",
  headers: {
    "x-rapidapi-host": "crypto-news-live3.p.rapidapi.com",
    "x-rapidapi-key": process.env.REACT_APP_API_CRYPTO_KEY,
  },
});


