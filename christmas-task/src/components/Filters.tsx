import React, { useState } from 'react';

const Filters = () => {
  const [expand, setExpand] = useState(false);

  const expandFilters = () => {
    setExpand(!expand);
  };

  return (
    <div className={['filter-wrapper', expand ? ' open' : ''].join('')}>
      <div className='filter__header'>
        <div className='filter__expand-wrapper'>
          <h3>Фильтры</h3>
          <button className='filter__expand' onClick={expandFilters}></button>
        </div>
        <div className='filter__search-wrapper'>
          <input type='text' className='filter__search' placeholder='Поиск' />
          <img src={'./assets/search.svg'} className='search-icon' alt='search' />
        </div>
      </div>
      <div className='filter__group'>
        <div className='filter__group-item'>
          <div className='filter'>
            <div className='filter__name'>Форма:</div>
            <div className='filter__items shape'>
              <div className='filter__item active' data-filter='shape-шар'></div>
              <div className='filter__item' data-filter='shape-колокольчик'></div>
              <div className='filter__item' data-filter='shape-шишка'></div>
              <div className='filter__item' data-filter='shape-снежинка'></div>
              <div className='filter__item' data-filter='shape-фигурка'></div>
            </div>
          </div>
          <div className='filter'>
            <div className='filter__name'>Цвет:</div>
            <div className='filter__items color'>
              <div className='filter__item active' data-filter='color-белый'></div>
              <div className='filter__item' data-filter='color-желтый'></div>
              <div className='filter__item' data-filter='color-красный'></div>
              <div className='filter__item' data-filter='color-синий'></div>
              <div className='filter__item' data-filter='color-зеленый'></div>
            </div>
          </div>
          <div className='filter'>
            <div className='filter__name'>Размер:</div>
            <div className='filter__items size'>
              <div className='filter__item active' data-filter='size-большой'></div>
              <div className='filter__item' data-filter='size-средний'></div>
              <div className='filter__item' data-filter='size-малый'></div>
            </div>
          </div>
        </div>
        <div className='filter__group-item slider'>
          <div className='filter slider'>
            <div className='filter__name'>Цена:</div>
            <div className='filter__items'>
              <output className='slider__output'>$10</output>
              <div className='count-slider noUi-target noUi-ltr noUi-horizontal noUi-txt-dir-ltr'></div>
              <output className='slider__output'>$135</output>
            </div>
          </div>
          <div className='filter slider'>
            <div className='filter__name'>Год выпуска:</div>
            <div className='filter__items'>
              <output className='slider__output'>1900</output>
              <div className='count-slider noUi-target noUi-ltr noUi-horizontal noUi-txt-dir-ltr'></div>
              <output className='slider__output'>2020</output>
            </div>
          </div>
        </div>
        <div className='filter__group-item sort'>
          <div className='filter slider'>
            <div className='filter__name'>Сортировать:</div>
            <select className='select'>
              <option value='' hidden></option>
              <option value='sort-price-max'>По цене ᐃ</option>
              <option value='sort-price-min'>По цене ᐁ</option>
              <option value='sort-name-max'>По названию ᐃ</option>
              <option value='sort-name-min'>По названию ᐁ</option>
            </select>
          </div>
          <div className='filter'>
            <button className='reset'>Сброс</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filters;
