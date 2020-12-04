import React from 'react';
import NewsItem from './NewsItem';
import './NewsList.scss';

const sampleArticle = {
  title : '제목',
  description :'내용',
  url: 'https://google.com',
  urlToImage: 'https://via.placeholder.com/160',
};

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