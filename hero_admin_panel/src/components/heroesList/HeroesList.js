import { useHttp } from '../../hooks/http.hook'
import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  heroDeleted,
  fetchHeroes,
  filteredHeroesSelector,
} from '../heroesList/herosSlice'
import HeroesListItem from '../heroesListItem/HeroesListItem'
import Spinner from '../spinner/Spinner'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

import './heroesList.scss'

// Задача для этого компонента:
// При клике на "крестик" идет удаление персонажа из общего состояния
// Усложненная задача:
// Удаление идет и с json файла при помощи метода DELETE

const HeroesList = () => {
  /*
  const filteredHeroes = useSelector((state) => {
    if (state.filters.activeFilter === 'all') {
      return state.heroes.heroes
    } else {
      return state.heroes.heroes.filter(
        (item) => item.element === state.filters.activeFilter
      )
    }
  })*/
  const filteredHeroes = useSelector(filteredHeroesSelector)
  const { heroesLoadingStatus } = useSelector(
    (state) => state.heroes.heroesLoadingStatus
  )
  const dispatch = useDispatch()
  const { request } = useHttp()

  useEffect(() => {
    dispatch(fetchHeroes())
    // eslint-disable-next-line
  }, [])
  const onDelete = useCallback(
    (id) => {
      request(`http://localhost:3001/heroes/${id}`, 'DELETE')
        .then((data) => console.log(data, 'deleted'))
        .then(dispatch(heroDeleted(id)))
        .catch((err) => console.log(err))
    },
    [request]
  )

  if (heroesLoadingStatus === 'loading') {
    return <Spinner />
  } else if (heroesLoadingStatus === 'error') {
    return <h5 className="text-center mt-5">Ошибка загрузки</h5>
  }

  const renderHeroesList = (arr) => {
    console.log('render')
    if (arr.length === 0) {
      return (
        <CSSTransition timeout={0} classNames="hero">
          <h5 className="text-center mt-5">Героев пока нет</h5>
        </CSSTransition>
      )
    } else {
      return arr.map(({ id, ...props }) => {
        return (
          <CSSTransition key={id} timeout={500} classNames="hero">
            <HeroesListItem key={id} onDelete={() => onDelete(id)} {...props} />
          </CSSTransition>
        )
      })
    }
  }

  const elements = renderHeroesList(filteredHeroes)

  return <TransitionGroup component="ul">{elements}</TransitionGroup>
}

export default HeroesList
