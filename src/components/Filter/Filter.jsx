import { useSelector, useDispatch } from 'react-redux';
import { getFilter } from '../../redux/selectors';
import { changeFilter } from '../../redux/reducers';

import s from './Filter.module.css';

const Filter = () => {
  const value = useSelector(getFilter);
  const dispatch = useDispatch();
  return (
    <label className={s.filterLabel}>
      <title>Find contact by name</title>
      <input
        type="text"
        name="filter"
        value={value}
        onChange={e => dispatch(changeFilter(e.target.value))}
      />
    </label>
  );
};

export default Filter;
