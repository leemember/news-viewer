import React from 'react';
import './Categories.scss';

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

const Categories = () => {
  return(
    <div className="CategoriesBlock">
      {categories.map(c => (
        <div className="Category" key={c.name}>
          {c.text}
        </div>
      ))}
    </div>
  )
}

export default Categories;