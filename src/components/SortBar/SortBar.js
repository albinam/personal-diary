import React from 'react';
import './SortBar.scss';
import { useDispatch, useSelector } from 'react-redux';
import AscendingIcon from '../../assets/images/AscendingIcon.svg';
import DescendingIcon from '../../assets/images/DescendingIcon.svg';
import { setCurrentPage, setSortByDate, setSortByTitle } from '../../redux/actions/actions';

function SortBar() {
  const sortByDate = useSelector((state) => state.records.sortByDate);
  const sortByTitle = useSelector((state) => state.records.sortByTitle);
  const dispatch = useDispatch();

  function reset() {
    dispatch(setCurrentPage(1));
    dispatch(setSortByDate(''));
    dispatch(setSortByTitle(''));
  }

  return (
    <div className="sort-bar">
      <div className="sort-bar__container">
        <div className="sort-bar__label">Сортировка по названию</div>
        <div className="sort-bar__icons">
          <div className="sort-bar__ascending">
            <button
              type="button"
              className="sort-bar__icon-container"
              onClick={() => {
                dispatch(setSortByTitle('asc'));
                dispatch(setCurrentPage(1));
              }}
            >
              <img
                className={sortByTitle === 'asc' ? 'sort-bar__icon active' : 'sort-bar__icon'}
                src={AscendingIcon}
                alt="ascending icon"
              />
            </button>
          </div>
          <div className="sort-bar__descending">
            <button
              type="button"
              className="sort-bar__icon-container"
              onClick={() => {
                dispatch(setSortByTitle('desc'));
                dispatch(setCurrentPage(1));
              }}
            >
              <img
                className={sortByTitle === 'desc' ? 'sort-bar__icon active' : 'sort-bar__icon'}
                src={DescendingIcon}
                alt="descending icon"
              />
            </button>
          </div>
        </div>
      </div>
      <div className="sort-bar__container">
        <div className="sort-bar__label">Сортировка по дате</div>
        <div className="sort-bar__icons">
          <div className="sort-bar__ascending">
            <button
              type="button"
              className="sort-bar__icon-container"
              onClick={() => {
                dispatch(setSortByDate('asc'));
                dispatch(setCurrentPage(1));
              }}
            >
              <img
                className={sortByDate === 'asc' ? 'sort-bar__icon active' : 'sort-bar__icon'}
                src={AscendingIcon}
                alt="ascending icon"
              />
            </button>
          </div>
          <div className="sort-bar__descending">
            <button
              type="button"
              className="sort-bar__icon-container"
              onClick={() => {
                dispatch(setSortByDate('desc'));
                dispatch(setCurrentPage(1));
              }}
            >
              <img
                className={sortByDate === 'desc' ? 'sort-bar__icon active' : 'sort-bar__icon'}
                src={DescendingIcon}
                alt="descending icon"
              />
            </button>
          </div>
        </div>
      </div>
      <button type="button" onClick={() => reset()} className="button-clear">Сбросить</button>
    </div>
  );
}

export default SortBar;
