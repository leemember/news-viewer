import React, {useState, useCallback} from 'react';
import NewsList from './components/NewsList';
import Categories from './components/Categories';

const App = () => {
  const [ category, setCategory] = useState('all');
  const onSelect = useCallback(category =>  setCategory(category), []);

  return (
    <>
    <Categories category={category} onSelect={onSelect}/>
    <NewsList category={category}/>
    </>
  )
};

// category 값을 업데이트하는 onSelect라는 함수도 생성
// category랑 onSelect 함수를 Categories 컴포넌트에 props로 전달
// NewsList에도 category값 props로 전달


export default App;
