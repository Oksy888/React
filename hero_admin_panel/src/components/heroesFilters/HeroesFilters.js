// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import classNames from 'classnames'

import {
  filtersChanged,
  fetchFilters,
  selectAll,
} from '../heroesFilters/filtersSlice'
import Spinner from '../spinner/Spinner'
import store from '../../store'

const HeroesFilters = () => {
  const { filtersLoadingStatus, activeFilter } = useSelector(
    (state) => state.filters
  )
  const filters = selectAll(store.getState())
  const dispatch = useDispatch()

  // Запрос на сервер для получения фильтров и последовательной смены состояния
  useEffect(() => {
    dispatch(fetchFilters())
    // eslint-disable-next-line
  }, [])

  if (filtersLoadingStatus === 'loading') {
    return <Spinner />
  } else if (filtersLoadingStatus === 'error') {
    return <h5 className="text-center mt-5"> Ошибка загрузки</h5>
  }
  const renderFilters = (arr) => {
    if (arr.length === 0) {
      return <h5 className="text-center mt-5"> Фильтры не найдены</h5>
    } else if (arr.length > 0) {
      return arr.map(({ name, id, className }) => {
        const btnClass = classNames('btn', className, {
          active: name === activeFilter,
        })
        return (
          <button
            key={id}
            id={name}
            onClick={() => dispatch(filtersChanged(name))}
            className={btnClass}
          >
            {name}
          </button>
        )
      })
    }
  }
  const elements = renderFilters(filters)

  return (
    <div className="card shadow-lg mt-4">
      <div className="card-body">
        <p className="card-text">Отфильтруйте героев по элементам</p>
        <div className="btn-group">{elements}</div>
      </div>
    </div>
  )
}

export default HeroesFilters
