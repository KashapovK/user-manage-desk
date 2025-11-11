import styles from './spinner.module.scss';

export default function Spinner() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.spinner} role="progressbar" />
    </div>
  );
}
