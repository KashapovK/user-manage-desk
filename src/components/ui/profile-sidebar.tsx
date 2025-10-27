interface ProfileSidebarProps {
  avatarSrc?: string;
  avatarAlt: string;
}

export function ProfileSidebar({ avatarSrc, avatarAlt }: ProfileSidebarProps) {
  const sections = [
    { id: 1, label: 'Данные профиля', isActive: true },
    { id: 2, label: 'Рабочее пространство', isActive: false },
    { id: 3, label: 'Приватность', isActive: false },
    { id: 4, label: 'Безопасность', isActive: false },
  ];

  return (
    <aside className="profile__sidebar">
      <div className="profile__avatar">
        <img
          src={avatarSrc || '/placeholder.svg'}
          alt={avatarAlt}
          className="profile__avatar-image"
          width={280}
          height={485}
        />
      </div>

      <nav className="profile__sections">
        <ul className="profile__sections-list">
          {sections.map((section) => (
            <li
              key={section.id}
              className={`profile__section-item p ${section.isActive ? 'profile__section-item--active p' : ''}`}
            >
              {section.label}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
