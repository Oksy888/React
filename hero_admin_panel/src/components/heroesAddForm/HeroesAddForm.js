import { v4 as uuidv4 } from 'uuid'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHttp } from '../../hooks/http.hook'

import { heroAdd } from '../heroesList/herosSlice'
import store from '../../store'
import { selectAll } from '../heroesFilters/filtersSlice'

// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uiid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров

const HeroesAddForm = () => {
  const [heroName, setHeroName] = useState('')
  const [heroDescr, setHeroDescr] = useState('')
  const [heroElement, setHeroElement] = useState('')
  const filters = selectAll(store.getState())
  const { filtersLoadingStatus } = useSelector((state) => state.filters)
  const dispatch = useDispatch()
  const { request } = useHttp()

  const onSubmitHandler = (e) => {
    e.preventDefault()

    const newHero = {
      id: uuidv4(),
      name: heroName,
      description: heroDescr,
      element: heroElement,
    }

    request('http://localhost:3001/heroes', 'POST', JSON.stringify(newHero))
      .then(console.log('Good, data is added'))
      .then((data) => dispatch(heroAdd(data)))
      .catch(() => console.log('error'))

    setHeroName('')
    setHeroDescr('')
    setHeroElement('')
  }

  const renderFilters = (filter, status) => {
    if (status === 'loading') {
      return <option> Загрузка элементов</option>
    } else if (status === 'error') {
      return <option> Ошибка загрузки</option>
    }
    if (filter && filter.length > 0) {
      return filter.map(({ name, id }) => {
        if (name === 'all') return
        return (
          <option key={id} value={name}>
            {name}
          </option>
        )
      })
    }
  }

  return (
    <form className="border p-4 shadow-lg rounded" onSubmit={onSubmitHandler}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label fs-4">
          Имя нового героя
        </label>
        <input
          required
          type="text"
          name="name"
          value={heroName}
          onChange={(e) => setHeroName(e.target.value)}
          className="form-control"
          id="name"
          placeholder="Как меня зовут?"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="text" className="form-label fs-4">
          Описание
        </label>
        <textarea
          required
          name="text"
          value={heroDescr}
          onChange={(e) => setHeroDescr(e.target.value)}
          className="form-control"
          id="text"
          placeholder="Что я умею?"
          style={{ height: '130px' }}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="element" className="form-label">
          Выбрать элемент героя
        </label>
        <select
          required
          className="form-select"
          id="element"
          name="element"
          value={heroElement}
          onChange={(e) => setHeroElement(e.target.value)}
        >
          <option>Я владею элементом...</option>
          {renderFilters(filters, filtersLoadingStatus)}
        </select>
      </div>

      <button type="submit" className="btn btn-primary">
        Создать
      </button>
    </form>
  )
}

export default HeroesAddForm
