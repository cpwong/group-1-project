import React, { useContext } from 'react';
import { NewsCompProvider } from './NewsComp';
import NewsArticle from './NewsArticle';

function News(props) {
    const {data} = useContext();

    return (
        <div>
            {data ? data.articles.map(news =>
            <NewsArticle
            data = {news}
            key = {news.url} />) : "Loading..."}
        </div>
    )
}

export default News;