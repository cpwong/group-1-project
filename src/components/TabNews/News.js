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
            const res = await Axios.get(`https://newsapi.org/v2/everything?q=${query}&apiKey=053939cd07fe42f5bc8c0341160539bf`);
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
    function handleSearchBox(event) {
      console.log(event.target.value);
      setQuery(event.target.value);
  }
    

    return (
      <div>
        <div className='columns'>
          <div className='column'>
            <form className='field has-addons' onSubmit={handleSearchBox}>            
              <div className='control'>
                <input 
                  onChange={handleSearchBox} 
                  value={query}
                  className='input' 
                  type='text' 
                  placeholder='Search news e.g. tsla' />
              </div>
              <div className='control'>
                <button type='submit' className='button is-info'>
                  Search News
                </button>
              </div>
            </form>
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