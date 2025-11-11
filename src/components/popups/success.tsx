import checkedBox from '@/assets/icons/checked-box.svg';
import { CrossIcon } from '@/components/ui/icons/cross-icon';
import styles from './success.module.scss';

interface SuccessPopupProps {
  onClose: () => void;
}

export function SuccessPopup({ onClose }: SuccessPopupProps) {
  return (
    <div className={styles.popup} onClick={onClose}>
      <div className={styles.popupContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.popupIcon}>
          <img src={checkedBox} alt="Успешно" />
        </div>
        <span className={styles.popupMessage}>Изменения сохранены!</span>
        <button type="button" className={styles.popupClose} onClick={onClose}>
          <CrossIcon />
        </button>
      </div>
    </div>
  );
}
