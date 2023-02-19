import styles from './Modal.module.scss'

export default function Modal({ toggle, action }) {
  return (
    <div className={`${styles.container} ${toggle ? styles.active : ''} `}>
      <div className={styles.modal}>
        {' '}
        Modal Content
        <div className={styles.close} onClick={action}></div>
      </div>
    </div>
  )
}
