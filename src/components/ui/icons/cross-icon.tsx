import React from 'react';
import CrossSvg from '@/assets/icons/cross.svg?react';

export interface CrossIconProps extends React.SVGProps<SVGSVGElement> {}

export const CrossIcon: React.FC<CrossIconProps> = ({ ...props }) => {
  return <CrossSvg {...props} />;
};
