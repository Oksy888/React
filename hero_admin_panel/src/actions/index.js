export const heroesFetching = () => {
  return {
    type: 'HEROES_FETCHING',
  }
}

export const heroesFetched = (heroes) => {
  return {
    type: 'HEROES_FETCHED',
    payload: heroes,
  }
}

export const heroesFetchingError = () => {
  return {
    type: 'HEROES_FETCHING_ERROR',
  }
}

export const heroAdd = (newhero) => {
  return {
    type: 'HEROES_ADD',
    payload: newhero,
  }
}

export const heroesDelete = (id) => {
  return {
    type: 'HEROES_DELETE',
    payload: id,
  }
}

export const filtersFetching = () => {
  return {
    type: 'FILTERS_FETCHING',
  }
}
export const filtersFetched = (filters) => {
  return {
    type: 'FILTERS_FETCHED',
    payload: filters,
  }
}
export const filtersChanged = (filters) => {
  return {
    type: 'FILTERS_CHANGED',
    payload: filters,
  }
}
export const filtersFetchingError = () => {
  return {
    type: 'FILTERS_FETCHING_ERROR',
  }
}
