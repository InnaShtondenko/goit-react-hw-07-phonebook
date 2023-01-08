import { useDispatch } from 'react-redux';

import { setFilter } from 'redux/filterSlice';

import { FilterLabel, FilterInput } from './Filter.styled';


export function Filter() {
  const dispatch = useDispatch();

  return (
    <FilterLabel>
      Filter contacts by name
      <FilterInput onInput={e => dispatch(setFilter(e.target.value))} />
    </FilterLabel>
  );
}
