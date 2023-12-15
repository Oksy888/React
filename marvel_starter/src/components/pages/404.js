import { Link } from 'react-router-dom'
import ErrorMessage from '../errorMessage/ErrorMessage'

export default function NotFound() {
  return (
    <div>
      <ErrorMessage />
      <p style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '24px' }}>
        Page Doesn`t exist
      </p>
      <Link
        to="/"
        style={{
          marginTop: '1em',
          display: 'block',
          textAlign: 'center',
          fontWeight: 'bold',
          fontSize: '24px',
        }}
      >
        Back to main page
      </Link>
    </div>
  )
}
