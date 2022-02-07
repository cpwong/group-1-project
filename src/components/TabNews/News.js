import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import NewsCard from './NewsCard';

const News = () => {
    const [articles, setArticles] = useState([]);   // state sets the data in an Array.

    useEffect(() => {
        const getArticles = async () => {
            const res = await Axios.get('https://newsapi.org/v2/everything?q=aapl&apiKey=c1c56bdf71c14d1cabebd9a4f6610a9d');
            console.log(res);
            setArticles(res.data.articles);
        }
        getArticles();
    }, [])

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