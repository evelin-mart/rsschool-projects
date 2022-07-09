import React, { useState, ChangeEvent } from 'react';
import MyButton from './UI/MyButton';
import MyTextInput from './UI/MyInput';
import MySelect from './UI/MySelect';
import GroupFilterItem from './GroupFilterItem';

const Filters = () => {
  //Expander
  const [expand, setExpand] = useState(false);
  const expandFilters = () => {
    setExpand(!expand);
  };

  //Reset
  const resetFilters = () => {
    setSelectedSort('');
    setSearchQuery('');
  };

  //Sorter
  const [selectedSort, setSelectedSort] = useState('');
  const sortToys = (sort: string) => {
    setSelectedSort(sort);
    console.log(sort);
  };

  //Search
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className={['filter-wrapper', expand ? ' open' : ''].join('')}>
      <div className='filter__header'>
        <div className='filter__expand-wrapper'>
          <h3>Фильтры</h3>
          <MyButton className='filter__expand' onClick={expandFilters}></MyButton>
        </div>
        <div className='filter__search-wrapper'>
          <MyTextInput
            value={searchQuery}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
            className='filter__search'
            placeholder='Поиск...'
          />
          <img src={'./assets/search.svg'} className='search-icon' alt='search' />
        </div>
      </div>
      <div className='filter__group'>
        <div className='filter__group-item'>
          <div className='filter'>
            <div className='filter__name'>Форма:</div>
            <GroupFilterItem
              filter='shape'
              options={['шар', 'колокольчик', 'шишка', 'снежинка', 'фигурка']}
            />
          </div>
          <div className='filter'>
            <div className='filter__name'>Цвет:</div>
            <GroupFilterItem
              filter='color'
              options={['белый', 'желтый', 'красный', 'синий', 'зеленый']}
            />
          </div>
          <div className='filter'>
            <div className='filter__name'>Размер:</div>
            <GroupFilterItem
              filter='size'
              options={['большой', 'средний', 'малый']}
            />
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
            <MySelect
              options={[
                { value: 'sort-price-max', name: 'По цене ᐃ' },
                { value: 'sort-price-min', name: 'По цене ᐁ' },
                { value: 'sort-name-max', name: 'По названию ᐃ' },
                { value: 'sort-name-min', name: 'По названию ᐁ' },
              ]}
              value={selectedSort}
              onChange={sortToys}
            />
          </div>
          <div className='filter'>
            <MyButton className='reset' onClick={resetFilters}>Сброс</MyButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filters;
