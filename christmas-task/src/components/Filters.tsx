import React, { useState, ChangeEvent, Fragment, useMemo } from 'react';
import MyButton from './UI/MyButton';
import MyTextInput from './UI/MyInput';
import MySelect from './UI/MySelect';
import { CheckboxGroup, CheckboxFilters } from './CheckboxGroup/CheckboxGroup';
import {Container} from './Container/Container';
import data from '../resources/data.json';
import { ToyT } from '../resources/data.types';

const Filters = () => {
  //Data
  const initialState = data.data as ToyT.Toy[];

  //Expand
  const [expand, setExpand] = useState(false);
  const expandFilters = () => {
    setExpand(!expand);
  };

  //Reset
  const resetFilters = () => {
    setSelectedSort('');
    setSearchQuery('');
    setCheckboxFilters({});
    //?reset filters state?
  };

  //Sort
  const [selectedSort, setSelectedSort] = useState('');
  const sortToys = (array: ToyT.Toy[]) => {
    const Sort = (a: ToyT.Toy, b: ToyT.Toy) => {
      switch (selectedSort) {
        case 'sort-price-max':
          return +a.price - +b.price;
        case 'sort-price-min':
          return +b.price - +a.price;
        case 'sort-name-max':
          return a.name.localeCompare(b.name);
        case 'sort-name-min':
          return b.name.localeCompare(a.name);
        default:
          return 1;
      }
    };
    return array.sort(Sort);
  };

  //Search
  const [searchQuery, setSearchQuery] = useState('');
  const searchToys = (array: ToyT.Toy[]) => {
    return array.filter((toy) => toy.name.toLowerCase().includes(searchQuery.toLowerCase()));
  };

  //Filter
  const [checkboxFilters, setCheckboxFilters] = useState<checkboxFiltersState>({});
  type checkboxFiltersState = { [x in CheckboxFilters]?: string[] | null };
  const presetCheckboxFilters = (prop: checkboxFiltersState) => {
    setCheckboxFilters({ ...checkboxFilters, ...prop });
  };
  const checkboxFiltering = (array: ToyT.Toy[]) => {
    return array.filter((toy) => {
      for (let prop in checkboxFilters) {
        if (checkboxFilters[prop as CheckboxFilters] !== null) {
          if (!checkboxFilters[prop as CheckboxFilters]!.includes(toy[prop as CheckboxFilters]))
            return false;
        }
      }
      return true;
    });
  };

  //Current
  const current = useMemo(() => {
    let filtering = [...initialState];
    if (selectedSort) {
      filtering = sortToys(filtering);
    }
    if (searchQuery) {
      filtering = searchToys(filtering);
    }
    filtering = checkboxFiltering(filtering);
    return filtering;
  }, [searchQuery, selectedSort, checkboxFilters]);

  return (
    <Fragment>
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
              <CheckboxGroup
                filter='shape'
                options={['шар', 'колокольчик', 'шишка', 'снежинка', 'фигурка']}
                onClick={presetCheckboxFilters}
              />
            </div>
            <div className='filter'>
              <div className='filter__name'>Цвет:</div>
              <CheckboxGroup
                filter='color'
                options={['белый', 'желтый', 'красный', 'синий', 'зелёный']}
                onClick={presetCheckboxFilters}
              />
            </div>
            <div className='filter'>
              <div className='filter__name'>Размер:</div>
              <CheckboxGroup
                filter='size'
                options={['большой', 'средний', 'малый']}
                onClick={presetCheckboxFilters}
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
                onChange={setSelectedSort}
              />
            </div>
            <div className='filter'>
              <MyButton className='reset' onClick={resetFilters}>
                Сброс
              </MyButton>
            </div>
          </div>
        </div>
      </div>

      <Container current={current} />
    </Fragment>
  );
};

export default Filters;
