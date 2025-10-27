export function HeaderActions() {
  const actions = [
    { id: 'notification', icon: '/icons/notification.svg', alt: 'Уведомления' },
    { id: 'favorite', icon: '/icons/favorite.svg', alt: 'Избранное' },
  ];

  return (
    <ul
      className="header__icons"
      role="list"
      aria-label="Действия: уведомления, избранное"
    >
      {actions.map((action) => (
        <li
          key={action.id}
          className={`header__icons-item header__icons-item--${action.id}`}
          data-action={action.id}
        >
          <img
            src={action.icon || '/placeholder.svg'}
            alt={action.alt}
            width={24}
            height={24}
            className="header__icon-image"
          />
        </li>
      ))}
    </ul>
  );
}
