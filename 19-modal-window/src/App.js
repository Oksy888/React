import './App.css'
import { Wrapper } from './components/Wrapper'
import Modal from './components/Modal'
import styles from './components/App.module.scss'
import { useState } from 'react'

function App() {
  const [modalState, setModatState] = useState(false)
  function openModal() {
    setModatState(!modalState)
  }
  return (
    <div className={styles.container}>
      {/*       
      {modalState.toString()}
 */}
      <p>
        If you do this, please ensure that your app element is set correctly.
        The app element should not be a parent of the modal, to prevent modal
        content from being hidden to screenreaders while it is open.
      </p>
      <span className={styles.toggleModal} onClick={openModal}>
        Open Modal{' '}
      </span>
      <Modal toggle={modalState} action={openModal} />
      {/* <Wrapper color="lightblue">
        <h2> Text inside of the wrapper</h2>
        <button>Click me</button>
      </Wrapper>
      <Wrapper color="hotpink">
        <h2> Another text</h2>
        <p>Some description</p>
        <input type="text" placeholder="Enter value"></input>
      </Wrapper> */}
    </div>
  )
}

export default App
