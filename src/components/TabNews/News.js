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

    // Handler for Submit button
    const handleSubmit = async e => {
        e.preventDefault();
        console.log('handleSubmit:');
        setQuery()
    }

    // Handler for Input Search Box.
    

    return (
      <div>
        <div className='columns'>
          <div className='column'>
            <input clssName='input' type='text' placeholder='tsla' />
              <button>Search News</button>
          </div>
          <div className='column'>
            <p className='is-size-4 has-text-right has-text-weight-light'>
              INVESTMENT AND TRADING NEWS
            </p>
          </div>
        </div>

        {articles.map((props) => {
          return (
            <NewsCard
              key={props.id}
              title={props.title}
              description={props.description}
              url={props.url}
              urlToImage={props.urlToImage}
              author={props.author}
              publishedAt={props.publishedAt}
            />
          );
        })}
      </div>
    );
}

export default News;