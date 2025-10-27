import clsx from 'clsx';

interface UserCardInfoProps {
  username: string;
  companyName: string;
  city: string;
  isArchived: boolean;
}

export function UserCardInfo({
  username,
  companyName,
  city,
  isArchived,
}: UserCardInfoProps) {
  return (
    <div
      className={clsx('user-card__user-info', {
        'user-card__user-info--archived': isArchived,
      })}
    >
      <div
        className={clsx('user-card__username-wrapper', {
          'user-card__username-wrapper--archived': isArchived,
        })}
      >
        <span
          className={clsx('user-card__username', {
            'user-card__username--archived': isArchived,
          })}
        >
          {username}
        </span>
      </div>

      <div
        className={clsx('user-card__company-wrapper', {
          'user-card__company-wrapper--archived': isArchived,
        })}
      >
        <p
          className={clsx('user-card__company', {
            'user-card__company--archived': isArchived,
          })}
        >
          {companyName}
        </p>
      </div>

      <div
        className={clsx('user-card__city-wrapper', {
          'user-card__city-wrapper--archived': isArchived,
        })}
      >
        <small
          className={clsx('user-card__city', {
            'user-card__city--archived': isArchived,
          })}
        >
          {city}
        </small>
      </div>
    </div>
  );
}
