import React from 'react';
import FavoriteSvg from '@/assets/icons/favorite.svg?react';

export interface FavoriteIconProps extends React.SVGProps<SVGSVGElement> {}

export const FavoriteIcon: React.FC<FavoriteIconProps> = ({ ...props }) => {
  return <FavoriteSvg {...props} />;
};
