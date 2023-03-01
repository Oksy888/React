import styles from '../components/Modal.module.scss'

export function Wrapper(props) {
  const style = {
    backgroundColor: props.color,
    width: 250,
    padding: 20,
    margin: '20px auto',
  }
  return (
    <div style={style}>
      {props.children}
      <div className={styles.close} onClick={props.action}></div>
    </div>
  )
}
