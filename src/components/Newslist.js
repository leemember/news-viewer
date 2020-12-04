import React, {useEffect, useState} from 'react';
import NewsItem from './NewsItem';
import './NewsList.scss';
import axios from 'axios';

const NewsList = ({ category }) => {
  const [articles, setArticles] = useState(null);
  const [loading, setLoading] = useState(false);
  // 요청 대기중일때 loading값이 true, 요청 끝나면 false

  useEffect(()=> {
    //async를 사용하는 함수 따로 선언
    const fetchData = async () => {
      setLoading(true);
      //로딩이 끝나면
      //try 예외처리 작업이 된다.
      try {
        const query = category === 'all' ? '' : `&category=${category}`;        
        const response = await axios.get(
          `http://newsapi.org/v2/top-headlines?country=kr${query}&apiKey=0a8c4202385d4ec1bb93b7e277b3c51f`,
        );
        setArticles(response.data.articles);
      } catch(e) {
        console.log(e);
      }
      setLoading(false);
    };
    fetchData();
  }, [category]);

  // 대기중일때
  if (loading) {
    return <div className="NewsListBlock">대기 중...</div>
  }

  //아직 article값이 설정되지 않았을 때
  if (!articles) {
    return null;
  }

  //article값이 유효할 때
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