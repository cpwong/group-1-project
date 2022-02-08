import React, { useState, useEffect } from 'react';
// import Axios from 'axios';
import NewsCard from './NewsCard';
import { API_NewsApi } from '../../api/API';
import { uniqueId } from 'lodash';

// const { REACT_APP_API_KEY } = process.env.local.REACT_APP_API_KEY_NEWSAPI;

const News = () => {
    const [articles, setArticles] = useState([]);   // state sets the data in an Array.
    const [query, setQuery] = useState('Tesla');    // Query string for API
    const [input, setInput] = useState('Tesla');    // Form input string

    useEffect(() => {
        const getArticles = async () => {
            // const res = await Axios.get(`https://newsapi.org/v2/everything?q=${query}&apiKey=c1c56bdf71c14d1cabebd9a4f6610a9d`);
            const res = await API_NewsApi.get(`https://newsapi.org/v2/everything?q=${query}`);
            console.log(res);
            setArticles(res.data.articles);
        }
        getArticles();
    }, [query])

    // Handler for Submit button
    const handleSubmit = async e => {
        e.preventDefault();
        console.log('handleSubmit:', input);
        setQuery(input);
    }

    // Handler for Input Search Box.
    const handleInput = async e => {
      const string = e.target.value;
      console.log('handleInput', string);
      setInput(string);
    }
    
    return (
      <div>
        <div className='columns'>
          <div className='column'>
            <form className='field has-addons' onSubmit={handleSubmit}>            
              <div className='control'>
                <input 
                  value={query}
                  className='input' 
                  type='text'
                  value={input} 
                  placeholder='Enter search string' 
                  onChange={handleInput}
                />
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
              key={uniqueId()}
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