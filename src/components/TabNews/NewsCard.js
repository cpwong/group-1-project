import React from 'react';

function NewsCard(props) {      // 4 props passed.

    return (
        <div className='news-app'>
            <div className='news-card'>
                <img className='new-img' src={props.urlToImage} alt={props.urlToImage} />
                <h3><a href={props.url}>{props.title}</a></h3>
                <p>{props.description}</p>
            </div>
        </div>
    );
}

export default NewsCard;