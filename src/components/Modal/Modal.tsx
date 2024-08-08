import { ReactNode, useEffect, useRef } from 'react';
import styles from './Modal.module.css';

type ModalProps = {
  show: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  onSave: () => void;
}

export const Modal = ({ show, onClose, title, children, onSave }: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onClose();
    }
  };

  const handleEscKey = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      onClose();
    }
  };

  useEffect(() => {
    if (show) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscKey);
      document.body.style.overflow = 'hidden';
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscKey);
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscKey);
      document.body.style.overflow = 'unset';
    };
  }, [show]);

  return (
    <div className={`${styles.modalOverlay} ${show ? styles.show : ''}`}>
      <div className={styles.modal} ref={modalRef} role="dialog" aria-modal="true" aria-labelledby="modal-title">
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