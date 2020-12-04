import React from 'react';
import NewsItem from './NewsItem';
import './NewsList.scss';

const NewsList = () => {
  return (
    <div className="NewsListBlock">
      <NewsItem article={sampleArticle} />
      <NewsItem article={sampleArticle} />
      <NewsItem article={sampleArticle} />
      <NewsItem article={sampleArticle} />
      <NewsItem article={sampleArticle} />
      <NewsItem article={sampleArticle} />
    </div>
  )
}

export default NewsList;