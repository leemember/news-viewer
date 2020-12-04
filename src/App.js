import React from 'react';
import { Route } from 'react-router-dom';
import NewsPage from './pages/NewsPage';

const App = () => {
  return <Route path="/:category?" component={NewsPage} />
};

/*
path에 /:category?와 같은 형태로 있는 것은 category값이 선택적 이라는 의미다.

즉, 있을수도 없을수도 있다는 뜻.
category URL 파라미터가 없다면 전체 카테고리를 선택한 것으로 간주한다.

*/


export default App;
