import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const CategoriesBlock = styled.div`
    display: flex;
    padding: 1rem;
    width: 768px;
    margin: 0 auto;
    @media screen and (max-width: 768px) {
      width: 100%;
      overflow-x: auto;
    }
`;

const Category = styled(NavLink)`
    font-size: 1.125rem;
    cursor: pointer;
    text-decoration: none;
    color: inherit;
    padding-bottom: 0.25rem;

    &:hover {
      color: #495057;
    }

   &.active {
    font-weight:600;
    border-bottom: 2px solid #22b8cf;
    color: #22b8cf;
    &:hover {
      color: #3bc9db;
    }
   }

    & + & {
      margin-left: 1rem;    
    }
`;




const categories = [
  {
    name: 'all',
    text: '전체보기'
  },
  {
    name: 'business',
    text: '비즈니스'
  },
  {
    name: 'entertainment',
    text: '엔터테인먼트'
  },
  {
    name: 'health',
    text: '건강'
  },
  {
    name: 'science',
    text: '과학'
  },
  {
    name: 'sports',
    text: '스포츠'
  },
];


//카테고리에 props추가
// 카테고리 클릭하면 바로 props로 스타일줌

const Categories = () => {
  return(
    <CategoriesBlock>
      {categories.map(c => (
        <Category 
          key={c.name}
          activeClassName="active"
          exact={c.name === 'all'}
          to={c.name === 'all' ? '/' : `/${c.name}`}          
        >

          {c.text}
        </Category>
      ))}
    </CategoriesBlock>
  )
}

// map함수로 배열변환하기.

export default Categories;

/*

카테고리 컴포넌트에 to 값은 "/카테고리" 로 해줬다. 전체보기의 경우 / 로 표시
특정 카테고리로 이동시 주소에 /카테고리 이름이 나온다.
그리고 axact는 true로 해주어야한다. 이 값을 설정하지 않으면, 다른 카테고리가 선택되었을 때도 전체보기 링크에 active 스타일이 적용되는 오류가 발생한다.

*/