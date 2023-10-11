import './app-info.css'

const AppInfo = ({ countItems, countIncrease }) => {
  return (
    <div className="app-info">
      <h1> Employes accountant</h1>
      <h2> Total amount of employes: {countItems}</h2>
      <h2> Bonus will get: {countIncrease}</h2>
    </div>
  )
}

export default AppInfo
