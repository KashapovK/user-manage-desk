import clsx from 'clsx';

interface UserCardAvatarProps {
  src?: string;
  alt: string;
  isArchived: boolean;
}

export function UserCardAvatar({ src, alt, isArchived }: UserCardAvatarProps) {
  return (
    <div
      className={clsx('user-card__avatar', {
        'user-card__avatar--archived': isArchived,
      })}
    >
      <img
        src={src || '/placeholder.svg'}
        alt={alt}
        width={112}
        height={120}
        loading="lazy"
        className={clsx('user-card__avatar-img', {
          'user-card__avatar-img--archived': isArchived,
        })}
      />
    </div>
  );
}
