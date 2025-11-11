import styles from './avatar.module.scss';

interface UserCardAvatarProps {
  src?: string;
  alt: string;
}

export function UserCardAvatar({ src, alt }: UserCardAvatarProps) {
  return (
    <div className={styles.avatar}>
      <img src={src} alt={alt} className={styles.avatarImg} />
    </div>
  );
}
