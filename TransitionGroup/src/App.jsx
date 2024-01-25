import { useState, useRef } from 'react'
import { Button, Form, Container } from 'react-bootstrap'
import { CSSTransition, SwitchTransition } from 'react-transition-group'

import './App.css'

const modes = ['out-in', 'in-out']
const Modal = (props) => {
  const duration = 300

  return (
    <CSSTransition
      in={props.show}
      timeout={duration}
      onEnter={() => props.setShowTrigger(false)}
      onExited={() => props.setShowTrigger(true)}
      mountOnEnter
      unmountOnExit
      classNames="my-modal"
    >
      <div className="modal mt-5 d-block">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Typical modal window</h5>
              <button
                onClick={() => props.onClose(false)}
                type="button"
                className="btn-close"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <p>Modal body content</p>
            </div>
            <div className="modal-footer">
              <button
                onClick={() => props.onClose(false)}
                type="button"
                className="btn btn-secondary"
              >
                Close
              </button>
              <button
                onClick={() => props.onClose(false)}
                type="button"
                className="btn btn-primary"
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </CSSTransition>
  )
}

function App() {
  const [mode, setMode] = useState('out-in')
  const [state, setState] = useState(true)
  const helloRef = useRef(null)
  const goodbyeRef = useRef(null)
  const nodeRef = state ? helloRef : goodbyeRef
  const [showModal, setShowModal] = useState(false)
  const [showTrigger, setShowTrigger] = useState(true)
  console.log(nodeRef)
  return (
    <>
      <Container>
        <Modal
          show={showModal}
          onClose={setShowModal}
          setShowTrigger={setShowTrigger}
        />
        {showTrigger ? (
          <button
            type="button"
            className="btn btn-warning"
            onClick={() => setShowModal(true)}
          >
            Open Modal
          </button>
        ) : null}
      </Container>

      <div className="label">Mode:</div>
      <div className="modes">
        {modes.map((m) => (
          <Form.Check
            key={m}
            label={m}
            id={`mode=msContentScript${m}`}
            type="radio"
            name="mode"
            checked={mode === m}
            value={m}
            onChange={(event) => {
              setMode(event.target.value)
            }}
          />
        ))}
      </div>
      <div className="main">
        <SwitchTransition mode={mode}>
          <CSSTransition
            key={state}
            nodeRef={nodeRef}
            addEndListener={(done) => {
              nodeRef.current.addEventListener('transitionend', done, false)
            }}
            classNames="fade"
          >
            <div ref={nodeRef} className="button-container">
              <Button onClick={() => setState((state) => !state)}>
                {state ? 'Hello, world!' : 'Goodbye, world!'}
              </Button>
            </div>
          </CSSTransition>
        </SwitchTransition>
      </div>
    </>
  )
}

export default App
