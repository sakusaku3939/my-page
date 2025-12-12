import { useEffect } from "react";
import styles from "./Alert.module.css";

interface AlertProps {
  message: string;
  type: "success" | "error" | "info";
  onClose: () => void;
  duration?: number;
}

const Alert: React.FC<AlertProps> = ({ message, type, onClose, duration = 3000 }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [onClose, duration]);

  return (
    <div className={`${styles.alert} ${styles[type]}`}>
      <div className={styles.content}>
        <span className={styles.message}>{message}</span>
        <button className={styles.closeButton} onClick={onClose}>
          ×
        </button>
      </div>
    </div>
  );
};

export default Alert;