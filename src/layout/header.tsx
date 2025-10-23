import type { UserWithStatus } from '../types/types';

interface UserCardProps {
  user: UserWithStatus;
}

export default function Header({ user }: UserCardProps) {
  return (
    <header className="timeline__header">
      <div className="user-block__avatar">
        <img src={user.avatar} alt={user.name} width={112} height={120} />
      </div>
    </header>
  );
}
