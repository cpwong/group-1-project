import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import NewsCard from './NewsCard';
import { API_NewsApi, API_Json } from '../../api/API';

// const { REACT_APP_API_KEY } = process.env.local.REACT_APP_API_KEY_NEWSAPI;

const News = () => {
    const [articles, setArticles] = useState([]);   // state sets the data in an Array.
    const [query, setQuery] = useState('tsla');

    useEffect(() => {
        const getArticles = async () => {
            const res = await Axios.get(`https://newsapi.org/v2/everything?q=${query}&apiKey=c1c56bdf71c14d1cabebd9a4f6610a9d`);
            console.log(res);
            setArticles(res.data.articles);
        }
        getArticles();
    }, [query])

    return (
        <div>
           {articles.map(props => {
               return (
                <NewsCard 
                    title = {props.title}
                    description = {props.description}
                    url = {props.url}
                    urlToImage = {props.urlToImage}
                />
               )
           })}
        </div>
    );
}

export default News;