import { configureStore, createSlice } from '@reduxjs/toolkit'
import filters from '../components/heroesFilters/filtersSlice'
import heroes from '../components/heroesList/herosSlice'

const stringMiddleware = () => (next) => (action) => {
  if (typeof action === 'string') {
    return next({
      type: action,
    })
  }
  return next(action)
}
const store = configureStore({
  reducer: { heroes, filters },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(stringMiddleware),
})

/*const store = createStore(
  combineReducers({ heroes, filters }),
  compose(
    applyMiddleware(thunk, stringMiddleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
)*/
export default store
