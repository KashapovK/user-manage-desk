export const generateAvatar = (id: number): string =>
  `https://api.dicebear.com/7.x/avataaars/svg?seed=${id}`;

export const getAvatarUrl = (
  avatar: string | null | undefined,
  userId: number,
): string => avatar || generateAvatar(userId);
