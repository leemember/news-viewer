import React from 'react';
import NewsItem from './NewsItem';
import './NewsList.scss';
import axios from 'axios';
import usePromise from '../lib/usePromise';

const NewsList = ({ category }) => {
  const [loading, response, error] = usePromise(() => {
    const query = category === 'all' ? '' : `&category=${category}`;
    return axios.get(
      `http://newsapi.org/v2/top-headlines?country=kr${query}&apiKey=0a8c4202385d4ec1bb93b7e277b3c51f`,
    );
  }, [category]);
  
  // category값이 all이라면 query 값을 공백으로 설정하고, all이 아니라면 `&category=${category}`형태의 문자열로 만듦. 이 query를 요청할 때 주소에 포함된다. (삼항연산자)

  // 대기중일때
  if (loading) {
    return <div className="NewsListBlock">대기 중...</div>
  }

  //아직 article값이 설정되지 않았을 때
  if (!response) {
    return null;
  }

  if (error) {
    return <div className="NewsListBlock">에러발생 !!</div>;
  }

  //article값이 유효할 때
  const {articles} = response.data;

  return (
    <div className="NewsListBlock">      
      {articles.map(article => (
        <NewsItem key={article.url} article={article}/>
      ))}
    </div>
  )
  //뉴스 데이터 배열은 map 함수를 사용하여 컴포넌트 배열로 변환한다.
  
}

export default NewsList;