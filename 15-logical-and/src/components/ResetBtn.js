function ResetBtn({ onClick }) {
  const buttonStyle = { backgroundColor: 'lightgreen' }
  return (
    <div>
      <button style={buttonStyle} onClick={onClick}>
        {' '}
        Reset
      </button>
    </div>
  )
}
export default ResetBtn
