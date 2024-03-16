
import styles from './Alert.module.css';

const Alert = ({ type, message }) => {
  return (
    <div className={`${styles.alert} ${type === 'success' ? styles.success : styles.error}`}>
      {message}
    </div>
  );
};

export default Alert;
