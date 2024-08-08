import { ReactNode } from 'react';
import styles from './Modal.module.css';

type ModalProps = {
  show: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  onSave: () => void;
}

export const Modal = ({ show, onClose, title, children, onSave }: ModalProps) => {
  const handleClickOutside = () => {
  };

  return (
    <div className={`${styles.modalOverlay} ${show ? styles.show : ''}`}>
      <div className={styles.modal} role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <header className={styles.modalHeader}>
          <h2 id="modal-title">{title}</h2>
        </header>
        <div className={styles.modalBody}>
          {children}
        </div>
        <footer className={styles.modalFooter}>
          <button onClick={onClose}>Close</button>
          <button onClick={onSave}>Save</button>
        </footer>
      </div>
    </div>
  );
};